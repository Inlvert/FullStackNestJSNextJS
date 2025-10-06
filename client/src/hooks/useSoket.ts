import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export function useSocket() {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io("https://fullstacknestjsnextjs.onrender.com", {
      transports: ["websocket"],
    });

    socketRef.current.on("connect", () => {
      console.log("connected:", socketRef.current?.id);
    });

    socketRef.current.on("disconnected", () => {
      console.log("disconnected");
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return socketRef.current;
}
