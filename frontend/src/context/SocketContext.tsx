import React, {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { useAuthContext } from "./AuthContext";

// define context value type
interface SocketContextType {
	socket: Socket | null;
	onlineUsers: string[]; // adjust if your user type is different
}

interface SocketContextInterface {
	children: ReactNode;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const useSocketContext = (): SocketContextType => {
	const context = useContext(SocketContext);
	if (!context) {
		throw new Error(
			"useSocketContext must be used within SocketContextProvider",
		);
	}
	return context;
};

export const SocketContextProvider: React.FC<SocketContextInterface> = ({
	children,
}) => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
	const { authUser } = useAuthContext();

	useEffect(() => {
		if (!authUser) return;
		//here pass backend URL
		const newSocket = io("http://localhost:4000", {
			query: {
				userId: authUser._id,
			},
		});

		setSocket(newSocket);
		//socket.on is used to listen to events can be used on both client and server side
		newSocket.on("getOnlineUsers", (users: string[]) => {
			setOnlineUsers(Array.isArray(users) ? users : []);
		});

		return () => {
			newSocket.close();
		};
	}, [authUser]);

	return (
		<SocketContext.Provider value={{ socket, onlineUsers }}>
			{children}
		</SocketContext.Provider>
	);
};
