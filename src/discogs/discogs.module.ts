import { Module } from '@nestjs/common';
import { DiscogsService } from './discogs.service';
import { DiscogsResolver } from './discogs.resolver';

@Module({
  providers: [DiscogsService, DiscogsResolver],
})
export class DiscogsModule {}
