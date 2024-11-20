import React from 'react'

interface Props {
  children: React.ReactNode
}

export function TypographyP({ children }: Props) {
  return <p className="leading-7">{children}</p>
}
