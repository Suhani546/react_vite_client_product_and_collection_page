import RatingStars from './RatingStars';
import PriceTag from './PriceTag';

export default function ProductCard({ product, onClick }) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer"
      onClick={() => onClick(product)}
    >
      <div className="aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{product.name}</h3>
        <div className="flex items-center justify-between mb-2">
          <PriceTag price={product.price} />
          <span className="text-sm text-gray-600">{product.category}</span>
        </div>
        <RatingStars rating={product.rating} />
      </div>
    </div>
  );
}