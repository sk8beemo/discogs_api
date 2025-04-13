import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class SearchItem {
  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  type?: string;

  @Field(() => String, { nullable: true })
  format?: string;

  @Field(() => String, { nullable: true })
  genre?: string;

  @Field(() => Int, { nullable: true })
  year?: number;

  @Field(() => String, { nullable: true })
  country?: string;

  @Field(() => String, { nullable: true })
  label?: string;

  @Field(() => String, { nullable: true })
  thumb?: string;

  @Field(() => String, { nullable: true })
  uri?: string;
}

@ObjectType()
export class SearchResult {
  @Field(() => [SearchItem])
  results: SearchItem[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pages: number;
}
