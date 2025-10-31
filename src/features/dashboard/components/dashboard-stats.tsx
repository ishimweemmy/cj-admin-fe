import { Users, Banknote, AlertCircle, TrendingUp } from 'lucide-react'
import { StatCard } from '@/components/shared/stat-card'
import { formatCurrency } from '@/lib/utils/format'
import type { TDashboardStats } from '../server/index.dto'

type DashboardStatsProps = {
  stats: TDashboardStats | undefined
  isLoading: boolean
}

export function DashboardStats({
  stats,
  isLoading,
}: DashboardStatsProps) {
  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      <StatCard
        title='Total Customers'
        value={stats?.customers.total || 0}
        icon={Users}
        isLoading={isLoading}
      />
      <StatCard
        title='Pending Loans'
        value={stats?.loans.pending || 0}
        description='Awaiting approval'
        icon={Banknote}
        isLoading={isLoading}
      />
      <StatCard
        title='Active Loans'
        value={stats?.loans.active || 0}
        description={
          stats?.loans.totalOutstanding
            ? `${formatCurrency(stats.loans.totalOutstanding)} outstanding`
            : undefined
        }
        icon={TrendingUp}
        isLoading={isLoading}
      />
      <StatCard
        title='Defaulted Loans'
        value={stats?.loans.defaulted || 0}
        description='Requires attention'
        icon={AlertCircle}
        isLoading={isLoading}
      />
    </div>
  )
}
