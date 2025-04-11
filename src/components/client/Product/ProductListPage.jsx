import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { products } from '../../../data/mockProducts';
import ProductCard from './ProductCard';
import FilterSidebar from './FilterSidebar';
import ProductDetailPage from './ProductDetailPage';

export default function ProductListPage() {
  const [filters, setFilters] = useState({
    category: '',
    minPrice: 0,
    maxPrice: 1000,
    minRating: 0,
    sortBy: 'price-asc'
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Get unique categories from products
  const categories = [...new Set(products.map(p => p.category))];

  // Filter and sort products
  const filteredProducts = products
    .filter(product => 
      (!filters.category || product.category === filters.category) &&
      product.price >= filters.minPrice &&
      (filters.maxPrice === 0 || product.price <= filters.maxPrice) &&
      product.rating >= filters.minRating
    )
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-desc':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  if (selectedProduct) {
    return (
      <ProductDetailPage 
        product={selectedProduct} 
        onBack={() => setSelectedProduct(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Mobile filter button */}
        <button
          className="md:hidden fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg"
          onClick={() => setIsSidebarOpen(true)}
        >
          <SlidersHorizontal className="w-6 h-6" />
        </button>

        <div className="flex gap-6">
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            categories={categories}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-8">Our Products</h1>
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No products found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={setSelectedProduct}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}