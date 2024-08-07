export interface Product {
  id: number
  title: string
  description: string
  price: number
  brand: string
  category: string
  discountPercentage?: number
  images?: string[]
  rating: number
  stock: number
  thumbnail: string
}
