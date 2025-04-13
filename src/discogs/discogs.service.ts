import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DiscogsSearchResponse } from './discogs-response.interface';

@Injectable()
export class DiscogsService {
  private readonly baseUrl = 'https://api.discogs.com';
  private readonly token: string;

  constructor(private readonly configService: ConfigService) {
    const token = this.configService.get<string>('DISCOGS_TOKEN');
    if (!token) {
      throw new Error(
        'DISCOGS_TOKEN is not defined in the environment variables.',
      );
    }
    this.token = token;
  }

  async searchReleases(
    query: string,
    type: string = 'release',
    page: number = 1,
    perPage: number = 10,
  ): Promise<DiscogsSearchResponse> {
    const url = new URL(`${this.baseUrl}/database/search`);
    url.searchParams.append('q', query);
    url.searchParams.append('type', type);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('per_page', perPage.toString());
    url.searchParams.append('token', this.token);

    const res = await fetch(url.toString());
    if (!res.ok) {
      throw new Error(`Discogs API error: ${res.status} ${res.statusText}`);
    }

    const data: DiscogsSearchResponse =
      (await res.json()) as DiscogsSearchResponse;
    return data;
  }
}
