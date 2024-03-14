// 1. Package
/* const { Server } = require("socket.io"); */

// 2. Import
const util = require('util');
const Express = require("express");
const http = require("http");
const { SocketAddress } = require('net');
const app = new Express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
});

// 4. Define a connection event handler
io.on("connection", (client) => {
    console.log(`A user connected with socket ID: ${client.id} ✅`);

    client.on("message", (message) => {
        console.log(`Received message: ${message}`);
        client.emit("message", `${message}`);
    });

    client.on("disconnect", () => {
        console.log("A user disconnected from socket ID: " + client.id + " ❌");
    });

    client.on("connect_error", (error) => {
        console.log(`Connection Error: ${error.message}`);
    });
});

// 5. Listen
server.listen(3001, () => {
    console.log("listening on *:3001");
});
