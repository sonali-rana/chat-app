import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { selectedConversation, messages, setMessages } = useConversation();

	const sendMessage = async (message: string) => {
		try {
			setLoading(true);

			const res = await fetch(
				`/api/messages/send/${selectedConversation?._id}`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ message }),
				}
			);

			const resData = await res.json();

			if (resData.error) {
				throw new Error(resData.error);
			}

			setMessages([...messages, resData]);
		} catch (error: unknown) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("An unexpected error occurred.");
			}
		} finally {
			setLoading(false);
		}
	};

	return { loading, sendMessage };
};

export default useSendMessage;
