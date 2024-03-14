// 1. Package
import { http } from "http";
import { Server } from "socket.io";

// 2. Import
const app = new Express();
const server = http.createServer(app);
const io = new Server(server);



// 4. Define a connection event handler


// 5. Listen
server.listen(3000, () => {
    console.log("listening on *:3000");
});
