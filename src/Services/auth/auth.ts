// import { apiRequest } from "../apiServices";

// interface AuthResponse {
//     token?: string;
//     // agar aur fields bhi aati hain API se, yahan add kar sakte ho
//     [key: string]: any;
// }

// export default async function auth(
//     name: string,
//     email: string,
//     password: string
// ): Promise<AuthResponse> {
//     try {
//         const data: AuthResponse = await apiRequest("/signUp", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ name, email, password }),
//         });
//         return data;
//     } catch (error: any) {
//         console.log("Sign Up failed:", error.message);
//         throw error;
//     }
// }

import { apiRequest } from "../apiServices";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}

export default async function auth(
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  try {
    const data = await apiRequest<AuthResponse>("/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    // agar backend ne token nahi diya to error throw karo
    if (!data?.token) {
      throw new Error(data?.message || "Signup failed");
    }

    return data;

  } catch (error: any) {
    console.log("Sign Up failed:", error.message);

    // error ko proper message ke sath throw karo
    throw new Error(error.message || "Something went wrong");
  }
}