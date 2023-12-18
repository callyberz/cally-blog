interface WorkExperience {
  company: string
  title: string
  location: string
  dateStart: string
  dateEnd: string | null
  descriptions: string[]
}

interface EducationExperience {
  school: string
  location: string
  programme: string
  dateStart: string
  dateEnd: string
}

interface Skills {
  type: string
  items: string[]
  highlights: string[]
}

interface TodoList {
  actionItem: string
  finished: boolean
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
    company: 'OKX',
    title: 'Engineer II',
    location: 'Hong Kong',
    dateStart: 'May 2022',
    dateEnd: null,
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
      'CSS/Less',
      'TailwindCSS',
      'Mobx',
      'Redux',
      'React Native',
      'Jest',
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
    items: ['NodeJS', 'ExpressJS', 'GraphQL', 'MongoDB'],
    highlights: [
      // 'Design and build RESTful & GraphQL API using Nodejs framework',
      // 'Perform testing using Selenium for automation',
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
    finished: false,
  },
  {
    actionItem: 'Vercel AI SDK',
    finished: false,
  },
]

export const projects = [
  {
    name: 'Breathing Exercise Web App',
    description: 'A web app that helps you to relax and breathe.',
    url: '',
    github: 'https://github.com/callyberz/mindful',
  },
  {
    name: 'YouTube Playback Speed Controller WIP',
    description: 'A Chrome extension that tracks your YouTube playback speed.',
    github: 'https://github.com/callyberz/speed-checker',
  },
  {
    name: 'NFT minting website',
    description:
      'Launched multiple of websites that allows users to mint NFTs.',
  },
  {
    name: 'Education Centre All-in-one System',
    description:
      "Easily manage students/courses/homework records for an education center with 3 branches and 300+ students enrolled. Provided a portal for parents to conveniently stay updated on their students' progress and ensure that all assigned tasks have been successfully accomplished.",
  },
  {
    name: 'Real-time 2nd-hand car listings scraper',
    description:
      'Actively monitor second-hand car listings based on specific criteria and send push notifications to Telegram. (testing purpose only)',
  },
  {
    name: 'Custom ESLint',
    description:
      'Use AST parser to define self-used ESLint rule for much better warning/error prompt',
  },
  {
    name: 'Tree distribution in Hong Kong',
    description: 'Plot tree distribution for 18 districts in Hong Kong by D3js',
  },
]
