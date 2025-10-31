import { SuspendCustomerDialog } from './suspend-customer-dialog'
import { UnsuspendCustomerDialog } from './unsuspend-customer-dialog'
import { UpdateCreditLimitDialog } from './update-credit-limit-dialog'
import { UpdateCreditScoreDialog } from './update-credit-score-dialog'
import { useCustomers } from './customers-provider'

export function CustomersDialogs() {
  const {
    selectedCustomer,
    suspendDialogOpen,
    setSuspendDialogOpen,
    unsuspendDialogOpen,
    setUnsuspendDialogOpen,
    creditLimitDialogOpen,
    setCreditLimitDialogOpen,
    creditScoreDialogOpen,
    setCreditScoreDialogOpen,
  } = useCustomers()

  return (
    <>
      <SuspendCustomerDialog
        customer={selectedCustomer}
        open={suspendDialogOpen}
        onOpenChange={setSuspendDialogOpen}
      />

      <UnsuspendCustomerDialog
        customer={selectedCustomer}
        open={unsuspendDialogOpen}
        onOpenChange={setUnsuspendDialogOpen}
      />

      <UpdateCreditLimitDialog
        customer={selectedCustomer}
        open={creditLimitDialogOpen}
        onOpenChange={setCreditLimitDialogOpen}
      />

      <UpdateCreditScoreDialog
        customer={selectedCustomer}
        open={creditScoreDialogOpen}
        onOpenChange={setCreditScoreDialogOpen}
      />
    </>
  )
}
