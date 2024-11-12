import { cx } from 'class-variance-authority'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'src/components/ui/accordion'

export interface Props {
  title: string
  className?: string
  children: React.ReactNode
}

export const ToggleContent = ({ title, className, children }: Props) => {
  return (
    <Accordion
      type="multiple"
      className={cx('w-full rounded-md', className)}
      defaultValue={[title]}
    >
      <AccordionItem value={title}>
        <AccordionTrigger className="whitespace-nowrap text-lg font-semibold tracking-tight">
          {title}
        </AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
