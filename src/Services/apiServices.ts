// export const apiRequest = async <T = any>(
//     url: string,
//     params: RequestInit = {}
// ): Promise<T> => {

//     try {
//         const response = await fetch(`http://localhost:3000/api${url}`, params);

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data: T = await response.json();
//         return data;
//     } catch (error) {
//         console.log("Error fetching data:", error);
//         throw error;
//     }
// };

export const apiRequest = async <T = any>(
  url: string,
  params: RequestInit = {}
): Promise<T> => {
  try {
    const response = await fetch(`http://localhost:3000/api${url}`, {
      ...params,
      headers: {
        "Content-Type": "application/json",
        ...(params.headers || {}),
      },
    });

    // response parse karo (error ho ya success dono case mein)
    const data = await response.json().catch(() => null);
console.log(data);

    // agar response ok nahi hai to proper error throw karo
    if (!response.ok) {
      throw new Error(
        data?.message || `Request failed with status ${response.status}`
      );
    }

    return data as T;

  } catch (error: any) {
    console.log("API Error:", error.message);

    // network error ya custom error handle
    throw new Error(error.message || "Network error");
  }
};