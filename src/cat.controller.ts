import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CatService } from './cat.service';
import { CreateCatDto } from './create-cat.dto';

@Controller()
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Get()
  getAllCats() {
    return this.catService.getAll();
  }
  @Get(':id')
  getCatById(@Param('id') id: number) {
    return this.catService.getOneById(id);
  }

  @Post()
  async addNewCat(@Body() createCatDto: CreateCatDto) {
    return await this.catService.createCat(createCatDto);
  }

  @Put(':id')
  async updateCat(@Param('id') id: number, @Body() createCatDto: CreateCatDto) {
    return await this.catService.updateCat(id, createCatDto);
  }

  @Delete(':id')
  deleteCat(@Param('id') id: number) {
    return this.catService.deleteCat(id);
  }
}
