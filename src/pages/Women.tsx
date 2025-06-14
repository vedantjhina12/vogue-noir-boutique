
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';

const Women = () => {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const womenProducts = [
    {
      id: 7,
      name: "Black Dress",
      price: 4999,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
      category: "Dresses"
    },
    {
      id: 8,
      name: "Elegant Blouse",
      price: 3499,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop",
      category: "Blouses"
    },
    {
      id: 9,
      name: "High-Waist Jeans",
      price: 3799,
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=500&fit=crop",
      category: "Jeans"
    },
    {
      id: 10,
      name: "Casual Top",
      price: 1999,
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop",
      category: "Tops"
    },
    {
      id: 11,
      name: "Evening Gown",
      price: 9999,
      image: "https://images.unsplash.com/photo-1566479179817-c7b8e8d9cb00?w=400&h=500&fit=crop",
      category: "Gowns"
    },
    {
      id: 12,
      name: "Office Blazer",
      price: 5499,
      image: "https://images.unsplash.com/photo-1551803091-e20673f15770?w=400&h=500&fit=crop",
      category: "Blazers"
    }
  ];

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
        currentPage="women"
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        cartItems={cartItems}
        wishlistItems={wishlistItems}
        onUpdateCartQuantity={handleUpdateCartQuantity}
        onRemoveCartItem={handleRemoveCartItem}
        onRemoveWishlistItem={handleRemoveWishlistItem}
        onMoveToCart={handleMoveToCart}
      />

      {/* Hero Banner */}
      <section className="relative h-64 bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-2">WOMEN'S COLLECTION</h1>
          <p className="text-lg">Elegant & sophisticated designs</p>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{womenProducts.length} Products</h2>
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
            {womenProducts.map((product) => (
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
                            handleAddToWishlist(product);
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
                            handleAddToCart(product);
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
              <img
                src="/lovable-uploads/9c01f148-7302-43d4-9c4f-db12d7ca4ec3.png"
                alt="YUTH Logo"
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
          <div className="border-t border-gray-800 mt-12 pt-8 flex items-center justify-center">
            <div className="flex items-center gap-4 text-gray-400">
              <img
                src="/lovable-uploads/be5b42cd-f184-4006-8428-37d5c0d1546b.png"
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

export default Women;
