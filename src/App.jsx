import { useState } from 'react';

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: [a, b, c] };
      }
    }
    return null;
  };

  const winInfo = calculateWinner(board);
  const winner = winInfo?.winner;
  const winLine = winInfo?.line || [];
  const isDraw = !winner && board.every(Boolean);

  const handleClick = (i) => {
    if (board[i] || winner || isDraw) return;
    
    const nextBoard = board.slice();
    nextBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(nextBoard);
    setXIsNext(!xIsNext);
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="container">
      <h1>Tic-Tac-Toe</h1>
      
      <div className="status">
        {winner ? `Winner: ${winner}` : isDraw ? "It's a draw!" : `Next Player: ${xIsNext ? 'X' : 'O'}`}
      </div>

      <div className="board">
        {board.map((val, idx) => (
          <button
            key={idx}
            className={`cell ${val ? `filled ${val.toLowerCase()}` : ''} ${winLine.includes(idx) ? 'winning' : ''}`}
            onClick={() => handleClick(idx)}
            aria-label={`Square ${idx + 1}`}
          >
            {val}
          </button>
        ))}
      </div>

      <button className="reset-btn" onClick={reset}>
        Restart Game
      </button>
    </div>
  );
}
