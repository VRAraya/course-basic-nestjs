import { Category } from './category.entity'
import { DateBase } from './date-base.entity'

export interface Product extends DateBase {
  id: number
  title: string
  price: number
  description: string
  stock: number
  images: string[]
  category: Category
}
