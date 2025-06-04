import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Men = () => {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const menProducts = [
    {
      id: 1,
      name: "Classic White Shirt",
      price: 2999,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop",
      category: "Shirts"
    },
    {
      id: 2,
      name: "Casual Blazer",
      price: 6999,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
      category: "Blazers"
    },
    {
      id: 3,
      name: "Slim Fit Jeans",
      price: 3499,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop",
      category: "Jeans"
    },
    {
      id: 4,
      name: "Cotton T-Shirt",
      price: 1499,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
      category: "T-Shirts"
    },
    {
      id: 5,
      name: "Leather Jacket",
      price: 8999,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop",
      category: "Jackets"
    },
    {
      id: 6,
      name: "Formal Trousers",
      price: 2799,
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop",
      category: "Trousers"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-black">
              YUTH
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link to="/men" className="text-black hover:text-gray-600 font-medium border-b-2 border-black">
                MEN
              </Link>
              <Link to="/women" className="text-gray-900 hover:text-gray-600 font-medium">
                WOMEN
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Button>
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative h-64 bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-2">MEN'S COLLECTION</h1>
          <p className="text-lg">Discover the latest trends in men's fashion</p>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{menProducts.length} Products</h2>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter & Sort
            </Button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {menProducts.map((product) => (
              <Card key={product.id} className="group cursor-pointer border-none shadow-none">
                <CardContent className="p-0">
                  <Link to={`/product/${product.id}`}>
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="bg-white hover:bg-gray-100"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setWishlistCount(prev => prev + 1);
                          }}
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="secondary"
                          className="bg-white hover:bg-gray-100"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setCartCount(prev => prev + 1);
                          }}
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                  <div className="pt-4">
                    <p className="text-sm text-gray-500">{product.category}</p>
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <p className="text-gray-900 font-semibold">₹{product.price.toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">YUTH</h3>
              <p className="text-gray-400">
                Redefining fashion with contemporary designs and timeless elegance.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">SHOP</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/men" className="hover:text-white">Men's Collection</Link></li>
                <li><Link to="/women" className="hover:text-white">Women's Collection</Link></li>
                <li><Link to="/new-arrivals" className="hover:text-white">New Arrivals</Link></li>
                <li><Link to="/sale" className="hover:text-white">Sale</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">CUSTOMER CARE</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link to="/shipping" className="hover:text-white">Shipping Info</Link></li>
                <li><Link to="/returns" className="hover:text-white">Returns</Link></li>
                <li><Link to="/size-guide" className="hover:text-white">Size Guide</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">CONNECT</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Instagram</a></li>
                <li><a href="#" className="hover:text-white">Facebook</a></li>
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">Newsletter</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 YUTH. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Men;
