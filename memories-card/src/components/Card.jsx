export default function Card({ card, handleCardClick }) {
  return (
    <div
      className={`card ${card.isFlipped ? "flipped" : ""}`}
      onClick={() => handleCardClick(card)}
    >
      <div className="card-front">?</div>
      <div className="card-back">{card.value}</div>
    </div>
  );
}
