"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, PieChart, TrendingUp, Calendar } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col flex-1 space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Análisis Financiero
        </h1>
        <p className="text-muted-foreground">
          Visualiza tus patrones de gasto e ingresos
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border border-border bg-card backdrop-blur-md hover:shadow-sm transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-card-foreground">
              <BarChart3 className="h-5 w-5 text-teal-400/70 dark:text-teal-300/70" />
              Ingresos vs Gastos
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Comparativa mensual de tus movimientos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-card-foreground">
              Gráfico de barras comparativo
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card backdrop-blur-md hover:shadow-sm transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-card-foreground">
              <PieChart className="h-5 w-5 text-teal-400/70 dark:text-teal-300/70" />
              Gastos por Categoría
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Distribución de tus gastos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-card-foreground">
              Gráfico circular de categorías
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card backdrop-blur-md hover:shadow-sm transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-card-foreground">
              <TrendingUp className="h-5 w-5 text-teal-400/70 dark:text-teal-300/70" />
              Tendencia de Ahorro
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Evolución de tu capacidad de ahorro
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-card-foreground">
              Gráfico de línea de tendencia
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card backdrop-blur-md hover:shadow-sm transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-card-foreground">
              <Calendar className="h-5 w-5 text-teal-400/70 dark:text-teal-300/70" />
              Heatmap Semanal
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Patrones de gasto por día
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-card-foreground">
              Mapa de calor semanal
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
