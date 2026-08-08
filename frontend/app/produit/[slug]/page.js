import { fetchProductBySlug, fetchProducts } from "@/lib/api";
import Link from "next/link";
import ClientAddToCart from "./ClientAddToCart";

export async function generateMetadata({ params }) {
    const product = await fetchProductBySlug(params.slug).catch(() => null);
    if (!product) return { title: "Produit non trouvé" };

    return {
        title: `${product.name} | MASSAD ENERGIE`,
        description: product.description
    };
}

export default async function ProductDetail({ params }) {
    const product = await fetchProductBySlug(params.slug).catch(() => null);

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-32 text-center min-h-[60vh] flex flex-col justify-center items-center">
                <div className="text-8xl mb-6 opacity-80">⚠️</div>
                <h1 className="text-4xl font-extrabold text-brand-black mb-4">Produit non trouvé</h1>
                <p className="text-gray-500 mb-8 max-w-md text-lg">Le produit que vous cherchez n'existe pas ou a été déplacé.</p>
                <Link href="/catalogue" className="bg-brand-blue text-white px-8 py-3 rounded-lg font-bold hover:bg-brand-blue-dark transition-all transform hover:-translate-y-1 shadow-md hover:shadow-lg">
                    Retourner au catalogue
                </Link>
            </div>
        );
    }

    // Fetch related products from the same category
    const relatedRes = await fetchProducts({ category: product.category_slug }).catch(() => ({ data: [] }));
    const related = relatedRes.data.filter(p => p.id !== product.id).slice(0, 4);

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <div className="text-sm text-gray-500 mb-8 flex gap-2 flex-wrap">
                    <Link href="/" className="hover:text-brand-blue font-medium transition-colors">Accueil</Link>
                    <span>/</span>
                    <Link href={`/catalogue?category=${product.category_slug}`} className="hover:text-brand-blue font-medium transition-colors uppercase text-xs mt-0.5">{product.category_name}</Link>
                    <span>/</span>
                    <span className="text-brand-black font-bold truncate max-w-[200px] sm:max-w-md">{product.name}</span>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-16 hover:shadow-lg transition-shadow duration-300">
                    <div className="grid md:grid-cols-2">
                        {/* Image section */}
                        <div className="bg-gray-50 flex items-center justify-center p-12 min-h-[400px] border-r border-gray-100 relative group">
                            <div className="absolute inset-0 bg-blue-900 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                            <div className="text-9xl text-gray-300 transform group-hover:scale-110 transition-transform duration-500 drop-shadow-xl">⚙️</div>
                        </div>

                        {/* Details section */}
                        <div className="p-8 md:p-12 lg:p-16 flex flex-col relative overflow-hidden">
                            {/* Decorative background logo */}
                            <div className="absolute -right-16 -top-16 opacity-5 text-9xl transform -rotate-12 pointer-events-none">⚙️</div>

                            <div className="inline-block bg-blue-50 text-brand-blue font-extrabold text-xs tracking-widest uppercase mb-4 px-3 py-1 rounded-full self-start w-auto shadow-sm">
                                REF: {product.reference}
                            </div>

                            <h1 className="text-3xl md:text-5xl font-extrabold text-brand-black mb-6 leading-tight">
                                {product.name}
                            </h1>

                            <div className="text-3xl font-extrabold text-brand-blue mb-8 pb-8 border-b border-gray-100 flex items-end gap-2">
                                {product.price ? `${product.price.toFixed(2)} DH` : "Prix sur demande"} <span className="text-sm font-medium text-gray-400 mb-1 leading-none h-full">(HT)</span>
                            </div>

                            <div className="prose prose-sm md:prose-base text-gray-600 mb-10 flex-grow max-w-none">
                                <h3 className="text-xl font-extrabold text-brand-black mb-3">Description du produit</h3>
                                <p className="leading-relaxed text-lg">{product.description}</p>

                                {/* Mock Technical Specs */}
                                <h3 className="text-xl font-extrabold text-brand-black mb-4 mt-10">Spécifications techniques</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3"><span className="text-brand-blue bg-blue-50 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">✓</span> Haute efficacité énergétique</li>
                                    <li className="flex items-center gap-3"><span className="text-brand-blue bg-blue-50 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">✓</span> Conception robuste pour environnement industriel</li>
                                    <li className="flex items-center gap-3"><span className="text-brand-blue bg-blue-50 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">✓</span> Certification ISO</li>
                                </ul>
                            </div>

                            <div className="mt-8">
                                <ClientAddToCart product={product} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {related.length > 0 && (
                    <div className="mb-20">
                        <h2 className="text-3xl font-extrabold text-brand-black mb-8 flex items-center gap-4">
                            Produits Similaires
                            <div className="h-1 bg-gray-200 flex-grow rounded-full ml-4 hidden sm:block"></div>
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {related.map(p => (
                                <div key={p.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                                    <Link href={`/produit/${p.reference}`}>
                                        <div className="text-xs text-brand-blue font-bold tracking-widest uppercase mb-2">REF: {p.reference}</div>
                                        <div className="font-extrabold text-brand-black text-lg group-hover:text-brand-blue transition-colors line-clamp-2 leading-snug">{p.name}</div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
