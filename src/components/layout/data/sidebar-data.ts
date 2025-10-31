import {
  LayoutDashboard,
  Command,
  Users,
  Banknote,
  Receipt,
  Settings,
} from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'Admin User',
    email: 'admin@creditjambo.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Credit Jambo Admin',
      logo: Command,
      plan: '',
    }
  ],
  navGroups: [
    {
      title: 'Overview',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: 'Management',
      items: [
        {
          title: 'Customers',
          url: '/customers',
          icon: Users,
        },
        {
          title: 'Loans',
          url: '/loans',
          icon: Banknote,
        },
        {
          title: 'Transactions',
          url: '/transactions',
          icon: Receipt,
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          title: 'Settings',
          url: '/settings',
          icon: Settings,
        },
      ],
    },
  ],
}
