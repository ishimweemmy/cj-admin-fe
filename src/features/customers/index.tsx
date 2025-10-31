import { getRouteApi } from '@tanstack/react-router'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { CustomersDialogs } from './components/customers-dialogs'
import { CustomersProvider } from './components/customers-provider'
import { CustomersTable } from './components/customers-table'
import { useGetCustomers } from './server/use-customers'

const route = getRouteApi('/_authenticated/customers/')

export function Customers() {
  const search = route.useSearch()
  const navigate = route.useNavigate()
  const { data: paginatedData, isLoading } = useGetCustomers()
  const customers = paginatedData?.data || []

  return (
    <CustomersProvider>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Customer Management</h2>
            <p className='text-muted-foreground'>
              View and manage customer accounts
            </p>
          </div>
        </div>
        <CustomersTable data={customers} isLoading={isLoading} search={search} navigate={navigate} />
      </Main>

      <CustomersDialogs />
    </CustomersProvider>
  )
}
