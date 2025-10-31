import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Customer } from '../data/schema'

type CustomersContextType = {
  selectedCustomer: Customer | null
  setSelectedCustomer: (customer: Customer | null) => void
  suspendDialogOpen: boolean
  setSuspendDialogOpen: (open: boolean) => void
  unsuspendDialogOpen: boolean
  setUnsuspendDialogOpen: (open: boolean) => void
  creditLimitDialogOpen: boolean
  setCreditLimitDialogOpen: (open: boolean) => void
  creditScoreDialogOpen: boolean
  setCreditScoreDialogOpen: (open: boolean) => void
}

const CustomersContext = createContext<CustomersContextType | undefined>(undefined)

export function CustomersProvider({ children }: { children: ReactNode }) {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false)
  const [unsuspendDialogOpen, setUnsuspendDialogOpen] = useState(false)
  const [creditLimitDialogOpen, setCreditLimitDialogOpen] = useState(false)
  const [creditScoreDialogOpen, setCreditScoreDialogOpen] = useState(false)

  return (
    <CustomersContext.Provider
      value={{
        selectedCustomer,
        setSelectedCustomer,
        suspendDialogOpen,
        setSuspendDialogOpen,
        unsuspendDialogOpen,
        setUnsuspendDialogOpen,
        creditLimitDialogOpen,
        setCreditLimitDialogOpen,
        creditScoreDialogOpen,
        setCreditScoreDialogOpen,
      }}
    >
      {children}
    </CustomersContext.Provider>
  )
}

export function useCustomers() {
  const context = useContext(CustomersContext)
  if (!context) {
    throw new Error('useCustomers must be used within CustomersProvider')
  }
  return context
}
