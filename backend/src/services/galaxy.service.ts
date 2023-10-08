import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { World } from '../entities/world.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateWorldDto } from '../dtos/CreateWorldDto';
import { Galaxy } from '../entities/galaxy.entity';
import { CreateGalaxyDto } from '../dtos/CreateGalaxyDto';

@Injectable()
export class GalaxyService {
  constructor(
    @InjectRepository(Galaxy)
    private readonly galaxyRepository: Repository<Galaxy>,
  ) {}

  async createGalaxy(createGalaxyDto: CreateGalaxyDto): Promise<Galaxy> {
    const existingGalaxy = await this.galaxyRepository.findOneBy({
      index: createGalaxyDto.index,
    });
    if (existingGalaxy) {
      throw new Error('Galaxy already exists');
    }
    const newGalaxy = this.galaxyRepository.create(createGalaxyDto);
    return this.galaxyRepository.save(newGalaxy);
  }

  async getGalaxy(id): Promise<Galaxy> {
    const galaxy = await this.galaxyRepository.findOne({ where: { id } });
    if (!galaxy) {
      throw new Error('Galaxy not found');
    }
    return galaxy;
  }
}
