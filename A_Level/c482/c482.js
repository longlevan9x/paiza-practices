// const lines = initTest2();

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

const lines = [];
let lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('b482sample/testcase-1.txt')
});

lineReader.on('line', function (line) {
    lines.push(line);
});

lineReader.on('close', function () {

    // console.table(lines);
    console.log(hasRoad() ? "YES" : "NO");

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

        const foundDir = findExitRecursive(sIndex, foundIndexes, spaceLines, false, h, w);
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
    function findExitRecursive(currentIndex, foundIndexes, lines, found, h, w) {
        const exitDirs = findExitDirections(currentIndex, foundIndexes, lines, h, w);

        // console.log("currentIndex", currentIndex, "exitDirs", exitDirs);
        found = exitDirs.found;

        // dieu kien thoat de quy
        if (found) {
            return found;
        }

        for (const element of exitDirs.exitIndexDirs) {
            const exitDirIndex = element;
            if (found) {
                break;
            }

            found = findExitRecursive(exitDirIndex, foundIndexes, lines, found, h, w);
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
    function findExitDirections(currentIndex, foundIndexes, lines, h, w) {
        const exitIndexDirs = [];

        const hIndex = getHIndex(currentIndex);
        const wIndex = getWIndex(currentIndex);

        if (hIndex == 0 || wIndex == 0 || hIndex == h - 1 || wIndex == w - 1) {
            return { found: true, exitIndexDirs: [] };
        }

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
            const _hIndex = getHIndex(indexFourDirs[i]);
            const _wIndex = getWIndex(indexFourDirs[i]);

            const char = findExitDirection(lines, _hIndex, _wIndex);
            // console.log('char', i, char);
            const hasDir = isExitDirection(char);
            const _isFoundIndex = isFoundIndex(indexFourDirs[i], foundIndexes);
            // console.log("hasDir", hasDir, indexFourDirs[i]);
            if (hasDir && !_isFoundIndex) {
                exitIndexDirs.push(indexFourDirs[i]);
                foundIndexes.push(indexFourDirs[i]);
            }

            if (char === undefined) {
                found = true;
            }
        }

        return { exitIndexDirs: exitIndexDirs, found: found };
    }

    function isFoundIndex(currentIndex, foundIndexes) {
        let found = false;

        for (const element of foundIndexes) {
            const foundIndex = element;

            if (foundIndex[0] === currentIndex[0] && foundIndex[1] === currentIndex[1]) {
                found = true;
                break;
            }
        }

        return found;
    }

    function findExitDirection(lines, hIndex, wIndex) {
        const line = lines[hIndex];
        // console.log("line", hIndex, wIndex)
        // console.log("line", hIndex, wIndex, line);
        const char = line[wIndex];

        return char;
    }

    function isExitDirection(char) {
        return char === '.';
    }

    // function isEdgeIndex(currentIndex, index) {
    // }

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
});
