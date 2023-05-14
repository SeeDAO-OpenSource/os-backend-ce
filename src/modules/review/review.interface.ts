
import { Prisma } from '@prisma/client'


export interface ReviewCreateInput extends Prisma.ReviewCreateInput {
  // tags?: Prisma.TagCreateNestedManyWithoutReviewInput 

}

export interface ReviewUpdateInput extends Prisma.ReviewUpdateInput {
  eventId?: number
  // tags?: Prisma.TagCreateNestedManyWithoutReviewInput 
  toId?: string
  fromId?: string

}
