'use client'

import React from 'react'
import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import {
  BookOpen,
  Briefcase,
  HomeIcon,
  School,
  UserCircle2,
} from 'lucide-react'

interface RouteProps {
  text: string
  linkTo: string
  icon: React.ReactNode
}

const Routes: RouteProps[] = [
  {
    text: 'Work',
    linkTo: '/work',
    icon: <Briefcase className="md:mr-2 md:inline" />,
  },
  {
    text: 'Skils',
    linkTo: '/skills',
    icon: <UserCircle2 className="md:mr-2 md:inline" />,
  },
  // {
  //   text: 'Educaiton',
  //   linkTo: '/education',
  //   icon: <School className="md:mr-2 md:inline" />,
  // },
]

export function Navigation() {
  return (
    <NavigationMenu className="flex items-center justify-between p-4">
      <NavigationMenuList className="flex space-x-4">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">
              <HomeIcon className="md:mr-2 md:inline" />
              <span className="hidden md:inline">Home</span>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {Routes.map((route, index) => (
          <NavigationMenuItem key={index}>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href={route.linkTo}>
                {route.icon}
                <span className="hidden md:inline">{route.text}</span>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
