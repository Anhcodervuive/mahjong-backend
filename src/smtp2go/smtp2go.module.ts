import { Module } from '@nestjs/common';
import { Smtp2goService } from './smtp2go.service';

@Module({
  providers: [Smtp2goService],
  exports: [Smtp2goService],
})
export class Smtp2goModule {}
