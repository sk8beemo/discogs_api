import { DiscogsService } from './discogs.service';
import { ConfigService } from '@nestjs/config';

const mockConfigService = {
  get: jest.fn(),
};

describe('DiscogsService', () => {
  let service: DiscogsService;

  beforeEach(() => {
    jest.clearAllMocks();
    mockConfigService.get.mockReturnValue('mock-token');

    service = new DiscogsService(mockConfigService as unknown as ConfigService);
  });

  describe('constructor', () => {
    it('should throw an error if token is missing', () => {
      mockConfigService.get.mockReturnValueOnce(undefined);
      expect(() => new DiscogsService(mockConfigService as any)).toThrowError(
        'DISCOGS_TOKEN is not defined in the environment variables.',
      );
    });

    it('should set token if present', () => {
      const instance = new DiscogsService(mockConfigService as any);
      expect(instance).toBeDefined();
    });
  });

  describe('searchReleases', () => {
    beforeEach(() => {
      global.fetch = jest.fn();
    });

    it('should call Discogs API and return data', async () => {
      const mockResponse = {
        ok: true,
        json: () =>
          Promise.resolve({
            results: [],
            pagination: { page: 1, pages: 1, items: 0, per_page: 10 },
          }),
      };

      (fetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await service.searchReleases('test');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('https://api.discogs.com/database/search'),
      );

      expect(result).toEqual({
        results: [],
        pagination: { page: 1, pages: 1, items: 0, per_page: 10 },
      });
    });

    it('should throw error if fetch fails', async () => {
      const badResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      };

      (fetch as jest.Mock).mockResolvedValue(badResponse);

      await expect(service.searchReleases('test')).rejects.toThrow(
        'Discogs API error: 500 Internal Server Error',
      );
    });
  });
});
