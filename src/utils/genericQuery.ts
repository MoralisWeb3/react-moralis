import MoralisType from "moralis";

export type DefaultQueryAttribute = MoralisType.Attributes;

export type Query<
  Entity extends DefaultQueryAttribute = DefaultQueryAttribute,
> = MoralisType.Query<MoralisType.Object<Entity>>;
