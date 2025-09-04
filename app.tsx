import { ExpoRoot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ThemeProvider from "./constants/theme";

// Type-safe require.context untuk Expo Router v2
function AppRoot() {
  const ctx = (require as any).context("./app");
  return <ExpoRoot context={ctx} />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppRoot />
        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
