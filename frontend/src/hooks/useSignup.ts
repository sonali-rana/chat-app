import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext.tsx";

interface SignupData {
	fullName: string;
	username: string;
	password: string;
	confirmPassword: string;
	gender: string;
}

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const signup = async (data: SignupData) => {
		const success = handleInputErrors(data);

		if (!success) return;

		try {
			setLoading(true);

			const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			const resData = await res.json();

			if (resData.error) {
				throw new Error(resData.error);
			}

			localStorage.setItem("chat-user", JSON.stringify(resData));

			setAuthUser(resData); //get Logged in on page refresh
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

	return { loading, signup };
};

export default useSignup;

function handleInputErrors(data: SignupData) {
	const { fullName, username, password, confirmPassword, gender } = data;

	if (!fullName || !username || !password || !confirmPassword || !gender) {
		toast.error("Please fill all the fields.");
		return false;
	}
	if (password !== confirmPassword) {
		toast.error("Passwords do not match.");
		return false;
	}
	if (password.length < 6) {
		toast.error("Passwords must be less than 6 characters.");
		return false;
	}

	return true;
}
