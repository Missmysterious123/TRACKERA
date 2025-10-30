'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { PageHeader } from '@/components/app/page-header';
import { DollarSign, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { revenueData } from '@/lib/data';

const kpiData = [
  {
    title: 'Total Revenue',
    value: 'INR 4,32,950',
    change: '+12.5%',
    icon: DollarSign,
    color: 'text-emerald-500',
  },
  {
    title: 'Total Orders',
    value: '1,204',
    change: '+8.2%',
    icon: ShoppingCart,
    color: 'text-blue-500',
  },
  {
    title: 'Avg. Order Value',
    value: 'INR 359.59',
    change: '-1.8%',
    icon: TrendingUp,
    color: 'text-amber-500',
  },
  {
    title: 'Active Staff',
    value: '8',
    change: '',
    icon: Users,
    color: 'text-indigo-500',
  },
];

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--primary))',
  },
};

export default function ManagerDashboard() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Here's a summary of your restaurant's performance."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className={`h-4 w-4 text-muted-foreground ${kpi.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              {kpi.change && (
                <p className="text-xs text-muted-foreground">{kpi.change} from last month</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Revenue</CardTitle>
          <CardDescription>
            A look at the revenue generated over the last 7 days.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer>
              <BarChart data={revenueData}>
                <XAxis
                  dataKey="date"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `INR ${value / 1000}k`}
                />
                <Tooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
}
