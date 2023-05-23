import { Injectable, InternalServerErrorException, NotFoundException, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from './client';
import { IdGenerator, PageAndSort, PagedResult, getSkip, getTake, parseSort } from 'src/common';

export interface PrismaRepository<T> {
  findMany(args?: any): Prisma.PrismaPromise<Array<T>>
  count(): Promise<number>
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(private idGenrator: IdGenerator) {
    super()

    this.$use(async (params, next) => {
      try {
        return await next(params)
      } catch (e: any) {
        throw new InternalServerErrorException(e.message)
      }
    })

    this.$use(async (params, next) => {
      if (params.action === "create") {
        if (!params.args.data.id) {
          params.args.data.id = this.idGenrator.create()
        }
      } else if (params.action === "createMany") {
        for (const item of params.args.data) {
          if (!item.id) {
            item.id = this.idGenrator.create()
          }
        }
      }
      return next(params)
    })
  }

  async getPaged<TModel>(db: PrismaRepository<TModel>, page: PageAndSort, args?: any): Promise<PagedResult<TModel>> {
    const result: PagedResult<TModel> = {
      items: [],
      hasMore: false,
    }

    if (page.includeTotal) {
      result.total = await db.count()
    }

    let query: any = {
      take: getTake(page) + 1,
      skip: getSkip(page),
    }
    if (args) {
      query = { ...query, ...args }
    }
    if (page.order) {
      query.orderBy = parseSort(page.order)
    }
    let tools = await db.findMany(query)
    if (tools && tools.length > getTake(page)) {
      tools.pop()
      result.hasMore = true
    }
    result.items = tools
    return result
  }

  async onModuleInit() {
    this.$connect();
    console.log('Prisma connected')
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}