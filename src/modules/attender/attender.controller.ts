import {
  Body,
  Controller,
  Delete,
  UseGuards,
  Get,
  Injectable,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AttenderService } from './attender.service';
import {
  PageAndSort,
  PagedResult,
  checkPage,
  QueryPage as QueryPage,
  ApiPagedResultResponse,
} from 'src/common';
import { Attender } from 'src/prisma';
import {
  AttenderCreateInput,
  AttenderDto,
  AttenderUpdateInput,
} from './attender.dto';
import { IdGenerator } from 'src/common/id.generator';
import { Auth } from 'src/auth';
import { Permissions } from 'src/permission';

@Injectable()
@Controller('Attenders')
@ApiTags('Attenders')
export class AttenderController {
  constructor(
    protected readonly service: AttenderService,
    protected readonly idGenerator: IdGenerator,
  ) {}

  /**
   * Get a list of Attenders
   * @returns
   */
  @Get()
  @ApiPagedResultResponse(AttenderDto)
  getList(@QueryPage() page: PageAndSort): Promise<PagedResult<AttenderDto>> {
    checkPage(page);
    return this.service.getList(page);
  }

  @Post()
  @ApiResponse({ type: AttenderDto })
  // @Permissions('Create')
  create(@Body() input: AttenderCreateInput): Promise<AttenderDto> {
    const Attender = this.mapCreateAttender(input);
    return this.service.create(Attender);
  }

  @Delete(':id')
  @ApiResponse({ type: AttenderDto })
  // @Auth()
  delete(@Param('id') id: string): Promise<AttenderDto> {
    return this.service.delete(id);
  }

  @Put(':id')
  @ApiResponse({ type: AttenderDto })
  // @Auth()
  async update(
    @Param('id') id: string,
    @Body() input: AttenderUpdateInput,
  ): Promise<AttenderDto> {
    const Attender = await this.service.get(id);
    this.mapUpdateAttender(input, Attender);
    return this.service.update(id, Attender);
  }

  protected mapCreateAttender(input: AttenderCreateInput): Attender {
    const Attender: Attender = {
      ...input,
      id: this.idGenerator.create(),
    };
    return Attender;
  }

  protected mapUpdateAttender(input: AttenderUpdateInput, to: Attender) {
    if (input.name !== undefined) {
      to.name = input.name;
    }
    if (input.description !== undefined) {
      to.description = input.description;
    }
    // Add mapping for other fields as needed
  }
}