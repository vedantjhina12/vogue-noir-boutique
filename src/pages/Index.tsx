
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search, ChevronLeft, ChevronRight, Facebook, Instagram, X, Linkedin, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Header from '@/components/Header';

const Index = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  // Background images for the slider
  const backgroundImages = [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1523381294911-8cd694c82c4c?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1509967291958-493af72e1926?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1920&h=1080&fit=crop"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? backgroundImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % backgroundImages.length
    );
  };

  const handleBackgroundImageClick = () => {
    navigate('/products');
  };

  const handleUpdateCartQuantity = (id: number, quantity: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const handleRemoveCartItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    setCartCount(prev => prev - 1);
  };

  const handleRemoveWishlistItem = (id: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
    setWishlistCount(prev => prev - 1);
  };

  const handleMoveToCart = (id: number) => {
    const wishlistItem = wishlistItems.find(item => item.id === id);
    if (wishlistItem) {
      const cartItem = {
        ...wishlistItem,
        quantity: 1,
        size: 'M'
      };
      setCartItems(prev => [...prev, cartItem]);
      setCartCount(prev => prev + 1);
      handleRemoveWishlistItem(id);
    }
  };

  const handleAddToWishlist = (product) => {
    setWishlistItems(prev => [...prev, product]);
    setWishlistCount(prev => prev + 1);
  };

  const handleAddToCart = (product) => {
    const cartItem = {
      ...product,
      quantity: 1,
      size: 'M'
    };
    setCartItems(prev => [...prev, cartItem]);
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        currentPage="home"
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        cartItems={cartItems}
        wishlistItems={wishlistItems}
        onUpdateCartQuantity={handleUpdateCartQuantity}
        onRemoveCartItem={handleRemoveCartItem}
        onRemoveWishlistItem={handleRemoveWishlistItem}
        onMoveToCart={handleMoveToCart}
      />

      {/* Hero Section with Background Slider */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Slider */}
        <div className="absolute inset-0">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 cursor-pointer ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={handleBackgroundImageClick}
            >
              <img
                src={image}
                alt={`Background ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-black bg-opacity-30 cursor-pointer" onClick={handleBackgroundImageClick}></div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-8 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-8 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300"
        >
          <ChevronRight size={24} />
        </button>

        <div className="relative z-10 text-center text-white">
          <img
            src="/lovable-uploads/9c01f148-7302-43d4-9c4f-db12d7ca4ec3.png"
            alt="YUTH Logo"
            className="h-32 w-auto mx-auto mb-4"
          />
          <p className="text-xl md:text-2xl mb-8">Redefining Fashion</p>
          <div className="space-x-4">
            <Link to="/men">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                SHOP MEN
              </Button>
            </Link>
            <Link to="/women">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                SHOP WOMEN
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collections - Only Men's and Women's */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Men's Collection */}
            <div className="relative overflow-hidden rounded-lg group">
              <img
                src="https://images.unsplash.com/photo-1523381294911-8cd694c82c4c?w=600&h=500&fit=crop"
                alt="Men's Collection"
                className="w-full h-80 object-cover transform hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">Men's Collection</h3>
                  <p className="text-lg mb-6 opacity-90">Discover premium menswear crafted for the modern gentleman</p>
                  <Link to="/men">
                    <Button size="lg" variant="secondary" className="bg-white text-black hover:bg-gray-100">
                      Shop Men's
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Women's Collection */}
            <div className="relative overflow-hidden rounded-lg group">
              <img
                src="https://images.unsplash.com/photo-1509967291958-493af72e1926?w=600&h=500&fit=crop"
                alt="Women's Collection"
                className="w-full h-80 object-cover transform hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">Women's Collection</h3>
                  <p className="text-lg mb-6 opacity-90">Elegant designs that celebrate feminine sophistication</p>
                  <Link to="/women">
                    <Button size="lg" variant="secondary" className="bg-white text-black hover:bg-gray-100">
                      Shop Women's
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">New Arrivals</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Product 1 */}
            <Card className="group cursor-pointer border-none shadow-none">
              <CardContent className="p-0">
                <Link to="/product/1">
                  <div className="relative overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1525598532241-c11aab4c6742?w=400&h=500&fit=crop"
                      alt="New Arrival 1"
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="secondary" className="bg-white hover:bg-gray-100">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="secondary" className="bg-white hover:bg-gray-100">
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Link>
                <div className="pt-4">
                  <p className="text-sm text-gray-500">Category</p>
                  <h3 className="font-medium text-gray-900">Product Name</h3>
                  <p className="text-gray-900 font-semibold">$99.99</p>
                </div>
              </CardContent>
            </Card>

            {/* Product 2 */}
            <Card className="group cursor-pointer border-none shadow-none">
              <CardContent className="p-0">
                <Link to="/product/2">
                  <div className="relative overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop"
                      alt="New Arrival 2"
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="secondary" className="bg-white hover:bg-gray-100">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="secondary" className="bg-white hover:bg-gray-100">
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Link>
                <div className="pt-4">
                  <p className="text-sm text-gray-500">Category</p>
                  <h3 className="font-medium text-gray-900">Product Name</h3>
                  <p className="text-gray-900 font-semibold">$79.99</p>
                </div>
              </CardContent>
            </Card>

            {/* Product 3 */}
            <Card className="group cursor-pointer border-none shadow-none">
              <CardContent className="p-0">
                <Link to="/product/3">
                  <div className="relative overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?w=400&h=500&fit=crop"
                      alt="New Arrival 3"
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="secondary" className="bg-white hover:bg-gray-100">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="secondary" className="bg-white hover:bg-gray-100">
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Link>
                <div className="pt-4">
                  <p className="text-sm text-gray-500">Category</p>
                  <h3 className="font-medium text-gray-900">Product Name</h3>
                  <p className="text-gray-900 font-semibold">$129.99</p>
                </div>
              </CardContent>
            </Card>

            {/* Product 4 */}
            <Card className="group cursor-pointer border-none shadow-none">
              <CardContent className="p-0">
                <Link to="/product/4">
                  <div className="relative overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1516478170703-76d639f62163?w=400&h=500&fit=crop"
                      alt="New Arrival 4"
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="secondary" className="bg-white hover:bg-gray-100">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="secondary" className="bg-white hover:bg-gray-100">
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Link>
                <div className="pt-4">
                  <p className="text-sm text-gray-500">Category</p>
                  <h3 className="font-medium text-gray-900">Product Name</h3>
                  <p className="text-gray-900 font-semibold">$89.99</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img
                src="/lovable-uploads/ea619b45-2fbd-40ae-bb64-4b2d22f49b05.png"
                alt="Company Logo"
                className="h-8 w-auto mb-4"
              />
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
                <li><Link to="/track-order" className="hover:text-white">Track Order</Link></li>
                <li><Link to="/address" className="hover:text-white">Manage Address</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">CONNECT</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors" title="Instagram">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" title="Facebook">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" title="X (formerly Twitter)">
                  <X className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" title="LinkedIn">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" title="YouTube">
                  <Youtube className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex items-center justify-center">
            <div className="flex items-center gap-4 text-gray-400">
              <img
                src="/lovable-uploads/ea619b45-2fbd-40ae-bb64-4b2d22f49b05.png"
                alt="Footer Logo"
                className="h-6 w-auto"
              />
              <p>&copy; 2024 YUTH. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
