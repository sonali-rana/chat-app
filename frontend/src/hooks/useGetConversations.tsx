import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Conversation {
	_id: string;
	gender: string;
	profilePic: string;
	username: string;
	fullName: string;
}

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState<Conversation[]>([]);

	useEffect(() => {
		const getConversations = async () => {
			try {
				setLoading(true);

				const res = await fetch("/api/users");

				const data = await res.json();

				if (data.error) {
					throw new Error(data.error);
				}

				setConversations(data);
			} catch (error: unknown) {
				if (error instanceof Error) {
					toast.error(error.message);
				}
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};

export default useGetConversations;
