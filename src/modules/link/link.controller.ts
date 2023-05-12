import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { LinkService } from './link.service';
import { Link } from '@prisma/client';

@Controller('links')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  async createLink(@Body() data: Omit<Link, 'id'>): Promise<Link> {
    return this.linkService.createLink(data);
  }

  @Get()
  async getLinks(): Promise<Link[]> {
    return this.linkService.getLinks();
  }

  @Get(':id')
  async getLink(@Param('id') id: number): Promise<Link | null> {
    return this.linkService.getLink(id);
  }

  @Put(':id')
  async updateLink(@Param('id') id: number, @Body() data: Partial<Omit<Link, 'id'>>): Promise<Link | null> {
    return this.linkService.updateLink(id, data);
  }

  @Delete(':id')
  async deleteLink(@Param('id') id: number): Promise<Link | null> {
    return this.linkService.deleteLink(id);
  }
}
