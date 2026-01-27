import { useState } from "react";
import Card from "./components/Card";
import { GameHeader } from "./components/GameHeader";

const cardValues = [
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒",
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒",
];
const finalCard = cardValues.map((value, index) => ({
  id: index,
  value,
  isFlipped: false,
  isMatch: false,
}));

console.log(finalCard);
function App() {
  const [cards, setCards] = useState(finalCard);

  const handleCardClick = () => {};

  return (
    <div className="app">
      <GameHeader score={3} move={10} />

      <div className="cards-grid">
        {cards.map((card) => {
          return <Card card={card} cardClick={handleCardClick} />;
        })}
      </div>
    </div>
  );
}

export default App;
