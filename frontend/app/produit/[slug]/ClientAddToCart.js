"use client";

import { useAppContext } from "@/lib/AppContext";
import { useState } from "react";

export default function ClientAddToCart({ product }) {
    const { addToCart, cartTotals, cart } = useAppContext();
    const [clicked, setClicked] = useState(false);

    // Check if item is already in cart to display "Déjà x dans le panier"
    const cartItem = cart.find(c => c.id === product.id);
    const currentQuantity = cartItem ? cartItem.quantity : 0;

    const handleClick = (e) => {
        // Basic Fly to cart animation
        const rect = e.target.getBoundingClientRect();
        const clone = document.createElement("div");
        clone.innerText = "⚙️";
        clone.style.position = 'fixed';
        clone.style.top = `${rect.top}px`;
        clone.style.left = `${rect.left + rect.width / 2}px`;
        clone.style.fontSize = '30px';
        clone.style.transition = 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
        clone.style.zIndex = '9999';
        clone.style.opacity = '1';

        document.body.appendChild(clone);
        clone.getBoundingClientRect(); // force reflow

        clone.style.top = '20px';
        clone.style.left = `calc(100vw - 80px)`;
        clone.style.opacity = '0.1';
        clone.style.transform = 'scale(0.2) rotate(180deg)';

        setTimeout(() => {
            if (document.body.contains(clone)) document.body.removeChild(clone);
        }, 800);

        addToCart(product);
        setClicked(true);
        setTimeout(() => setClicked(false), 2000);
    };

    return (
        <div className="flex flex-col gap-2 w-full md:w-auto">
            <button
                onClick={handleClick}
                className={`w-full flex items-center justify-center gap-3 text-white font-extrabold text-lg tracking-wider py-4 px-8 rounded-xl shadow-lg transition-all duration-300 transform ${clicked ? 'bg-green-500 scale-95 shadow-md' : 'bg-brand-blue hover:bg-brand-blue-dark hover:-translate-y-1 hover:shadow-2xl active:scale-95'}`}
            >
                {clicked ? (
                    <>
                        <span>✓</span> AJOUTÉ AU PANIER
                    </>
                ) : (
                    <>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        AJOUTER AU PANIER
                    </>
                )}
            </button>

            {currentQuantity > 0 && (
                <div className="text-sm font-medium text-center text-gray-500 mt-2 bg-gray-50 py-1.5 rounded-lg border border-gray-100">
                    {currentQuantity} dans votre panier
                </div>
            )}
        </div>
    );
}
