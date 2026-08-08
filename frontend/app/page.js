import Link from "next/link";
import { fetchCategories, fetchFeaturedProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  const categories = await fetchCategories().catch(() => []);
  const featured = await fetchFeaturedProducts().catch(() => []);

  return (
    <div className="bg-gray-50/50">
      {/* Hero Section */}
      <section className="bg-brand-black text-white relative min-h-[700px] flex items-center overflow-hidden">
        {/* Deep Industrial Grid Background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMTBoNDBNMTAgMHY0ME0wIDIwaDQwTTIwIDB2NDBNMCAzMGg0ME0zMCAwdjQwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] opacity-50 z-0"></div>

        {/* Dynamic Glow Orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue rounded-full filter blur-[120px] opacity-30 transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500 rounded-full filter blur-[100px] opacity-20 transform -translate-x-1/2 translate-y-1/3"></div>

        <div className="container mx-auto px-4 z-10 grid md:grid-cols-2 gap-12 items-center relative py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse"></span>
              <span className="text-white/80 font-bold tracking-widest text-xs uppercase">MASSAD ENERGIE • DEPUIS 1994</span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] tracking-tighter mb-8">
              La Puissance <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-blue-400 to-blue-200 drop-shadow-sm">
                Industrielle.
              </span>
            </h1>

            <p className="text-gray-400 mb-10 text-lg leading-relaxed max-w-xl font-medium">
              Spécialistes en force motrice, moteurs électriques, réducteurs et solutions de levage haute performance pour vos projets industriels.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/catalogue" className="bg-brand-blue hover:bg-blue-600 text-white font-extrabold py-4 px-8 rounded-xl shadow-[0_0_40px_-10px_rgba(29,78,216,0.5)] hover:shadow-[0_0_60px_-15px_rgba(29,78,216,0.7)] transition-all duration-300 transform hover:-translate-y-1 text-center border border-blue-500/50">
                EXPLORER LE CATALOGUE
              </Link>
              <Link href="/contact" className="bg-white/5 backdrop-blur-md border border-white/20 hover:bg-white/10 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 text-center">
                DEMANDER UN DEVIS
              </Link>
            </div>
          </div>

          <div className="hidden md:flex justify-end relative">
            <div className="relative w-[450px] h-[450px]">
              {/* Rotating conceptual industrial icon ring */}
              <div className="absolute inset-0 border-2 border-white/10 rounded-full animate-[spin_60s_linear_infinite] border-dashed"></div>
              <div className="absolute inset-4 border border-white/5 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>

              <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/20 to-transparent rounded-full filter blur-xl animate-pulse"></div>

              <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-full border border-white/10 bg-white/5 shadow-2xl">
                <div className="text-[12rem] transform hover:rotate-180 transition-transform duration-[2000ms] ease-in-out cursor-pointer drop-shadow-2xl opacity-90">
                  ⚙️
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Grid */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-brand-black tracking-tight mb-4">Solutions par Industrie</h2>
              <div className="w-20 h-1.5 bg-brand-blue rounded-full"></div>
            </div>
            <Link href="/catalogue" className="text-brand-blue font-bold hover:text-brand-black transition-colors flex items-center gap-2 group">
              Voir tous les secteurs
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.slice(0, 8).map(cat => (
              <Link href={`/catalogue?category=${cat.slug}`} key={cat.id} className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-brand-blue/30 overflow-hidden transform hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-blue/5 to-transparent rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500"></div>

                <div className="w-16 h-16 bg-gray-50 text-brand-blue rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-brand-blue group-hover:text-white transition-all duration-300 shadow-sm relative z-10">
                  🔌
                </div>
                <h3 className="font-extrabold text-gray-900 text-lg group-hover:text-brand-blue transition-colors relative z-10">{cat.name}</h3>
                <p className="text-gray-500 mt-2 text-sm font-medium relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  Découvrir la gamme
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-black tracking-tight mb-4">Produits Phares</h2>
            <div className="w-20 h-1.5 bg-brand-blue mx-auto rounded-full mb-6"></div>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto">Une sélection de nos équipements les plus performants, choisis pour leur robustesse et leur fiabilité en environnement industriel exigeant.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.length > 0 ? featured.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            )) : (
              <div className="col-span-full justify-center flex text-gray-400 italic">Aucun produit phare pour le moment</div>
            )}
          </div>
        </div>
      </section>

      {/* Stats / Precision Banner */}
      <section className="py-24 relative overflow-hidden">
        {/* Dynamic dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-gray-900 to-brand-blue z-0"></div>
        {/* Pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMTBoNDBNMTAgMHY0ME0wIDIwaDQwTTIwIDB2NDBNMCAzMGg0ME0zMCAwdjQwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] opacity-30 z-0"></div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 w-full max-w-5xl shadow-2xl">
            <div className="grid md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
              <div className="pt-8 md:pt-0 transition-transform hover:scale-105 duration-300">
                <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-3 tracking-tighter drop-shadow-lg">1994</div>
                <div className="text-sm font-bold text-brand-blue uppercase tracking-widest">Année de Création</div>
              </div>
              <div className="pt-8 md:pt-0 transition-transform hover:scale-105 duration-300">
                <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-3 tracking-tighter drop-shadow-lg">15k+</div>
                <div className="text-sm font-bold text-brand-blue uppercase tracking-widest">Produits Référencés</div>
              </div>
              <div className="pt-8 md:pt-0 transition-transform hover:scale-105 duration-300">
                <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-3 tracking-tighter drop-shadow-lg">2000+</div>
                <div className="text-sm font-bold text-brand-blue uppercase tracking-widest">Clients Industriels</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
