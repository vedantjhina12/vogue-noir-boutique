
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  const cartCount = cart?.reduce((total, item) => total + item.quantity, 0) || 0;
  const wishlistCount = wishlist?.length || 0;

  const handleTrackOrder = () => {
    if (orderNumber.trim()) {
      // Mock tracking data - in real app this would come from API
      setTrackingData({
        orderNumber: orderNumber,
        status: 'In Transit',
        estimatedDelivery: '2024-06-15',
        trackingSteps: [
          { status: 'Order Placed', date: '2024-06-10', completed: true, icon: Package },
          { status: 'Order Confirmed', date: '2024-06-10', completed: true, icon: CheckCircle },
          { status: 'Shipped', date: '2024-06-11', completed: true, icon: Truck },
          { status: 'Out for Delivery', date: '2024-06-13', completed: false, icon: Truck },
          { status: 'Delivered', date: 'Pending', completed: false, icon: CheckCircle }
        ]
      });
    }
  };

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
        onUpdateCartQuantity={() => {}}
        onRemoveCartItem={() => {}}
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
          <h1 className="text-3xl font-bold">Track Your Order</h1>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Enter Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Order Number</label>
                <Input
                  type="text"
                  placeholder="Enter your order number (e.g., ORD-20241210-1234)"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                />
              </div>
              <Button onClick={handleTrackOrder} className="w-full">
                Track Order
              </Button>
            </CardContent>
          </Card>

          {trackingData && (
            <Card>
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
                <p className="text-gray-600">Order #{trackingData.orderNumber}</p>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <p className="text-lg font-semibold text-green-600">{trackingData.status}</p>
                  <p className="text-sm text-gray-600">
                    Estimated Delivery: {trackingData.estimatedDelivery}
                  </p>
                </div>

                <div className="space-y-4">
                  {trackingData.trackingSteps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <div key={index} className="flex items-center gap-4">
                        <div className={`p-2 rounded-full ${
                          step.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${
                            step.completed ? 'text-gray-900' : 'text-gray-400'
                          }`}>
                            {step.status}
                          </p>
                          <p className="text-sm text-gray-500">{step.date}</p>
                        </div>
                        {step.completed && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
