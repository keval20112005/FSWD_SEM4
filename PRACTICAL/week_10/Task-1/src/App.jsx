import { ThemeProvider, useTheme } from "./ThemeContext";
import ThemeToggle from "./ThemeToggle";

const AppContent = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: theme === "light" ? "#f5f5f5" : "#333",
        color: theme === "light" ? "#333" : "#f5f5f5",
        transition: "all 0.3s ease",
      }}
    >
      <h1>Theme Switcher App</h1>
      <ThemeToggle />
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;
