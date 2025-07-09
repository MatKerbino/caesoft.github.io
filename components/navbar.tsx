"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = ["home", "about", "course", "campus", "resources", "partners"]
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  const navItems = [
    { id: "home", label: "Início" },
    { id: "about", label: "Sobre" },
    { id: "course", label: "Curso" },
    { id: "campus", label: "Campus" },
    { id: "resources", label: "Recursos" },
    { id: "partners", label: "Parceiros" },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "backdrop-filter backdrop-blur-16 bg-caesoft-ultra-dark/95 shadow-2xl" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => scrollToSection("home")}
                className="focus:outline-none"
                aria-label="Ir para o início"
                type="button"
              >
                <Image 
                  src="caesoftwhite.png" 
                  alt="CAESoft Logo" 
                  width={1119}
                  height={556}
                  className="w-20 h-10 object-contain"
                />
              </button>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                    activeSection === item.id ? "text-white" : "text-caesoft-light hover:text-caesoft-purple"
                  }`}
                >
                  {activeSection === item.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-caesoft-purple to-caesoft-green rounded-full opacity-90 animate-pulse-glow" />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              ))}
              
              {/* Botão Guia do Calouro */}
              <Link
                href="/guia-do-calouro"
                className="relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full bg-gradient-to-r from-caesoft-purple to-caesoft-green text-white hover:shadow-lg hover:shadow-caesoft-purple/30 flex items-center gap-2"
              >
                <BookOpen size={16} />
                <span>Guia do Calouro</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-caesoft-light hover:text-caesoft-purple"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-64 backdrop-filter backdrop-blur-24 bg-gradient-to-b from-black/80 to-caesoft-ultra-dark/85 border-l border-caesoft-purple/20 p-6 pt-20 shadow-2xl">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-white bg-gradient-to-r from-caesoft-purple to-caesoft-green"
                      : "text-caesoft-light hover:text-caesoft-purple hover:bg-caesoft-purple/10"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Link Guia do Calouro no Mobile */}
              <Link
                href="/guia-do-calouro"
                className="relative text-left px-4 py-3 rounded-lg transition-all duration-300 bg-gradient-to-r from-caesoft-purple to-caesoft-green text-white flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <BookOpen size={16} />
                Guia do Calouro
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
