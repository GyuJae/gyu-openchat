import socketIOClient from "socket.io-client";

export const useSocket = () => {
  const socket = socketIOClient("http://localhost:4000");

  return socket;
};
