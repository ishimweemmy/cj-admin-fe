import { useState } from 'react'
import { Banknote } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { EmptyState } from '@/components/shared/empty-state'
import { ThemeSwitch } from '@/components/theme-switch'
import { ApproveLoanDialog } from './components/approve-loan-dialog'
import { DisburseLoanDialog } from './components/disburse-loan-dialog'
import { LoanCard } from './components/loan-card'
import { RejectLoanDialog } from './components/reject-loan-dialog'
import type { TLoan } from './server/index.dto'
import { useGetLoans } from './server/use-loans'

export function Loans() {
  const [selectedTab, setSelectedTab] = useState<string>('all')
  const { data: loansData, isLoading } = useGetLoans()
  const [selectedLoanForApprove, setSelectedLoanForApprove] =
    useState<TLoan | null>(null)
  const [selectedLoanForReject, setSelectedLoanForReject] =
    useState<TLoan | null>(null)
  const [selectedLoanForDisburse, setSelectedLoanForDisburse] =
    useState<TLoan | null>(null)
  const loans = loansData?.data || []

  const pendingLoans =
    loans?.filter((loan) => loan.approvalStatus === 'PENDING_REVIEW') || []
  const approvedLoans =
    loans?.filter(
      (loan) =>
        loan.approvalStatus === 'MANUAL_APPROVED' ||
        loan.approvalStatus === 'AUTO_APPROVED'
    ) || []
  const activeLoans =
    loans?.filter(
      (loan) => loan.status === 'ACTIVE' || loan.status === 'DISBURSED'
    ) || []

  const renderLoans = (loansList: TLoan[]) => {
    if (isLoading) {
      return (
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className='h-[400px] w-full rounded-lg' />
          ))}
        </div>
      )
    }

    if (loansList.length === 0) {
      return (
        <EmptyState
          icon={Banknote}
          title='No loans'
          description='No loans found in this category'
        />
      )
    }

    return (
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {loansList.map((loan) => (
          <LoanCard
            key={loan.id}
            loan={loan}
            onApprove={setSelectedLoanForApprove}
            onReject={setSelectedLoanForReject}
            onDisburse={setSelectedLoanForDisburse}
          />
        ))}
      </div>
    )
  }

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
          <h1 className='text-2xl font-bold tracking-tight'>Loan Management</h1>
          <p className='text-muted-foreground text-sm'>
            Review and manage customer loan applications
          </p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className='mb-4'>
            <TabsTrigger value='all'>
              All Loans ({loans?.length || 0})
            </TabsTrigger>
            <TabsTrigger value='pending'>
              Pending ({pendingLoans.length})
            </TabsTrigger>
            <TabsTrigger value='approved'>
              Approved ({approvedLoans.length})
            </TabsTrigger>
            <TabsTrigger value='active'>
              Active ({activeLoans.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value='all'>{renderLoans(loans || [])}</TabsContent>

          <TabsContent value='pending'>{renderLoans(pendingLoans)}</TabsContent>

          <TabsContent value='approved'>
            {renderLoans(approvedLoans)}
          </TabsContent>

          <TabsContent value='active'>{renderLoans(activeLoans)}</TabsContent>
        </Tabs>
      </Main>

      <ApproveLoanDialog
        loan={selectedLoanForApprove}
        open={!!selectedLoanForApprove}
        onOpenChange={(open) => !open && setSelectedLoanForApprove(null)}
      />

      <RejectLoanDialog
        loan={selectedLoanForReject}
        open={!!selectedLoanForReject}
        onOpenChange={(open) => !open && setSelectedLoanForReject(null)}
      />

      <DisburseLoanDialog
        loan={selectedLoanForDisburse}
        open={!!selectedLoanForDisburse}
        onOpenChange={(open) => !open && setSelectedLoanForDisburse(null)}
      />
    </>
  )
}
