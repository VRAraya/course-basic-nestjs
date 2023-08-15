import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res
} from '@nestjs/common'

@Controller('products')
export class ProductsController {
  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string
  ) {
    return {
      message: `products: limit => ${limit}, offset => ${offset}, brand => ${brand}`
    }
  }

  @Get('filter')
  getFilter() {
    return {
      message: `yo soy filter`
    }
  }

  // @Get(':id')
  // @HttpCode(HttpStatus.ACCEPTED)
  // getProduct(@Res() response: Response, @Param('id') id: string) {
  //   response.status(202).send({
  //     message: `product ${id}`
  //   })
  // }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('id') id: string) {
    return {
      message: `product ${id}`
    }
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'accion de crear',
      payload
    }
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      payload
    }
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return {
      id,
      message: `delete product ${id}`
    }
  }
}
