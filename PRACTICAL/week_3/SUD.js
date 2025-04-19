const os = require("os");
const fs = require("fs");
const path = require("path");

// Function to get system information
function getSystemInfo() {
  return {
    "OS Type": os.type(),
    "OS Platform": os.platform(),
    "OS Release": os.release(),
    "CPU Architecture": os.arch(),
    "CPU Cores": os.cpus().length,
    "Total Memory (GB)": (os.totalmem() / (1024 ** 3)).toFixed(2),
    "Free Memory (GB)": (os.freemem() / (1024 ** 3)).toFixed(2),
    "Uptime (Minutes)": (os.uptime() / 60).toFixed(2),
    "Log Time": new Date().toISOString()
  };
}

// Function to save system information to a log file
function saveSystemInfoToFile(info) {
  const logDir = path.join(__dirname, "logs");
  const logFile = path.join(logDir, "system-info.txt");

  // Ensure the directory exists
  fs.mkdirSync(logDir, { recursive: true });

  // Format the information
  const logData = `--- System Information Log ---
${Object.entries(info).map(([key, value]) => `${key}: ${value}`).join("\n")}

`;

  // Append the information to the file
  fs.appendFileSync(logFile, logData, "utf8");

  console.log(`System information saved to ${logFile}`);
}

// Main function
function main() {
  console.log("\n--- System Information ---");
  const systemInfo = getSystemInfo();

  // Display the information
  Object.entries(systemInfo).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
  });

  // Save to log file
  saveSystemInfoToFile(systemInfo);
}

// Run the program
main();
