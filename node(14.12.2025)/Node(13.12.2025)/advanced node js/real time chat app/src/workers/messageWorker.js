const { parentPort, workerData } = require("worker_threads");

const processedMessage = {
  text: workerData,
  timestamp: Date.now()
};

parentPort.postMessage(processedMessage);
