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
      throw new HttpException('Galaxy not found', HttpStatus.NOT_FOUND);
    }

    const existingWorld = await this.worldRepository.findOneBy({
      index: createWorldDto.index,
    });

    if (existingWorld) {
      throw new HttpException('World already exists', HttpStatus.BAD_REQUEST);
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
      throw new HttpException('World not found', HttpStatus.NOT_FOUND);
    }
    return world;
  }

  async getWorldsByGalaxy(galaxyId): Promise<World[]> {
    const galaxy = await this.galaxyRepository.findOne({
      where: { id: galaxyId },
    });

    if (!galaxy) {
      throw new HttpException('Galaxy not found', HttpStatus.NOT_FOUND);
    }
    const worlds = await this.worldRepository.findBy({ galaxy: galaxy });
    return worlds;
  }
}
