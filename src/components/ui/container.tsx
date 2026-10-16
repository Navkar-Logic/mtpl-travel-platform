import * as React from "react"

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className = "", as: Component = "div", ...props }, ref) => {
    const classes = `w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`
    return (
      <Component ref={ref} className={classes.trim()} {...props} />
    )
  }
)
Container.displayName = "Container"
