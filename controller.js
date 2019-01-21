
/*
  Execution point after DOM has loaded
*/
function main () {
  // config options
  let canvas = document.getElementById("canvas");
  let squareSize = 5;
  let colors = [
    "green",
    "blue",
    "red",
    "yellow",
    "orange"
  ];
  let interval = 500;

  // setup initial grid of color squares
  let grid = initGrid(canvas, squareSize, colors);
  draw(canvas, grid);

  // every interval, update all squares and re-draw
  setInterval(function () {
    updateGrid(grid, colors);
    draw(canvas, grid);
  }, interval);
};

/*
  Updates all squares in grid with random order using updateSquare()
  @param {DoubleArray} grid   rectangular grid of squares
  @param {Array}       colors all possible colors for a square
  @return null
*/
function updateGrid (grid, colors) {
  let numRows = grid.length;
  let numCols = grid[0].length;
  let squareIndexes = shuffle(range(0, numRows * numCols));
  squareIndexes.forEach(function (index) {
    let x = Math.floor(index / numCols);
    let y = Math.floor(index % numCols);
    updateSquare(grid, x, y, colors);
  });
};

/*
  Updates a single square color based on neighbor colors and some randomness
  @param {DoubleArray} grid   rectangular grid of squares
  @param {Int}         x      row index of square in grid
  @param {Int}         y      column index of square in grid
  @param {Array}       colors all possible colors for a square
  @return null
*/
function updateSquare (grid, x, y, colors) {
  let threshold = 3;
  let adjacent = neighborColors(grid, x, y);
  let replacements = [];
  if (randomChance(1, 1000)) {
    replacements.push(randomElement(colors));
  } else {
    for (let color in adjacent) {
      let colorCount = adjacent[color];
      if (colorCount === threshold) {
        replacements.push(color);
      }
      else if (colorCount > threshold) {
        replacements = [color];
        threshold = colorCount;
      }
    }
  }
  if (replacements.length > 0) {
    grid[x][y].color = randomElement(replacements);
  }
};

/*
  Initializes grid of squares based on canvas size with random colors
  @param {Canvas}       canvas HTML canvas element stretched to entire page
  @param {Int}          size of square width and height
  @param {Array}        colors all possible colors for a square
  @return {DoubleArray} rectangular grid of squares
*/
function initGrid (canvas, squareSize, colors) {
  let grid = [];
  let columns = Math.floor(canvas.width / squareSize);
  let rows = Math.floor(canvas.height / squareSize);
  for (let x = 0; x < rows; x++) {
    grid[x] = [];
    for (let y = 0; y < columns; y++) {
      grid[x][y] = {
        "color": randomElement(colors),
        "size": squareSize
      };
    }
  }
  return grid;
};

/*
  Given grid of squares, paint them on to the canvas
  @param {Canvas}      canvas HTML canvas element to paint on
  @param {DoubleArray} grid   rectangular grid of squares
  @return null
*/
function draw (canvas, grid) {
  let c = canvas.getContext("2d");
  let xPointer = 0;
  let yPointer = 0;
  let size = grid[0][0].size;
  for (let x = 0; x < grid.length; x++) {
    xPointer = 0;
    for (let y = 0; y < grid[x].length; y++) {
      let s = grid[x][y];
      c.fillStyle = s.color;
      c.fillRect(xPointer, yPointer, size, size);
      xPointer += size;
    }
    yPointer += size;
  }
  c.stroke();
};

/*
  Number of each color in adjacent neigbors in grid along with total adjacent
  @param {DoubleArray} grid   rectangular grid of squares
  @param {Int}         x      row index of square in grid
  @param {Int}         y      column index of square in grid
  @return {Object}     key of colors with occurance value as int and "total"
*/
function neighborColors (grid, x, y) {
  let colors = {};
  neighbors(grid, x, y).forEach(function (square) {
    if (!(square.color in colors)) {
      colors[square.color] = 0;
    }
    colors[square.color] += 1;
  });
  return colors;
};

/*
  Generate list of all squares adjacent to single square in grid
  @param {DoubleArray} grid   rectangular grid of squares
  @param {Int}         x      row index of square in grid
  @return {Array}      list of squares adjacent to one
*/
function neighbors (grid, x, y) {
  let results = [];
  let numRows = grid.length;
  let numCols = grid[0].length;
  for (let xOffset = -1; xOffset <= 1; xOffset++) {
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      if (xOffset !== 0 || yOffset !== 0) {
        let xCoord = x + xOffset;
        let yCoord = y + yOffset;
        if (xCoord > -1 && xCoord < numRows && yCoord > -1 && yCoord < numCols) {
          results.push(grid[xCoord][yCoord]);
        }
      }
    }
  }
  return results;
};

/*
  Randomly change order of list
  @param {Array} list of things to re-order
  @return {Array} shuffled list
*/
function shuffle (list) {
  let newList = [];
  while (list.length > 0) {
    newList.push(list.splice(Math.random() * list.length, 1)[0]);
  }
  return newList;
};

/*
  Generate list of integers between two values
  @param {Int} start append to range starting with this value (inclusive)
  @param {Int} end   stop appending to range at this value (non-inclusive)
*/
function range (start, end) {
  let list = [];
  for (var i = start; i < end; i++) {
    list.push(i);
  }
  return list;
};

/*
  Given a chance, randomly decide if something should happen
  @param {Int}     percent possibility of occurance
  @param {Int}     total all possible range out outcomes
  @param {Boolean} if the possible chance has random occured
*/
function randomChance (percent, total) {
  return Math.random() * total <= percent;
};

/*
  Chose a random element from a list
  @param {Array} list of elements to select from
  @param {Any}   element which was selected
*/
function randomElement (array) {
  return array[Math.floor(Math.random() * array.length)];
};

/*
  Initialize the application after DOM has loaded since we need to
  bind with the canvas element on the page
*/
document.addEventListener("DOMContentLoaded", function (event) {
  main();
});
