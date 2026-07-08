"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, CheckCircle2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface DiningCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  storeOpen: boolean;
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

type VerifyResponse = {
  success: boolean;
  order: {
    posSyncStatus?: string | null;
  };
  petpooja?: { synced?: boolean; error?: string | null };
};

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

const DiningCart = ({ isOpen, onClose, items, storeOpen, onUpdateQuantity, onRemove }: DiningCartProps) => {
  const [roomNo, setRoomNo] = useState("");
  const [isOrdered, setIsOrdered] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [orderMessage, setOrderMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const scriptId = 'razorpay-checkout-js';
    if (document.getElementById(scriptId)) return;
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    if (!storeOpen) {
      setErrorMessage('Store is currently closed.');
      return;
    }

    try {
      setErrorMessage('');
      setIsSubmitting(true);

      const createRes = await fetch('/api/food-orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          roomNumber: roomNo,
          guestName,
          guestPhone,
        }),
      });
      const createData = await createRes.json();
      if (!createRes.ok) {
        throw new Error(createData?.error || 'Failed to create payment order');
      }

      if (!window.Razorpay) {
        throw new Error('Razorpay checkout is not loaded. Refresh and try again.');
      }

      const razorpay = new window.Razorpay({
        key: createData.keyId,
        amount: createData.amount,
        currency: createData.currency ?? 'INR',
        name: 'Ananta - By The Hill',
        description: 'Dining order',
        order_id: createData.razorpayOrderId,
        prefill: {
          name: guestName,
          contact: guestPhone,
        },
        handler: async (response: Record<string, string>) => {
          try {
            const verifyRes = await fetch('/api/payments/razorpay/food/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId: createData.orderId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const verifyData = (await verifyRes.json()) as VerifyResponse;
            if (!verifyRes.ok || !verifyData.success) {
              throw new Error(
                (verifyData?.petpooja?.error as string) ||
                  'Payment captured but order verification failed.',
              );
            }
            setOrderMessage(
              verifyData.order?.posSyncStatus === 'synced'
                ? 'Order placed successfully and synced to kitchen POS.'
                : 'Order placed, but POS sync is pending. Our team will process it.',
            );
            setIsSubmitting(false);
            setIsOrdered(true);
          } catch (err) {
            setErrorMessage(err instanceof Error ? err.message : 'Payment verification failed');
            setIsSubmitting(false);
          }
        },
        modal: {
          ondismiss: () => {
            setIsSubmitting(false);
          },
        },
      });

      razorpay.open();
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Checkout failed');
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative bg-white w-full max-w-md h-full shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-secondary-dark flex justify-between items-center">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-primary-dark" size={24} />
                <h2 className="text-xl font-display font-bold text-text-primary">Your Order</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-secondary-dark rounded-full transition-colors" aria-label="Close cart">
                <X size={24} className="text-text-primary" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {!isOrdered ? (
                items.length > 0 ? (
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4 pb-6 border-b border-secondary-dark last:border-0">
                        <div className="flex-1">
                          <h4 className="text-base font-bold text-text-primary mb-1">{item.name}</h4>
                          <p className="text-primary-dark font-bold text-sm">₹{item.price.toLocaleString('en-IN')}</p>
                        </div>
                        <div className="flex items-center gap-3 bg-secondary-dark rounded-xl px-3 py-1">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="text-text-muted hover:text-text-primary transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-bold w-4 text-center text-text-primary tabular-nums">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="text-text-muted hover:text-text-primary transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-text-muted hover:text-error transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-20">
                    <ShoppingBag size={64} className="mb-4 text-secondary-dark" />
                    <p className="font-display text-2xl font-bold text-text-primary">Your cart is empty</p>
                    <p className="text-sm text-text-muted mt-2">Add some delicacies to start your culinary journey.</p>
                    <button 
                      onClick={onClose}
                      className="mt-10 btn-outline"
                    >
                      Browse Menu
                    </button>
                  </div>
                )
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center p-6"
                >
                  <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center text-success mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="font-display text-3xl font-bold text-text-primary mb-2">Order Placed!</h3>
                  <p className="text-text-body text-base mb-8">
                    {orderMessage || `Your meal is being prepared and will be delivered to Room ${roomNo} shortly.`}
                  </p>
                  <button 
                    onClick={() => {
                      setIsOrdered(false);
                      onClose();
                    }}
                    className="btn-primary"
                  >
                    Back to menu
                  </button>
                </motion.div>
              )}
            </div>

            {!isOrdered && items.length > 0 && (
              <div className="p-6 bg-secondary-dark/30 border-t border-secondary-dark space-y-6">
                <form onSubmit={handleOrder} className="space-y-6">
                  {!storeOpen && (
                    <p className="rounded-lg bg-warning/10 p-3 text-xs text-warning">
                      Store is currently closed. Please try again later.
                    </p>
                  )}
                  {errorMessage && (
                    <p className="rounded-lg bg-error/10 p-3 text-xs text-error">{errorMessage}</p>
                  )}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-text-muted">Guest Name</label>
                    <input 
                      type="text" 
                      placeholder="Your name" 
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-white border border-secondary-dark px-4 py-3 rounded-xl focus:outline-none focus:border-primary-dark text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-text-muted">Mobile Number</label>
                    <input 
                      type="tel" 
                      placeholder="10-digit mobile number" 
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full bg-white border border-secondary-dark px-4 py-3 rounded-xl focus:outline-none focus:border-primary-dark text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-text-muted">Delivery Room Number</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 104" 
                      value={roomNo}
                      onChange={(e) => setRoomNo(e.target.value)}
                      className="w-full bg-white border border-secondary-dark px-4 py-3 rounded-xl focus:outline-none focus:border-primary-dark text-sm"
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-text-body text-base">Total Amount</span>
                    <span className="text-2xl font-bold text-primary-dark">₹{total.toLocaleString()}</span>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting || !storeOpen}
                    className="btn-primary w-full py-4 text-base font-bold disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Processing...' : 'Pay & Place Order'}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DiningCart;
