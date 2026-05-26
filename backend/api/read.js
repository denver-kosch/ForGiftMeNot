import { User, List, Gift, UserList } from "../models.js";
import { extractToken } from "./authentication.js";
import { ApiError, makeBackendUrl, handleError } from "../functions.js";
import { existsSync } from "fs";

const flattenMembership = (membership) => ({
	...membership.list.toJSON(),
	membership: {
		role: membership.role,
		last_opened_at: membership.last_opened_at,
		pinned_at: membership.pinned_at,
		archived_at: membership.archived_at,
	},
});

const SAFE_USER_FIELDS = [ "id", "username", "first_name", "last_name", "email", "phone_num", "verified", "admin", "created_at", "updated_at" ];

export const getLists = async (req) => {
	try {
		const id = extractToken(req);

		if (!id) throw new ApiError(401, "Unauthorized");
		
		const lists = {owned: [], shared: []};

		const memberships = await UserList.findAll({
			where: { user_id: id, archived_at: null },
			include: [{ model: List, as: "list" }],
			order: [["pinned_at", "DESC"], ["last_opened_at", "DESC"], [{ model: List, as: "list" }, "updated_at", "DESC"]],
		});

		for (const membership of memberships) {
			if (!membership.list) continue;

			const list = flattenMembership(membership);
			if (membership.role === "owner") lists.owned.push(list);
			else lists.shared.push(list);
		}
		
		return { status: 200, content: { lists } };
	} catch (error) {
		handleError(error);
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
		if (!membership) throw new ApiError(404, "List not found or access denied");

		await membership.update({ last_opened_at: new Date() });

		const gifts = await membership.list.getGifts({ order: [["created_at", "DESC"]] });

		return { status: 200, list: membership.list, gifts };
	} catch (error) {
		handleError(error);
	}
};

export const getUser = async (req) => {
	const id = extractToken(req);
	const { fields = [] } = req.body;

	try {
		if (!id) throw new ApiError(401, "Unauthorized");
		if (!Array.isArray(fields)) throw new ApiError(400, "Fields must be an array");

		const invalidFields = fields.filter(field => !SAFE_USER_FIELDS.includes(field));
		if (invalidFields.length > 0) throw new ApiError(400, "Invalid user fields requested");
		const attributes = fields.length > 0 ? fields : SAFE_USER_FIELDS;

		const user = await User.findByPk(id, { attributes });
		if (!user) throw new ApiError(404, "User not found");

		const userData = user.toJSON();
		userData.profilePic = existsSync(`./public/images/profilePic/${id}.png`) ? makeBackendUrl(`/images/profilePic/${id}.png`) : makeBackendUrl(`/images/profilePic/placeholder.png`);

		return { status: 200, content: { userData } };
	} catch (error) {
		handleError(error);
	}
};