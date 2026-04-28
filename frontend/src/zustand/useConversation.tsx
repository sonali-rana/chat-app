import { create } from "zustand";

interface Conversation {
	_id: string;
	gender: string;
	profilePic: string;
	username: string;
	fullName: string;
}

export interface Message {
	_id: string;
	senderId: string;
	receiverId: string;
	message: string;
	shouldShake: boolean;
	createdAt: string;
}

interface ConversationState {
	selectedConversation: Conversation | null;
	setSelectedConversation: (conversation: Conversation | null) => void;
	messages: Message[];
	setMessages: (messages: Message[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
	selectedConversation: null,
	setSelectedConversation: (selectedConversation) =>
		set({ selectedConversation }),
	messages: [],
	setMessages: (messages) => set({ messages }),
}));

export default useConversation;
