import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

interface Message {
	_id: string;
	senderId: string;
	receiverId: string;
	message: string;
	shouldShake: boolean;
	createdAt: string;
}

interface MessageProps {
	message: Message;
}

const Message: React.FC<MessageProps> = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser?._id;
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe
		? authUser.profilePic
		: selectedConversation?.profilePic;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";
	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img src={profilePic} alt='user avatar' loading='lazy' />
				</div>
			</div>
			<div
				className={`chat-bubble text-white ${bubbleBgColor}${shakeClass} pb-2`}
			>
				{message.message}
			</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
				{extractTime(message.createdAt)}
			</div>
		</div>
	);
};

export default Message;
