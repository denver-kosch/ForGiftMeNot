import { hash } from "bcrypt";
import { User, List, Gift } from "../models.js";
import { extractToken } from "./authentication.js";
import { ApiError } from "../functions.js";


export const updateUser = async (req) => {
    const keys = Object.keys(req.body);
    const allowedKeys = ["username", "email", "password", "firstName", "lastName", "phoneNum"];
    const id = extractToken(req);

    try {
        if (!id) throw new ApiError(401, "Unauthorized");

        const user = await User.findByPk(id);
        if (!user) throw new ApiError(404, "User not found");

        for (let key of keys) user[key] = key === 'password' ? await hash(req.body[key], 10) : req.body[key];

        const invalidKeys = keys.filter(key => !allowedKeys.includes(key));
        console.warn(`Invalid keys: ${invalidKeys.join(", ")}`);

        await user.save();

        return {status: 200};
    } catch (error) {
        throw new ApiError(500, error.message);
    }
};

export const updateList = async (req) => {
    const { listId, name, description } = req.body;
    const id = extractToken(req);

    try {
        if (!id) throw new ApiError(401, "Unauthorized");

        const user = await User.findByPk(id);
        if (!user) throw new ApiError(404, "User not found");

        const list = await List.findByPk(listId);
        if (!list) throw new ApiError(404, "List not found");
        if (list.owner !== id) throw new ApiError(403, "Forbidden");

        list.name = name;
        list.description = description;

        await list.save();

        return {status: 200};
    } catch (error) {
        throw new ApiError(500, error.message);
    }
};

export const updateGift = async (req) => {
    const { giftId, name, description, url, price } = req.body;
    const id = extractToken(req);

    try {
        if (!id) throw new ApiError(401, "Unauthorized");

        const user = await User.findByPk(id);
        if (!user) throw new ApiError(404, "User not found");

        const gift = await Gift.findByPk(giftId);
        if (!gift) throw new ApiError(404, "Gift not found");

        gift.name = name;
        gift.description = description;
        gift.url = url;
        gift.price = price;

        await gift.save();

        return {status: 200};
    } catch (error) {
        throw new ApiError(500, error.message);
    }
};