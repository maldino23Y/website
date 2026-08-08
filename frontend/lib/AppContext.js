"use client";

import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
    const [toast, setToast] = useState(null);
    const [cart, setCart] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem("massad_cart");
            if (savedCart) {
                setCart(JSON.parse(savedCart));
            }
        } catch (error) {
            console.error("Failed to parse cart from local storage", error);
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage when cart changes
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("massad_cart", JSON.stringify(cart));
        }
    }, [cart, isLoaded]);

    const showToast = useCallback((message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }, []);

    // Add to Cart Logic
    const addToCart = useCallback((product) => {
        setCart(prev => {
            const existingItemIndex = prev.findIndex(item => item.id === product.id);
            if (existingItemIndex >= 0) {
                // Clone the array and the item
                const newCart = [...prev];
                newCart[existingItemIndex] = {
                    ...newCart[existingItemIndex],
                    quantity: newCart[existingItemIndex].quantity + 1
                };
                return newCart;
            } else {
                // Add new item with qty 1
                return [...prev, { ...product, quantity: 1 }];
            }
        });
        showToast(`${product.name} ajouté au panier`);
    }, [showToast]);

    // Backward compatibility for existing components
    const addToQuote = addToCart;

    // Update Quantity Logic
    const updateQuantity = useCallback((productId, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === productId) {
                const newQty = Math.max(0, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }).filter(item => item.quantity > 0));
    }, []);

    // Remove from Cart Logic
    const removeFromCart = useCallback((productId) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    }, []);

    // Clear Cart Logic
    const clearCart = useCallback(() => {
        setCart([]);
        showToast("Panier vidé", "info");
    }, [showToast]);

    // Derived State: Subtotal (only for products that have a price)
    const cartTotals = useMemo(() => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const subtotal = cart.reduce((sum, item) => {
            return sum + (item.price ? (item.price * item.quantity) : 0);
        }, 0);

        // Example calculations
        const taxes = subtotal * 0.20; // 20% TVA
        const shipping = subtotal > 0 && subtotal < 500 ? 50 : 0; // Free shipping over 500 DH
        const total = subtotal > 0 ? (subtotal + taxes + shipping) : 0;

        return {
            totalItems,
            subtotal,
            taxes,
            shipping,
            total
        };
    }, [cart]);

    return (
        <AppContext.Provider value={{
            toast,
            showToast,
            cart,
            addToQuote,
            addToCart,
            updateQuantity,
            removeFromCart,
            clearCart,
            cartTotals
        }}>
            {children}

            {/* Toast Notification */}
            {toast && (
                <div className={`fixed bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full shadow-2xl text-white font-bold z-50 transition-all backdrop-blur-md border animate-bounce ${toast.type === 'error' ? 'bg-red-500/90 border-red-400' : toast.type === 'info' ? 'bg-blue-500/90 border-blue-400' : 'bg-[#25D366]/90 border-green-400'}`}>
                    {toast.message}
                </div>
            )}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
