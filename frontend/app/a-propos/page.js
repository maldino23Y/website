import Link from "next/link";
import { fetchTestimonials } from "@/lib/api";

export const metadata = {
    title: "À Propos | MASSAD ENERGIE",
    description: "Découvrez notre histoire, notre équipe et notre mission depuis 1994."
};

export default async function About() {
    const testimonials = await fetchTestimonials().catch(() => []);

    return (
        <div className="bg-brand-white min-h-screen">
            {/* Hero */}
            <section className="bg-brand-blue text-white py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 text-[25rem] leading-none transform translate-x-1/4 -translate-y-1/4">⚙️</div>
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">À Propos de MASSAD ENERGIE</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                        Votre expert en force motrice depuis 1994. Nous fournissons des équipements industriels de la plus haute qualité.
                    </p>
                </div>
            </section>

            {/* History */}
            <section className="py-24">
                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-extrabold text-brand-black mb-6">Notre Histoire</h2>
                        <div className="w-20 h-1.5 bg-brand-blue mb-8 rounded-full"></div>
                        <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                            Fondée en 1994, MASSAD ENERGIE s'est imposée comme un leader incontournable dans le domaine de l'importation et la distribution d'équipements industriels au Maroc.
                        </p>
                        <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                            Avec presque trois décennies d'expérience, nous avons su développer des partenariats stratégiques avec les plus grands fabricants mondiaux de moteurs électriques, motoréducteurs, systèmes de ventilation et de transmission mécanique.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Notre force réside dans notre capacité à comprendre les spécificités de chaque secteur industriel et à proposer des solutions sur mesure qui optimisent la productivité de nos clients.
                        </p>
                    </div>
                    <div className="bg-gray-50 p-8 rounded-2xl relative shadow-sm border border-gray-100">
                        <div className="absolute -top-6 -left-6 w-32 h-32 bg-brand-black rounded-full opacity-5"></div>
                        <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-brand-blue rounded-full opacity-10 animate-pulse"></div>
                        <div className="aspect-video bg-white rounded-xl shadow-lg flex items-center justify-center text-5xl text-brand-blue relative z-10 border border-gray-100">
                            🏢 Siège Social
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-extrabold text-brand-black mb-6">Ils Nous Font Confiance</h2>
                        <div className="w-20 h-1.5 bg-brand-blue mx-auto rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        {testimonials.length > 0 ? testimonials.map(t => (
                            <div key={t.id} className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 relative hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
                                <div className="absolute top-6 right-6 text-6xl text-gray-100 font-serif leading-none">"</div>
                                <div className="flex text-brand-blue mb-6">
                                    {Array.from({ length: t.rating }).map((_, i) => <span key={i} className="text-xl">★</span>)}
                                </div>
                                <p className="text-gray-600 italic mb-8 relative z-10 text-lg leading-relaxed">"{t.content}"</p>
                                <div className="mt-auto border-t border-gray-50 pt-6">
                                    <h4 className="font-extrabold text-brand-black text-lg">{t.client_name}</h4>
                                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{t.company}</span>
                                </div>
                            </div>
                        )) : (
                            <div className="col-span-full text-center text-gray-500 italic">Aucun témoignage pour le moment.</div>
                        )}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-brand-black py-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-blue opacity-10 filter blur-3xl"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <h2 className="text-4xl font-extrabold text-white mb-8">Prêt à collaborer avec nous ?</h2>
                    <Link href="/contact" className="inline-block bg-brand-blue text-white font-bold py-4 px-10 rounded-lg hover:bg-brand-blue-dark transition-all shadow-lg transform hover:-translate-y-1 hover:shadow-2xl">
                        DEMANDER UN DEVIS
                    </Link>
                </div>
            </section>
        </div>
    );
}
