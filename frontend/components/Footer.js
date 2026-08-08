import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-brand-black text-white pt-20 pb-10 border-t-[6px] border-brand-blue mt-auto relative overflow-hidden">
            {/* Decorative Background blur */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue rounded-full filter blur-[100px] opacity-10"></div>

            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 relative z-10">
                <div>
                    <h2 className="text-white font-extrabold text-3xl tracking-tighter mb-6">MASSAD ENERGIE</h2>
                    <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                        Votre Partenaire En Force Motrice. Spécialistes en moteurs électriques et équipements industriels depuis 1994.
                    </p>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-6 text-white uppercase tracking-wider">Liens Rapides</h3>
                    <ul className="space-y-3 text-sm text-gray-400 font-medium">
                        <li><Link href="/" className="hover:text-brand-blue transition-colors">Accueil</Link></li>
                        <li><Link href="/catalogue" className="hover:text-brand-blue transition-colors">Catalogue de Produits</Link></li>
                        <li><Link href="/a-propos" className="hover:text-brand-blue transition-colors">À Propos de Nous</Link></li>
                        <li><Link href="/contact" className="hover:text-brand-blue transition-colors">Nous Contacter</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-6 text-white uppercase tracking-wider">Catégories</h3>
                    <ul className="space-y-3 text-sm text-gray-400 font-medium">
                        <li><Link href="/catalogue?category=moteurs-electriques" className="hover:text-brand-blue transition-colors">Moteurs Electriques</Link></li>
                        <li><Link href="/catalogue?category=moteurs-reducteurs" className="hover:text-brand-blue transition-colors">Moteurs Réducteurs</Link></li>
                        <li><Link href="/catalogue?category=vibration" className="hover:text-brand-blue transition-colors">Vibration</Link></li>
                        <li><Link href="/catalogue?category=ventilation" className="hover:text-brand-blue transition-colors">Ventilation</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-6 text-white uppercase tracking-wider">Contact</h3>
                    <ul className="space-y-4 text-sm text-gray-400 font-medium">
                        <li className="flex items-center gap-3">
                            <span className="text-brand-blue">📞</span> 06 74 50 84 91
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-brand-blue">✉️</span> missaadothmane@gmail.com
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-brand-blue">📍</span> Maroc
                        </li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto px-4 pt-8 border-t border-gray-800 text-center text-sm font-medium text-gray-500 relative z-10">
                <p>Copyright &copy; {new Date().getFullYear()} MASSAD ENERGIE. Tous droits réservés.</p>
            </div>
        </footer>
    );
}
