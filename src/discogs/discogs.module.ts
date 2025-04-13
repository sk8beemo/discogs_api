import { Module } from '@nestjs/common';
import { DiscogsService } from './discogs.service';
import { DiscogsResolver } from './discogs.resolver';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [DiscogsService, DiscogsResolver],
})
export class DiscogsModule {}
