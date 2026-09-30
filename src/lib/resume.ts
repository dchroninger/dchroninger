import { type StaticImageData } from 'next/image'

import ehcgLogo from '@/images/logos/ehcg.png'
import empresLogo from '@/images/logos/empres.png'

export interface Role {
  company: string
  title: string
  logo: StaticImageData
  start: string
  end: string
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
    title: 'Engineering Manager/Architect',
    logo: ehcgLogo,
    start: '2023',
    end: 'Present',
    current: true,
  },
  {
    company: 'EmpRes Healthcare',
    title: 'Engineering Manager',
    logo: empresLogo,
    start: '2021',
    end: '2023',
  },
  {
    company: 'EmpRes Healthcare',
    title: 'Lead Software Engineer',
    logo: empresLogo,
    start: '2020',
    end: '2021',
  },
  {
    company: 'EmpRes Healthcare',
    title: 'Web Developer',
    logo: empresLogo,
    start: '2018',
    end: '2020',
  },
]
