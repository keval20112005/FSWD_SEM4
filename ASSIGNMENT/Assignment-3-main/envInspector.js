const fs = require("fs");
const os = require("os");
const path = require("path");

function getSystemInfo() {
    return {
        homeDirectory: os.homedir(),
        hostname: os.hostname(),
        networkInterfaces: os.networkInterfaces(),
        environmentVariables: process.env
    };
}

function saveEnvDetails(data) {
    try {

        const logsDir = path.join(__dirname, "logs");

        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir);
        }

        const filePath = path.join(logsDir, "env-details.json");

        const jsonData = JSON.stringify(data, null, 2);

        fs.writeFileSync(filePath, jsonData);

        console.log(` Environment details saved to: ${filePath}`);
    } catch (error) {
        console.error(" Error saving environment details:", error.message);
    }
}

function main() {
    console.log("🔍 Inspecting system environment...");
    const systemInfo = getSystemInfo();
    saveEnvDetails(systemInfo);
}

main();
