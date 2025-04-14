import { Module } from '@nestjs/common';
import { DiscogsService } from './discogs.service';
import { DiscogsResolver } from './discogs.resolver';
import { ConfigModule } from '@nestjs/config';
import { DiscogsApiClient } from './client/discogs-api.client';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [DiscogsService, DiscogsResolver, DiscogsApiClient],
})
export class DiscogsModule {}
