const fs = require("fs");
const path = require("path");
const archiver = require("archiver"); 

function copyFiles(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    let files;
    try {
        files = fs.readdirSync(src);
    } catch (err) {
        console.error(`Skipping: ${src} (Permission Denied)`);
        return; 
    }

    files.forEach(file => {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);

        try {
            if (fs.statSync(srcPath).isDirectory()) {
                copyFiles(srcPath, destPath);
            } else {
                fs.copyFileSync(srcPath, destPath);
                logBackup(file, srcPath, destPath);
            }
        } catch (err) {
            console.error(`Skipping: ${srcPath} (Permission Denied)`);
        }
    });
}

function logBackup(file, srcPath, destPath) {
    const stats = fs.statSync(srcPath);
    const logEntry = `${new Date().toISOString()} - Copied: ${file} | Size: ${stats.size} bytes\n`;

    fs.appendFileSync("backup-log.txt", logEntry);
}

function zipBackup(backupFolder) {
    const output = fs.createWriteStream(`${backupFolder}.zip`);
    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.pipe(output);
    archive.directory(backupFolder, false);
    archive.finalize();

    console.log(`Backup folder compressed to ${backupFolder}.zip`);
}

function main() {
    const args = process.argv.slice(2);
    if (args.length < 1) {
        console.log("Usage: node backup.js <source_folder> [--zip]");
        return;
    }

    const sourceFolder = args[0];
    const backupFolder = "backup";

    if (!fs.existsSync(sourceFolder)) {
        console.error("Error: Source folder does not exist.");
        return;
    }

    console.log("Backing up files...");
    copyFiles(sourceFolder, backupFolder);
    console.log("Backup completed successfully!");

    if (args.includes("--zip")) {
        zipBackup(backupFolder);
    }
}

main();
