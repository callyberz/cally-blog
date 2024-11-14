import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { skills } from '@/lib/data'
import { cx } from 'class-variance-authority'
import { Badge } from '@/components/ui/badge'
import { TypographyH1 } from '@/components/common/TypographyH1'
import { TypographyP } from '@/components/common/TypographyP'
import { TypographyH3 } from '@/components/common/TypographyH3'

const Skills = () => {
  return (
    <Card className={cx('w-full flex-1')}>
      <CardHeader>
        <TypographyH1>Tech Stack</TypographyH1>
      </CardHeader>
      {skills.map((skill, index) => {
        return (
          <CardContent key={index}>
            <TypographyH3>{skill.type}</TypographyH3>
            {skill.items.map((value, key) => (
              <Badge variant="outline" key={key} className="mr-2">
                {value}
              </Badge>
            ))}
            <ul className="ml-4 list-disc [&>li]:mt-2">
              {skill.highlights.map((value, key) => (
                <li key={key} className="text-sm">
                  {value}
                </li>
              ))}
            </ul>
          </CardContent>
        )
      })}
    </Card>
  )
}
export default function SkillsPage() {
  return <Skills />
}
