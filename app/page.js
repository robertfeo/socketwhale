"use client"
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";

export default function Home() {

    const [chatMessage, setChatMessage] = useState("");

    const socket = io("http://localhost:3001", {
        autoConnect: false,
    });

    useEffect(() => {
        if (!socket.connected) {
            toast("Not connected to the server", {
                icon: '❌',
            });
        }
    }, [socket]);

    socket.on("message", (message) => {
        console.log(`Message from the client: ${message}`);
    });

    socket.on("disconnect", () => {
        toast.success("Disconnected from client", {
            icon: '⚡',
        });
    });

    const handleConnect = () => {
        if (socket.connected) {
            toast("Already connected", {
                icon: 'ℹ️',
            });
            return;
        }

        socket.connect();

        const connectTimeout = setTimeout(() => {
            if (!socket.connected) {
                toast.error("Failed to connect to the server, please try again", {
                    icon: '❌',
                });
            }
        }, 5000); // waits 5 seconds to check the connection status

        socket.on("connect", () => {
            clearTimeout(connectTimeout);
            toast.success("Connection is ready", {
                icon: '✅',
            });
        });

        socket.on("connect_error", (error) => {
            clearTimeout(connectTimeout);
            toast.error("Connection Error: " + error.message, {
                icon: '❌',
            });
        });
    };

    const handleDisconnect = () => {
        if (!socket.connected) {
            toast("Already disconnected", {
                icon: 'ℹ️',
            });
            return;
        }
        socket.disconnect();
    }

    const handleSubmit = () => {
        if (chatMessage === "") {
            toast.error("Please enter a message");
            return;
        };

        socket.emit("message", chatMessage);
    }

    return (
        <>
            <div className="flex flex-col items-center m-10 min-h-svh">
                <h1 className="text-pretty text-zinc-600 text-lg">Welcome to Socket.io Demo</h1>
                <div className="flex flex-row gap-2">
                    <button onClick={handleConnect} className="w-300 h-25 bg-slate-300 rounded-lg p-2 m-5">
                        Connect
                    </button>
                    <button onClick={handleDisconnect} className="w-300 h-25 bg-slate-300 rounded-lg p-2 m-5">
                        Disconnect
                    </button>
                </div>
                <div className="flex flex-col gap-2 mt-20">
                    <input onChange={(e) => setChatMessage(e.target.value)} type="text" className="w-400 h-200 bg-slate-100 border" />
                    <button onClick={handleSubmit} className="w-400 h-25 bg-slate-300 rounded-lg p-2 m-5">
                        Send
                    </button>
                </div>
            </div>
        </>
    );
}
