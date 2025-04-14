import { DiscogsService } from './discogs.service';
import { DiscogsApiClient } from './client/discogs-api.client';
import { DiscogsSearchResponse } from './discogs-response.interface';
import { ReleaseItem } from './models/search-release.model';
import { ArtistItem } from './models/search-artist.model';

describe('DiscogsService', () => {
  let service: DiscogsService;
  let mockApiClient: { search: jest.Mock };

  beforeEach(() => {
    mockApiClient = {
      search: jest.fn(),
    };

    service = new DiscogsService(mockApiClient as unknown as DiscogsApiClient);
  });

  describe('searchReleases', () => {
    it('should call search with correct arguments and return data', async () => {
      const mockResponse: DiscogsSearchResponse<ReleaseItem> = {
        results: [],
        pagination: {
          page: 1,
          pages: 1,
          items: 0,
          per_page: 10,
        },
      };

      mockApiClient.search.mockResolvedValue(mockResponse);

      const result = await service.searchReleases('nirvana');

      expect(mockApiClient.search).toHaveBeenCalledWith({
        q: 'nirvana',
        type: 'release',
        page: 1,
        perPage: 10,
      });

      expect(result).toEqual(mockResponse);
    });

    it('should use default values when optional args are not passed', async () => {
      const mockResponse: DiscogsSearchResponse<ReleaseItem> = {
        results: [],
        pagination: {
          page: 1,
          pages: 1,
          items: 0,
          per_page: 10,
        },
      };

      mockApiClient.search.mockResolvedValue(mockResponse);

      await service.searchReleases('daft punk');

      expect(mockApiClient.search).toHaveBeenCalledWith({
        q: 'daft punk',
        type: 'release',
        page: 1,
        perPage: 10,
      });
    });
  });

  describe('searchArtists', () => {
    it('should call search with correct arguments and return data', async () => {
      const mockResponse: DiscogsSearchResponse<ArtistItem> = {
        results: [],
        pagination: {
          page: 1,
          pages: 1,
          items: 0,
          per_page: 10,
        },
      };

      mockApiClient.search.mockResolvedValue(mockResponse);

      const result = await service.searchArtists('radiohead');

      expect(mockApiClient.search).toHaveBeenCalledWith({
        q: 'radiohead',
        type: 'artist',
        page: 1,
        perPage: 10,
      });

      expect(result).toEqual(mockResponse);
    });
  });
});
