import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from '@prisma/client';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Item> {
    return this.itemsService.findOne(id);
  }

  @Post()
  create(@Body() item: Item): void {
    this.itemsService.create(item);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updatedItem: Item): Promise<void> {
    await this.itemsService.update(id, updatedItem);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.itemsService.delete(id);
  }
}
