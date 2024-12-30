import { useEffect } from "react";
import { io } from "socket.io-client";
import { useLogin } from "../contexts/LoginContext";

const socket = io("http://127.0.0.1:5000/user", {
  transports: ["websocket", "polling"],
  autoConnect: false, // Prevent auto-connect by default
});

export const connectSocket = (user_id) => {
  console.log("Attempting to connect with user id:", user_id);

  // Update the query parameter dynamically
  socket.io.opts.query = { user_id };

  if (socket.connected && socket.io.opts.query.user_id === user_id) {
    console.log("Socket already connected with the same user_id.");
    return;
  }

  if (socket.connected) {
    console.log("Disconnecting socket before reconnecting...");
    socket.disconnect();
  }

  socket.connect();
};

export const disconnectSocket = () => {
  if (socket.connected) {
    console.log("Disconnecting socket...");
    socket.off();
    socket.disconnect();
    console.log("Socket disconnected.");
  }
};

socket.on("connect", () => {
  console.log("Connected to the Socket.IO server!");
});

socket.on("cases_update", (data) => {
  console.log("Case updated:", data);
  if (data && data.cases) {
    // Update localStorage
    const currentCases = JSON.parse(localStorage.getItem("cases")) || [];
    const updatedCases = currentCases.map((caseItem) =>
      caseItem.caseid === data.cases.caseid ? data.cases : caseItem
    );

    // Add new case if it doesn't exist
    if (!currentCases.some((caseItem) => caseItem.caseid === data.cases.caseid)) {
      updatedCases.push(data.cases);
    }

    localStorage.setItem("cases", JSON.stringify(updatedCases));

    // Dispatch a custom event to notify listeners
    const event = new Event("casesUpdated");
    window.dispatchEvent(event);
  } else {
    console.error("Invalid data received:", data);
  }
});


socket.on("connected", (data) => {
  console.log("Server message:", data.message);
});

socket.on("disconnect", () => {
  console.log("Disconnected from the server.");
});

socket.on("connect_error", (err) => {
  console.error("Connection error:", err);
});

export const useSocket = () => {
  const { isLoggedIn, user } = useLogin();

  useEffect(() => {
    if (isLoggedIn && user?.id) {
      console.log("User logged in, connecting socket...");
      connectSocket(user.id);
    } else {
      console.log("User logged out, disconnecting socket...");
      disconnectSocket();
    }

    return () => {
      disconnectSocket();
    };
  }, [isLoggedIn, user]);
};

export default socket;
