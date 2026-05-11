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
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // 🔐 traer usuario
  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => setUser(data.user))
      .finally(() => setLoading(false))
  }, [])

  // scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
    setDropdownOpen(false)
  }

  if (loading) {
    return (
      <header className="h-16 border-b flex items-center px-4">
        <div className="animate-pulse">Loading...</div>
      </header>
    )
  }

  return (
    <header className="relative">
      <nav className="fixed top-0 left-0 right-0 z-50 px-4">
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

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMenuState(!menuState)}
            className="lg:hidden p-2"
          >
            {menuState ? <X size={22} /> : <Equal size={22} />}
          </button>

          {/* DESKTOP MENU */}
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

          {/* AUTH SECTION */}
          <div className="hidden lg:flex items-center gap-3 relative">

            {user ? (
              <>
                {/* AVATAR */}
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center"
                >
                  {user.email?.charAt(0).toUpperCase()}
                </button>

                {/* DROPDOWN */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-12 w-52 bg-white border rounded-xl shadow-lg z-50">

                    <div className="p-3 border-b">
                      <p className="text-sm font-medium">{user.email}</p>
                      <p className="text-xs text-gray-500">{user.rol}</p>
                    </div>

                    {user.rol === 'admin' && (
                      <Link
                        href={ROUTE.DASHBOARD}
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Dashboard
                      </Link>
                    )}

                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">Login</Button>
                </DialogTrigger>
                <LoginDialogContent />
              </Dialog>
            )}

          </div>
        </div>

        {/* MOBILE MENU */}
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

            {/* AUTH MOBILE */}
            {user ? (
              <>
                <div className="text-sm border-t pt-3">
                  <p>{user.email}</p>
                  <p className="text-xs text-gray-500">{user.rol}</p>
                </div>

                {user.rol === 'admin' && (
                  <Link
                    href={ROUTE.DASHBOARD}
                    className="block py-2 hover:text-primary"
                    onClick={() => setMenuState(false)}
                  >
                    Dashboard
                  </Link>
                )}

                <button
                  onClick={logout}
                  className="w-full text-left py-2 text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    Login
                  </Button>
                </DialogTrigger>
                <LoginDialogContent />
              </Dialog>
            )}

          </div>
        )}
      </nav>
    </header>
  )
}