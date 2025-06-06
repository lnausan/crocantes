"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { PlusCircle, TrendingUp, TrendingDown } from "lucide-react"

const categories = {
  income: ["Sueldo", "Freelance", "Inversiones", "Alquiler", "Otros Ingresos"],
  expense: [
    "Alimentos",
    "Transporte",
    "Vivienda",
    "Servicios",
    "Entretenimiento",
    "Salud",
    "Educación",
    "Ropa",
    "Otros Gastos",
  ],
}

export default function AddTransactionPage() {
  const [type, setType] = useState<"income" | "expense">("expense")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [isLoading, setIsLoading] = useState(false)

  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular guardado
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "¡Movimiento agregado!",
      description: `${type === "income" ? "Ingreso" : "Gasto"} de $${amount} registrado correctamente`,
    })

    // Limpiar formulario
    setAmount("")
    setDescription("")
    setCategory("")
    setDate(new Date().toISOString().split("T")[0])
    setIsLoading(false)
  }

  const formatCurrency = (value: string) => {
    const number = Number.parseFloat(value.replace(/[^\d]/g, ""))
    if (isNaN(number)) return ""
    return new Intl.NumberFormat("es-AR").format(number)
  }

  return (
    <div className="flex flex-col flex-1 max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground dark:text-foreground">Agregar Movimiento</h1>
        <p className="text-muted-foreground dark:text-muted-foreground">Registra tus ingresos y gastos para mantener control de tus finanzas</p>
      </div>

      <Card className="border border-border bg-card/50 dark:bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground dark:text-foreground">
            <PlusCircle className="h-5 w-5 text-teal-600/70 dark:text-teal-500/70" />
            Nuevo Movimiento
          </CardTitle>
          <CardDescription className="text-muted-foreground dark:text-muted-foreground">Completa los datos del movimiento financiero</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={type} onValueChange={(value) => setType(value as "income" | "expense")}>
            <TabsList className="grid w-full grid-cols-2 bg-slate-100/60 dark:bg-slate-700/60">
              <TabsTrigger 
                value="income" 
                className="flex items-center gap-2 text-foreground dark:text-foreground data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-teal-600 dark:data-[state=active]:text-teal-500"
              >
                <TrendingUp className="h-4 w-4" />
                Ingreso
              </TabsTrigger>
              <TabsTrigger 
                value="expense" 
                className="flex items-center gap-2 text-foreground dark:text-foreground data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-slate-800 dark:data-[state=active]:text-slate-200"
              >
                <TrendingDown className="h-4 w-4" />
                Gasto
              </TabsTrigger>
            </TabsList>

            <TabsContent value={type} className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-foreground dark:text-foreground">Monto (ARS)</Label>
                    <Input
                      id="amount"
                      type="text"
                      placeholder="0"
                      value={amount}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^\d]/g, "")
                        setAmount(value)
                      }}
                      required
                      className="text-lg border-border bg-card/50 dark:bg-slate-800/50 focus:border-teal-500 focus:ring-teal-500"
                    />
                    {amount && <p className="text-sm text-muted-foreground dark:text-muted-foreground">${formatCurrency(amount)}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-foreground dark:text-foreground">Fecha</Label>
                    <Input 
                      id="date" 
                      type="date" 
                      value={date} 
                      onChange={(e) => setDate(e.target.value)} 
                      required 
                      className="border-border bg-card/50 dark:bg-slate-800/50 focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-foreground dark:text-foreground">Categoría</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger className="border-border bg-card/50 dark:bg-slate-800/50 focus:border-teal-500 focus:ring-teal-500">
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories[type].map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-foreground dark:text-foreground">Descripción</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe el movimiento..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={3}
                    className="border-border bg-card/50 dark:bg-slate-800/50 focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-teal-700 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-500 text-white" 
                  size="lg" 
                  disabled={isLoading}
                >
                  {isLoading ? "Guardando..." : `Agregar ${type === "income" ? "Ingreso" : "Gasto"}`}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
