import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ReleaseItem {
  @Field()
  title: string;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  year?: number;

  @Field(() => [String], { nullable: true })
  format?: string[];
}
