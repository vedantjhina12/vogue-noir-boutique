
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search, Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';

const Cart = () => {
  const { cart, updateCart, removeFromCart, clearCart } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const [isCartEmpty, setIsCartEmpty] = useState(true);

  useEffect(() => {
    setIsCartEmpty(!cart || cart.length === 0);
  }, [cart]);

  const cartCount = cart?.reduce((total, item) => total + item.quantity, 0) || 0;
  const wishlistCount = wishlist?.length || 0;

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      try {
        await updateCart({ id: itemId, updates: { quantity: newQuantity } });
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await removeFromCart(itemId);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const calculateSubtotal = () => {
    return cart?.reduce((total, item) => total + (item.products.price * item.quantity), 0) || 0;
  };

  const subtotal = calculateSubtotal();
  const shippingCost = subtotal > 0 ? 50 : 0;
  const total = subtotal + shippingCost;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentPage="home"
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        cartItems={cart?.map(item => ({
          id: parseInt(item.product_id),
          name: item.products.name,
          price: parseFloat(item.products.price.toString()),
          image: item.products.image_url || '',
          quantity: item.quantity,
          size: item.size || 'M'
        })) || []}
        wishlistItems={wishlist?.map(item => ({
          id: parseInt(item.product_id),
          name: item.products.name,
          price: parseFloat(item.products.price.toString()),
          image: item.products.image_url || '',
          category: 'Fashion'
        })) || []}
        onUpdateCartQuantity={(id: number, quantity: number) => {
          const cartItem = cart?.find(item => parseInt(item.product_id) === id);
          if (cartItem) {
            handleUpdateQuantity(cartItem.id, quantity);
          }
        }}
        onRemoveCartItem={(id: number) => {
          const cartItem = cart?.find(item => parseInt(item.product_id) === id);
          if (cartItem) {
            handleRemoveItem(cartItem.id);
          }
        }}
        onRemoveWishlistItem={() => {}}
        onMoveToCart={() => {}}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
        </div>

        {isCartEmpty ? (
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Your cart is empty</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Looks like you haven't added anything to your cart yet.</p>
              <Button asChild className="mt-4">
                <Link to="/">Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {cart?.map((item) => (
                <Card key={item.id} className="mb-4">
                  <CardContent className="flex items-center gap-4">
                    <div className="w-24 h-24 overflow-hidden rounded-md">
                      <img
                        src={item.products.image_url}
                        alt={item.products.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <Link to={`/product/${item.product_id}`} className="text-lg font-semibold hover:underline">
                        {item.products.name}
                      </Link>
                      <p className="text-gray-500">Size: {item.size}</p>
                      <p className="text-gray-900">₹{item.products.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value);
                          if (!isNaN(newQuantity)) {
                            handleUpdateQuantity(item.id, newQuantity);
                          }
                        }}
                        className="w-16 text-center"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <p className="text-gray-500">Subtotal:</p>
                    <p className="text-gray-900">₹{subtotal.toLocaleString()}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-500">Shipping:</p>
                    <p className="text-gray-900">₹{shippingCost.toLocaleString()}</p>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <p>Total:</p>
                    <p>₹{total.toLocaleString()}</p>
                  </div>
                  <Button className="w-full">
                    Checkout
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleClearCart}>
                    Clear Cart
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

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
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 YUTH. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Cart;
