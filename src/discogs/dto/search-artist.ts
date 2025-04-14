import { ObjectType } from '@nestjs/graphql';
import { createSearchResult } from './create-search-result';
import { ArtistItem } from '../models/search-artist.model';

@ObjectType()
export class ArtistSearchResult extends createSearchResult(ArtistItem) {}
