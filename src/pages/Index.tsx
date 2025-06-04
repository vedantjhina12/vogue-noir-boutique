
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const featuredProducts = [
    {
      id: 1,
      name: "Classic White Shirt",
      price: 2999,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop",
      category: "men"
    },
    {
      id: 2,
      name: "Black Dress",
      price: 4999,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
      category: "women"
    },
    {
      id: 3,
      name: "Casual Blazer",
      price: 6999,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
      category: "men"
    },
    {
      id: 4,
      name: "Elegant Blouse",
      price: 3499,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop",
      category: "women"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-black">
              YUTH
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/men" className="text-gray-900 hover:text-gray-600 font-medium">
                MEN
              </Link>
              <Link to="/women" className="text-gray-900 hover:text-gray-600 font-medium">
                WOMEN
              </Link>
            </nav>

            {/* Right Icons */}
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
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200">
          <div className="flex justify-center space-x-8 py-4">
            <Link to="/men" className="text-gray-900 hover:text-gray-600 font-medium">
              MEN
            </Link>
            <Link to="/women" className="text-gray-900 hover:text-gray-600 font-medium">
              WOMEN
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gray-100">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop"
            alt="Fashion Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">YUTH</h1>
          <p className="text-xl md:text-2xl mb-8">Redefining Fashion</p>
          <div className="space-x-4">
            <Link to="/men">
              <Button className="bg-white text-black hover:bg-gray-200 px-8 py-3">
                SHOP MEN
              </Button>
            </Link>
            <Link to="/women">
              <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3">
                SHOP WOMEN
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">FEATURED</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group cursor-pointer border-none shadow-none">
                <CardContent className="p-0">
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
                          e.stopPropagation();
                          setCartCount(prev => prev + 1);
                        }}
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="pt-4">
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <p className="text-gray-600">₹{product.price.toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Link to="/men" className="group">
              <div className="relative h-96 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"
                  alt="Men's Collection"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all">
                  <div className="absolute bottom-8 left-8">
                    <h3 className="text-3xl font-bold text-white mb-2">MEN'S</h3>
                    <p className="text-white">Discover the latest trends</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/women" className="group">
              <div className="relative h-96 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=600&fit=crop"
                  alt="Women's Collection"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all">
                  <div className="absolute bottom-8 left-8">
                    <h3 className="text-3xl font-bold text-white mb-2">WOMEN'S</h3>
                    <p className="text-white">Elegant & sophisticated</p>
                  </div>
                </div>
              </div>
            </Link>
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

export default Index;
