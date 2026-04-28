import React, { createContext, useState, ReactNode, useContext } from "react";

interface AuthUser {
	_id?: string;
	username?: string;
	fullName?: string;
	profilePic?: string;
}

// Define the type for the context value
interface AuthContextType {
	authUser: AuthUser | null;
	setAuthUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
}

// Create a context with a default value of undefined
export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);

interface AuthContextProviderProps {
	children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
	children,
}) => {
	// Initialize authUser from localStorage or default to null
	const [authUser, setAuthUser] = useState<AuthUser | null>(
		JSON.parse(localStorage.getItem("chat-user") || "null")
	);

	return (
		<AuthContext.Provider value={{ authUser, setAuthUser }}>
			{children}
		</AuthContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error(
			"useAuthContext must be used within an AuthContextProvider"
		);
	}
	return context;
};
