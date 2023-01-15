import { ProductCart } from './product'

export type Cart = {
  id: number
  total: number
  discountedTotal: number
  userId: number
  totalProducts: number
  totalQuantity: number
  products: ProductCart[]
}
