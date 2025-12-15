const http = require("http");
const createApp = require("./app");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 4000;

async function start() {
  const app = await createApp();

  const server = http.createServer(app);

  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("🟢 Client connected:", socket.id);

    socket.on("message", (msg) => {
      // Measure time for processing each message
      const start = Date.now();

      // Simulate some processing (example: heavy task)
      let processed = 0;
      for (let i = 0; i < 1_000_000; i++) processed += 1;

      const end = Date.now();

      console.log(
        `⏱️ Worker ${process.pid} processed message in ${end - start} ms`
      );

      // Emit to all clients
      io.emit("message", msg);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected:", socket.id);
    });
  });

  // Memory usage logging
  setInterval(() => {
    const used = process.memoryUsage();
    console.log(
      `🧠 Worker ${process.pid} Memory: ${(used.heapUsed / 1024 / 1024).toFixed(
        2
      )} MB`
    );
  }, 5000);

  server.listen(PORT, () => {
    console.log(`🚀 Worker ${process.pid} running on http://localhost:${PORT}`);
    console.log(`📡 GraphQL → http://localhost:${PORT}/graphql`);
  });
}

start();
