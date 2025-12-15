module.exports = {
  apps: [
    {
      name: "realtime-chat",
      script: "src/server.js",
      instances: "max",
      exec_mode: "cluster"
    }
  ]
};
