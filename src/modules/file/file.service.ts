import { Injectable } from '@nestjs/common';
import { PrismaClient , File } from '@prisma/client';

@Injectable()
export class FileService {
    private prisma: PrismaClient;

    constructor() {
      this.prisma = new PrismaClient();
    }
  
  async createFile(data) {
    return this.prisma.file.create({ data });
  }

  async findAll() {
    return this.prisma.file.findMany();
  }

  async findOne(id: number) {
    return this.prisma.file.findUnique({ where: { id } });
  }

  async update(id: number, data) {
    return this.prisma.file.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.file.delete({ where: { id } });
  }

  
  async getAllVideos() {
    const videos = await this.prisma.file.findMany({
      where: { filetype: 'video' },
    });
    videos.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    return videos;
  }

  async findVideo(videoId: number) {
    return await this.prisma.file.findUnique({ where: { id: videoId } });
  }
}
