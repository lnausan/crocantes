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
    <div className="flex flex-col flex-1 space-y-6 animate-fade-in">
      {/* Header minimalista */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-200">
          ¡Hola, {user?.name || "Usuario"}! 👋
        </h1>
        <p className="text-slate-600 dark:text-slate-400">Aquí tienes un resumen de tus finanzas personales</p>
      </div>

      {/* Cotización del Dólar - Con acento teal sutil */}
      <Card className="border border-slate-200/60 dark:border-slate-700/60 bg-white/50 dark:bg-slate-800/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <DollarSign className="h-5 w-5 text-teal-600/70 dark:text-teal-400/70" />
            Cotización del Dólar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              {isEditingRate ? (
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={dollarRate}
                    onChange={(e) => setDollarRate(Number(e.target.value))}
                    className="w-32 border-slate-200 dark:border-slate-700"
                  />
                  <Button
                    size="sm"
                    onClick={handleRateUpdate}
                    className="bg-teal-700 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-500 text-white"
                  >
                    Guardar
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsEditingRate(false)}
                    className="text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                  >
                    Cancelar
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-slate-800 dark:text-slate-200">${dollarRate}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsEditingRate(true)}
                    className="text-teal-600/70 hover:text-teal-700 dark:text-teal-400/70 dark:hover:text-teal-300"
                  >
                    Editar
                  </Button>
                </div>
              )}
              <p className="text-sm text-slate-500 dark:text-slate-400">ARS por USD</p>
            </div>
            <Badge variant="secondary" className="bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
              Manual
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Resumen Financiero - Cards con verde azulado */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Saldo Total */}
        <Card className="border border-slate-200/60 dark:border-slate-700/60 bg-white/50 dark:bg-slate-800/50 hover:shadow-sm transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Saldo Total</CardTitle>
            <div className="p-2 bg-teal-50 dark:bg-teal-900/30 rounded-lg">
              <PiggyBank className="h-4 w-4 text-teal-600 dark:text-teal-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              {formatCurrency(mockData.balance)}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{formatUSD(mockData.balance)}</p>
            <div className="mt-2 flex items-center text-xs text-teal-600/80 dark:text-teal-400/80">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+12% este mes</span>
            </div>
          </CardContent>
        </Card>

        {/* Ingresos */}
        <Card className="border border-slate-200/60 dark:border-slate-700/60 bg-white/50 dark:bg-slate-800/50 hover:shadow-sm transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Ingresos del Mes</CardTitle>
            <div className="p-2 bg-teal-50 dark:bg-teal-900/30 rounded-lg">
              <TrendingUp className="h-4 w-4 text-teal-600 dark:text-teal-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              {formatCurrency(mockData.income)}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{formatUSD(mockData.income)}</p>
            <div className="mt-2 flex items-center text-xs text-teal-600/80 dark:text-teal-400/80">
              <Wallet className="h-3 w-3 mr-1" />
              <span>2 fuentes activas</span>
            </div>
          </CardContent>
        </Card>

        {/* Gastos */}
        <Card className="border border-slate-200/60 dark:border-slate-700/60 bg-white/50 dark:bg-slate-800/50 hover:shadow-sm transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Gastos del Mes</CardTitle>
            <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
              <TrendingDown className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              {formatCurrency(mockData.expenses)}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{formatUSD(mockData.expenses)}</p>
            <div className="mt-2 flex items-center text-xs text-slate-600/80 dark:text-slate-400/80">
              <Target className="h-3 w-3 mr-1" />
              <span>Meta: $80,000</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Acciones Rápidas - Con acentos teal */}
      <Card className="border border-slate-200/60 dark:border-slate-700/60 bg-white/50 dark:bg-slate-800/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <Plus className="h-5 w-5 text-teal-600/70 dark:text-teal-400/70" />
            Acciones Rápidas
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">
            Gestiona tus finanzas de manera eficiente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <Button
              className="h-20 flex-col gap-2 bg-teal-700 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-500 text-white"
              size="lg"
            >
              <Plus className="h-5 w-5" />
              <span>Agregar Ingreso</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 border-slate-300/60 dark:border-slate-600/60 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300"
              size="lg"
            >
              <CreditCard className="h-5 w-5" />
              <span>Registrar Gasto</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Movimientos Recientes - Con verde azulado */}
      <Card className="border border-slate-200/60 dark:border-slate-700/60 bg-white/50 dark:bg-slate-800/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <ArrowUpRight className="h-5 w-5 text-teal-600/70 dark:text-teal-400/70" />
            Movimientos Recientes
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">Tus últimas transacciones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockData.recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 rounded-lg border border-slate-100/80 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      transaction.type === "income"
                        ? "bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {transaction.type === "income" ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 dark:text-slate-200">{transaction.description}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{transaction.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-medium ${
                      transaction.type === "income"
                        ? "text-teal-600 dark:text-teal-400"
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {formatCurrency(Math.abs(transaction.amount))}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
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
