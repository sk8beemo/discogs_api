import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ArtistItem {
  @Field()
  title: string;
}
