import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export function createSearchResult<TItem extends Type<unknown>>(
  ItemClass: TItem,
) {
  @ObjectType({ isAbstract: true })
  abstract class SearchResult {
    @Field(() => [ItemClass])
    results: InstanceType<TItem>[];

    @Field()
    total: number;

    @Field()
    page: number;

    @Field()
    pages: number;
  }

  return SearchResult;
}
