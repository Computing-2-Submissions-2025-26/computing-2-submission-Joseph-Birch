import {
  createGame,
  getCurrentPlayer,
  getVisibleBoard,
  applyMove,
  isLegalMove
} from "./crabblet.js";

let game = createGame();
let selectedSource = null;

const statusElement = document.getElementById("status");
const boardElement = document.getElementById("board");
const blueReserveElement = document.getElementById("Blue-reserve");
const redReserveElement = document.getElementById("Red-reserve");
const restartButton = document.getElementById("restart-button");

/**
 * capitalise headings for UI.
 */
const capitalise = (word) =>
  word.charAt(0).toUpperCase() + word.slice(1);

/**
 * translation from numeric piece sizes to descriptor for SVG files
 */
const getSizeName = (size) => {
  if (size === 1) {
    return "small";
  }

  if (size === 2) {
    return "medium";
  }

  return "large";
};

/**
 * return the correct SVG file path for a piece.
 */
const getPieceImagePath = (piece, location) => {
  const sizeName = getSizeName(piece.size);
  return `./assets/pieces/${sizeName} ${piece.player} shell ${location}.svg`;
};

/**
 * creates an image element for a game piece using the corresponding SVG file.
 */
const createPieceImage = (piece, location) => {
  const image = document.createElement("img");
  image.src = getPieceImagePath(piece, location);
  image.alt = `${piece.player} size ${piece.size} piece`;
  image.className = "piece-image";
  return image;
};

/**
 * Updates status text
 */
const renderStatus = () => {
  if (game.status === "won") {
    statusElement.textContent = `${capitalise(game.winner)} wins!`;
    return;
  }

  if (game.status === "draw") {
    statusElement.textContent = "Draw!";
    return;
  }

  statusElement.textContent = `${capitalise(getCurrentPlayer(game))} to move`;
};

/**
 * Draws the board with the visible top pieces only - includes
 * accessible text lables
 */
const renderBoard = () => {
  boardElement.innerHTML = "";

  const visibleBoard = getVisibleBoard(game);

  visibleBoard.forEach((row, rowIndex) => {
    row.forEach((piece, colIndex) => {
      const button = document.createElement("button");
      button.className = "tile";
      button.dataset.row = rowIndex;
      button.dataset.col = colIndex;

      // Add accessible text for screen readers
      if (piece === null) {
        button.setAttribute(
          "aria-label",
          `Empty board tile at row ${rowIndex + 1}, column ${colIndex + 1}`
        );
      } else {
        button.setAttribute(
          "aria-label",
          `${piece.player} size ${piece.size} piece at row ${rowIndex + 1}, column ${colIndex + 1}`
        );
      }

      if (piece !== null) {
        const pieceImage = createPieceImage(piece, "occupied");
        button.appendChild(pieceImage);
      }

      button.addEventListener("click", () => {
        handleBoardClick(rowIndex, colIndex);
      });

      boardElement.appendChild(button);
    });
  });
};

/**
 * draws reserve area and ensures empty shell images are used.
 */
const renderReserve = (player, container) => {
  container.innerHTML = "";

  game.reserves[player].forEach((piece) => {
    const button = document.createElement("button");
    button.className = "piece";

    // Reserve pieces show the "empty" shell image.
    const pieceImage = createPieceImage(piece, "empty");
    button.appendChild(pieceImage);

    button.addEventListener("click", () => {
      handleReserveClick(player, piece.id);
    });

    container.appendChild(button);
  });
};

/**
 * selects a reserve piece if it belongs to the current player.
 */
const handleReserveClick = (player, pieceId) => {
  if (player !== game.currentPlayer) {
    return;
  }

  selectedSource = {
    type: "reserve",
    pieceId
  };
};

/**
 * if the clicked tile contains the current player's top piece
 * that piece is selected else if a source piece is already selected tries to make a move.
 */
const handleBoardClick = (row, col) => {
  const topPiece = game.board[row][col][game.board[row][col].length - 1] ?? null;

  // Allow selecting one of your own visible board pieces.
  if (topPiece && topPiece.player === game.currentPlayer) {
    selectedSource = {
      type: "board",
      row,
      col
    };
    return;
  }

  // if nothing is selected clicking empty tiles dose nothing.
  if (selectedSource === null) {
    return;
  }

  const move = {
    from: selectedSource,
    to: { row, col }
  };

  // if move is illegal clear selection and redraw.
  if (!isLegalMove(game, move)) {
    selectedSource = null;
    render();
    return;
  }

  // apply move, clear selection and redraw page.
  game = applyMove(game, move);
  selectedSource = null;
  render();
};

/**
 * redraw page from the current game state.
 */
const render = () => {
  renderStatus();
  renderBoard();
  renderReserve("blue", blueReserveElement);
  renderReserve("red", redReserveElement);
};

/**
 * restarts the game when restart button clicked.
 */
restartButton.addEventListener("click", () => {
  game = createGame();
  selectedSource = null;
  render();
});

render();