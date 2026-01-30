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
function App() {
  const [cards, setCards] = useState(finalCard);
  const [flipped, setFlipped] = useState([]);

  const handleCardClick = (card) => {
    if (card.isFlipped || card.isMatch) {
      return;
    }
    const newCards = cards.map((c) => {
      if (c.id === card.id) {
        return { ...card, isFlipped: true };
      } else {
        return c;
      }
    });

    setCards(newCards);

    const newFlippedCards = [...flipped, card.id];
    setFlipped(newFlippedCards);

    if (flipped.length === 1) {
      const firstCard = cards[flipped[0]];

      if (firstCard.value === card.value) {
        console.log("match");
      } else {
        setTimeout(() => {
          const flippedBackCard = newCards.map((c) => {
            if (newFlippedCards.includes(c.id) || c.id === card.id) {
              return { ...c, isFlipped: false };
            } else {
              return c;
            }
          });
          setCards(flippedBackCard);
        }, 1000);

        setFlipped([]);
      }
    }
  };

  return (
    <div className="app">
      <GameHeader score={3} move={10} />

      <div className="cards-grid">
        {cards.map((card) => {
          return (
            <Card key={card.id} card={card} handleCardClick={handleCardClick} />
          );
        })}
      </div>
    </div>
  );
}

export default App;
