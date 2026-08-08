"use client";

import { useAppContext } from "@/lib/AppContext";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartDropdown() {
    const { cart, removeFromCart, updateQuantity, clearCart, cartTotals } = useAppContext();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const router = useRouter();

    // Close when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close strictly on pressing escape
    useEffect(() => {
        const handleEsc = (e) => e.key === "Escape" && setIsOpen(false);
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Cart Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative bg-white/10 p-2.5 rounded-full hover:bg-white/20 transition-colors flex items-center justify-center text-white focus:outline-none"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                {/* Badge */}
                {cartTotals.totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md border-2 border-brand-blue animate-pulse-once">
                        {cartTotals.totalItems > 99 ? '99+' : cartTotals.totalItems}
                    </span>
                )}
            </button>

            {/* Dropdown Panel */}
            {isOpen && (
                <div className="absolute right-0 mt-3 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden flex flex-col max-h-[85vh]">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                        <h3 className="font-extrabold text-brand-black text-lg">Votre Panier</h3>
                        <span className="text-sm font-medium text-brand-blue bg-blue-50 px-3 py-1 rounded-full">
                            {cartTotals.totalItems} {cartTotals.totalItems === 1 ? 'Article' : 'Articles'}
                        </span>
                    </div>

                    {/* Cart Items List */}
                    <div className="flex-grow overflow-y-auto p-4 space-y-4 max-h-[50vh]">
                        {cart.length === 0 ? (
                            <div className="text-center py-8 text-gray-500 flex flex-col items-center">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-50">
                                    <circle cx="9" cy="21" r="1"></circle>
                                    <circle cx="20" cy="21" r="1"></circle>
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                </svg>
                                <p className="font-medium text-lg">Votre panier est vide</p>
                                <p className="text-sm mt-1">Découvrez notre catalogue !</p>
                            </div>
                        ) : (
                            cart.map(item => (
                                <div key={item.id} className="flex gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100">
                                    <div className="w-16 h-16 bg-brand-blue/5 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-100">
                                        <span className="text-2xl text-gray-400">⚙️</span>
                                    </div>
                                    <div className="flex-grow flex flex-col">
                                        <div className="flex justify-between items-start">
                                            <Link href={`/produit/${item.reference}`} onClick={() => setIsOpen(false)} className="font-bold text-sm text-brand-black leading-tight hover:text-brand-blue line-clamp-2 pr-2">
                                                {item.name}
                                            </Link>
                                            <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors p-1" title="Supprimer">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                                            </button>
                                        </div>
                                        <div className="text-[10px] text-gray-400 font-bold tracking-widest mt-1 mb-2 uppercase">REF: {item.reference}</div>

                                        <div className="flex justify-between items-center mt-auto">
                                            {/* Qty Controls */}
                                            <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                                <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-0.5 text-gray-500 hover:bg-gray-200 hover:text-brand-black transition-colors">-</button>
                                                <span className="px-2 font-bold text-sm text-brand-black select-none w-6 text-center">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-0.5 text-gray-500 hover:bg-gray-200 hover:text-brand-black transition-colors">+</button>
                                            </div>

                                            {/* Item Total */}
                                            <div className="font-bold text-sm text-brand-black flex flex-col items-end">
                                                {item.price ? (
                                                    <span className="text-brand-blue whitespace-nowrap">{(item.price * item.quantity).toFixed(2)} DH</span>
                                                ) : (
                                                    <span className="text-orange-500 whitespace-nowrap text-xs bg-orange-50 px-2 py-0.5 rounded">Sur devis</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Totals Section */}
                    {cart.length > 0 && (
                        <div className="bg-gray-50 p-4 border-t border-gray-100">
                            {cartTotals.subtotal > 0 ? (
                                <>
                                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                                        <span>Sous-total (HT)</span>
                                        <span className="font-medium text-brand-black">{cartTotals.subtotal.toFixed(2)} DH</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                                        <span>TVA (20%)</span>
                                        <span className="font-medium text-brand-black">{cartTotals.taxes.toFixed(2)} DH</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-500 mb-4 pb-4 border-b border-gray-200">
                                        <span>Livraison</span>
                                        <span className="font-medium text-brand-black">{cartTotals.shipping === 0 ? <span className="text-green-500 bg-green-50 px-2 rounded">Gratuite</span> : `${cartTotals.shipping.toFixed(2)} DH`}</span>
                                    </div>
                                    <div className="flex justify-between mb-6">
                                        <span className="font-extrabold text-brand-black">TOTAL (TTC)</span>
                                        <span className="font-extrabold text-xl text-brand-blue">{cartTotals.total.toFixed(2)} DH</span>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center text-sm font-medium text-orange-600 mb-4 bg-orange-50 py-3 rounded-lg border border-orange-100">
                                    Vos articles nécessitent l'édition d'un devis.
                                </div>
                            )}

                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        router.push('/contact');
                                    }}
                                    className="w-full bg-brand-blue text-white font-bold py-3 rounded-lg shadow-md hover:bg-brand-blue-dark hover:shadow-lg transition-all text-center"
                                >
                                    DEMANDER LE DEVIS / COMMANDER
                                </button>
                                <button
                                    onClick={() => clearCart()}
                                    className="w-full bg-white text-gray-500 border border-gray-200 font-bold py-2 rounded-lg hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all text-sm"
                                >
                                    VIDER LE PANIER
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
