// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Item } from './item.entity';

// @Injectable()
// export class ItemsService {
//   constructor(
//     @InjectRepository(Item)
//     private itemsRepository: Repository<Item>,
//   ) {}

//   findAll(): Promise<Item[]> {
//     return this.itemsRepository.find();
//   }

//   findOne(id: string): Promise<Item> {
//     return this.itemsRepository.findOne(id);
//   }

//   async create(item: Omit<Item, 'id'>): Promise<Item> {
//     return this.itemsRepository.save(item);
//   }

//   async update(id: string, updatedItem: Omit<Item, 'id'>): Promise<Item> {
//     await this.itemsRepository.update(id, updatedItem);
//     return this.itemsRepository.findOne(id);
//   }

//   async delete(id: string): Promise<void> {
//     await this.itemsRepository.delete(id);
//   }
// }
