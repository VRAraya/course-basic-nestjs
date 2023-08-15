import { PartialType } from '@nestjs/mapped-types'
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl
} from 'class-validator'
import { Product } from 'src/entities/product.entity'

export class CreateProductDto
  implements Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'category'>
{
  @IsString()
  @IsNotEmpty()
  readonly title: string

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number

  @IsString()
  @IsNotEmpty()
  readonly description: string

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number

  @IsArray()
  @ArrayNotEmpty()
  @IsUrl({}, { each: true })
  readonly images: string[]

  @IsNumber()
  readonly categoryId: number
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
