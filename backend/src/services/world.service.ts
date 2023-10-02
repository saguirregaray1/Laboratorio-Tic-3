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
      // Handle the case where the specified Galaxy doesn't exist
      throw new Error('Galaxy not found');
    }

    // Check if a world with the same index already exists
    const existingWorld = await this.worldRepository.findOneBy({
      index: createWorldDto.index,
    });

    if (existingWorld) {
      // Handle the case where a world with the same index already exists
      throw new Error('A world with the same index already exists');
    }

    // Create a new World entity and associate it with the found Galaxy
    const newWorld = this.worldRepository.create({
      name: createWorldDto.name,
      index: createWorldDto.index,
      galaxy, // Assign the galaxy object to the world's galaxy property
    });

    // Save the new World entity
    return this.worldRepository.save(newWorld);
  }
}
