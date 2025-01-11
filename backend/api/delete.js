import { extractToken } from "./authentication.js";
import { ApiError } from "../functions.js";
import { User, Wishlist, Gift } from "../models.js";

export const deleteList = async (req) => {
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

        await list.destroy();

        return {status: 200, message: "List deleted successfully"};
    } catch (error) {
        throw new ApiError(500, error.message);
    }
};

export const deleteGift = async (req) => {
    const { giftId } = req.body;
    const id = extractToken(req);

    try {
        if (!giftId) throw new ApiError(400, "No gift id provided");
        if (!id) throw new ApiError(401, "Unauthorized");

        const user = await User.findByPk(id);
        if (!user) throw new ApiError(404, "User not found with provided id");

        const gift = await Gift.findByPk(giftId);
        if (!gift) throw new ApiError(404, "Gift not found with provided id");

        await gift.destroy();

        return {status: 200, message: "Gift deleted successfully"};
    } catch (error) {
        throw new ApiError(500, error.message);
    }
};
