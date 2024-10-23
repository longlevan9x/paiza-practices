const lines = initTest2();

function initTest1() {
    const _lines = [];
    _lines.push("7 6");
    _lines.push("######");
    _lines.push(".....#");
    _lines.push("####.#");
    _lines.push("#.S#.#");
    _lines.push("#.##.#");
    _lines.push("#....#");
    _lines.push("######");

    return _lines;
}

function initTest2() {
    const _lines = [];
    _lines.push("7 6");
    _lines.push("......");
    _lines.push("......");
    _lines.push(".####.");
    _lines.push("#..S.#");
    _lines.push("#....#");
    _lines.push(".####.");
    _lines.push("......");

    return _lines;
}

function initTest3() {
    const _lines = [];
    _lines.push("7 6");
    _lines.push("######");
    _lines.push("#....#");
    _lines.push("#.##.#");
    _lines.push("#.#S.#");
    _lines.push("#.####");
    _lines.push("#.....");
    _lines.push("######");

    return _lines;
}

// console.table(lines);
console.log(hasRoad() ?  "YES" : "NO");

function hasRoad() {
    const strLine1 = lines[0];
    const line1s = strLine1.split(" ");
    const h = getHIndex(line1s);
    const w = getWIndex(line1s);
    const spaceLines = [...lines];
    spaceLines.shift();


    if (w < 1 || h < 1 || w > 100 || h > 100) {
        return false;
    }

    const sIndex = getSIndex(spaceLines, h, w);
    // console.log("find sIndex", sIndex);

    const foundIndexes = [];

    const foundDir = findExitRecursive(sIndex, foundIndexes, spaceLines, false);
    // console.log("foundDir", foundDir);
    return foundDir;
}

/**
 * 
 * @param {*} currentIndex 
 * @param {*} foundIndexes 
 * @param {*} lines 
 * @param {*} found 
 * @returns 
 */
function findExitRecursive(currentIndex, foundIndexes, lines, found) {
    const exitDirs = findExitDirections(currentIndex, foundIndexes, lines);

    // console.log("currentIndex", currentIndex, "exitDirs", exitDirs);
    found = exitDirs.found;

    // dieu kien thoat de quy
    if(found) {
        return found;
    }


    for (let i = 0; i < exitDirs.exitIndexDirs.length; i++) {
        const exitDirIndex = exitDirs.exitIndexDirs[i];
        found = findExitRecursive(exitDirIndex, foundIndexes, lines, found);
    }

    return found;
}

/**
 * 
 * @param {*} lines 
 * @param {*} h 
 * @param {*} w 
 * @returns number[]
 * Index 0 = h
 * Index 1 = w
 */
function getSIndex(lines, h, w) {
    const sIndex = [];
    let foundS = false;

    for (let i = 0; i < h; i++) {
        if (foundS) {
            break;
        }

        const strLine = lines[i];
        for (let j = 0; j < w; j++) {
            if (foundS) {
                break;
            }

            const sChar = strLine[j];
            if (sChar === "S") {
                sIndex.push(i, j);
                foundS = true;
            }
        }
    }

    return sIndex;
}

/**
 * 
 * @param {*} currentIndex 
 * @param {*} lines 
 * @param {*} h 
 * @param {*} w 
 * @returns {}
 */
function findExitDirections(currentIndex, foundIndexes, lines) {
    const exitIndexDirs = [];

    const hIndex = getHIndex(currentIndex);
    const wIndex = getWIndex(currentIndex);

    /**
     * right, left, top, bottom
     */
    const indexFourDirs = [
        [hIndex, wIndex + 1],
        [hIndex, wIndex - 1],
        [hIndex - 1, wIndex],
        [hIndex + 1, wIndex]
    ];

    let found = false;

    for (let i = 0; i < 4; i++) {
        const char = findExitDirection(lines, indexFourDirs[i][0], indexFourDirs[i][1]);
        // console.log('char', i, char);
        const hasDir = isExitDirection(char);
        const _isFoundIndex = isFoundIndex(indexFourDirs[i], foundIndexes);
        // console.log("hasDir", hasDir, indexFourDirs[i]);
        if (hasDir && !_isFoundIndex) {
            exitIndexDirs.push(indexFourDirs[i]);
            foundIndexes.push(indexFourDirs[i]);
        }

        if(char === undefined) {
            found = true;
        }
    }

    return { exitIndexDirs: exitIndexDirs, found: found };
}

function isFoundIndex(currentIndex, foundIndexes) {
    let found = false;

    for (let i = 0; i < foundIndexes.length; i++) {
        const foundIndex = foundIndexes[i];

        if (foundIndex[0] === currentIndex[0] && foundIndex[1] === currentIndex[1]) {
            found = true;
            break;
        }
    }

    return found;
}

function findExitDirection(lines, hIndex, wIndex) {
    const line = lines[hIndex];
    // console.log("line", hIndex, wIndex, line);
    const char = line[wIndex];

    return char;
}

function isExitDirection(char) {
    return char === '.';
}

function isEdgeIndex(currentIndex, index,) {

}

// function findStartDirection(exitDirs, lines, currentIndex) {
//     if(exitDirs.length === 1) {
//         return exitDirs[0];
//     }

//     for (let i = 0; i < exitDirs.length; i++) {
//         const exitDirIndex = exitDirs[i];
//         const hIndex = getHIndex(exitDirIndex);
//         const wIndex = getWIndex(exitDirIndex);

//         const hIndexCur = getHIndex(currentIndex);
//         const wIndexCur = getWIndex(currentIndex);

//         if (hIndexCur === hIndex) {
//             const line = lines[hIndex];

//             if (wIndex < wIndexCur) {
//                 const dotCount = "".
//             }
//         }


//     }
// }

/**
 * 
 * @param {*} arrs 
 * @returns number
 */
function getHIndex(arrs) {
    return arrs[0];
}

/**
 * 
 * @param {*} arrs 
 * @returns number
 */
function getWIndex(arrs) {
    return arrs[1];
}
