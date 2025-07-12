"use client"

import { ShoppingBag, Zap, Star, Check, Globe, CreditCard, Users, Euro, Clock, Headphones } from "lucide-react"
import type { ContentMode } from "@/app/page"

interface ContentSectionProps {
  mode: ContentMode
  onContactClick: () => void
}

export default function ContentSection({ mode, onContactClick }: ContentSectionProps) {
  const renderVitrineContent = () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-3 py-1 text-sm">
          <Globe className="w-4 h-4" />
          <span>Site Vitrine Premium</span>
        </div>
        <h2 className="text-2xl lg:text-3xl font-light">
          Votre présence digitale
          <span className="block text-gray-300 font-extralight">exceptionnelle</span>
        </h2>
        <p className="text-gray-400 leading-relaxed">
          Créez une première impression mémorable avec un site vitrine élégant qui reflète parfaitement votre marque.
        </p>
      </div>

      {/* Prix */}
      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">Tarifs Site Vitrine</h3>
          <Euro className="w-5 h-5 text-gray-400" />
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Site 5 pages</span>
            <span>1 500€</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Site 10 pages</span>
            <span>2 500€</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Site sur-mesure</span>
            <span>À partir de 3 500€</span>
          </div>
        </div>
      </div>

      {/* Fonctionnalités */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-white" />
            <span className="text-sm">Design Sur-Mesure</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-white" />
            <span className="text-sm">SEO Optimisé</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-white" />
            <span className="text-sm">Responsive Design</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-white" />
            <span className="text-sm">Livraison 2-3 semaines</span>
          </div>
        </div>
      </div>

      <button
        onClick={onContactClick}
        className="w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
      >
        Demander un devis gratuit
      </button>
    </div>
  )

  const renderEcommerceContent = () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="inline-flex items-center space-x-2 bg-green-500/20 rounded-full px-3 py-1 text-sm text-green-300">
          <ShoppingBag className="w-4 h-4" />
          <span>E-commerce Avancé</span>
        </div>
        <h2 className="text-2xl lg:text-3xl font-light">
          Vendez en ligne
          <span className="block text-gray-300 font-extralight">efficacement</span>
        </h2>
        <p className="text-gray-400 leading-relaxed">
          Boutique en ligne complète avec gestion des stocks, paiements sécurisés et analytics détaillés.
        </p>
      </div>

      {/* Prix */}
      <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-green-300">Tarifs E-commerce</h3>
          <Euro className="w-5 h-5 text-green-400" />
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Boutique Standard</span>
            <span className="text-green-300">2 500€</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Boutique Premium</span>
            <span className="text-green-300">4 500€</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Marketplace</span>
            <span className="text-green-300">À partir de 7 500€</span>
          </div>
        </div>
      </div>

      {/* Fonctionnalités */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <CreditCard className="w-4 h-4 text-green-400" />
          <span className="text-sm">Paiements sécurisés (Stripe, PayPal)</span>
        </div>
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-green-400" />
          <span className="text-sm">Gestion automatisée des stocks</span>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-green-400" />
          <span className="text-sm">Espace client personnalisé</span>
        </div>
        <div className="flex items-center space-x-2">
          <Headphones className="w-4 h-4 text-green-400" />
          <span className="text-sm">Support technique inclus</span>
        </div>
      </div>

      <button
        onClick={onContactClick}
        className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
      >
        Lancer mon e-commerce
      </button>
    </div>
  )

  const renderSaasContent = () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="inline-flex items-center space-x-2 bg-blue-500/20 rounded-full px-3 py-1 text-sm text-blue-300">
          <Zap className="w-4 h-4" />
          <span>Plateforme SaaS</span>
        </div>
        <h2 className="text-2xl lg:text-3xl font-light">
          Application web
          <span className="block text-gray-300 font-extralight">sur-mesure</span>
        </h2>
        <p className="text-gray-400 leading-relaxed">
          Développement d'applications web complexes avec tableaux de bord, API et intégrations tierces.
        </p>
      </div>

      {/* Prix */}
      <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-blue-300">Tarifs SaaS</h3>
          <Euro className="w-5 h-5 text-blue-400" />
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">MVP (3 mois)</span>
            <span className="text-blue-300">15 000€</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Plateforme complète</span>
            <span className="text-blue-300">25 000€ - 50 000€</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Maintenance mensuelle</span>
            <span className="text-blue-300">500€ - 2 000€</span>
          </div>
        </div>
      </div>

      {/* Fonctionnalités */}
      <div className="space-y-2">
        {[
          "Architecture scalable et sécurisée",
          "Tableaux de bord interactifs",
          "API REST et intégrations",
          "Authentification multi-niveaux",
        ].map((feature, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <span className="text-sm text-gray-300">{feature}</span>
          </div>
        ))}
      </div>

      {/* Témoignage */}
      <div className="bg-white/5 rounded-lg p-4 space-y-2">
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
          ))}
        </div>
        <p className="text-xs text-gray-300 italic">
          "Développement rapide et solution parfaitement adaptée à nos besoins."
        </p>
        <p className="text-xs text-gray-500">— Marie Dubois, CTO</p>
      </div>

      <button
        onClick={onContactClick}
        className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
      >
        Planifier un appel
      </button>
    </div>
  )

  switch (mode) {
    case "vitrine":
      return renderVitrineContent()
    case "ecommerce":
      return renderEcommerceContent()
    case "saas":
      return renderSaasContent()
    default:
      return renderVitrineContent()
  }
}
