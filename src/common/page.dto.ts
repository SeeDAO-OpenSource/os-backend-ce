import { ArgumentMetadata, PipeTransform, Query } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

/** 
 * Represents the parameters used to query a page of data from a data source. 
 * @name Page 
 */
export class Page {
  /** 
   * The current page number. Defaults to 1 if not provided. 
   * @type {number} 
   */
  page?: number = 1;
  /** 
   * The number of records to be returned per page. Defaults to 10 if not provided. 
   * @type {number} 
   */
  limit?: number = 10;
  /** 
   * Determines whether the total number of records matching the query should also be returned. 
   * @type {boolean} 
   */
  includeTotal?: boolean;
}

export class PageAndSort extends Page {
  /** 
 * Represents the sorting order to be applied to a data source. - for descending, + for ascending, no prefix for ascending.
 * @name order 
 * @type {string} 
 * @example -name
 */
  order?: string; // id,-name
}

/** 
 * Represents a paged result of data retrieved from a data source. 
 * @class 
 * @name PagedResult 
 * @template T The type of item returned in the paged result. 
 */
export class PagedResult<T> {
  /** 
   * An array of items on the current page. 
   * @type {T[]} 
   */
  @ApiProperty()
  items: T[];
  /** 
   * A boolean indicating whether there are more pages of data available. 
   * @type {boolean} 
   */
  hasMore: boolean;
  /** 
   * An optional total count of items available from the data source. 
   * @type {number} 
   */
  total?: number;

  constructor(items: T[], hasMore: boolean, total?: number) {
    this.items = items;
    this.hasMore = hasMore;
    this.total = total;
  }
}

export enum SortOrder {
  asc = 'asc',
  desc = 'desc'
};

export class SortParam {
  [key: string]: SortOrder
}

export function checkPage(page: Page) {
  if (!Number.isInteger(page.page) || page.page <= 0) {
    page.page = 1;
  }
  if (!Number.isInteger(page.limit) || page.limit <= 0) {
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
    const page: any = value
    page.page = parseInt(page.page)
    page.limit = parseInt(page.limit)
    page.includeTotal = page.includeTotal == 'true'
    checkPage(page)
    return page
  }

}

// is sorted by desc
function isDesc(sort: string): boolean {
  return sort.length > 0 && sort[0] == '-' || sort[0] == '!'
}
