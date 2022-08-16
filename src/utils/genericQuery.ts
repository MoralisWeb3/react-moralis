import MoralisType from "moralis-v1";

export type DefaultQueryAttribute = MoralisType.Attributes;

export type Query<
  Entity extends DefaultQueryAttribute = DefaultQueryAttribute,
> = MoralisType.Query<MoralisType.Object<Entity>>;
