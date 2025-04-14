import { ObjectType } from '@nestjs/graphql';
import { ReleaseItem } from '../models/search-release.model';
import { createSearchResult } from './create-search-result';

@ObjectType()
export class ReleaseSearchResult extends createSearchResult(ReleaseItem) {}
