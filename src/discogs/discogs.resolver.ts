import { Resolver, Query, Args } from '@nestjs/graphql';
import { DiscogsService } from './discogs.service';
import { SearchResult } from './dto/search-result.dto';

@Resolver()
export class DiscogsResolver {
  constructor(private readonly discogsService: DiscogsService) {}

  @Query(() => SearchResult)
  async searchDiscogs(@Args('query') query: string): Promise<SearchResult> {
    return this.discogsService.search(query);
  }
}
