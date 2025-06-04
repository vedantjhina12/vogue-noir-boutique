
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from './SearchBar';
import CartSidebar from './CartSidebar';
import WishlistSidebar from './WishlistSidebar';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
}

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface HeaderProps {
  currentPage: 'men' | 'women' | 'home';
  cartCount: number;
  wishlistCount: number;
  cartItems: CartItem[];
  wishlistItems: WishlistItem[];
  onUpdateCartQuantity: (id: number, quantity: number) => void;
  onRemoveCartItem: (id: number) => void;
  onRemoveWishlistItem: (id: number) => void;
  onMoveToCart: (id: number) => void;
}

const Header = ({ 
  currentPage, 
  cartCount, 
  wishlistCount, 
  cartItems, 
  wishlistItems,
  onUpdateCartQuantity,
  onRemoveCartItem,
  onRemoveWishlistItem,
  onMoveToCart
}: HeaderProps) => {
  return (
    <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-black">
            YUTH
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/men" 
              className={`${currentPage === 'men' ? 'text-black border-b-2 border-black' : 'text-gray-900 hover:text-gray-600'} font-medium`}
            >
              MEN
            </Link>
            <Link 
              to="/women" 
              className={`${currentPage === 'women' ? 'text-black border-b-2 border-black' : 'text-gray-900 hover:text-gray-600'} font-medium`}
            >
              WOMEN
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <SearchBar />
            
            <WishlistSidebar
              wishlistCount={wishlistCount}
              wishlistItems={wishlistItems}
              onRemoveItem={onRemoveWishlistItem}
              onMoveToCart={onMoveToCart}
            />
            
            <CartSidebar
              cartCount={cartCount}
              cartItems={cartItems}
              onUpdateQuantity={onUpdateCartQuantity}
              onRemoveItem={onRemoveCartItem}
            />
            
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
