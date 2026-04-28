import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

interface Conversation {
	_id: string;
	gender: string;
	profilePic: string;
	username: string;
	fullName: string;
}

interface UseGetConversationsReturn {
	// loading: boolean;
	conversations: Conversation[];
}

const SearchInput = () => {
	const [search, setSearch] = useState<string>("");
	const { setSelectedConversation } = useConversation();
	const { conversations }: UseGetConversationsReturn = useGetConversations();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!search) return;

		if (search.length < 3) {
			return toast.error("Search term must be atleast 3 characters long");
		}

		const conversation = conversations.find((c: Conversation) =>
			c.fullName.toLowerCase().includes(search.toLowerCase()),
		);

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else toast.error("No such user found!");
	};

	return (
		<form className='flex items-center gap-2' onSubmit={handleSubmit}>
			<input
				type='text'
				placeholder='Search...'
				className='rounded-full input input-bordered'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
				<IoSearchSharp className='w-6 h-6 outline-none' />
			</button>
		</form>
	);
};

export default SearchInput;
