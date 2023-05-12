export class CreateProposalDto {
    // 根据实际需求补充数据字段
    datetime: Date;
    title: string;
    content: string;
    proposerId: string;
    tags: string[];
    category: string;
    links: Array<{ title: string; url: string }>;
    type: string;
    status: string;
    sip: string;
    main_poll: any;
    poll: any;
    budget: number;
    down_payment: number;
    subpolls: any;
  }