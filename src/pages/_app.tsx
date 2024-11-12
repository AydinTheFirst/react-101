import { NextUIProvider } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

type Theme = "dark" | "light" | "system" | undefined;

const App = () => {
  const { theme } = useTheme();

  return (
    <NextUIProvider>
      <Outlet />
      <Toaster theme={theme as Theme} />
    </NextUIProvider>
  );
};

export default App;
