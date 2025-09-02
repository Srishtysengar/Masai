const os = require("os");

function formatBytes(bytes) {
  return `${(bytes / (1024 ** 3)).toFixed(2)} GB`; 
}

function formatMB(bytes) {
  return `${(bytes / (1024 ** 2)).toFixed(2)} MB`; 
}

function getSystemInfo() {
  const cpus = os.cpus();
  const heapUsed = process.memoryUsage().heapUsed;
  const heapTotal = process.memoryUsage().heapTotal;

  console.log("System Information:");
  console.log("-------------------------");
  console.log(`Architecture: ${os.arch()}`);
  console.log(`CPU Cores: ${cpus.length}`);
  console.log(`CPU Model: ${cpus[0].model}`);
  console.log(`CPU Speed: ${(cpus[0].speed / 1000).toFixed(2)} GHz`);
  console.log(`Total Memory: ${formatBytes(os.totalmem())}`);
  console.log(`Free Memory: ${formatBytes(os.freemem())}`);
  console.log(`Heap Memory Used: ${formatMB(heapUsed)}`);
  console.log(`Heap Memory Total: ${formatMB(heapTotal)}`);
  console.log(`Hostname: ${os.hostname()}`);
  console.log(`OS Type: ${os.type()}`);
}

module.exports = { getSystemInfo };
