"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowUpRight, ArrowDownRight, X, TrendingUp, TrendingDown } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const mockHistory = [
  {
    month: "2024-01",
    name: "Enero 2024",
    income: 205000,
    expenses: 78000,
    balance: 127000,
    transactions: [
      { id: 1, description: "Sueldo", amount: 180000, type: "income", category: "Trabajo", date: "2024-01-15" },
      { id: 2, description: "Freelance", amount: 25000, type: "income", category: "Trabajo", date: "2024-01-20" },
      {
        id: 3,
        description: "Supermercado",
        amount: -15000,
        type: "expense",
        category: "Alimentos",
        date: "2024-01-14",
      },
      { id: 4, description: "Transporte", amount: -8000, type: "expense", category: "Transporte", date: "2024-01-13" },
      { id: 5, description: "Servicios", amount: -25000, type: "expense", category: "Servicios", date: "2024-01-10" },
      {
        id: 6,
        description: "Entretenimiento",
        amount: -12000,
        type: "expense",
        category: "Entretenimiento",
        date: "2024-01-08",
      },
      { id: 7, description: "Alquiler", amount: -18000, type: "expense", category: "Vivienda", date: "2024-01-05" },
    ],
  },
  {
    month: "2023-12",
    name: "Diciembre 2023",
    income: 180000,
    expenses: 95000,
    balance: 85000,
    transactions: [],
  },
  {
    month: "2023-11",
    name: "Noviembre 2023",
    income: 180000,
    expenses: 72000,
    balance: 108000,
    transactions: [],
  },
]

export default function HistoryPage() {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)
  const [dollarRate] = useState(1200) // En una app real vendría del contexto

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

  const selectedMonthData = mockHistory.find((m) => m.month === selectedMonth)

  return (
    <div className="flex flex-col flex-1 max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground dark:text-foreground">Historial</h1>
        <p className="text-muted-foreground dark:text-muted-foreground">Revisa tus movimientos financieros por mes</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockHistory.map((month) => (
          <Card
            key={month.month}
            className={`cursor-pointer transition-all hover:shadow-md border border-border dark:border-border bg-card/50 dark:bg-card/50 ${
              selectedMonth === month.month ? "ring-2 ring-teal-500" : ""
            }`}
            onClick={() => setSelectedMonth(selectedMonth === month.month ? null : month.month)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between text-foreground dark:text-foreground">
                <span>{month.name}</span>
                <Calendar className="h-4 w-4 text-teal-600/70 dark:text-teal-500/70" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground dark:text-muted-foreground">Ingresos</span>
                  <span className="text-sm font-medium text-teal-600 dark:text-teal-500">
                    ${formatCurrency(month.income)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground dark:text-muted-foreground">Gastos</span>
                  <span className="text-sm font-medium text-card-foreground dark:text-card-foreground">
                    ${formatCurrency(month.expenses)}
                  </span>
                </div>
                <Separator className="bg-border dark:bg-border" />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground dark:text-foreground">Balance</span>
                  <span className={`text-sm font-medium ${
                    month.balance >= 0 
                      ? "text-teal-600 dark:text-teal-500" 
                      : "text-red-600 dark:text-red-500"
                  }`}>
                    ${formatCurrency(month.balance)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedMonth && (
        <Card className="border border-border dark:border-border bg-card/50 dark:bg-card/50">
          <CardHeader>
            <CardTitle className="text-xl flex items-center justify-between text-foreground dark:text-foreground">
              <span>Detalles de {mockHistory.find(m => m.month === selectedMonth)?.name}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-foreground hover:text-foreground dark:text-foreground dark:hover:text-foreground"
                onClick={() => setSelectedMonth(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedMonthData?.transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-card/60 dark:bg-card/60"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      transaction.type === "income"
                        ? "bg-teal-100 dark:bg-teal-900/30"
                        : "bg-card/10 dark:bg-card/80"
                    }`}>
                      {transaction.type === "income" ? (
                        <TrendingUp className="h-4 w-4 text-teal-600 dark:text-teal-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-card-foreground dark:text-card-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground dark:text-foreground">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-muted-foreground dark:text-muted-foreground">
                        {transaction.category}
                      </p>
                    </div>
                  </div>
                  <span className={`text-sm font-medium ${
                    transaction.type === "income"
                      ? "text-teal-600 dark:text-teal-500"
                      : "text-card-foreground dark:text-card-foreground"
                  }`}>
                    ${formatCurrency(transaction.amount)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
