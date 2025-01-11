import { User, Wishlist, Gift } from "../models.js";
import { extractToken } from "./authentication.js";

export const getLists = async (req) => {
    const id = extractToken(req);
    const {owned, shared} = req.body;

    try {
        if (!id) throw new ApiError(401, "Unauthorized");
        if (!owned && !shared) throw new ApiError(400, "No lists to fetch");

        const user = await User.findByPk(id);
        if (!user) throw new ApiError(404, "User not found");
        const lists = {};

        if (owned) lists.owned = await Wishlist.findAll({ where: { owner: id } });
        if (shared) lists.shared = await Wishlist.findAll({ include: { model: User, where: { id } } });

        return { status: 200, lists };
    } catch (error) {
        throw new ApiError(500, error.message);
    }
};

export const getList = async (req) => {
    const { listId } = req.body;
    const id = extractToken(req);

    try {
        if (!listId) throw new ApiError(400, "No list id provided");
        if (!id) throw new ApiError(401, "Unauthorized");

        const user = await User.findByPk(id);
        if (!user) throw new ApiError(404, "User not found with provided id");

        const list = await Wishlist.findByPk(listId);
        if (!list) throw new ApiError(404, "List not found with provided id");
        if (list.owner !== id) throw new ApiError(403, "Forbidden: You do not own this list");

        const gifts = await Gift.findAll({ include: { model: Wishlist, where: { id: listId } } });

        return { status: 200, list, gifts };
    } catch (error) {
        throw new ApiError(500, error.message);
    }
};

export const getUser = async (req) => {
    const id = extractToken(req);
    const { include = [], exclude = [] } = req.body;

    try {
        if (!id) throw new ApiError(401, "Unauthorized");

        //Validate include/exclude arrays
        if (!Array.isArray(include) || !Array.isArray(exclude)) throw new ApiError(400, "Include and exclude must be arrays");
        if (include.length && exclude.length) throw new ApiError(400, "Include and exclude cannot be used together");

        const userData = await User.findByPk(id, { attributes: include.length ? include : { exclude } });
        if (!userData) throw new ApiError(404, "User not found");


        return { status: 200, content: {userData: userData.dataValues}};
    } catch (error) {
        throw new ApiError(500, error.message);
    }
};