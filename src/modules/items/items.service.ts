import { Injectable } from '@nestjs/common';

export interface Item {
  id: number;
  name: string;
  description: string;
}

@Injectable()
export class ItemsService {
  private items: Item[] = [];

  findAll(): Item[] {
    return this.items;
  }

  findOne(id: number): Item {
    return this.items.find(item => item.id === id);
  }

  create(item: Item): void {
    this.items.push(item);
  }

  update(id: number, updatedItem: Item): void {
    const index = this.items.findIndex(item => item.id === id);
    this.items[index] = updatedItem;
  }

  delete(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
  }
}
