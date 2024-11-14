type WorkExperience = {
  company: string
  title: string
  location: string
  dateStart: string
  dateEnd: string | null
  descriptions: string[]
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
    descriptions: [
      'Boosted user engagement by 70% and generated an additional $1M ARR within six months by implementing features in full-stack applications using React.js and Node.js',
      'Developed and deployed a microservices-based rewards system that secured a portion of the intranet market, bringing in an increase in repeat purchases by 50% within the first 6 months',
      'Engineered an event-sourced transactional ledger with PostgreSQL and Kafka, ensuring real-time tracking immutability, auditability and high availability under heavy loads',
      'Automated CI/CD processes using GitHub Actions, resulting in a 40% reduction in deployment time and enabling 5 additional deployments per month, while managing service deployment through Docker and Kubernetes to increase system scalability by 30%',
    ],
  },
  {
    company: 'OKX',
    title: 'Engineer II',
    location: 'Hong Kong',
    dateStart: 'May 2022',
    dateEnd: 'Oct 2023',
    descriptions: [
      'Develop account-related system using React, including user onboarding, OAuth connection & security settings',
      'Mantain stable OAuth connection with other platforms e.g. TradingView',
      'Integrate anti-bot protection to decrease MFA toll fraud',
      'Introdce Passkey (FIDO), AppleId as alternative login/register methods',
      'Ship top-priority tasks due to local changes in regulatory measures (UK, Turkey)',
      'Review project specifications & design technology solutions that meet expectations',
      'Refactor & convert legacy codebase to use TypeScript, resulting in increased code maintainability & reduction in bugs',
      'Adopt server-side rendering (SSR), resulting in improved performance (core web vitals >70%), better SEO & UX',
    ],
  },
  {
    company: 'Silverhorn Investment Advisors Ltd',
    title: 'Software Engineer',
    location: 'Hong Kong',
    dateStart: 'June 2021',
    dateEnd: 'Mar 2022',
    descriptions: [
      'Develop internal system that integrates with centralized data management using React & NestJS',
      'Manage a team of 4-5 developers/interns',
      'Cooperate with data management team to ensure proper integration & data security',
      'Develop automated PDF statement generation',
      'Applications planning, development, deployment',
    ],
  },
  {
    company: 'Midland Realty',
    title: 'Analyst Programmer',
    location: 'Hong Kong',
    dateStart: 'June 2019',
    dateEnd: 'June 2021',
    descriptions: [
      'Migrate legacy Windows app to web for CRUD listings using React & NodeJS',
      'Work closely with UI/UX designers to deliver quality IT solutions',
      'Cooperate with vendor by combining both sides of projects',
      'Involve in system/applications planning, development, deployment',
    ],
  },
  {
    company: 'Right Tech Ltd',
    title: 'Programmer',
    location: 'Hong Kong',
    dateStart: 'June 2018',
    dateEnd: 'May 2019',
    descriptions: [
      'Develop an all-in-one portal for customers using React & NodeJS',
      'Launch iOS & Android app for a restaurant that can read NFC using React Native',
      'Expand Smart-packaging system to different industries with NFC',
      'Develop Windows applications to connect NFC chips with Web App database using C#',
      'Implement on-site & remote support to production line system',
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
      'Build microservices in respect to event driven architecture'
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
    name: 'Build Promise A+ from scratech',
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
  'A software engineer with 6 years of experience loves creating web apps. I spend my days working with TypeScript, React, and Node.js, bringing ideas to life on both the frontend and backend. I’m driven by a passion for building products that people actually want to use—and having fun while doing it!'
