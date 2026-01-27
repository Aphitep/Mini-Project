export default function Card({ card, cardClick }) {
  return (
    <div className="card">
      <div className="card-front" onClick={() => cardClick}>
        ?
      </div>
      <div className="card-back">{card.value}</div>
    </div>
  );
}
