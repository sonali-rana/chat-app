import User from "../models/user.model.js";

export const getUsersToChat = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;

		const filteredUsers = await User.find({
			_id: { $ne: loggedInUserId },
		}).select("-password"); //$ne - not equals(to filter out logged in user) // password not required

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsers controller: ", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
