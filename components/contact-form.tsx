"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, Send, User, Mail, MessageSquare, Building } from "lucide-react"
import { gsap } from "gsap"

interface ContactFormProps {
  onClose: () => void
}

export default function ContactForm({ onClose }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "vitrine",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const modalRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    // Animation d'entrée
    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.9, y: isMobile ? 20 : 0 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power2.out" },
      )
    }
  }, [isMobile])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulation d'envoi
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Fermer après 2 secondes
    setTimeout(() => {
      handleClose()
    }, 2000)
  }

  const handleClose = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.9,
        y: isMobile ? 20 : 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: onClose,
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div
        ref={modalRef}
        className={`bg-gray-900 rounded-lg w-full border border-white/20 ${
          isMobile ? "max-w-sm max-h-[90vh] overflow-y-auto" : "max-w-md"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
          <h2 className="text-lg sm:text-xl font-light">Demande de devis</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenu */}
        <div className="p-4 sm:p-6">
          {isSubmitted ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                <Send className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-lg font-medium">Message envoyé !</h3>
              <p className="text-gray-400 text-sm">Nous vous recontacterons dans les 24h.</p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              {/* Nom */}
              <div className="space-y-2">
                <label className="text-sm text-gray-300 flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Nom complet *</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none transition-colors text-sm sm:text-base"
                  placeholder="Votre nom"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm text-gray-300 flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Email *</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none transition-colors text-sm sm:text-base"
                  placeholder="votre@email.com"
                />
              </div>

              {/* Entreprise */}
              <div className="space-y-2">
                <label className="text-sm text-gray-300 flex items-center space-x-2">
                  <Building className="w-4 h-4" />
                  <span>Entreprise</span>
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none transition-colors text-sm sm:text-base"
                  placeholder="Nom de votre entreprise"
                />
              </div>

              {/* Service */}
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Service souhaité *</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-white/40 focus:outline-none transition-colors text-sm sm:text-base"
                >
                  <option value="vitrine">Site Vitrine</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="saas">Plateforme SaaS</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-sm text-gray-300 flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Message *</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={isMobile ? 3 : 4}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none transition-colors resize-none text-sm sm:text-base"
                  placeholder="Décrivez votre projet..."
                />
              </div>

              {/* Bouton */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm sm:text-base">Envoi en cours...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span className="text-sm sm:text-base">Envoyer la demande</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
