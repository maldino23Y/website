"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchCategories, fetchProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

export default function Catalogue() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const selectedCategory = searchParams.get('category') || '';
    const searchQuery = searchParams.get('q') || '';

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: selectedCategory,
        search: searchQuery,
    });

    useEffect(() => {
        fetchCategories().then(setCategories).catch(console.error);
    }, []);

    useEffect(() => {
        // If the URL params changed outside (e.g. from the new Search Bar submit), sync the state
        setFilters({
            category: searchParams.get('category') || '',
            search: searchParams.get('q') || ''
        });
    }, [searchParams]);

    useEffect(() => {
        setLoading(true);
        fetchProducts({ category: filters.category, search: filters.search })
            .then(res => {
                setProducts(res.data);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [filters.category, filters.search]); // Explicit dependency to avoid infinite rendering

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);

        // Update URL gently
        const params = new URLSearchParams();
        if (newFilters.category) params.set('category', newFilters.category);
        if (newFilters.search) params.set('q', newFilters.search);

        router.replace(`/catalogue?${params.toString()}`);
    };

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <div className="text-sm text-gray-500 mb-8 flex gap-2">
                    <span className="hover:text-brand-blue cursor-pointer font-medium transition-colors" onClick={() => router.push('/')}>Accueil</span>
                    <span>/</span>
                    <span className="text-gray-800 font-bold">Catalogue</span>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="w-full md:w-72 flex-shrink-0">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hidden md:block sticky top-28 scrollbar-hide max-h-[85vh] overflow-y-auto">
                            <h3 className="font-extrabold text-xl text-brand-black mb-6 pb-4 border-b border-gray-100">Filtres</h3>

                            <div className="mb-8">
                                <input
                                    type="text"
                                    placeholder="Chercher un produit..."
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-2 focus:ring-brand-blue/20 transition-all font-medium"
                                    value={filters.search}
                                    onChange={(e) => handleFilterChange('search', e.target.value)}
                                />
                            </div>

                            <h4 className="font-bold text-sm text-gray-400 uppercase tracking-widest mb-4">Catégories</h4>
                            <div className="space-y-1">
                                <button
                                    onClick={() => handleFilterChange('category', '')}
                                    className={`block w-full text-left text-sm py-2 px-3 rounded-md transition-colors ${!filters.category ? 'bg-brand-blue text-white font-bold' : 'text-gray-600 hover:bg-gray-50 hover:text-brand-blue font-medium'}`}
                                >
                                    Toutes les catégories
                                </button>
                                {categories.map(c => (
                                    <button
                                        key={c.id}
                                        onClick={() => handleFilterChange('category', c.slug)}
                                        className={`block w-full text-left text-sm py-2 px-3 rounded-md transition-colors ${filters.category === c.slug ? 'bg-brand-blue text-white font-bold' : 'text-gray-600 hover:bg-gray-50 hover:text-brand-blue font-medium'}`}
                                    >
                                        {c.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Mobile filters button */}
                        <div className="md:hidden mb-6">
                            <select
                                className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm font-medium focus:ring-2 focus:ring-brand-blue/20 outline-none"
                                value={filters.category}
                                onChange={(e) => handleFilterChange('category', e.target.value)}
                            >
                                <option value="">Toutes les catégories</option>
                                {categories.map(c => (
                                    <option key={c.id} value={c.slug}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-grow">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                            <h1 className="font-extrabold text-3xl text-brand-black">Catalogue de Produits</h1>
                            <span className="bg-blue-50 text-brand-blue px-4 py-1.5 rounded-full text-sm font-bold shadow-sm whitespace-nowrap">
                                {products.length} produit{products.length !== 1 ? 's' : ''} trouvé{products.length !== 1 ? 's' : ''}
                            </span>
                        </div>

                        {loading ? (
                            <div className="flex justify-center py-32">
                                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand-blue opacity-80"></div>
                            </div>
                        ) : products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {products.map(p => (
                                    <ProductCard key={p.id} product={p} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white p-16 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col items-center">
                                <div className="text-6xl mb-6 opacity-80">🔍</div>
                                <h3 className="text-2xl font-extrabold text-brand-black mb-3">Aucun produit trouvé</h3>
                                <p className="text-gray-500 max-w-md mx-auto text-lg mb-8">Essayez de modifier vos filtres ou de chercher avec des termes plus généraux.</p>
                                <button
                                    onClick={() => setFilters({ category: '', search: '' })}
                                    className="bg-brand-blue text-white px-8 py-3 rounded-lg font-bold hover:bg-brand-blue-dark transition-all transform hover:-translate-y-1 shadow-md hover:shadow-lg"
                                >
                                    Réinitialiser les filtres
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
