import { Moralis } from "moralis";

export type DefaultQueryAttribute = Moralis.Attributes;

export type Query<
  Entity extends DefaultQueryAttribute = DefaultQueryAttribute,
> = Moralis.Query<Moralis.Object<Entity>>;
