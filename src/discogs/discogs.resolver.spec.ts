import { Test, TestingModule } from '@nestjs/testing';
import { DiscogsResolver } from './discogs.resolver';
import { DiscogsService } from './discogs.service';
import { ReleaseItem } from './models/search-release.model';
import { ArtistItem } from './models/search-artist.model';

describe('DiscogsResolver', () => {
  let resolver: DiscogsResolver;
  let mockDiscogsService: {
    searchReleases: jest.Mock;
    searchArtists: jest.Mock;
  };

  beforeEach(async () => {
    mockDiscogsService = {
      searchReleases: jest.fn(),
      searchArtists: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DiscogsResolver,
        { provide: DiscogsService, useValue: mockDiscogsService },
      ],
    }).compile();

    resolver = module.get<DiscogsResolver>(DiscogsResolver);
  });

  describe('searchReleases', () => {
    it('should return formatted release results', async () => {
      mockDiscogsService.searchReleases.mockResolvedValueOnce({
        results: [
          {
            title: 'Nevermind',
            country: 'USA',
            year: '1991',
            format: ['Vinyl'],
          },
        ],
        pagination: { items: 1, page: 1, pages: 1 },
      });

      const result = await resolver.searchReleases({
        query: 'Nirvana',
        type: 'release',
        page: 1,
        perPage: 10,
      });

      expect(result.results).toHaveLength(1);
      expect(result.results[0]).toBeInstanceOf(ReleaseItem);
      expect(result.results[0].title).toBe('Nevermind');
      expect(result.total).toBe(1);
    });

    it('should default to type "release" if not provided', async () => {
      mockDiscogsService.searchReleases.mockResolvedValueOnce({
        results: [],
        pagination: { items: 0, page: 1, pages: 1 },
      });

      const result = await resolver.searchReleases({
        query: 'Radiohead',
      } as any);

      expect(mockDiscogsService.searchReleases).toHaveBeenCalledWith(
        'Radiohead',
        'release',
        1,
        10,
      );
      expect(result.results).toEqual([]);
    });

    it('should return empty array if format is undefined', async () => {
      mockDiscogsService.searchReleases.mockResolvedValueOnce({
        results: [
          {
            title: 'In Rainbows',
            country: 'UK',
            year: '2007',
          },
        ],
        pagination: { items: 1, page: 1, pages: 1 },
      });

      const result = await resolver.searchReleases({
        query: 'Radiohead',
      } as any);

      expect(result.results[0].format).toEqual([]);
    });

    it('should handle empty release results', async () => {
      mockDiscogsService.searchReleases.mockResolvedValueOnce({
        results: [],
        pagination: { items: 0, page: 1, pages: 1 },
      });

      const result = await resolver.searchReleases({
        query: 'Unknown Artist',
      } as any);

      expect(result.results).toEqual([]);
      expect(result.total).toBe(0);
    });
  });

  describe('searchArtists', () => {
    it('should return formatted artist results', async () => {
      mockDiscogsService.searchArtists.mockResolvedValueOnce({
        results: [
          {
            title: 'The Beatles',
          },
        ],
        pagination: { items: 1, page: 1, pages: 1 },
      });

      const result = await resolver.searchArtists({
        query: 'Beatles',
        type: 'artist',
        page: 1,
        perPage: 10,
      });

      expect(result.results).toHaveLength(1);
      expect(result.results[0]).toBeInstanceOf(ArtistItem);
      expect(result.results[0].title).toBe('The Beatles');
    });

    it('should default to type "artist" if not provided', async () => {
      mockDiscogsService.searchArtists.mockResolvedValueOnce({
        results: [],
        pagination: { items: 0, page: 1, pages: 1 },
      });

      const result = await resolver.searchArtists({
        query: 'Daft Punk',
      } as any);

      expect(mockDiscogsService.searchArtists).toHaveBeenCalledWith(
        'Daft Punk',
        'artist',
        1,
        10,
      );
      expect(result.results).toEqual([]);
    });

    it('should handle empty artist results', async () => {
      mockDiscogsService.searchArtists.mockResolvedValueOnce({
        results: [],
        pagination: { items: 0, page: 1, pages: 1 },
      });

      const result = await resolver.searchArtists({
        query: 'Unknown Artist',
      } as any);

      expect(result.results).toEqual([]);
      expect(result.total).toBe(0);
    });
  });
});
