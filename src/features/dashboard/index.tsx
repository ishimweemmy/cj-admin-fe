import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardStats } from './components/dashboard-stats'
import { useGetDashboardStats } from './server/use-dashboard'
import { useAuthStore } from '@/stores/auth-store'
import { formatCurrency } from '@/lib/utils/format'

export function Dashboard() {
  const user = useAuthStore((state) => state.auth.user)
  const { data: stats, isLoading } = useGetDashboardStats()

  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <TopNav links={[]} />
        <div className='ms-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main ===== */}
      <Main>
        <div className='mb-6'>
          <h1 className='text-2xl font-bold tracking-tight'>
            Welcome back, {user?.firstName || 'Admin'}!
          </h1>
          <p className='text-muted-foreground text-sm'>
            System overview and key metrics
          </p>
        </div>

        <div className='space-y-6'>
          {/* Stats Grid */}
          <DashboardStats
            stats={stats}
            isLoading={isLoading}
          />

          {/* Additional Stats Cards */}
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            <Card>
              <CardHeader>
                <CardTitle>Credit Utilization</CardTitle>
                <CardDescription>System-wide credit usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {stats?.credit.utilizationRate || 0}%
                </div>
                <p className='text-muted-foreground text-xs'>
                  {formatCurrency(stats?.credit.totalOutstandingBalance || 0)} of{' '}
                  {formatCurrency(stats?.credit.totalCreditLimit || 0)} used
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total Disbursed</CardTitle>
                <CardDescription>All-time loan disbursements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {formatCurrency(stats?.loans.totalDisbursed || 0)}
                </div>
                <p className='text-muted-foreground text-xs'>
                  Across all loans
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {stats?.transactions.last30Days.count || 0}
                </div>
                <p className='text-muted-foreground text-xs'>
                  {formatCurrency(stats?.transactions.last30Days.totalAmount || 0)} volume
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Main>
    </>
  )
}
