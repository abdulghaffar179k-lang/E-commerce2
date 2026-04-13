import { apiRequest } from "../apiServices";
import { configuration } from "../config";

export default async function Login(email, password) {

    try {

        const data = await apiRequest("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        },
        )

        // if (data && data.token) {
        //     localStorage.setItem("userToken", data.token);
        // }
        return data;
    }
    catch (error) {

        console.log("Login failed:", error.message);
        throw error;
    }
}'; '