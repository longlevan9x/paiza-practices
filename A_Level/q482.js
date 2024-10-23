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

console.table(lines);
console.log(hasRoad() ? "NO" : "YES");

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
    console.log("find sIndex", sIndex);
    const exitDirs = findExitDirections(sIndex, spaceLines, h, w)

    // console.log('exitDirs', exitDirs);
    for (let i = 0; i < exitDirs.length; i++) {
        const exitDirIndex = exitDirs[i];

    }

    let finding = true;
    while (finding) {


        finding = false;
    }
}

function findExitRecursive(currentIndex, lines, h, w) {
    const exitDirs = findExitDirections(currentIndex, lines, h, w);
    
    // dieu kien thoat de quy
    if (exitDirs.length === 0) {
        return;
    }

    for (let i = 0; i < exitDirs.length; i++) {
        const exitDirIndex = exitDirs[i];
        findExitRecursive(exitDirIndex, lines, h, w);
    }
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
 * @returns number[][]
 */
function findExitDirections(currentIndex, lines, h, w) {
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

    for (let i = 0; i < 4; i++) {
        const char = findExitDirection(lines, indexFourDirs[i][0], indexFourDirs[i][1]);
        // console.log('char', i, char);
        const hasDir = isExitDirection(char);
        // console.log("hasDir", hasDir, indexFourDirs[i]);
        if (hasDir) {
            exitIndexDirs.push(indexFourDirs[i]);
        }
    }

    return exitIndexDirs;
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

function findExitAround() {

}
