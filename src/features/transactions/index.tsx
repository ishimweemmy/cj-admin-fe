import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { TransactionsTable } from './components/transactions-table'
import { useGetTransactions } from './server/use-transactions'

export function Transactions() {
  const { data: paginatedData, isLoading } = useGetTransactions()
  const transactions = paginatedData?.data || []

  return (
    <>
      <Header>
        <TopNav links={[]} />
        <div className='ms-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-6'>
          <h1 className='text-2xl font-bold tracking-tight'>
            Transactions
          </h1>
          <p className='text-muted-foreground text-sm'>
            View and manage all customer transactions
          </p>
        </div>
        <TransactionsTable data={transactions} isLoading={isLoading} />
      </Main>
    </>
  )
}
