import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { World } from '../entities/world.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateWorldDto } from '../dtos/CreateWorldDto';
import { Galaxy } from '../entities/galaxy.entity';

@Injectable()
export class WorldService {
  constructor(
    @InjectRepository(World)
    private readonly worldRepository: Repository<World>,

    @InjectRepository(Galaxy) // Inject the Galaxy repository
    private readonly galaxyRepository: Repository<Galaxy>,
  ) {}

  async createWorld(createWorldDto: CreateWorldDto): Promise<World> {
    const id = createWorldDto.galaxyId;
    const galaxy = await this.galaxyRepository.findOne({ where: { id } });

    if (!galaxy) {
      throw new Error('Galaxy not found');
    }

    const existingWorld = await this.worldRepository.findOneBy({
      index: createWorldDto.index,
    });

    if (existingWorld) {
      throw new Error('World already exists');
    }

    const newWorld = this.worldRepository.create({
      name: createWorldDto.name,
      index: createWorldDto.index,
      galaxy,
    });

    return this.worldRepository.save(newWorld);
  }

  async getWorld(id): Promise<World> {
    const world = await this.worldRepository.findOne({ where: { id } });
    if (!world) {
      throw new Error('World not found');
    }
    return world;
  }
}
