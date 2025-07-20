import { v4 } from 'uuid'

type DashboardCardProps = {
  id: string
  label: string
  subLabel: string
  description: string
}

export const DASHBOARD_CARDS: DashboardCardProps[] = [
  {
    id: v4(),
    label: 'Set-up Auto Replies',
    subLabel: 'Deliver a product lineup through Instagram DM',
    description: 'Get products in front of your followers in as many places',
  },
  {
    id: v4(),
    label: 'Answer Questions with AI',
    subLabel: 'Identify and respond to queries with AI',
    description: 'The intention of the message will be automatically detected',
  },
  {
    id: v4(),
    label: 'Respond to Comments',
    subLabel: 'Respond to comments on your posts',
    description: 'The message will send based on keywords',
  },
]