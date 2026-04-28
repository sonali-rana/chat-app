import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const logout = async () => {
		try {
			setLoading(true);

			const res = await fetch("/api/auth/logout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});

			const resData = await res.json();

			if (resData.error) {
				throw new Error(resData.error);
			}

			localStorage.removeItem("chat-user");

			setAuthUser(null);
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

	return { loading, logout };
};

export default useLogout;
