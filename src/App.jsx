import { RootRouter } from "./routing/root-router";
import { UserProvider } from "./contexts/user-context";

function App() {
  // const [count, setCount] = useState(0);

  return <UserProvider>
    <RootRouter />
  </UserProvider>;
}

export default App;
