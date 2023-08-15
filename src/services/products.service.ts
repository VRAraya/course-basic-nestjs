import { faker } from '@faker-js/faker'
import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateProductDto, UpdateProductDto } from 'src/dtos/products.dtos'
import { Product } from 'src/entities/product.entity'

@Injectable()
export class ProductsService {
  private _counterId = 0
  private inc = () => {
    this._counterId = this._counterId + 1
    return this._counterId
  }
  private products: Product[] = [
    {
      id: this.inc(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseInt(faker.commerce.price(), 10),
      stock: faker.number.int({ min: 10, max: 100 }),
      images: faker.helpers.multiple(faker.image.url),
      category: {
        id: faker.number.int({ min: 1, max: 12 }),
        name: faker.helpers.arrayElement(
          faker.helpers.multiple(faker.word.adjective)
        ),
        image: faker.helpers.arrayElement(
          faker.helpers.multiple(faker.image.url)
        ),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent()
      },
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent()
    }
  ]

  findAll() {
    return this.products
  }

  findOne(id: number): [Product, number] {
    const product = this.products.find((item) => item.id === id)
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`)
    }
    return [product, this.products.findIndex((item) => item.id === id)]
  }

  create(payload: CreateProductDto) {
    const newProduct = {
      ...payload,
      id: this.inc(),
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
      category: {
        id: payload.categoryId,
        name: faker.commerce.department(),
        image: faker.helpers.arrayElement(
          faker.helpers.multiple(faker.image.url)
        ),
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent()
      }
    }
    this.products.push(newProduct)
    return newProduct
  }

  update(id: number, payload: UpdateProductDto) {
    const [product, productId] = this.findOne(id)
    const products = this.products
    const updatedProduct = {
      ...product,
      ...payload
    }
    products[productId] = updatedProduct
    this.products = products
    return updatedProduct
  }

  delete(id: number) {
    const [product] = this.findOne(id)
    this.products = this.products.filter((item) => item.id !== id)
    return product
  }
}
