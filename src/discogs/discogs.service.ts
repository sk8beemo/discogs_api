import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Discogs from 'disconnect';
import { SearchResult, SearchItem } from './dto/search-result.dto';

@Injectable()
export class DiscogsService {
  private db: Discogs.Database;

  constructor(private configService: ConfigService) {
    const client = new Discogs.Client({
      userToken: this.configService.get('DISCOGS_TOKEN'),
    });

    this.db = client.database();
  }

  async search(q: string): Promise<SearchResult> {
    const result = await new Promise<any>((resolve, reject) => {
      this.db.search(q, { type: 'release' }, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });

    const items: SearchItem[] = result.results.map((r: any) => ({
      title: r.title,
      year: r.year,
      thumb: r.thumb,
      resourceUrl: r.resource_url,
    }));

    return {
      paginationCount: result.pagination.items.total,
      items,
    };
  }
}
