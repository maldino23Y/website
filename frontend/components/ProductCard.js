"use client";

import Link from "next/link";
import { useAppContext } from "@/lib/AppContext";
import { useRef } from "react";

export default function ProductCard({ product }) {
    const { addToCart } = useAppContext();
    const imgRef = useRef(null);

    const handleAddToCart = (e) => {
        // Basic Fly to cart animation
        if (imgRef.current) {
            const img = imgRef.current;
            const rect = img.getBoundingClientRect();

            // Find cart icon rect (approximate in top right)
            const cartIcon = document.querySelector('.fa-shopping-cart') || document.querySelector('header button[aria-label="Contact us on WhatsApp"]') || document.body;

            // Clone element
            const clone = img.cloneNode(true);
            clone.style.position = 'fixed';
            clone.style.top = `${rect.top}px`;
            clone.style.left = `${rect.left}px`;
            clone.style.width = `${rect.width}px`;
            clone.style.height = `${rect.height}px`;
            clone.style.transition = 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
            clone.style.zIndex = '9999';
            clone.style.borderRadius = '8px';
            clone.style.opacity = '0.9';

            document.body.appendChild(clone);

            // Force reflow
            clone.getBoundingClientRect();

            // Target coordinates (top right corner where cart usually is, approx 20px from top, 40px from right)
            clone.style.top = '20px';
            clone.style.left = `calc(100vw - 80px)`;
            clone.style.width = '30px';
            clone.style.height = '30px';
            clone.style.opacity = '0.1';
            clone.style.transform = 'scale(0.1) rotate(180deg)';

            setTimeout(() => {
                if (document.body.contains(clone)) document.body.removeChild(clone);
            }, 800);
        }

        addToCart(product);
    };

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full overflow-hidden group">
            <Link href={`/produit/${product.reference}`} className="block relative overflow-hidden bg-gray-50 aspect-square">
                {/* Placeholder for real image */}
                <div ref={imgRef} className="absolute inset-0 flex items-center justify-center text-6xl text-gray-200 group-hover:scale-110 transition-transform duration-500 bg-gray-50">
                    ⚙️
                </div>
                <div className="absolute top-3 left-3 bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                    {product.category_name}
                </div>

                {/* Hover overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            <div className="p-6 flex flex-col flex-grow bg-white relative z-10">
                <div className="text-xs text-brand-blue font-bold mb-2 tracking-wider">REF: {product.reference}</div>
                <Link href={`/produit/${product.reference}`}>
                    <h3 className="font-bold text-brand-black text-lg mb-3 hover:text-brand-blue transition-colors leading-tight line-clamp-2">
                        {product.name}
                    </h3>
                </Link>
                <p className="text-sm text-gray-500 mb-6 line-clamp-2 flex-grow">{product.description}</p>

                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-50">
                    <div className="font-extrabold text-brand-black text-lg">
                        {product.price ? `${product.price.toFixed(2)} DH` : 'Sur devis'}
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="text-brand-blue border-2 border-brand-blue hover:bg-brand-blue hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 hover:rotate-90 active:scale-75"
                        title="Ajouter au panier"
                    >
                        <span className="text-xl font-medium leading-none mb-0.5">+</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
