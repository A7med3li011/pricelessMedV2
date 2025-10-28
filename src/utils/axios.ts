// import axios from "axios";
// // import { getServerSession } from "next-auth";
// // import { authOptions } from "./authOptions";
// import { cookies } from "next/headers";

// // Create axios instance
// const axiosInstance = axios.create({
//   baseURL: "https://pricelessmed.com/api",
//   timeout: 60000,
// });

// // Helper function to get current locale

// // Add a request interceptor
// axiosInstance.interceptors.request.use(
//   async (config) => {
//     if (config.url) {
//       const url = new URL(config.url, config.baseURL || "http://localhost");
//       url.searchParams.set("lang", locale);
//       config.url = url.pathname + url.search;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // Handle any response errors here
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

// // const getLocale = async (): Promise<string> => {
// //   try {
// //     const cookieStore = await cookies();
// //     const localeCookie = cookieStore.get("NEXT_LOCALE");
// //     return localeCookie?.value || "en";
// //   } catch {
// //     // Fallback to default if cookies are not available (client-side)
// //     if (typeof window !== "undefined") {
// //       return localStorage.getItem("locale") || "en";
// //     }
// //     return "en";
// //   }
// // };
