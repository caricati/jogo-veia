import React, { useState } from "react";
import Logo from "./logo.svg";

const defaultGame = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const hasSequence = (items) => /ooo|xxx/.test(items.join(""));

const checkBasicPattern = (acc, current, index, arr) => {
  if (acc) return true;

  const checkHorizontal = hasSequence(current);
  const checkVertical = hasSequence(arr.map((item) => item[index]));

  return checkHorizontal || checkVertical;
};

const checkDiagonal = (game) => {
  return (
    hasSequence(game.map((el, index, arr) => arr[index][index])) ||
    hasSequence([...game].reverse().map((el, index, arr) => arr[index][index]))
  );
};

export default function Game() {
  const [currentPlayer, setCurrentPlayer] = useState("x");
  const [game, setGame] = useState(defaultGame);

  const isGameOver =
    game.reduce(checkBasicPattern, false) || checkDiagonal(game);

  return (
    <section id="game">
      <header>
        <img src={Logo} alt="Logo" />
        <h1>Jogo da Véia</h1>
      </header>
      {isGameOver && <p className="gameover">Game Over!</p>}
      <div className="board">
        {game.map((row, rowIndex) => (
          <div className="row">
            {row.map((cell, cellIndex) => (
              <div
                className="cell"
                role="button"
                onClick={() => {
                  if (cell !== "") return;
                  setGame(
                    game.map((rowItem, rowI) => {
                      return rowItem.map((cellItem, cellI) => {
                        if (rowI === rowIndex && cellI === cellIndex) {
                          return currentPlayer;
                        }
                        return cellItem;
                      });
                    })
                  );
                  setCurrentPlayer(currentPlayer === "x" ? "o" : "x");
                }}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="actions">
        <button type="button" onClick={() => setGame(defaultGame)}>
          Reiniciar
        </button>
      </div>
    </section>
  );
}
