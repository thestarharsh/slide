import { InstagramDuoToneBlue, SalesForceDuoToneBlue } from "@/icons"

type Props = {
  title: string
  icon: React.ReactNode
  description: string
  strategy: 'INSTAGRAM' | 'CRM'
}

export const INTEGRATION_CARDS: Props[] = [
  {
    title: 'Connect Instagram',
    description: 'Seamlessly integrate your Instagram account for enhanced automation.',
    icon: <InstagramDuoToneBlue />,
    strategy: 'INSTAGRAM',
  },
  {
    title: 'Connect Salesforce',
    description: 'Effortlessly link your Salesforce CRM for streamlined operations.',
    icon: <SalesForceDuoToneBlue />,
    strategy: 'CRM',
  },
];
