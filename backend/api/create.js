import { ApiError } from "../functions.js";
import {User, List, ListGift, Gift } from "../models.js";
import { extractToken } from "./authentication.js";


export const createList = async (req) => {
    const { name, description } = req.body;
    const id = extractToken(req);
    
    try {
        if (!id) throw new ApiError(401, "Unauthorized");

        const user = await User.findByPk(id);
        if (!user) throw new ApiError(404, "User not found");
        const list = await List.create({ name, description, owner: id });

        return {status: 201, content: {listId: list.id}};
    } catch (error) {
        throw new ApiError(500, error.message);
    }
};

export const addToList = async (req) => {
    const { list:lid, name, description, url, price } = req.body;
    const id = extractToken(req);

    try {
        if (!id) throw new ApiError(401, "Unauthorized");

        const user = await User.findByPk(id);
        if (!user) throw new ApiError(404, "User not found");

        const list = await List.findByPk(lid);
        if (!list) throw new ApiError(404, "List not found");
        if (list.owner !== id) throw new ApiError(403, "Forbidden");

        const gift = await Gift.create({ name, description, url, price });

        await ListGift.create({ list, gift });

        return {status: 201};
    } catch (error) {
        throw new ApiError(500, error.message);
    }
};

export const createGift = async ({ name, description, url, price}) => {
    try {
        await Gift.create({ name, description, url, price, });
        return true;
    } catch (error) {
        throw new ApiError(500, error.message);
    }
};

export const shareList = async (req) => {
    const { listId, userId } = req.body;
    const id = extractToken(req);

    try {
        if (!id) throw new ApiError(401, "Unauthorized");

        const user = await User.findByPk(id);
        if (!user) throw new ApiError(404, "User not found");

        const list = await List.findByPk(listId);
        if (!list) throw new ApiError(404, "List not found");
        if (list.owner !== id) throw new ApiError(403, "Forbidden");

        const shared = await UserList.create({ user: userId, list: listId });

        return {status: 201, content: {shared}};
    } catch (error) {
        throw new ApiError(500, error.message);
    }
};