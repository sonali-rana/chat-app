import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
	{
		senderId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User", // Sender id will be User id
			required: true,
		},
		receiverId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true } //mongo will automatically create UpdatedAt and CreatedAt => message.createdAt:15:30
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
