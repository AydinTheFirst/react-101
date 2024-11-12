import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import React from "react";

const XoxGame = () => {
  const [squares, setSquares] = React.useState(Array(9).fill(null));
  const [turnOf, setTurnOf] = React.useState("X");
  const [winner, setWinner] = React.useState<string>();
  const [history, setHistory] = React.useState<number[]>([]);

  const calculateWinner = (squares: string[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return lines[i];
      }
    }
    return null;
  };

  const handleClick = (i: number) => {
    if (winner || squares[i]) return;

    const newSquares = [...squares];
    newSquares[i] = turnOf;
    setSquares(newSquares);
    setTurnOf(turnOf === "X" ? "O" : "X");
    setHistory([...history, i]);

    const winnerLine = calculateWinner(newSquares);
    if (winnerLine) {
      setWinner(newSquares[winnerLine[0]]);
    }
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setTurnOf("X");
    setWinner(undefined);
  };

  const handleUndo = () => {
    if (history.length === 0) return;

    const lastMove = history[history.length - 1];
    const newSquares = [...squares];
    newSquares[lastMove] = null;
    setSquares(newSquares);
    setTurnOf(turnOf === "X" ? "O" : "X");
    setHistory(history.slice(0, -1));
  };

  const renderSquare = (i: number) => {
    return (
      <button
        className="h-20 w-full bg-gray-200 flex items-center justify-center text-3xl font-bold border"
        onClick={() => handleClick(i)}
      >
        {squares[i]}
      </button>
    );
  };

  return (
    <div className="container grid place-items-center h-screen">
      <Card className="max-w-md w-full">
        <CardHeader className="justify-center flex-col">
          <h1 className="text-3xl font-bold">Tic Tac Toe</h1>
          <p className="text-sm text-gray-500 max-w-sm">
            Tic Tac Toe is a two-player game, where player who succeeds in
            placing three of their marks in a diagonal, horizontal, or vertical
            row is the winner.
          </p>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-3 gap-3">
            {squares.map((_, i) => (
              <div key={i}>{renderSquare(i)}</div>
            ))}
          </div>

          <div className="flex justify-center mt-4">
            {winner ? (
              <h2 className="text-2xl font-bold">{`Winner: ${winner}`}</h2>
            ) : (
              <h2 className="text-2xl font-bold">{`Turn of: ${turnOf}`}</h2>
            )}
          </div>
        </CardBody>
        <CardFooter className="gap-3 justify-center">
          <Button color="primary" onPress={handleReset}>
            <strong>Reset</strong>
          </Button>
          <Button color="success" onPress={handleUndo}>
            <strong>Undo</strong>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default XoxGame;
