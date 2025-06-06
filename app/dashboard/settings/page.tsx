"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import { User, Shield, Palette, Settings } from "lucide-react"

export default function SettingsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSaveProfile = async () => {
    setIsLoading(true)
    // Simular guardado
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Perfil actualizado",
      description: "Tus datos han sido guardados correctamente",
    })
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col flex-1 max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground dark:text-foreground">Configuración</h1>
        <p className="text-muted-foreground dark:text-muted-foreground">Personaliza tu experiencia en Crocantes</p>
      </div>

      {/* Perfil de Usuario */}
      <Card className="border border-border bg-card/50 dark:bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground dark:text-foreground">
            <User className="h-5 w-5 text-teal-600/70 dark:text-teal-500/70" />
            Perfil
          </CardTitle>
          <CardDescription className="text-muted-foreground dark:text-muted-foreground">Actualiza tu información personal</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground dark:text-foreground">Nombre</Label>
              <Input
                id="name"
                placeholder="Tu nombre"
                className="border-border bg-card/50 dark:bg-card/50 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground dark:text-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                className="border-border bg-card/50 dark:bg-card/50 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
            <Button 
              type="submit" 
              className="bg-teal-700 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-500 text-foreground"
            >
              Guardar cambios
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Preferencias */}
      <Card className="border border-border bg-card/50 dark:bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground dark:text-foreground">
            <Settings className="h-5 w-5 text-teal-600/70 dark:text-teal-500/70" />
            Preferencias
          </CardTitle>
          <CardDescription className="text-muted-foreground dark:text-muted-foreground">Configura tus preferencias de la aplicación</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-foreground dark:text-foreground">Modo oscuro</Label>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground">Cambia entre tema claro y oscuro</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-foreground dark:text-foreground">Notificaciones</Label>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground">Recibe alertas sobre tus movimientos</p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seguridad */}
      <Card className="border border-border bg-card/50 dark:bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground dark:text-foreground">
            <Shield className="h-5 w-5 text-teal-600/70 dark:text-teal-500/70" />
            Seguridad
          </CardTitle>
          <CardDescription className="text-muted-foreground dark:text-muted-foreground">Gestiona la seguridad de tu cuenta</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password" className="text-foreground dark:text-foreground">Contraseña actual</Label>
              <Input
                id="current-password"
                type="password"
                className="border-border bg-card/50 dark:bg-card/50 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-foreground dark:text-foreground">Nueva contraseña</Label>
              <Input
                id="new-password"
                type="password"
                className="border-border bg-card/50 dark:bg-card/50 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-foreground dark:text-foreground">Confirmar contraseña</Label>
              <Input
                id="confirm-password"
                type="password"
                className="border-border bg-card/50 dark:bg-card/50 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
            <Button 
              type="submit" 
              className="bg-teal-700 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-500 text-foreground"
            >
              Cambiar contraseña
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
