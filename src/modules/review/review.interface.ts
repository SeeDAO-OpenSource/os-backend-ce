
import { Prisma } from '@prisma/client' 


export interface ReviewCreateInput extends Prisma.ReviewCreateInput {
    eventId?: number 
    // tags?: Prisma.TagCreateNestedManyWithoutReviewInput 
    toId?: string 
    fromId?: string 

  }
  
export interface ReviewUpdateInput extends Prisma.ReviewUpdateInput {
    eventId?: number 
    // tags?: Prisma.TagCreateNestedManyWithoutReviewInput 
    toId?: string 
    fromId?: string 

  }
  