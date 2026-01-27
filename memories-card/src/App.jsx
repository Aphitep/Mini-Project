import { GameHeader } from "./components/GameHeader";

function App() {
  return (
    <div className="app">
      <GameHeader score={3} move={10} />
    </div>
  );
}

export default App;
