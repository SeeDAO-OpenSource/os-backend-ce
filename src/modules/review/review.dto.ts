export class CreateReviewDto {
    tags?: string[];
    comment?: string;
    targetCollection?: string;
    targetId?: number;
    max?: number;
    min?: number;
    value?: number;
    eventId: number;
    toId: string;
    fromId: string;
  }
  
  export class UpdateReviewDto {
    tags?: string[];
    comment?: string;
    targetCollection?: string;
    targetId?: number;
    max?: number;
    min?: number;
    value?: number;
    eventId?: number;
    toId?: string;
    fromId?: string;
  }