import * as React from "react"

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: "compact" | "normal" | "large"
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className = "", spacing = "normal", ...props }, ref) => {
    const spacings = {
      compact: "py-8 md:py-12",
      normal: "py-12 md:py-16",
      large: "py-16 md:py-24"
    }
    const classes = `${spacings[spacing]} ${className}`
    
    return (
      <section ref={ref} className={classes.trim()} {...props} />
    )
  }
)
Section.displayName = "Section"
