'use client'

import Link from 'next/link'
import { Equal, X } from 'lucide-react'
import { cn } from '@/src/lib/utils'
import { Button } from '../ui/button'
import { ROUTE } from "@/src/constants/routes"
import { useEffect, useState } from 'react'
import { Dialog, DialogTrigger } from '../ui/dialog'
import LoginDialogContent from './LoginDialog'

const menuItems = [
  { name: 'Inicio', href: ROUTE.HOME },
  { name: 'Medicamentos', href: ROUTE.ALL_PRODUCTS },
  { name: 'Categorías', href: ROUTE.CATEGORIES },
  { name: 'Inventario', href: ROUTE.CART },
]

export const Navbar = () => {
  const [menuState, setMenuState] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="relative">
      <nav
        data-state={menuState && 'active'}
        className="fixed top-0 left-0 right-0 z-50 px-4"
      >
        <div
          className={cn(
            'mx-auto max-w-7xl flex items-center justify-between py-3 transition-all duration-300',
            isScrolled
              ? 'mt-2 rounded-2xl bg-background/70 backdrop-blur-lg border px-4'
              : 'bg-background px-4'
          )}
        >

          {/* LOGO */}
          <Link href={ROUTE.HOME} className="flex items-center gap-2">
            <h3 className="font-bold text-xl">
              Medi<span className="text-primary">Stock</span>
            </h3>
          </Link>

          {/* BOTÓN MOBILE */}
          <button
            onClick={() => setMenuState(!menuState)}
            className="lg:hidden p-2"
          >
            {menuState ? <X size={22} /> : <Equal size={22} />}
          </button>

          {/* MENU DESKTOP */}
          <ul className="hidden lg:flex gap-8 text-sm">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="hover:text-primary transition"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* ACCIONES */}
          <div className="hidden lg:flex items-center gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  Login
                </Button>
              </DialogTrigger>
              <LoginDialogContent />
            </Dialog>
          </div>
        </div>

        {/* MENU MOBILE */}
        {menuState && (
          <div className="lg:hidden mt-2 mx-4 rounded-2xl border bg-background shadow-lg p-4 space-y-4">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setMenuState(false)}
                className="block py-2 hover:text-primary"
              >
                {item.name}
              </Link>
            ))}

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">
                  Login
                </Button>
              </DialogTrigger>
              <LoginDialogContent />
            </Dialog>
          </div>
        )}
      </nav>
    </header>
  )
}