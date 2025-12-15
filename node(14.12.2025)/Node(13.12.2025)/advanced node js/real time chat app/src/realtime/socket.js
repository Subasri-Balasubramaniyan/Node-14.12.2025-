const http = require("http");
const createApp = require("./app");
const { Server } = require("socket.io");

async function startServer() {
  const app = await createApp();

  const server = http.createServer(app);

  // 🔴 Socket.IO server
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);

    socket.on("message", (msg) => {
      console.log("📩 Message:", msg);

      // send to ALL clients
      io.emit("message", msg);
    });

    socket.on("disconnect", () => {
      console.log("🔴 User disconnected:", socket.id);
    });
  });

  server.listen(4000, () => {
    console.log("🚀 Server running on http://localhost:4000");
    console.log("📡 GraphQL → http://localhost:4000/graphql");
  });
}

startServer();
