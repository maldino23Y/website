"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { search } from "@/lib/api";
import { useRouter } from "next/navigation";
import CartDropdown from "@/components/CartDropdown";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (searchQuery.length > 2) {
            const delay = setTimeout(async () => {
                try {
                    const res = await search(searchQuery);
                    setSearchResults(res);
                } catch (error) {
                    console.error(error);
                }
            }, 300);
            return () => clearTimeout(delay);
        } else {
            setSearchResults(null);
        }
    }, [searchQuery]);

    const handleSearchSubmit = () => {
        if (searchQuery) {
            router.push(`/catalogue?q=${encodeURIComponent(searchQuery)}`);
            setSearchResults(null);
            setMobileMenuOpen(false);
        }
    };

    return (
        <header className={`fixed w-full top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-brand-blue shadow-lg py-2' : 'bg-brand-blue py-4'}`}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="text-white font-extrabold text-3xl tracking-tighter group-hover:scale-105 transition-transform">
                        MASSAD ENERGIE
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8 text-white font-medium text-sm tracking-widest">
                    <Link href="/" className="hover:text-gray-200 transition-colors hover:underline underline-offset-4">ACCUEIL</Link>
                    <Link href="/catalogue" className="hover:text-gray-200 transition-colors hover:underline underline-offset-4">CATALOGUE</Link>
                    <Link href="/a-propos" className="hover:text-gray-200 transition-colors hover:underline underline-offset-4">À PROPOS</Link>
                    <Link href="/contact" className="hover:text-gray-200 transition-colors hover:underline underline-offset-4">CONTACT</Link>
                </nav>

                {/* Contact Info & Search */}
                <div className="hidden lg:flex items-center gap-6">
                    <div className="text-right text-xs text-brand-gray font-mono">
                        <p>06 74 50 84 91</p>
                    </div>

                    <div className="relative group">
                        <div className="flex items-center bg-white/10 hover:bg-white focus-within:bg-white rounded-full border border-white/20 focus-within:border-brand-blue focus-within:ring-4 focus-within:ring-brand-blue/30 overflow-hidden transition-all duration-300 w-52 focus-within:w-72 backdrop-blur-md">
                            <input
                                type="text"
                                placeholder="Recherche..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                                className="w-full px-5 py-2.5 bg-transparent text-gray-800 placeholder-white/70 focus-within:placeholder-gray-400 text-sm focus:outline-none focus:text-gray-800 group-hover:placeholder-gray-400 transition-all font-medium"
                            />
                            <button
                                onClick={handleSearchSubmit}
                                className="pr-5 pl-2 py-2.5 text-white/70 group-hover:text-gray-400 focus-within:text-brand-blue hover:!text-brand-blue transition-colors flex items-center justify-center"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </button>
                        </div>

                        {/* Search Dropdown */}
                        {searchResults && (
                            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-2xl text-gray-800 overflow-hidden z-50 border border-gray-100">
                                {searchResults.categories?.length > 0 && (
                                    <div className="p-2 border-b">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-2">Catégories</p>
                                        {searchResults.categories.map(c => (
                                            <Link key={c.id} href={`/catalogue?category=${c.slug}`} onClick={() => setSearchResults(null)} className="block p-2 hover:bg-gray-50 rounded text-sm font-medium transition-colors">
                                                {c.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                                {searchResults.products?.length > 0 && (
                                    <div className="p-2">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-2 mt-1">Produits</p>
                                        {searchResults.products.map(p => (
                                            <Link key={p.id} href={`/produit/${p.reference}`} onClick={() => setSearchResults(null)} className="block p-2 hover:bg-gray-50 rounded text-sm font-medium transition-colors">
                                                {p.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                                {searchResults.products?.length === 0 && searchResults.categories?.length === 0 && (
                                    <div className="p-6 text-center text-sm text-gray-500">
                                        Aucun résultat trouvé.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Shopping Cart Dropdown */}
                    <CartDropdown />
                </div>

                {/* Mobile menu button */}
                <button className="md:hidden text-white text-2xl hover:scale-110 transition-transform" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    ☰
                </button>
            </div>

            {/* Mobile nav Dropdown */}
            <div className={`md:hidden absolute top-full left-0 w-full bg-brand-black text-white shadow-2xl overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-96 border-t border-gray-800' : 'max-h-0'}`}>
                <nav className="flex flex-col p-4 text-sm font-medium tracking-widest gap-2">
                    <Link href="/" onClick={() => setMobileMenuOpen(false)} className="py-3 px-4 hover:bg-gray-800 rounded transition-colors">ACCUEIL</Link>
                    <Link href="/catalogue" onClick={() => setMobileMenuOpen(false)} className="py-3 px-4 hover:bg-gray-800 rounded transition-colors">CATALOGUE</Link>
                    <Link href="/a-propos" onClick={() => setMobileMenuOpen(false)} className="py-3 px-4 hover:bg-gray-800 rounded transition-colors">À PROPOS</Link>
                    <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="py-3 px-4 hover:bg-gray-800 rounded transition-colors">CONTACT</Link>
                </nav>
            </div>
        </header>
    );
}
