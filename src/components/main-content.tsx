import type React from "react";
import cn from "classnames";

export interface MainContentProps extends React.ComponentProps<"main">{}

export function MainContent({
  children,
  className,
  ...props
}: MainContentProps) {
  return (

    <main className={cn("mt-20 pb-2", className)} {...props}>
      {children}
    </main>

  )
}