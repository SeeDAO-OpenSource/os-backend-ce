import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  create(@Body() data) {
    return this.fileService.createFile(data);
  }

  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.fileService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data) {
    return this.fileService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.fileService.remove(id);
  }

  @Get('videos')
  getAllVideos() {
    return this.fileService.getAllVideos();
  }

  @Get('video/:videoId')
  findVideo(@Param('videoId') videoId: number) {
    return this.fileService.findVideo(videoId);
  }
}
