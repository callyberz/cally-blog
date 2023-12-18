'use client'

import { cx } from 'class-variance-authority'
import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { education } from '@/lib/data'
import { CommonUtil } from '@/lib/CommonUtil'
import { TypographyH1 } from '@/components/common/TypographyH1'
import { TypographyH3 } from '@/components/common/TypographyH3'

const Education = () => {
  return (
    <Card className={cx('w-full flex-1')}>
      <CardHeader>
        <TypographyH1>Education</TypographyH1>
      </CardHeader>

      {education.map((item, index) => {
        return (
          <CardContent className="" key={index}>
            <TypographyH3>{item.school}</TypographyH3>
            <ul className="ml-4 list-disc [&>li]:mt-2">
              <li>{item.programme}</li>
              <li>
                {item.location}
                {', '}
                <i>
                  {CommonUtil.getDisplayDateRange(item.dateStart, item.dateEnd)}
                </i>
              </li>
            </ul>
          </CardContent>
        )
      })}
    </Card>
  )
}

export default function EducationPage() {
  return <Education />
}
