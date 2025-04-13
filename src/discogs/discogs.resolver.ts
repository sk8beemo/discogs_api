import { Resolver, Query, Args } from '@nestjs/graphql';
import { DiscogsService } from './discogs.service';
import { SearchInput } from './dto/search-input';
import { SearchResult } from './models/search-result.model';
import { DiscogsSearchResponse } from './discogs-response.interface';

@Resolver()
export class DiscogsResolver {
  constructor(private readonly discogsService: DiscogsService) {}

  @Query(() => SearchResult)
  async searchDiscogs(
    @Args('input') input: SearchInput,
  ): Promise<SearchResult> {
    // Дефолтные значения, если параметры не были переданы
    const { query, type = 'release', page = 1, perPage = 10 } = input;

    // Получаем ответ от Discogs API
    const discogsResponse: DiscogsSearchResponse =
      await this.discogsService.searchReleases(query, type, page, perPage);

    // Маппим данные из DiscogsSearchResponse в SearchResult
    const searchResult: SearchResult = {
      results: discogsResponse.results.map((item) => ({
        title: item.title,
        year: item.year,
        format: item.format.join(', '), // Преобразуем массив форматов в строку
        country: item.country,
      })),
      total: discogsResponse.pagination.items,
      page: discogsResponse.pagination.page,
      pages: discogsResponse.pagination.pages,
    };

    return searchResult;
  }
}
