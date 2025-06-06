"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react"

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
    <div className="flex flex-col flex-1 space-y-6 animate-fade-in">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Historial Mensual</h1>
        <p className="text-muted-foreground">Revisa el detalle de tus finanzas mes a mes</p>
      </div>

      {/* Resumen por meses */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockHistory.map((month) => (
          <Card
            key={month.month}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedMonth === month.month ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => setSelectedMonth(selectedMonth === month.month ? null : month.month)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>{month.name}</span>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ingresos:</span>
                <span className="text-green-600 font-medium">{formatCurrency(month.income)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Gastos:</span>
                <span className="text-red-600 font-medium">{formatCurrency(month.expenses)}</span>
              </div>
              <div className="flex justify-between text-sm border-t pt-2">
                <span className="font-medium">Saldo:</span>
                <span className={`font-bold ${month.balance > 0 ? "text-green-600" : "text-red-600"}`}>
                  {formatCurrency(month.balance)}
                </span>
              </div>
              <div className="text-xs text-muted-foreground text-center">{formatUSD(month.balance)} USD</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detalle del mes seleccionado */}
      {selectedMonthData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Detalle de {selectedMonthData.name}</span>
              <Button variant="ghost" size="sm" onClick={() => setSelectedMonth(null)}>
                Cerrar
              </Button>
            </CardTitle>
            <CardDescription>Todos los movimientos del mes seleccionado</CardDescription>
          </CardHeader>
          <CardContent>
            {selectedMonthData.transactions.length > 0 ? (
              <div className="space-y-3">
                {selectedMonthData.transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          transaction.type === "income"
                            ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                            : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"
                        }`}
                      >
                        {transaction.type === "income" ? (
                          <ArrowUpRight className="h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {transaction.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(transaction.date).toLocaleDateString("es-AR")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
                        {formatCurrency(Math.abs(transaction.amount))}
                      </p>
                      <p className="text-xs text-muted-foreground">{formatUSD(Math.abs(transaction.amount))}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No hay transacciones registradas para este mes
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
