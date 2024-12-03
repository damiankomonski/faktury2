"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, Users, Package, Receipt } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const revenueData = [
  { name: "Sty", value: 4000 },
  { name: "Lut", value: 3000 },
  { name: "Mar", value: 2000 },
  { name: "Kwi", value: 2780 },
  { name: "Maj", value: 1890 },
  { name: "Cze", value: 2390 },
]

const customerData = [
  { name: "Sty", value: 30 },
  { name: "Lut", value: 45 },
  { name: "Mar", value: 55 },
  { name: "Kwi", value: 65 },
  { name: "Maj", value: 75 },
  { name: "Cze", value: 85 },
]

const pieData = [
  { name: "Faktury opłacone", value: 65 },
  { name: "Faktury nieopłacone", value: 35 },
]

const COLORS = ["hsl(var(--primary))", "hsl(var(--muted))"]

const stats = [
  {
    title: "Przychody",
    value: "12,450 zł",
    change: "+12%",
    trend: "up",
    icon: Receipt,
  },
  {
    title: "Klienci",
    value: "120",
    change: "+8%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Produkty",
    value: "45",
    change: "-2%",
    trend: "down",
    icon: Package,
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-sm">
                {stat.trend === "up" ? (
                  <ArrowUp className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-red-500" />
                )}
                <span
                  className={
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }
                >
                  {stat.change}
                </span>
                <span className="text-gray-500 ml-1">vs. poprzedni miesiąc</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Przychody w czasie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Wzrost liczby klientów</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={customerData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status faktur</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {pieData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-sm text-gray-600">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}