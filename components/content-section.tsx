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
      <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-xl p-5 border border-white/10 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-lg">Tarifs Site Vitrine</h3>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded-full">Tarif étudiant</span>
            <Euro className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center bg-white/5 rounded-lg p-3">
            <div>
              <span className="text-white font-medium">Site 1 page</span>
              <div className="text-gray-400 text-xs">Landing page optimisée</div>
            </div>
            <span className="text-xl font-bold text-white">250€</span>
          </div>
          <div className="flex justify-between items-center bg-white/5 rounded-lg p-3">
            <div>
              <span className="text-white font-medium">Site 3-5 pages</span>
              <div className="text-gray-400 text-xs">Site vitrine complet</div>
            </div>
            <span className="text-xl font-bold text-white">450€</span>
          </div>
          <div className="flex justify-between items-center bg-white/5 rounded-lg p-3">
            <div>
              <span className="text-white font-medium">Site sur-mesure</span>
              <div className="text-gray-400 text-xs">Fonctionnalités avancées</div>
            </div>
            <span className="text-xl font-bold text-white">À partir de 650€</span>
          </div>
        </div>
      </div>

      {/* Fonctionnalités */}
      <div className="bg-white/5 rounded-xl p-5 border border-white/10">
        <h4 className="font-medium mb-4 text-white">Inclus dans chaque site</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-sm font-medium text-white">Design Sur-Mesure</span>
                <div className="text-xs text-gray-400">Unique à votre marque</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-sm font-medium text-white">SEO Optimisé</span>
                <div className="text-xs text-gray-400">Référencement inclus</div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-sm font-medium text-white">Responsive Design</span>
                <div className="text-xs text-gray-400">Mobile & desktop</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-sm font-medium text-white">Livraison rapide</span>
                <div className="text-xs text-gray-400">1-2 semaines</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onContactClick}
        className="w-full bg-gradient-to-r from-white to-gray-200 text-black py-4 rounded-xl font-semibold hover:from-gray-200 hover:to-gray-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
      >
        <div className="flex items-center justify-center space-x-2">
          <span>Demander un devis gratuit</span>
          <Euro className="w-4 h-4" />
        </div>
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
      <div className="bg-gradient-to-r from-green-500/10 to-green-500/20 rounded-xl p-5 border border-green-500/20 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-lg text-green-300">Tarifs E-commerce</h3>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded-full">Tarif étudiant</span>
            <Euro className="w-5 h-5 text-green-400" />
          </div>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center bg-green-500/10 rounded-lg p-3">
            <div>
              <span className="text-green-200 font-medium">Boutique Simple</span>
              <div className="text-gray-400 text-xs">10-20 produits</div>
            </div>
            <span className="text-xl font-bold text-green-300">750€</span>
          </div>
          <div className="flex justify-between items-center bg-green-500/10 rounded-lg p-3">
            <div>
              <span className="text-green-200 font-medium">Boutique Standard</span>
              <div className="text-gray-400 text-xs">50+ produits, paiements</div>
            </div>
            <span className="text-xl font-bold text-green-300">1 200€</span>
          </div>
          <div className="flex justify-between items-center bg-green-500/10 rounded-lg p-3">
            <div>
              <span className="text-green-200 font-medium">E-commerce Avancé</span>
              <div className="text-gray-400 text-xs">Gestion stocks, analytics</div>
            </div>
            <span className="text-xl font-bold text-green-300">À partir de 1 800€</span>
          </div>
        </div>
      </div>

      {/* Fonctionnalités */}
      <div className="bg-green-500/10 rounded-xl p-5 border border-green-500/20">
        <h4 className="font-medium mb-4 text-green-300">Fonctionnalités E-commerce</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <span className="text-sm font-medium text-green-200">Paiements sécurisés</span>
              <div className="text-xs text-gray-400">Stripe, PayPal intégrés</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
              <Zap className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <span className="text-sm font-medium text-green-200">Gestion des stocks</span>
              <div className="text-xs text-gray-400">Automatisation complète</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <span className="text-sm font-medium text-green-200">Espace client</span>
              <div className="text-xs text-gray-400">Commandes et historique</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
              <Headphones className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <span className="text-sm font-medium text-green-200">Support technique</span>
              <div className="text-xs text-gray-400">3 mois inclus</div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onContactClick}
        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
      >
        <div className="flex items-center justify-center space-x-2">
          <span>Lancer mon e-commerce</span>
          <ShoppingBag className="w-4 h-4" />
        </div>
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
      <div className="bg-gradient-to-r from-blue-500/10 to-blue-500/20 rounded-xl p-5 border border-blue-500/20 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-lg text-blue-300">Tarifs SaaS</h3>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-blue-400 bg-blue-500/20 px-2 py-1 rounded-full">Tarif étudiant</span>
            <Euro className="w-5 h-5 text-blue-400" />
          </div>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center bg-blue-500/10 rounded-lg p-3">
            <div>
              <span className="text-blue-200 font-medium">App Simple</span>
              <div className="text-gray-400 text-xs">Dashboard basique</div>
            </div>
            <span className="text-xl font-bold text-blue-300">2 500€</span>
          </div>
          <div className="flex justify-between items-center bg-blue-500/10 rounded-lg p-3">
            <div>
              <span className="text-blue-200 font-medium">MVP Complet</span>
              <div className="text-gray-400 text-xs">3-4 mois de dev</div>
            </div>
            <span className="text-xl font-bold text-blue-300">6 500€</span>
          </div>
          <div className="flex justify-between items-center bg-blue-500/10 rounded-lg p-3">
            <div>
              <span className="text-blue-200 font-medium">Plateforme Avancée</span>
              <div className="text-gray-400 text-xs">API, intégrations</div>
            </div>
            <span className="text-xl font-bold text-blue-300">À partir de 12 000€</span>
          </div>
        </div>
        <div className="mt-4 p-3 bg-blue-500/10 rounded-lg">
          <div className="text-xs text-blue-300 font-medium">Maintenance mensuelle</div>
          <div className="text-blue-200">150€ - 500€/mois selon complexité</div>
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
