import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class SearchInput {
  @Field(() => String)
  query: string;

  @Field(() => String, { nullable: true })
  type?: string;

  @Field(() => Int, { nullable: true })
  page?: number;

  @Field(() => Int, { nullable: true })
  perPage?: number;
}
