"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PiggyBank,
  CreditCard,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Target,
} from "lucide-react"

// Datos de ejemplo (en una app real vendrían de la base de datos)
const mockData = {
  balance: 125000,
  income: 180000,
  expenses: 55000,
  dollarRate: 1200,
  recentTransactions: [
    { id: 1, description: "Sueldo", amount: 180000, type: "income", category: "Trabajo", date: "2024-01-15" },
    { id: 2, description: "Supermercado", amount: -15000, type: "expense", category: "Alimentos", date: "2024-01-14" },
    { id: 3, description: "Transporte", amount: -8000, type: "expense", category: "Transporte", date: "2024-01-13" },
    { id: 4, description: "Freelance", amount: 25000, type: "income", category: "Trabajo", date: "2024-01-12" },
  ],
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [dollarRate, setDollarRate] = useState(mockData.dollarRate)
  const [isEditingRate, setIsEditingRate] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatUSD = (amount: number) => {
    const usdAmount = amount / dollarRate
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(usdAmount)
  }

  const handleRateUpdate = () => {
    setIsEditingRate(false)
    // Aquí se guardaría en la base de datos
  }

  return (
    <div className="flex flex-col flex-1 space-y-8 animate-fade-in">
      {/* Header minimalista */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          ¡Hola, {user?.name || "Usuario"}! 👋
        </h1>
        <p className="text-muted-foreground">Aquí tienes un resumen de tus finanzas personales</p>
      </div>

      {/* Cotización del Dólar - Con acento teal sutil */}
      <Card className="border border-border bg-card backdrop-blur-md hover:shadow-sm transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-card-foreground">
            <DollarSign className="h-5 w-5 text-teal-400/70 dark:text-teal-300/70" />
            Cotización del Dólar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-card-foreground">
                {formatCurrency(dollarRate)}
              </span>
              <p className="text-sm text-muted-foreground">ARS por USD</p>
            </div>
            <Badge variant="secondary">
              Manual
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Saldo Total */}
        <Card className="border border-border bg-card backdrop-blur-md hover:shadow-sm transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Saldo Total</CardTitle>
            <div className="p-2 bg-background rounded-lg">
              <PiggyBank className="h-4 w-4 text-teal-400 dark:text-teal-300" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {formatCurrency(mockData.balance)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{formatUSD(mockData.balance)}</p>
            <div className="mt-2 flex items-center text-xs text-primary">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+12% este mes</span>
            </div>
          </CardContent>
        </Card>

        {/* Ingresos */}
        <Card className="border border-border bg-card backdrop-blur-md hover:shadow-sm transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ingresos del Mes</CardTitle>
            <div className="p-2 bg-background rounded-lg">
              <TrendingUp className="h-4 w-4 text-teal-400 dark:text-teal-300" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {formatCurrency(mockData.income)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{formatUSD(mockData.income)}</p>
            <div className="mt-2 flex items-center text-xs text-primary">
              <Wallet className="h-3 w-3 mr-1" />
              <span>2 fuentes activas</span>
            </div>
          </CardContent>
        </Card>

        {/* Gastos */}
        <Card className="border border-border bg-card backdrop-blur-md hover:shadow-sm transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Gastos del Mes</CardTitle>
            <div className="p-2 bg-background rounded-lg">
              <TrendingDown className="h-4 w-4 text-card-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {formatCurrency(mockData.expenses)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{formatUSD(mockData.expenses)}</p>
            <div className="mt-2 flex items-center text-xs text-card-foreground">
              <Target className="h-3 w-3 mr-1" />
              <span>Meta: $80,000</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Acciones Rápidas - Con acentos teal */}
      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-card-foreground">
            <Plus className="h-5 w-5 text-teal-400/70 dark:text-teal-300/70" />
            Acciones Rápidas
          </CardTitle>
          <CardDescription className="text-card-foreground">
            Gestiona tus finanzas de manera eficiente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <Button
              className="h-20 flex-col gap-2 bg-teal-400 hover:bg-teal-500 dark:bg-teal-400/80 dark:hover:bg-teal-400/90 text-card-foreground transition-all duration-300"
              size="lg"
            >
              <Plus className="h-5 w-5" />
              <span>Agregar Ingreso</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 border-border hover:bg-background text-card-foreground transition-all duration-300"
              size="lg"
            >
              <CreditCard className="h-5 w-5" />
              <span>Registrar Gasto</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Movimientos Recientes - Con verde azulado */}
      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-card-foreground">
            <ArrowUpRight className="h-5 w-5 text-teal-400/70 dark:text-teal-300/70" />
            Movimientos Recientes
          </CardTitle>
          <CardDescription className="text-card-foreground">Tus últimas transacciones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockData.recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-background transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      transaction.type === "income"
                        ? "bg-teal-50/30 dark:bg-teal-900/10 text-teal-400 dark:text-teal-300"
                        : "bg-background text-card-foreground"
                    }`}
                  >
                    {transaction.type === "income" ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">{transaction.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-medium ${
                      transaction.type === "income"
                        ? "text-teal-400 dark:text-teal-300"
                        : "text-card-foreground"
                    }`}
                  >
                    {formatCurrency(Math.abs(transaction.amount))}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatUSD(Math.abs(transaction.amount))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
