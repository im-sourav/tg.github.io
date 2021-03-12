const cvs = document.getElementById("canvas");
const cvs2 = document.getElementById("canvas2");
const reStart = document.getElementById("Button");
const Score = document.querySelector(".SCORE");
const ctx = cvs.getContext("2d");
const ctx2 = cvs2.getContext("2d");
const row = 20;
const col = 10;
const rowCol = 40;
const sq = 50;
let score = 0;
let time = 0;

let presentNumber = -1;
let nextNumber = 0;

let presentColor = -1;
let nextColor = 0;

const bg = "#0f0f0f"; // for background color
const bdr = "#0a0a0a"; // for border color

// Draw a Square
function drawSquare(x, y, color, border) {
  ctx.fillStyle = color;
  ctx.fillRect(x * sq, y * sq, sq, sq);

  ctx.strokeStyle = border;
  ctx.strokeRect(x * sq, y * sq, sq, sq);
}

function drawNpiece(x, y, color, border) {
  ctx2.fillStyle = color;
  ctx2.fillRect(x * rowCol, y * rowCol, rowCol, rowCol);

  ctx2.strokeStyle = border;
  ctx2.strokeRect(x * rowCol, y * rowCol, rowCol, rowCol);
}

// create piece show board
let Nboard = [];
for (r = 0; r < 4; r++) {
  Nboard[r] = [];
  for (c = 0; c < 4; c++) {
    Nboard[r][c] = "white";
  }
}

// Draw piece show board
function drawNboard() {
  for (r = 0; r < 4; r++) {
    for (c = 0; c < 6; c++) {
      ctx2.clearRect(0, 0, 300, 300);
      drawNpiece(c, r, Nboard[r][c], bdr);
    }
  }
}
drawNboard();

// Create a the board
let board = [];
for (r = 0; r < row; r++) {
  board[r] = [];
  for (c = 0; c < col; c++) {
    board[r][c] = bg;
  }
}

// Draw the board
function drawBoard() {
  for (r = 0; r < row; r++) {
    for (c = 0; c < col; c++) {
      drawSquare(c, r, board[r][c], bdr);
    }
  }
}

drawBoard();

// pieces and color
const PIECES = [Z, S, T, O, L, I, J];

// store next piece
const nextP = [];
// store next color
const nextC = [];

// push random number
function pushRandomNumberAndColor() {
  nextP.push(Math.floor(Math.random() * PIECES.length));
  nextC.push(randomColor());
}
pushRandomNumberAndColor();

// generate random pieces
function randomPiece() {
  pushRandomNumberAndColor();
  presentNumber += 1; // present index number
  presentColor += 1; // present index number
  return new Piece(
    PIECES[nextP[presentNumber]],
    nextC[presentColor],
    randomColor()
  );
}
let p = randomPiece();

// generate random pieces
function randomNPiece() {
  nextNumber += 1; // next index number
  nextColor += 1; // next index number
  drawNboard();
  Ndraw(PIECES[nextP[nextNumber]], nextC[nextColor], randomColor());
}
randomNPiece();

// generate random color
function randomColor() {
  const hex = "0123456789ABCDEF";
  var rColor = "#";
  for (let i = 0; i < 6; i++) {
    rColor += hex[Math.floor(Math.random() * hex.length)];
  }
  return rColor;
}

// control the piece
document.addEventListener("keydown", (e) => {
  if (e.keyCode == 37) {
    p.moveLeft();
  } else if (e.keyCode == 39) {
    p.moveRight();
  } else if (e.keyCode == 40) {
    p.moveDown();
  } else if (e.keyCode == 38) {
    p.rotate();
  }
});

// Drop the piece every 1sec
let dropStart = Date.now();

function drop() {
  gameOver = false;
  let now = Date.now();
  let delta = now - dropStart;
  if (delta > 1000 - time) {
    p.moveDown();
    dropStart = Date.now();
  }
  if (!gameOver) {
    requestAnimationFrame(drop);
  }
}

drop();

// for scrin touch control
let bs = false;
let s = 40;
let a = 0;
let mx = "none";

function start() {
  mx = "Left";
  bs = true;
  s = 5;
  update();
}
 
function start1() {
  mx = "Down";
  bs = true;
  update();
}

function start2() {
  mx = "Right";
  bs = true; 
  s = 5;
  update();
}


function end() {
  bs = false;
  s = 40;
  update();
}

function update() {
  a += 1;
  if (a == s) {
    if (mx == "Down") {
      p.moveDown(); 
      a = 0;
    }
    if (mx == "Left") {
      p.moveLeft();
      a = 0;
    }
    if (mx == "Right") {
      p.moveRight();
      a = 0;
    }if (a > 5) {
      p.rotate();
    }

    s = 5;
  } 
  if (bs) {
    requestAnimationFrame(update);
  }
}
// sourav