'use client'

import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { experiences } from '@/lib/data'
import { cx } from 'class-variance-authority'
import { ToggleContent } from '@/components/common/ToggleContent'
import { CommonUtil } from '@/lib/CommonUtil'
import { TypographyH1 } from '@/components/common/TypographyH1'
import { TypographyP } from '@/components/common/TypographyP'

const WorkExperience = () => {
  return (
    <Card className={cx('w-full flex-1')}>
      <CardHeader>
        <TypographyH1>Working Experience</TypographyH1>
      </CardHeader>

      {experiences.map((item, index) => {
        return (
          <CardContent key={index}>
            <ToggleContent title={item.company}>
              <>
                <div className="text-xl">
                  <TypographyP>{item.title}</TypographyP>
                </div>

                <div className="text-sm">
                  <p>
                    {CommonUtil.getDisplayDateRange(
                      item.dateStart,
                      item?.dateEnd ?? 'Now',
                    )}
                  </p>
                  <p>{`📍 ${item.location}`}</p>
                </div>

                {item.descriptions.map((value, index) => (
                  <ul className="ml-4 list-disc [&>li]:mt-2" key={index}>
                    <li>{value}</li>
                  </ul>
                ))}
              </>
            </ToggleContent>
          </CardContent>
        )
      })}
    </Card>
  )
}

export default function WorkExperiencePage() {
  return <WorkExperience />
}
