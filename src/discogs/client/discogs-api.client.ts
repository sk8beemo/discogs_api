import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DiscogsSearchResponse } from '../discogs-response.interface';

@Injectable()
export class DiscogsApiClient {
  private readonly baseUrl = 'https://api.discogs.com';
  private readonly token: string;

  constructor(private readonly configService: ConfigService) {
    const token = this.configService.get<string>('DISCOGS_TOKEN');
    if (!token) {
      throw new Error('DISCOGS_TOKEN is not defined in environment variables.');
    }
    this.token = token;
  }

  async search<T>(params: {
    q: string;
    type?: string;
    page?: number;
    perPage?: number;
  }): Promise<DiscogsSearchResponse<T>> {
    const url = new URL(`${this.baseUrl}/database/search`);
    url.searchParams.append('token', this.token);

    url.searchParams.append('q', params.q);
    if (params.type) url.searchParams.append('type', params.type);
    if (params.page) url.searchParams.append('page', params.page.toString());
    if (params.perPage)
      url.searchParams.append('per_page', params.perPage.toString());

    const res = await fetch(url.toString());
    if (!res.ok) {
      throw new Error(`Discogs API error: ${res.status} ${res.statusText}`);
    }

    return (await res.json()) as DiscogsSearchResponse<T>;
  }
}
