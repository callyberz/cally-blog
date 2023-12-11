import { cx } from 'class-variance-authority'
import React, { useContext } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { education } from '@/lib/data'
import { CommonUtil } from '@/lib/CommonUtil'
import { TypographyH1 } from '@/components/common/TypographyH1'
import { TypographyP } from '@/components/common/TypographyP'

const Education = () => {
  return (
    <Card className={cx('w-full flex-1 bg-neutral-900')}>
      <CardHeader>
        <TypographyH1>Education</TypographyH1>
        <TypographyP>My previous study...</TypographyP>
      </CardHeader>
      {education.map((item, index) => {
        return (
          <CardContent className="text-xl text-slate-100" key={index}>
            <p>{item.school}</p>
            <div className="text-sm text-slate-400">
              <p>{item.programme}</p>
              <p>{item.location}</p>
              <p>
                {CommonUtil.getDisplayDateRange(item.dateStart, item.dateEnd)}
              </p>
            </div>
          </CardContent>
        )
      })}
    </Card>
  )
}

export default function EducationPage() {
  return <Education />
}
