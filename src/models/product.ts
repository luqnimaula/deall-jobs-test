export type Product = {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

export type ProductCart = {
  id: number
  title: string
  price: number
  quantity: number
  total: number
  discountPercentage: number
  discountedPrice: number
}
