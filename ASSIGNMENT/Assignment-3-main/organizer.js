const fs = require('fs');
const path = require('path');

const fileCategories = {
    Images: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'],
    Documents: ['.pdf', '.doc', '.docx', '.txt', '.xls', '.xlsx', '.ppt', '.pptx'],
    Videos: ['.mp4', '.mkv', '.avi', '.mov', '.wmv'],
    Audio: ['.mp3', '.wav', '.flac', '.aac'],
    Archives: ['.zip', '.rar', '.7z', '.tar', '.gz'],
    Code: ['.js', '.java', '.py', '.cpp', '.c', '.html', '.css', '.php']
};

function getCategory(fileExtension) {
    for (const category in fileCategories) {
        if (fileCategories[category].includes(fileExtension)) {
            return category;
        }
    }
    return 'Others'; 
}

function organizeDirectory(directoryPath) {
    try {
        if (!fs.existsSync(directoryPath)) {
            throw new Error('Directory does not exist.');
        }

        const files = fs.readdirSync(directoryPath);
        if (files.length === 0) {
            console.log('No files to organize.');
            return;
        }

        files.forEach(file => {
            const filePath = path.join(directoryPath, file);
            if (fs.lstatSync(filePath).isFile()) {
                const fileExtension = path.extname(file).toLowerCase();
                const category = getCategory(fileExtension);
                const categoryPath = path.join(directoryPath, category);
                
                if (!fs.existsSync(categoryPath)) {
                    fs.mkdirSync(categoryPath);
                }

                const newFilePath = path.join(categoryPath, file);
                fs.renameSync(filePath, newFilePath);
                console.log(`Moved: ${file} → ${category}/`);
            }
        });
        console.log('Directory organized successfully!');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

const directoryPath = process.argv[2];
if (!directoryPath) {
    console.error('Usage: node organizer.js <directory_path>');
    process.exit(1);
}

organizeDirectory(directoryPath);
