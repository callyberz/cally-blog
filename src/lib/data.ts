type WorkExperience = {
  company: string
  title: string
  location: string
  dateStart: string
  dateEnd: string | null
  descriptions: string[]
  companyUrl?: string
}

type EducationExperience = {
  school: string
  location: string
  programme: string
  dateStart: string
  dateEnd: string
}

type Skills = {
  type: string
  items: string[]
  highlights: string[]
}

type TodoList = {
  actionItem: string
  finished: boolean
}

type ProjectType = {
  name: string
  description: string
  github?: string
  url?: string
}

export const education: EducationExperience[] = [
  {
    school: 'The Hong Kong Polytechnic University',
    location: 'Hong Kong',
    programme: 'BEng (Hons) in Electronic and Information Engineering',
    dateStart: '2014',
    dateEnd: '2019',
  },
  {
    school: 'University of Cincinnati',
    location: 'Cincinnati, OH, United States',
    programme:
      'Exchange Student at Department of Electrical Engineering and Computer Science',
    dateStart: 'Jan 2017',
    dateEnd: 'May 2017',
  },
]

export const experiences: WorkExperience[] = [
  {
    company: 'Simpplr',
    title: 'Software Engineer',
    location: 'Toronto, ON, Canada',
    dateStart: 'Mar 2024',
    dateEnd: 'Current',
    companyUrl: 'https://www.simpplr.com/',
    descriptions: [
      'I built and designed the rewards system for Simpplr using React, TypeScript,Nodejs, PostgreSQL, Kafka, Kubernetes from scratch. It is a ledger system that users can redeem and receive points for rewards. Brought in an additional $1M ARR within six months by implementing addon features on top of the recognition system.',
    ],
  },
  {
    company: 'OKX',
    title: 'Engineer II',
    location: 'Hong Kong',
    dateStart: 'May 2022',
    dateEnd: 'Oct 2023',
    companyUrl: 'https://www.okx.com/',
    descriptions: [
      "I played a role in safeguarding user accounts by introducing anti-bot protection to combat MFA toll fraud and modernizing authentication methods with Passkeys, Wallet, AppleId login. I'm pleasured to work with a team that is passionate about building a secure and user-friendly platform that serves over 50M+ global users daily.",
    ],
  },
  {
    company: 'Silverhorn Investment Advisors Ltd',
    title: 'Software Engineer',
    location: 'Hong Kong',
    dateStart: 'June 2021',
    dateEnd: 'Mar 2022',
    companyUrl: 'https://silverhorngroup.com/',
    descriptions: [
      'I contributed to an internal system integrated with centralized data management and led a team of 4-5 developers, while also automating PDF statement generation.',
    ],
  },
  {
    company: 'Midland Realty',
    title: 'Analyst Programmer',
    location: 'Hong Kong',
    dateStart: 'June 2019',
    dateEnd: 'June 2021',
    companyUrl: 'https://www.midland.com.hk/en/',
    descriptions: [
      'I migrated a legacy Windows app to a web platform for CRUD listings and collaborated with vendors and UI/UX designers on system development and deployment using microservices.',
    ],
  },
  {
    company: 'Right Tech Ltd',
    title: 'Programmer',
    location: 'Hong Kong',
    dateStart: 'June 2018',
    dateEnd: 'May 2019',
    descriptions: [
      'I developed a customer portal using React/Node.js, launched an NFC-enabled app for a restaurant, and expanded the smart-packaging (RFID) system across industries.',
    ],
  },
]

export const skills: Skills[] = [
  {
    type: 'Frontend',
    items: [
      'React',
      'Javascript',
      'Typescript',
      'NextJS',
      'CSS module/Less',
      'TailwindCSS',
      'Mobx',
      'Redux',
      'React Native',
      'Jest',
      'Vitest',
      'Monorepo',
    ],
    highlights: [
      'Migrate from Javascript to Typescript',
      'Server Side Rendering (SSR)',
      'Web vital/SEO optimization',
      'Maintain cocorporate npm packages',
    ],
  },
  {
    type: 'Backend',
    items: [
      'NodeJS',
      'NestJS',
      'Fastify',
      'ExpressJS',
      'GraphQL',
      'Postgresql',
      'MongoDB',
      'Prisma ORM',
      'JWT',
      'OAuth2.0',
    ],
    highlights: [
      'Design and build RESTful & GraphQL API using Nodejs framework',
      'Build microservices in respect to event driven architecture',
    ],
  },
  {
    type: 'DevOps',
    items: ['Docker', 'Kong', 'Jenkins', 'GitLab Runner', 'AWS', 'Azure'],
    highlights: [
      'Deploy API gateway with OAuth2.0 using Kong',
      'Manage services using Docker and Kubernetes',
      'CI/CD tools: auto deploy changes using Jenkins, Github Actions, Gitlab Runner with the help of SCM',
    ],
  },
  {
    type: 'Others',
    items: ['Solidity', 'Ether.js'],
    highlights: ['Launch a couple of NFT website including smart contract'],
  },
]

export const certificates: string[] = [
  'AWS Associate Certified Developer (Issued Jun 2021 · Expires Jun 2024)',
]

export const spokenLanguages =
  'Native in Cantonese, fluent in English & Mandarin'

export const social = [
  { website: 'LinkedIn', url: 'https://www.linkedin.com/in/calvinlee26/' },
  { website: 'X', url: 'https://twitter.com/cally_dev/' },
  { website: 'GitHub', url: 'https://github.com/callyberz/' },
]

export const todoList: TodoList[] = [
  {
    actionItem: 'Find out problems in life/work',
    finished: false,
  },
  {
    actionItem: 'Blogging using markdown',
    finished: true,
  },
  {
    actionItem: 'Supabase',
    finished: true,
  },
  {
    actionItem: 'Vercel AI SDK',
    finished: false,
  },
  {
    actionItem: 'Ship 1st subscription-based project',
    finished: false,
  },
]

export const projects: ProjectType[] = [
  {
    name: 'Ledger System',
    description:
      'Designed and implemented a ledger system similar to a bank account from scratch, leveraging microservices and event-driven architecture to ensure scalability, reliability, and high performance under heavy load.',
    url: 'https://www.linkedin.com/posts/simpplr_exciting-news-today-were-thrilled-to-introduce-activity-7244702900331933696-sx8d?utm_source=share&utm_medium=member_desktop',
  },
  {
    name: 'Passkey/WebAuthn Login Implementation',
    description:
      'Developed a passwordless (aka passkey, WebAuthn) login system with Multi-Factor Authentication (MFA) to enhance security while ensuring a seamless user experience, focusing on secure data handling and integration with third-party authentication providers.',
    url: 'https://webauthn.me/',
  },
  {
    name: 'YouTube Playback Speed Tracker',
    description:
      'A Chrome extension that tracks and displays your playback speed on YouTube.',
    github: 'https://github.com/callyberz/speed-checker',
  },
  {
    name: 'All-in-One Education Center Management System',
    description:
      'Seamlessly manage student records, courses, and homework across an education center with three branches and over 300 enrolled students.',
  },
  {
    name: 'Real-time listings scraper',
    description:
      'Monitors second-hand car listings in real-time based on your chosen criteria, sending push notifications to Telegram for updates. (For testing purposes only)',
  },
  {
    name: 'Custom ESLint rules',
    description:
      'Use AST parser to define self-used ESLint rule for much better warning/error prompt',
  },
  {
    name: 'Build Promise A+ from scratch',
    description:
      'Create a custom implementation of JavaScript Promises that meets the Promise A+ standard, covering essential features.',
    github: 'https://github.com/callyberz/promise-aplus',
  },
]

export const highlights = [
  'Software Engineer',
  'Web Development',
  'Full-stack Development',
  'ReactJS',
  'TypeScript',
  'JavaScript',
  'NodeJS',
]

export const summary =
  'A software engineer with 6 years of experience loves creating web apps. I spend my days working with TypeScript, React, and Node.js, bringing ideas to life on both the frontend and backend. I’m driven by a passion for building products that people actually want to use — and having fun while doing it!'
