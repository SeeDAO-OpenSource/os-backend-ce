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
import { ProjectService } from './project.service';
import {
  PageAndSort,
  PagedResult,
  checkPage,
  QueryPage as QueryPage,
  ApiPagedResultResponse,
} from 'src/common';
import { Project } from 'src/prisma';
import {
  ProjectCreateInput,
  ProjectDto,
  ProjectUpdateInput,
} from './project.dto';
import { IdGenerator } from 'src/common/id.generator';
import { Auth } from 'src/auth';
import { Permissions } from 'src/permission';

@Injectable()
@Controller('Projects')
@ApiTags('Projects')
export class ProjectController {
  constructor(
    protected readonly service: ProjectService,
    protected readonly idGenerator: IdGenerator,
  ) {}

  /**
   * Get a list of Projects
   * @returns
   */
  @Get()
  @ApiPagedResultResponse(ProjectDto)
  getList(@QueryPage() page: PageAndSort): Promise<PagedResult<ProjectDto>> {
    checkPage(page);
    return this.service.getList(page);
  }

  @Post()
  @ApiResponse({ type: ProjectDto })
  // @Permissions('Create')
  create(@Body() input: ProjectCreateInput): Promise<ProjectDto> {
    const Project = this.mapCreateProject(input);
    return this.service.create(Project);
  }

  @Delete(':id')
  @ApiResponse({ type: ProjectDto })
  // @Auth()
  delete(@Param('id') id: string): Promise<ProjectDto> {
    return this.service.delete(id);
  }

  @Put(':id')
  @ApiResponse({ type: ProjectDto })
  // @Auth()
  async update(
    @Param('id') id: string,
    @Body() input: ProjectUpdateInput,
  ): Promise<ProjectDto> {
    const Project = await this.service.get(id);
    this.mapUpdateProject(input, Project);
    return this.service.update(id, Project);
  }

  protected mapCreateProject(input: ProjectCreateInput): Project {
    const Project: Project = {
      ...input,
      id: this.idGenerator.create(),
    };
    return Project;
  }

  protected mapUpdateProject(input: ProjectUpdateInput, to: Project) {
    if (input.name !== undefined) {
      to.name = input.name;
    }
    if (input.description !== undefined) {
      to.description = input.description;
    }
    // Add mapping for other fields as needed
  }
}