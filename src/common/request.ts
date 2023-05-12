import { ArgumentMetadata, PipeTransform, Query } from "@nestjs/common";

export interface Page {
  page: number;
  limit: number;
  includeTotal?: boolean;
}

export interface PageAndSort extends Page {
  order?: string; // id,-name
}

export interface PagedResult<T> {
  items: T[];
  hasNext: boolean;
  total?: number;
}

export enum SortOrder {
  asc = 'asc',
  desc = 'desc'
};

export type SortParam = {
  [key: string]: SortOrder
}

export function checkPage(page: Page) {
  if (page.page <= 0) {
    page.page = 1;
  }
  if (page.limit <= 0) {
    page.limit = 10;
  }
}

export function getSkip(page: Page): number {
  return (page.page - 1) * page.limit;
}

export function getTake(page: Page): number {
  return page.limit;
}

export function parseSort(sort: string): SortParam | undefined {
  if (!sort) {
    return undefined;
  }
  const strs = sort.split(",");
  if (strs.length == 0) {
    return undefined;
  }
  const result: SortParam = {};
  strs.forEach(subSort => {
    if (isDesc(subSort)) {
      result[subSort.substring(1)] = SortOrder.desc;
    } else {
      result[subSort.replace("+", "")] = SortOrder.desc;
    }
  });
  return result
}

export function queryPage(): ParameterDecorator { // 这是一个装饰器工厂
  return Query(new PageTransform())
}

export class PageTransform implements PipeTransform<{ [key: string]: string }, PageAndSort>{
  transform(value: { [key: string]: string; }, metadata: ArgumentMetadata): PageAndSort {
    const page: PageAndSort = {
      page: parseInt(value.page),
      limit: parseInt(value.limit),
      includeTotal: value.includeTotal == 'true',
      order: value.order,
    }
    checkPage(page)
    return page
  }

}

// is sorted by desc
function isDesc(sort: string): boolean {
  return sort.length > 0 && sort[0] == '-' || sort[0] == '!'
}


