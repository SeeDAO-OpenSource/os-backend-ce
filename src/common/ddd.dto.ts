import { ApiProperty } from "@nestjs/swagger";

export class CountableResult {
  @ApiProperty()
  count: number

  constructor(count: number) {
    this.count = count
  }
}