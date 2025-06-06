"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Home, PlusCircle, BarChart3, Calendar, Settings, LogOut, Menu, X, DollarSign } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Agregar Movimiento", href: "/dashboard/add", icon: PlusCircle },
  { name: "Análisis", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Historial", href: "/dashboard/history", icon: Calendar },
  { name: "Configuración", href: "/dashboard/settings", icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 dark:border-teal-400"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const handleSignOut = async () => {
    await signOut()
    router.push("/auth")
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-r border-slate-200/60 dark:border-slate-700/60 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200/60 dark:border-slate-700/60">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-700 dark:bg-teal-600">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold text-slate-800 dark:text-slate-200">Crocantes</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-teal-700 text-white dark:bg-teal-600 dark:text-white"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-teal-50 dark:hover:bg-teal-900/20",
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-slate-200/60 dark:border-slate-700/60">
          <div className="flex items-center justify-between mb-4 p-3 rounded-lg bg-slate-50/60 dark:bg-slate-700/60">
            <div className="text-sm">
              <p className="font-medium text-slate-800 dark:text-slate-200">{user.name || "Usuario"}</p>
              <p className="text-slate-500 dark:text-slate-400 truncate text-xs">{user.email}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100/60 dark:hover:bg-slate-700/60"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 items-center justify-between bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-700/60 px-4 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-4 w-4" />
          </Button>

          <div className="flex items-center space-x-4 ml-auto">
            <ThemeToggle />
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 min-h-[calc(100vh-4rem)]">{children}</main>
      </div>
    </div>
  )
}
