import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenandSetCookies from "../utils/generateToken.js";

export const signup = async (req, res) => {
	try {
		const { fullName, username, password, confirmPassword, gender } = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match." });
		}

		const user = await User.findOne({ username });

		if (user) {
			return res.status(400).json({ error: "User already exists!" });
		}

		//HASH password here

		const salt = await bcrypt.genSalt(10); // the more the value the more time it takes to generate
		const hashedPassword = await bcrypt.hash(password, salt);

		const boyprofilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlprofilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

		const newUser = new User({
			fullName,
			username,
			password: hashedPassword,
			gender,
			profilePic: gender === "male" ? boyprofilePic : girlprofilePic,
		});

		if (newUser) {
			generateTokenandSetCookies(newUser._id, res);
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				username: newUser.username,
				fullName: newUser.fullName,
				profilePic: newUser.profilePic,
			});
		} else {
			return res.status(400).json({ error: "Invalid User Data" });
		}
	} catch (error) {
		console.log("Error in signup controller: ", error.message);
		res.status(500).json({ error: "Internal server Error" });
	}
};

export const login = async (req, res) => {
	try {
		const { username, password } = req.body;

		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(
			password,
			user?.password || ""
		);

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password." });
		}

		generateTokenandSetCookies(user?._id, res);

		res.status(200).json({
			_id: user._id,
			username: user.username,
			fullName: user.fullName,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.log("Error in signup controller: ", error.message);
		res.status(500).json({ error: "Internal server Error" });
	}
};

export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: "0" });
		res.status(200).json({ message: "Logged Out Successfully" });
	} catch (error) {
		console.log("Error in logout controller: ", error.message);
		res.status(500).json({ error: "Internal server Error" });
	}
};
