// import { useState } from "react";
// import { WINNING_COMBINATIONS } from "./winningBoard";

// const GAME_BOARD = [
//   [null, null, null],
//   [null, null, null],
//   [null, null, null],
// ];

// export default function Game() {
//   const [players, setPlayers] = useState({
//     X: "player 1",
//     O: "player 2",
//   });

//   const [gameTurns, setGameTurns] = useState([]);

//   const activePlayer = gameTurns?.[0]?.symbol === "X" ? "O" : "X";

//   if (gameTurns.length > 0)
//     GAME_BOARD[gameTurns[0].row][gameTurns[0].col] = gameTurns[0].symbol;

//   const newBoard = [...GAME_BOARD.map((board) => board.map((b) => b))];
//   let winner;

//   for(const combination of WINNING_COMBINATIONS){
//     const first = newBoard[combination[0].row][combination[0].col];
//     const second = newBoard[combination[1].row][combination[1].col];
//     const third = newBoard[combination[2].row][combination[2].col];
//     console.log(first, second, third);

//     if(first !== null && first === second && second === third){
//       winner = gameTurns[0].symbol;
//       break;
//     }
//   }

//   console.log(newBoard);
//   console.log(winner);

//   function handleGameTurn(row, col, activePlayer) {
//     setGameTurns((prev) => [{ row, col, symbol: activePlayer }, ...prev]);
//   }

//   return (
//     <div>
//       <Players
//         players={players}
//         setPlayers={setPlayers}
//         activePlayer={activePlayer}
//       />
//       <Board
//         activePlayer={activePlayer}
//         board={newBoard}
//         onGameTurn={handleGameTurn}
//       />
//     </div>
//   );
// }

// function Players({ players, setPlayers, activePlayer }) {
//   function handlePlayerNameChange(symbol, updatedPlayerName) {
//     setPlayers((cur) => ({ ...cur, [symbol]: updatedPlayerName }));
//   }

//   return (
//     <div>
//       {Object.keys(players).map((symbol) => (
//         <Player
//           key={symbol}
//           playerName={players[symbol]}
//           symbol={symbol}
//           onPlayerNameChange={handlePlayerNameChange}
//           activePlayer={activePlayer}
//         />
//       ))}
//     </div>
//   );
// }

// function Player({ playerName, symbol, onPlayerNameChange, activePlayer }) {
//   const [isUpdateSession, setIsUpdateSession] = useState(false);
//   const [updatedPlayerName, setUpdatedPlayerName] = useState(playerName);
//   const isActive = activePlayer === symbol;

//   function handleChange(e) {
//     setUpdatedPlayerName(e.target.value);
//   }

//   function handleSubmit() {
//     setIsUpdateSession((curSession) => !curSession);

//     if (isUpdateSession) onPlayerNameChange(symbol, updatedPlayerName);
//   }

//   return (
//     <div
//       style={{
//         display: "flex",
//         gap: "4px",
//         alignItems: "center",
//         ...(isActive ? { border: "2px solid orange" } : {}),
//       }}
//     >
//       {isUpdateSession && (
//         <input type="text" value={updatedPlayerName} onChange={handleChange} />
//       )}
//       {!isUpdateSession && <h3>{playerName}</h3>}
//       <p>{symbol}</p>
//       <button onClick={handleSubmit}>
//         {isUpdateSession ? "save" : "update"}
//       </button>
//     </div>
//   );
// }

// function Board({ activePlayer, board, onGameTurn }) {
//   return (
//     <div
//       style={{
//         display: "grid",
//         gridTemplateColumns: "repeat(3, 1fr)",
//         gap: "4px",
//       }}
//     >
//       {board.map((boards, row) =>
//         boards.map((board, col) => (
//           <button
//             key={`${row}${col}`}
//             style={{ width: "50px", height: "50px" }}
//             onClick={() => onGameTurn(row, col, activePlayer)}
//           >
//             {board}
//           </button>
//         ))
//       )}
//     </div>
//   );
// }

// function LogList() {
//   return <ul></ul>;
// }

// function Log() {
//   return <li></li>;
// }

var maximumNumberOfStringPairs = function (words) {
    const reversed = [];
    let pairCount = 0;

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const re = '';
        for (let j = 0; j <= Math.ceil(word.length / 2); j++) {
            re[j] = word[word.length - j - 1];
        }

        for (let k = 0; k <= i; k++) {
            for (let l = 0; l < reversed.length; l++) {
                if (words[k] === reversed[l]) pairCount++;
            }
        }

        reversed[i] = re;
        console.log(reversed);
    }


    return pairCount;
};

maximumNumberOfStringPairs(["cd","ac","dc","ca","zz"])