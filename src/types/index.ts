export interface User {
  id: string
  name: string
  email: string
  image?: string
}

export interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

