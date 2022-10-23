let fs = require("fs");
let path = require("path");

// let types = require("./utility");

let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"],
    code: ['cpp', 'js', 'java', 'py']
}

function organiseFn(dirPath) {
    /**
     * 1. input --> directory path given
     * 
     * 2. create --> organise files --> directory (inside input path folder)
     * 
     * 3. check all files --> Identify category of all files present in that input directory
     * 
     * 4. copy/cut files to that organised directory inside of any of category folder
     */

    // 1. input --> directory path given

    if (dirPath == undefined) {
        dirPath = process.cwd();
        return;
    }

    let doesExist = fs.existsSync(dirPath);
    let destPath = path.join(dirPath, "organisedFiles");

    if (!doesExist) {
        console.log("Kindly enter the right path");
        return;
    }

    if (doesExist) {
        // 2. create --> organise files --> directory (inside input path folder)
        if (!fs.existsSync(destPath)) {
            fs.mkdirSync(destPath);
        }
    }

    organiseHelperFn(dirPath, destPath);
}

function organiseHelperFn(src, dest) {
    // 3. check all files --> Identify category of all files present in that input directory
    let childNames = fs.readdirSync(src);
    for (let i = 0; i < childNames.length; i++) {
        let childAddress = path.join(src, childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if (isFile) {
            // console.log(childNames[i]);
            // 4. copy/cut files to that organised directory inside of any of category folder
            let category = getCategory(childNames[i]);
            // console.log(childNames[i], " belongs to --> ", category, " category");
            sendFiles(childAddress, dest, category);
        }
    }
}

function sendFiles(src, dest, category) {
    let subFolder = path.join(dest, category);
    // console.log(src);
    if (!fs.existsSync(subFolder)) {
        fs.mkdirSync(subFolder);
    }

    let fileName = path.basename(src);
    let destFilePath = path.join(subFolder, fileName);
    fs.copyFileSync(src, destFilePath);
    fs.unlinkSync(src);
    console.log(fileName, " copied to ", category);
}

function getCategory(name) {
    let ext = path.extname(name);
    ext = ext.slice(1); // to remove .(dot)
    for (let type in types) {
        let cTypesArr = types[type];
        for (let i = 0; i < cTypesArr.length; i++) {
            if (ext == cTypesArr[i]) {
                return type;
            }
        }
    }

    return "others";
}


module.exports = {
    organiseKey: organiseFn
};