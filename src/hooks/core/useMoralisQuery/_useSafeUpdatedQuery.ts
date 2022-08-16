import MoralisType from "moralis-v1";
import { useMemo } from "react";
import { useMoralis } from "../useMoralis";
import { Query } from "../../../utils/genericQuery";

/**
 * Wrapper hook for using with queries.
 * It accepts a valid query (string or Moralis.Object),
 * and a mapping to filter the query
 *
 * It will only update when the provided dependencies change
 */
export const _useSafeUpdatedQuery = <
  Entity extends MoralisType.Attributes = MoralisType.Attributes,
>(
  nameOrObject: string | MoralisType.Object,
  queryMap: (q: Query<Entity>) => Query<Entity> = (q) => q,
  dependencies: unknown[] = [],
  isInitialized: boolean,
) => {
  const { Moralis } = useMoralis();
  // Cached version of the queruMap to prevent unwantedUpdates
  const currentQueryMap = useMemo(() => {
    return queryMap;
  }, dependencies);
  const currentNameOrObject = useMemo(() => {
    return nameOrObject;
  }, dependencies);

  const query = useMemo(() => {
    const q = new Moralis.Query<MoralisType.Object<Entity>>(
      // Explicit cast to any to prevent ts-error, because Moralis.Query should accept a Moralis.object
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      currentNameOrObject as any,
    );
    return currentQueryMap(q);
  }, [isInitialized, currentNameOrObject, currentQueryMap]);

  return query;
};
