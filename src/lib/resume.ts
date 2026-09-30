import { type StaticImageData } from 'next/image'

import ehcgLogo from '@/images/logos/ehcg.png'
import empresLogo from '@/images/logos/empres.png'

import { type Dictionary } from '@/i18n'

export interface Role {
  company: string
  /** key into the dictionary's work.titles */
  titleKey: keyof Dictionary['work']['titles']
  logo: StaticImageData
  start: string
  /** Year, or null for the current role (rendered as "Present") */
  end: string | null
  current?: boolean
}

// Flip to false to hide the whole Work / CV block on the home page.
export const SHOW_WORK = true

// Flip to true once the CV is updated to show the Download CV button.
export const SHOW_CV = false

export const CV_URL =
  'https://yxolapfupw.ufs.sh/f/lUSjJBQAQXSHO38PMlD8LWre2DvAp5jY4Jc3Ma7ymTiBESIq'

export const roles: Role[] = [
  {
    company: 'Evergreen Healthcare Group',
    titleKey: 'ehcgManager',
    logo: ehcgLogo,
    start: '2023',
    end: null,
    current: true,
  },
  {
    company: 'EmpRes Healthcare',
    titleKey: 'empresManager',
    logo: empresLogo,
    start: '2021',
    end: '2023',
  },
  {
    company: 'EmpRes Healthcare',
    titleKey: 'empresLead',
    logo: empresLogo,
    start: '2020',
    end: '2021',
  },
  {
    company: 'EmpRes Healthcare',
    titleKey: 'empresWeb',
    logo: empresLogo,
    start: '2018',
    end: '2020',
  },
]
