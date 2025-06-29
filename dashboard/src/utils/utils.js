// import { io } from "socket.io-client";

// export const socket = io("http://localhost:4000", {
//   withCredentials: true,
// });



import { io } from "socket.io-client";

// Use environment variable instead of hardcoded URL
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const socket = io(backendUrl, {
  withCredentials: true,
});
