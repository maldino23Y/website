"use client";

import { useState } from "react";
import { submitContact } from "@/lib/api";
import { useAppContext } from "@/lib/AppContext";
import Link from "next/link";

export default function Contact() {
    const { showToast } = useAppContext();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: '' }
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            await submitContact(formData);
            setStatus({ type: 'success', message: '✅ Votre message a été envoyé avec succès par email !' });
            showToast("Message envoyé !");
            setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        } catch (error) {
            setStatus({ type: 'error', message: `❌ Échec: ${error.message}` });
            showToast("Échec de l'envoi", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-brand-white min-h-screen py-10">
            <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <div className="text-sm text-gray-500 mb-8 flex gap-2">
                    <Link href="/" className="hover:text-brand-blue font-medium transition-colors">Accueil</Link>
                    <span>/</span>
                    <span className="text-gray-800 font-bold">Contact</span>
                </div>

                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-black mb-6">Contactez-nous</h1>
                        <div className="w-20 h-1.5 bg-brand-blue mx-auto mb-8 rounded-full"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                            Notre équipe est à votre disposition pour toute demande de devis, information technique ou support. Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        {/* Contact Info */}
                        <div className="md:col-span-1 space-y-6">
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
                                <div className="w-14 h-14 bg-blue-50 text-brand-blue rounded-full flex items-center justify-center text-2xl mb-6">📞</div>
                                <h3 className="font-bold text-brand-black text-xl mb-3">Téléphone</h3>
                                <p className="text-gray-600 text-lg font-medium tracking-wide">06 74 50 84 91</p>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
                                <div className="w-14 h-14 bg-blue-50 text-brand-blue rounded-full flex items-center justify-center text-2xl mb-6">✉️</div>
                                <h3 className="font-bold text-brand-black text-xl mb-3">Email</h3>
                                <p className="text-gray-600 font-medium">missaadothmane@gmail.com</p>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
                                <div className="w-14 h-14 bg-blue-50 text-brand-blue rounded-full flex items-center justify-center text-2xl mb-6">📍</div>
                                <h3 className="font-bold text-brand-black text-xl mb-3">Adresse</h3>
                                <p className="text-gray-600 font-medium leading-relaxed">Massad Energie<br />Zone Industrielle<br />Maroc</p>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="md:col-span-2 bg-white p-10 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue opacity-5 rounded-bl-[100px]"></div>
                            <h2 className="text-3xl font-extrabold text-brand-black mb-8 relative z-10">Envoyez-nous un message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Nom complet *</label>
                                        <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all" placeholder="Votre nom" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Téléphone</label>
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all" placeholder="Votre numéro" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Email *</label>
                                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all" placeholder="votre@email.com" />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Sujet *</label>
                                    <input required type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all" placeholder="Sujet de votre message" />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Message *</label>
                                    <textarea required name="message" value={formData.message} onChange={handleChange} rows="6" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all resize-none" placeholder="Comment pouvons-nous vous aider ?"></textarea>
                                </div>

                                {status && (
                                    <div className={`p-4 rounded-lg font-bold ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                                        {status.message}
                                    </div>
                                )}

                                <button type="submit" disabled={loading} className="w-full md:w-auto bg-brand-blue hover:bg-brand-blue-dark text-white font-bold py-4 px-10 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed">
                                    {loading ? "ENVOI EN COURS..." : "ENVOYER LE MESSAGE"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
