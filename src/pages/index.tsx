import { Button, Card, CardBody } from "@nextui-org/react";
import { toast } from "sonner";

function App() {
  const handlePress = () => {
    toast("Hello, World!");
  };

  return (
    <div className="h-screen grid place-items-center">
      <Card className="w-full max-w-lg">
        <CardBody className="grid gap-5">
          <h1 className="text-3xl font-bold text-center">Hello, World!</h1>
          <Button onPress={handlePress}>
            <strong>Click me!</strong>
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}

export default App;
