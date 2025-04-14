import { Test, TestingModule } from '@nestjs/testing';
import { DiscogsResolver } from './discogs.resolver';
import { DiscogsService } from './discogs.service';
import { DiscogsSearchResponse } from './discogs-response.interface';
import { SearchInput } from './dto/search-input';
import { ReleaseItem } from './models/search-release.model';
import { ArtistItem } from './models/search-artist.model';

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
              pagination: {
                items: 2,
                page: 1,
                pages: 1,
                per_page: 10,
              },
            }),
            searchArtists: jest.fn().mockResolvedValue({
              results: [
                {
                  title: 'Nirvana',
                },
                {
                  title: 'Kurt Cobain',
                },
              ],
              pagination: {
                items: 2,
                page: 1,
                pages: 1,
                per_page: 10,
              },
            }),
          },
        },
      ],
    }).compile();

    resolver = module.get<DiscogsResolver>(DiscogsResolver);
    service = module.get<DiscogsService>(DiscogsService);
  });

  describe('searchReleases', () => {
    it('should return formatted search result for releases from the service', async () => {
      const input: SearchInput = {
        query: 'Nirvana',
        type: 'release',
        page: 1,
        perPage: 10,
      };

      const mockResponse: DiscogsSearchResponse<ReleaseItem> = {
        pagination: {
          page: 1,
          pages: 1,
          items: 2,
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

      const searchReleasesMock = jest.fn().mockResolvedValue(mockResponse);
      service.searchReleases = searchReleasesMock;

      const result = await resolver.searchReleases(input);

      expect(searchReleasesMock).toHaveBeenCalledWith(
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
            format: ['CD', 'Album'], // format как массив
            country: 'US',
          },
          {
            title: 'In Utero',
            year: 1993,
            format: ['Vinyl', 'LP', 'Album'], // format как массив
            country: 'UK',
          },
        ],
        total: 2,
        page: 1,
        pages: 1,
      });
    });
  });

  describe('searchArtists', () => {
    it('should return formatted search result for artists from the service', async () => {
      const input: SearchInput = {
        query: 'Nirvana',
        type: 'artist',
        page: 1,
        perPage: 10,
      };

      const mockResponse: DiscogsSearchResponse<ArtistItem> = {
        pagination: {
          page: 1,
          pages: 1,
          items: 2,
          per_page: 10,
        },
        results: [{ title: 'Nirvana' }, { title: 'Kurt Cobain' }],
      };

      const searchArtistsMock = jest.fn().mockResolvedValue(mockResponse);
      service.searchArtists = searchArtistsMock;

      const result = await resolver.searchArtists(input);

      expect(searchArtistsMock).toHaveBeenCalledWith(
        'Nirvana',
        'artist',
        1,
        10,
      );

      expect(result).toEqual({
        results: [{ title: 'Nirvana' }, { title: 'Kurt Cobain' }],
        total: 2,
        page: 1,
        pages: 1,
      });
    });
  });
});
