import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

interface LoginData {
	username: string;
	password: string;
}

const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const login = async (data: LoginData) => {
		const success = handleInputErrors(data);

		if (!success) return;

		try {
			setLoading(true);

			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			const resData = await res.json();

			if (resData.error) {
				throw new Error(resData.error);
			}

			localStorage.setItem("chat-user", JSON.stringify(resData));

			setAuthUser(resData);
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
	return { loading, login };
};

export default useLogin;

function handleInputErrors(data: LoginData) {
	const { username, password } = data;

	if (!username || !password) {
		toast.error("Please fill all the fields.");
		return false;
	}

	return true;
}
