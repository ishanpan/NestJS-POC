import { Module } from '@nestjs/common';
import config from '../ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cats } from './Entities/cats.entity';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';

@Module({
  imports: [TypeOrmModule.forRoot(config), TypeOrmModule.forFeature([Cats])],
  controllers: [CatController],
  providers: [CatService],
})
export class CatModule {}
