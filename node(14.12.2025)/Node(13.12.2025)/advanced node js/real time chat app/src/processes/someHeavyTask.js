// someHeavyTask.js

console.log("🧠 Child process started");

// Simulate a heavy task (e.g., processing chat messages)
const start = Date.now();

let totalMessages = 0;

// Simulate processing 1 million messages
for (let i = 0; i < 1_000_000; i++) {
  totalMessages += 1;
}

const end = Date.now();

console.log("✅ Task finished");
console.log("Total messages processed:", totalMessages);
console.log("⏱️ Start time:", new Date(start).toLocaleTimeString("en-US", { hour12: false, fractionalSecondDigits: 3 }));
console.log("⏱️ End time:", new Date(end).toLocaleTimeString("en-US", { hour12: false, fractionalSecondDigits: 3 }));
console.log("⏱️ Duration:", end - start, "ms");

// Send result back to parent process
if (process.send) {
  process.send({
    totalMessages,
    duration: end - start,
  });
}

// Exit the child process
process.exit(0);
