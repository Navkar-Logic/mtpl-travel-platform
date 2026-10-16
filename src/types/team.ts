export interface DirectorMember {
  name: string
  role: string
  image: string
  alt: string
  message: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  department: string
  image?: string
  alt?: string
  initials?: string
  isLead?: boolean
  description?: string
  bio?: string
  responsibilities?: string[]
}
