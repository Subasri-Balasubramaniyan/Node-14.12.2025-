setInterval(() => {
  const used = process.memoryUsage();
  console.log("🧠 Memory:", used.heapUsed / 1024 / 1024, "MB");
}, 5000);
