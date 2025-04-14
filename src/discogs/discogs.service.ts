import { Injectable } from '@nestjs/common';
import { DiscogsApiClient } from './client/discogs-api.client';
import { DiscogsSearchResponse } from './discogs-response.interface';
import { ArtistItem } from './models/search-artist.model';
import { ReleaseItem } from './models/search-release.model';

@Injectable()
export class DiscogsService {
  constructor(private readonly discogsApiClient: DiscogsApiClient) {}

  async searchReleases(
    query: string,
    type: string = 'release',
    page: number = 1,
    perPage: number = 10,
  ): Promise<DiscogsSearchResponse<ReleaseItem>> {
    const response = await this.discogsApiClient.search<ReleaseItem>({
      q: query,
      type: type,
      page: page,
      perPage: perPage,
    });

    return response;
  }

  async searchArtists(
    query: string,
    type: string = 'artist',
    page: number = 1,
    perPage: number = 10,
  ): Promise<DiscogsSearchResponse<ArtistItem>> {
    const response = await this.discogsApiClient.search<ArtistItem>({
      q: query,
      type: type,
      page: page,
      perPage: perPage,
    });

    return response;
  }
}
