export default function PriceTag({ price, className = '' }) {
  return (
    <span className={`font-semibold text-lg ${className}`}>
      ${price.toFixed(2)}
    </span>
  );
}