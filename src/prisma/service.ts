import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PageAndSort, PagedResult, getSkip, getTake, parseSort } from 'src/common';

export interface PrismaRepository<T> {
  findMany(args?: any): Prisma.PrismaPromise<Array<T>>
  count(): Promise<number>
}

let isConnected = false

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

  async getPaged<TModel>(db: PrismaRepository<TModel>, page: PageAndSort): Promise<PagedResult<TModel>> {
    const result: PagedResult<TModel> = {
      items: [],
      hasNext: false,
    }

    if (page.includeTotal) {
      result.total = await db.count()
    }

    const query: any = {
      take: getTake(page) + 1,
      skip: getSkip(page),
    }
    if (page.order) {
      query.orderBy = parseSort(page.order)
    }
    let tools = await db.findMany(query)
    if (tools.length > getTake(page)) {
      tools.pop()
      result.hasNext = true
    }
    result.items = tools
    return result
  }

  async onModuleInit() {
    if (isConnected) {
      return
    }
    
    this.$connect();
    isConnected = true
    console.log('Prisma connected')
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}