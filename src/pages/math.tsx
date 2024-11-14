import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import React, { useEffect } from "react";
import { toast } from "sonner";

type GameStatus = "finished" | "playing" | "starting" | "waiting";

const MathGame = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [gameStatus, setGameStatus] = React.useState<GameStatus>("waiting");
  const [question, setQuestion] = React.useState<string>("");
  const [answer, setAnswer] = React.useState<number>(0);
  const [points, setPoints] = React.useState<number>(0);
  const [leftTime, setLeftTime] = React.useState<number>(60);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    if (gameStatus === "playing") {
      timer = setTimeout(() => {
        setGameStatus("finished");
      }, 60000);

      interval = setInterval(() => {
        setLeftTime((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [gameStatus]);

  const handleGameStart = () => {
    setGameStatus("starting");

    setTimeout(() => {
      setGameStatus("playing");
      setPoints(0);
      setLeftTime(60);
      generateQuestion();
      if (inputRef.current) inputRef.current.focus();
    }, Math.floor(Math.random() * 5000 + 1000));
  };

  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const operators = ["+", "-", "*"];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let result = 0;
    switch (operator) {
      case "*":
        result = num1 * num2;
        break;
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
    }

    setQuestion(`${num1} ${operator} ${num2}`);
    setAnswer(result);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = parseInt(formData.get("number") as string);

    if (inputRef.current) inputRef.current.focus();

    if (isNaN(value)) return toast.error("Please enter a valid number!");

    if (value === answer) {
      setPoints(points + 1);
      generateQuestion();
      toast.success("Correct answer!");
    } else {
      toast.error("Wrong answer!");
    }

    e.currentTarget.reset();
  };

  const handlePlayAgain = () => {
    setGameStatus("waiting");
    setPoints(0);
    setLeftTime(60);
  };

  return (
    <div className="container grid place-items-center h-screen">
      <Card className="max-w-md w-full">
        <CardHeader className="justify-center flex-col">
          <h1 className="text-3xl font-bold">Math Game</h1>
          <p className="text-sm text-gray-500 max-w-sm">
            Solve as many questions as you can in 1 minute!
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
            <div className="grid gap-5">
              <h2 className="text-5xl font-bold text-center">{question}</h2>
              <form className="grid gap-3" onSubmit={handleSubmit}>
                <Input
                  label="Answer"
                  name="number"
                  placeholder="Enter your answer"
                  ref={inputRef}
                  type="number"
                />
                <Button color="primary" type="submit">
                  <strong>Submit</strong>
                </Button>
              </form>
              <p className="text-2xl font-bold text-center">Points: {points}</p>
              <p className="text-2xl font-bold text-center">
                Time left: {leftTime}s
              </p>
            </div>
          )}
          {gameStatus === "finished" && (
            <div className="grid gap-3 place-items-center">
              <p className="text-2xl font-bold">Points: {points}</p>
              <Button color="success" fullWidth onClick={handlePlayAgain}>
                <strong>Play again</strong>
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default MathGame;
