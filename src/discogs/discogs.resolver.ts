import { Resolver, Query, Args } from '@nestjs/graphql';
import { DiscogsService } from './discogs.service';
import { SearchInput } from './dto/search-input';
import { DiscogsSearchResponse } from './discogs-response.interface';
import { ReleaseSearchResult } from './dto/search-release';
import { ArtistSearchResult } from './dto/search-artist';
import { ReleaseItem } from './models/search-release.model';
import { ArtistItem } from './models/search-artist.model';

@Resolver()
export class DiscogsResolver {
  constructor(private readonly discogsService: DiscogsService) {}

  @Query(() => ReleaseSearchResult)
  async searchReleases(
    @Args('input') input: SearchInput,
  ): Promise<ReleaseSearchResult> {
    const { query, type = 'release', page = 1, perPage = 10 } = input;

    const discogsResponse: DiscogsSearchResponse<ReleaseItem> =
      await this.discogsService.searchReleases(query, type, page, perPage);

    return {
      results: discogsResponse.results.map((item) => {
        const instance = new ReleaseItem();
        instance.title = item.title;
        instance.country = item.country;
        instance.year = item.year;
        instance.format = item.format || [];
        return instance;
      }),
      total: discogsResponse.pagination.items,
      page: discogsResponse.pagination.page,
      pages: discogsResponse.pagination.pages,
    };
  }

  @Query(() => ArtistSearchResult)
  async searchArtists(
    @Args('input') input: SearchInput,
  ): Promise<ArtistSearchResult> {
    const { query, type = 'artist', page = 1, perPage = 10 } = input;

    const discogsResponse: DiscogsSearchResponse<ArtistItem> =
      await this.discogsService.searchArtists(query, type, page, perPage);

    return {
      results: discogsResponse.results.map((item) => {
        const instance = new ArtistItem();
        instance.title = item.title;
        return instance;
      }),
      total: discogsResponse.pagination.items,
      page: discogsResponse.pagination.page,
      pages: discogsResponse.pagination.pages,
    };
  }
}
