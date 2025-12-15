const { fork } = require("child_process");

const child = fork(__dirname + "/someHeavyTask.js");
/* listens the messages and print in terminal */
child.on("message", (msg) => {
  console.log("📩 From child:", msg);
});
