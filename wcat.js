#!/usr/bin/env node

let fs = require("fs");

// input

// node js -s -n f1.txt f2.txt

let inputArr = process.argv.slice(2);
// console.log(inputArr); 
// [ '-s', '-n', 'f1.txt', 'f2.txt' ]

/**
 * input with a dash are options
 * eg.
 * -s, -n
 */

// option

let filesArr = [];
let optionsArr = [];

for (let i = 0; i < inputArr.length; i++) {
    let val = inputArr[i];
    if (val.charAt(0) === '-') {
        optionsArr.push(val);
    } else {
        filesArr.push(val);
    }
}

// exception check --> edge case of problem statement

if (optionsArr.includes("-b") && optionsArr.includes("-n")) {
    console.log("Either enter -n or -b");
    return;
}

for (let i = 0; i < filesArr.length; i++) {
    if (!fs.existsSync(filesArr[i])) {
        console.log(`file ${filesArr[i]} is not present`);
        return;
    }
}

// console.log(filesArr);
// ['-s', '-n']

// console.log(outputsArr);
// ['f1.txt', 'f2.txt' 'f3.txt']

// ``````````````````````````````````````````````````````````//

/**
 * commands
 * --------------------------
 * 1. wcat <filePath>
 * 2. wcat <filepath1> <filepath2> <filepath3>
 */

let content = "";
for (let i = 0; i < filesArr.length; i++) {
    let fileContent = fs.readFileSync(filesArr[i], 'utf-8');
    content += fileContent + "\r\n";
}


// -s
let contentArr = content.split("\r\n");

let isSpresent = optionsArr.includes("-s")
if (isSpresent) {
    contentArr = removeSpace(contentArr);
}


// -n
let isNpresent = optionsArr.includes("-n");
if (isNpresent) {
    for (let i = 0; i < contentArr.length; i++) {
        contentArr[i] = ` ${i + 1} ${contentArr[i]}`;
    }
}

// -b
let isBpresent = optionsArr.includes("-b");
if (isBpresent) {
    let count = 0;
    for (let i = 0; i < contentArr.length; i++) {
        if (contentArr[i] != "") {
            count++;
            contentArr[i] = ` ${count} ${contentArr[i]}`;
        }
    }
}

console.log(contentArr.join("\n"));


// function to remove space of contents of file [-s]
function removeSpace(contentArr) {
    for (let i = 1; i < contentArr.length; i++) {
        if (contentArr[i] == "" && contentArr[i - 1] == "") {
            contentArr[i] = null
        } else if (contentArr[i] == "" && contentArr[i - 1] == null) {
            contentArr[i] = null;
        }
    }
    let tempArr = [];
    for (let val of contentArr) {
        if (val != null) {
            tempArr.push(val);
        }
    }
    return tempArr;
}



