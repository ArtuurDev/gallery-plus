import * as DialogPrimitive from '@radix-ui/react-dialog'
import Card from './card'
import cn from 'classnames'
import { Text } from './text'
import { Button } from './button'

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogClose = DialogPrimitive.Close
import XIcon from "../assets/icons/x.svg?react"
import { Divider } from './divider'
import type React from 'react'

export function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn(`
        fixed inset-0 z-50 bg-background-secondary/60
        backdrop-blur-sm
        data-[state=open]:animate-in
        data-[state=open]:animate-out
        data-[satet=open]:fade-in-0
        data-[state=closed]:fade-out
      `,
        className
      )}
      {...props}
    />
  )
}


export function DialogContent({
  className,
  ref,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(`
            fixed left-[50%] top-[50%] w-full max-w-[32rem]
            z-[60] translate-x-[-50%] translate-y-[-50%]
            data-[state=open]:animate-in
            data-[state=open]:fade-in-0
            data-[state=open]:slide-in-from-botton-[48%]
            data-[state=closed]:animate-out
            data-[state=closed]:fade-out-0
            data-[state=closed]:slide-out-to-bottom-[48%]
          `, className
        )}
        {...props}
      >
        <Card variant='primary' className='p-4'>
          {children}
        </Card>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

export function DialogHeader({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <>
      <header
        className={cn(`
          flex items-center justify-between
      `,
          className
        )}
        {...props}
      >
        <DialogPrimitive.Title>
          <Text
            variant='heading-medium'>
            {children}
          </Text>
        </DialogPrimitive.Title>
        <DialogClose asChild>
          <Button icon={XIcon} variant="ghost" />
        </DialogClose>
      </header>
      <Divider className='mt-1.5 mb-5' />
    </>
  )
}

export function DialogBody({ children, ...props }: React.ComponentProps<"div">) {
  return <div {...props}>
    {children}
  </div>
}


export function Dialogfooter({
  children,
  className,
  ...props
}: React.ComponentProps<"footer">) {
  return <footer className='flex items-center justify-end mt-4 gap-1.5'>
    {children}
  </footer>
}