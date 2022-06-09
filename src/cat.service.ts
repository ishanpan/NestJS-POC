import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cats } from './Entities/cats.entity';
import { CreateCatDto } from './create-cat.dto';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(Cats) private catsRepository: Repository<Cats>,
  ) {}

  getAll(): Promise<Cats[]> {
    return this.catsRepository.find();
  }

  async getOneById(id: number): Promise<Cats> {
    try {
      const user = await this.catsRepository.findOneOrFail(id);
      return user;
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  createCat(cat: CreateCatDto): Promise<Cats> {
    const newCat = this.catsRepository.create(cat);
    return this.catsRepository.save(newCat);
  }

  async updateCat(id: number, cat: CreateCatDto): Promise<Cats> {
    let cats;
    try {
      cats = await this.catsRepository.findOneOrFail(id);
    } catch (err) {
      return err;
    }
    this.catsRepository.merge(cats, cat);
    return this.catsRepository.save(cats);
  }

  async deleteCat(id: number): Promise<Cats> {
    const cat = await this.catsRepository.findOne(id);
    if (cat === undefined) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.catsRepository.remove(cat);
  }
}
