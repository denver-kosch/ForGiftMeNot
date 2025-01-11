import { User, Wishlist, Gift } from "../models.js";
import { extractToken } from "./authentication.js";

export const getLists = async (req) => {
    const id = extractToken(req);

    try {
        if (!id) throw new ApiError(401, "Unauthorized");

        const user = await User.findByPk(id);
        if (!user) throw new ApiError(404, "User not found");

        const lists = await Wishlist.findAll({ where: { owner: id } });

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

        const gifts = await list.getGifts();

        return { status: 200, list, gifts };
    } catch (error) {
        throw new ApiError(500, error.message);
    }
};

export const getUser = async (req) => {
    const id = extractToken(req);
    try {
        if (!id) throw new ApiError(401, "Unauthorized");
        const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
        if (!user) throw new ApiError(404, "User not found");

        const {password, ...userData} = user.toJSON();

        return { status: 200, content: {user: userData} };
    } catch (error) {
        throw new ApiError(500, error.message);
    }
};