// import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
// import { ItemsService, Item } from './items.service';

// @Controller('items')
// export class ItemsController {
//   constructor(private readonly itemsService: ItemsService) {}

//   @Get()
//   findAll(): Item[] {
//     return this.itemsService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: number): Item {
//     return this.itemsService.findOne(id);
//   }

//   @Post()
//   create(@Body() item: Item): void {
//     this.itemsService.create(item);
//   }

//   @Put(':id')
//   update(@Param('id') id: number, @Body() updatedItem: Item): void {
//     this.itemsService.update(id, updatedItem);
//   }

//   @Delete(':id')
//   delete(@Param('id') id: number): void {
//     this.itemsService.delete(id);
//   }
// }
