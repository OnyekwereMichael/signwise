import { WaitlistProvider } from "./context/WaitlistContext";
import Landing from "./pages/Landing";

export default function App() {
  return (
    <WaitlistProvider>
      <Landing />
    </WaitlistProvider>
  );
}