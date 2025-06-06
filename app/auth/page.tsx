"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth-context"
import { ThemeToggle } from "@/components/theme-toggle"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff, Loader2, DollarSign } from "lucide-react"

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [resetEmail, setResetEmail] = useState("")
  const [showReset, setShowReset] = useState(false)

  const { signIn, signUp, resetPassword } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const { error } = await signIn(email, password)

    if (error) {
      toast({
        title: "Error al iniciar sesión",
        description: error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "¡Bienvenido!",
        description: "Has iniciado sesión correctamente",
      })
      router.push("/dashboard")
    }

    setIsLoading(false)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const { error } = await signUp(email, password, name)

    if (error) {
      toast({
        title: "Error al registrarse",
        description: error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "¡Registro exitoso!",
        description: "Revisa tu email para confirmar tu cuenta",
      })
    }

    setIsLoading(false)
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const { error } = await resetPassword(resetEmail)

    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Email enviado",
        description: "Revisa tu correo para restablecer tu contraseña",
      })
      setShowReset(false)
    }

    setIsLoading(false)
  }

  if (showReset) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background/5 dark:bg-card/5 p-4">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <Card className="w-full max-w-md animate-fade-in border border-border dark:border-card/10 bg-background dark:bg-card backdrop-blur-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-background dark:bg-card">
              <DollarSign className="h-6 w-6 text-teal-400 dark:text-teal-300" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground dark:text-card-foreground">
              Recuperar Contraseña
            </CardTitle>
            <CardDescription className="text-muted-foreground dark:text-card-foreground/60">
              Ingresa tu email para recibir un enlace de recuperación
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email" className="text-muted-foreground dark:text-card-foreground/60">
                  Email
                </Label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="tu@email.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                  className="border-border bg-background dark:bg-card focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-teal-400 hover:bg-teal-500 dark:bg-teal-400/80 dark:hover:bg-teal-400/90 text-foreground"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Enviar enlace
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full text-muted-foreground hover:text-foreground dark:text-card-foreground/60 dark:hover:text-card-foreground"
                onClick={() => setShowReset(false)}
              >
                Volver al login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-card p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-md animate-fade-in border border-border dark:border-card/10 bg-background dark:bg-card backdrop-blur-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-background dark:bg-card">
            <DollarSign className="h-6 w-6 text-teal-400 dark:text-teal-300" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground dark:text-card-foreground">Crocantes</CardTitle>
          <CardDescription className="text-muted-foreground dark:text-card-foreground/60">
            Gestiona tus finanzas personales de manera inteligente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-background dark:bg-card">
              <TabsTrigger
                value="signin"
                className="text-muted-foreground dark:text-card-foreground data-[state=active]:bg-background dark:data-[state=active]:bg-card data-[state=active]:text-foreground dark:data-[state=active]:text-card-foreground"
              >
                Iniciar Sesión
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="text-muted-foreground dark:text-card-foreground data-[state=active]:bg-background dark:data-[state=active]:bg-card data-[state=active]:text-foreground dark:data-[state=active]:text-card-foreground"
              >
                Registrarse
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-4">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="text-muted-foreground dark:text-card-foreground/60">
                    Email
                  </Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-border bg-background dark:bg-card focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password" className="text-muted-foreground dark:text-card-foreground/60">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Input
                      id="signin-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-border bg-background dark:bg-card focus:border-teal-500 focus:ring-teal-500"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-foreground dark:text-card-foreground/60 dark:hover:text-card-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-teal-400 hover:bg-teal-500 dark:bg-teal-400/80 dark:hover:bg-teal-400/90 text-foreground"
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Iniciar Sesión
                </Button>
                <Button
                  type="button"
                  variant="link"
                  className="w-full text-sm text-teal-400 hover:text-teal-500 dark:text-teal-300 dark:hover:text-teal-200"
                  onClick={() => setShowReset(true)}
                >
                  ¿Olvidaste tu contraseña?
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-muted-foreground dark:text-card-foreground/60">
                    Nombre (opcional)
                  </Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-border bg-background dark:bg-card focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-muted-foreground dark:text-card-foreground/60">
                    Email
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-border bg-background dark:bg-card focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-muted-foreground dark:text-card-foreground/60">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className="border-border bg-background dark:bg-card focus:border-teal-500 focus:ring-teal-500"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-foreground dark:text-card-foreground/60 dark:hover:text-card-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground dark:text-card-foreground/60">Mínimo 6 caracteres</p>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-teal-400 hover:bg-teal-500 dark:bg-teal-400/80 dark:hover:bg-teal-400/90 text-foreground"
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Crear Cuenta
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
