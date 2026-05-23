import { User, List, Gift, UserList } from "../models.js";
import { extractToken } from "./authentication.js";
import { ApiError, makeBackendUrl } from "../functions.js";
import { existsSync } from "fs";
import { Op } from "sequelize";

const flattenMembership = (membership) => ({
    ...membership.list.toJSON(),
    membership: {
        role: membership.role,
        last_opened_at: membership.last_opened_at,
        pinned_at: membership.pinned_at,
        archived_at: membership.archived_at,
    },
});

export const getLists = async (req) => {
    try {
        const id = extractToken(req);
        const { owned , shared } = req.body;

        if (!id) throw new ApiError(401, "Unauthorized");
        if (!owned && !shared) throw new ApiError(400, "No lists to fetch");
        
        const user = await User.findByPk(id);
        if (!user) throw new ApiError(404, "User not found");
        
        const lists = {};
        const baseQuery = { user_id: id, archived_at: null };

        const includeList = { model: List, as: "list" };

        const order = [
            ["pinned_at", "DESC"],
            ["last_opened_at", "DESC"],
            [{ model: List, as: "list" }, "created_at", "DESC"]
        ];

        if (owned) {
            const ownedMemberships = await UserList.findAll({ where: { ...baseQuery, role: "owner" }, include: [includeList], order });
            lists.owned = ownedMemberships.map(flattenMembership);
        }
        if (shared) {
            const sharedMemberships = await UserList.findAll({ where: {...baseQuery, role: { [Op.ne]: "owner" } }, include: [includeList], order });
            lists.shared = sharedMemberships.map(flattenMembership);
        }
        return { status: 200, content: { lists } };
    } catch (error) {
        console.log(error);
        throw new ApiError(500, error.message);
    }
};

export const getList = async (req) => {
    const { listId } = req.body;
    const id = extractToken(req);

    try {
        if (!listId) throw new ApiError(400, "No list id provided");
        if (!id) throw new ApiError(401, "Unauthorized");

        const membership = await UserList.findOne({ 
            where: { user_id: id, list_id: listId, archived_at: null }, 
            include: [{ model: List, as: "list" }]
        });

        const list = await List.findByPk(listId);
        if (!list) throw new ApiError(404, "List not found with provided id");
        if (list.owner !== id) throw new ApiError(403, "Forbidden: You do not own this list");

        const gifts = await Gift.findAll({ include: { model: List, where: { id: listId } } });

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

        const userData = (await User.findByPk(id, { attributes: include.length ? include : { exclude } })).dataValues;
        if (!userData) throw new ApiError(404, "User not found");


        userData.profilePic = existsSync(`./public/images/profilePic/${id}.png`) ? makeBackendUrl(`/images/profilePic/${id}.png`) : makeBackendUrl(`/images/profilePic/placeholder.png`);

        return { status: 200, content: {userData}};
    } catch (error) {
        throw new ApiError(500, error.message);
    }
};