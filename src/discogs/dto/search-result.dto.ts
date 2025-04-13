import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SearchItem {
  @Field()
  title: string;
  
  @Field({ description: 'Год выпуска', nullable: true })
  year?: string;

  @Field()
  thumb: string;

  @Field()
  resourceUrl: string;
}

@ObjectType()
export class SearchResult {
  @Field(() => Number)
  paginationCount: number;

  @Field(() => [SearchItem])
  items: SearchItem[];
}
