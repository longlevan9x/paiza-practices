const fs = require('fs');

const fileCount = 8;
for (let i = 1; i <= fileCount; i++) {
  const filePath = `samples/s${i}.txt`;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`\n ${filePath} \n`);
    data = data.replace(/\r\n/g, '\n');
    let lines = data.split('\n');
    findIsland(lines);
  });
}


function findIsland(lines) {

  const firstLine = lines[0];
  const firstLines = firstLine.split(' ');

  lines = lines.slice(1);

  const rowCount = parseInt(firstLines[0]);
  const colCount = parseInt(firstLines[1]);

  //convert string to array
  for (let i = 0; i < rowCount; i++) {
    lines[i] = lines[i].split('');
  }

  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  const visited = Array.from(Array(rowCount), () => Array(colCount).fill(false));

  const results = [];

  for (let rowI = 0; rowI < rowCount; rowI++) {
    for (let colI = 0; colI < colCount; colI++) {
      if (lines[rowI][colI] === '#' && !visited[rowI][colI]) {
        const [island, coastline] = dfs(rowI, colI);
        results.push([island, coastline]);
      }
    }
  }

  results.sort((a, b) => {
    if (a[0] === b[0]) {
      return b[1] - a[1];
    }
    return b[0] - a[0];
  });

  // console.log(results);
  results.forEach(result => {
    console.log(result[0], result[1]);
  });

  /**
   * 
   * @param {*} x == row 
   * @param {*} y == col
   */
  function dfs(x, y) {
    visited[x][y] = true;

    let island = 1;
    let coastline = getCoastLine(x, y);

    for (let [dx, dy] of directions) {
      let sx = x + dx;
      let sy = y + dy;

      if (sx < 0 || sx >= rowCount || sy < 0 || sy >= colCount) {
        continue;
      }

      if (visited[sx][sy] || lines[sx][sy] === '.') {
        continue;
      }

      const rs = dfs(sx, sy);
      island += rs[0];
      coastline += rs[1];
    }

    return [island, coastline];
  }

  function getCoastLine(x, y) {
    let coastLine = 0;
    for (let [dx, dy] of directions) {
      let sx = x + dx;
      let sy = y + dy;

      if ((sx >= 0 && sx < rowCount && sy >= 0 && sy < colCount) && lines[sx][sy] === '#') {
        continue;
      }

      coastLine++;
    }

    return coastLine;
  }
}