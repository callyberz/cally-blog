import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { skills } from '@/lib/data'
import { cx } from 'class-variance-authority'
import { Badge } from '@/components/ui/badge'
import { TypographyH1 } from '@/components/common/TypographyH1'
import { TypographyP } from '@/components/common/TypographyP'

const Skills = () => {
  return (
    <Card className={cx('w-full flex-1 bg-neutral-900')}>
      <CardHeader>
        <TypographyH1>Skills</TypographyH1>
        <TypographyP>My programming skills...</TypographyP>
      </CardHeader>
      {skills.map((skill, index) => {
        return (
          <CardContent key={index}>
            <TypographyP>{skill.type}</TypographyP>
            {skill.items.map((value, key) => (
              <Badge
                variant="outline"
                key={key}
                className="mr-2 dark:text-slate-400"
              >
                {value}
              </Badge>
            ))}
          </CardContent>
        )
      })}
    </Card>
  )
}
export default function SkillsPage() {
  return <Skills />
}
