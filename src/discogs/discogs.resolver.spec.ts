import { Test, TestingModule } from '@nestjs/testing';
import { DiscogsResolver } from './discogs.resolver';
import { DiscogsService } from './discogs.service';
import { DiscogsSearchResponse } from './discogs-response.interface';
import { SearchInput } from './dto/search-input';

describe('DiscogsResolver', () => {
  let resolver: DiscogsResolver;
  let service: DiscogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DiscogsResolver,
        {
          provide: DiscogsService,
          useValue: {
            searchReleases: jest.fn().mockResolvedValue({
              results: [
                {
                  title: 'Test Title',
                  year: 2021,
                  format: ['Vinyl'],
                  country: 'US',
                },
              ],
              pagination: {
                items: 1,
                page: 1,
                pages: 1,
              },
            }),
          },
        },
      ],
    }).compile();

    resolver = module.get<DiscogsResolver>(DiscogsResolver);
    service = module.get<DiscogsService>(DiscogsService);
  });

  it('should return formatted search result from the service', async () => {
    const input: SearchInput = {
      query: 'Nirvana',
      type: 'release',
      page: 1,
      perPage: 10,
    };

    const mockResponse: DiscogsSearchResponse = {
      pagination: {
        page: 1,
        pages: 3,
        items: 30,
        per_page: 10,
      },
      results: [
        {
          title: 'Nevermind',
          year: 1991,
          format: ['CD', 'Album'],
          country: 'US',
        },
        {
          title: 'In Utero',
          year: 1993,
          format: ['Vinyl', 'LP', 'Album'],
          country: 'UK',
        },
      ],
    };

    jest.spyOn(service, 'searchReleases').mockResolvedValueOnce(mockResponse);

    const result = await resolver.searchDiscogs(input);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(service.searchReleases).toHaveBeenCalledWith(
      'Nirvana',
      'release',
      1,
      10,
    );

    expect(result).toEqual({
      results: [
        {
          title: 'Nevermind',
          year: 1991,
          format: 'CD, Album',
          country: 'US',
        },
        {
          title: 'In Utero',
          year: 1993,
          format: 'Vinyl, LP, Album',
          country: 'UK',
        },
      ],
      total: 30,
      page: 1,
      pages: 3,
    });
  });
});
