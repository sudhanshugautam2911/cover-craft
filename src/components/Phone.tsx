import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

// learning - extending HTMLAttributes<HTMLDivElement> which means - type includes common HTML attributes like id, className, style, onClick, etc.
interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string
  dark?: boolean
}

// learning - passing props as ...props
const Phone = ({ imgSrc, className, dark = false, ...props }: PhoneProps) => {
  return (
    <div
      className={cn(
        'relative pointer-events-none z-50 overflow-hidden',
        className
      )}
      {...props}>
      <img
        src={
          dark
            ? '/phone-template-dark-edges.png'
            : '/phone-template-white-edges.png'
        }
        className='pointer-events-none z-50 select-none'
        alt='phone image'
      />

      <div className='absolute -z-10 inset-0'>
        <img
          className='object-cover min-w-full min-h-full'
          src={imgSrc}
          alt='overlaying phone image'
        />
      </div>
    </div>
  )
}

export default Phone