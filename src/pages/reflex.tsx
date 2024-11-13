import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useState } from "react";

type GameStatus = "finished" | "playing" | "starting" | "waiting";

const Reflex = () => {
  const [gameStatus, setGameStatus] = useState<GameStatus>("waiting");
  const [clickTime, setClickTime] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<number>(0);

  const handleGameStart = () => {
    setGameStatus("starting");

    setTimeout(() => {
      setGameStatus("playing");
      setGameStarted(Date.now());
    }, Math.floor(Math.random() * 5000 + 1000));
  };

  const handleGameEnd = () => {
    setClickTime(Date.now() - gameStarted);
    setGameStatus("finished");
  };

  return (
    <div className="container grid place-items-center h-screen">
      <Card className="max-w-md w-full">
        <CardHeader className="justify-center flex-col">
          <h1 className="text-3xl font-bold">Test your reflex</h1>
          <p className="text-sm text-gray-500 max-w-sm">
            When the light turns green, click as fast as you can!
          </p>
        </CardHeader>
        <CardBody>
          {gameStatus === "waiting" && (
            <Button color="primary" onClick={handleGameStart}>
              <strong>Start</strong>
            </Button>
          )}
          {gameStatus === "starting" && (
            <Button color="warning" isDisabled>
              <strong>Wait...</strong>
            </Button>
          )}
          {gameStatus === "playing" && (
            <Button color="danger" onClick={handleGameEnd}>
              <strong>Click!</strong>
            </Button>
          )}
          {gameStatus === "finished" && (
            <div className="grid gap-3 place-items-center">
              <p className="text-2xl font-bold">Your time: {clickTime}ms</p>
              <Button
                color="success"
                fullWidth
                onClick={() => setGameStatus("waiting")}
              >
                <strong>Play again</strong>
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Reflex;
