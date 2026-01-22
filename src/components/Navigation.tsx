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
  HomeIcon,
} from 'lucide-react'
import { SearchDialog } from './SearchDialog'

interface RouteProps {
  text: string
  linkTo: string
  icon: React.ReactNode
}

const Routes: RouteProps[] = [
]

export function Navigation() {
  return (
    <div className="flex items-center justify-between p-4">
      <NavigationMenu>
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

      <SearchDialog />
    </div>
  )
}
