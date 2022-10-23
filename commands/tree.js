let fs = require("fs");
let path = require("path");

function treeFn(dirPath) {
    if (dirPath == undefined) {
        treeHelperFn(process.cwd(), "")
        return;
    }
    let doesExist = fs.existsSync(dirPath);
    let destPath = path.join(dirPath, "organisedFiles");

    if (!doesExist) {
        console.log("Kindly enter the right path");
        return;
    }

    if (doesExist) {
        treeHelperFn(dirPath, "");
    }
}

function treeHelperFn(src, indent) {
    let isFile = fs.lstatSync(src).isFile();
    if (isFile) {
        let fileName = path.basename(src);
        console.log(indent + "├── " + fileName);
    } else {
        let dirName = path.basename(src);
        console.log(indent + "└── " + dirName);
        let childrens = fs.readdirSync(src);
        for (let i = 0; i < childrens.length; i++) {
            let childPath = path.join(src, childrens[i]);
            treeHelperFn(childPath, indent + "\t");
        }
    }
}

module.exports = {
    treeKey: treeFn
};