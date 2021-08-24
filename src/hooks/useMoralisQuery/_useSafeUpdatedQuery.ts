import Moralis from "moralis";
import { useMemo } from "react";
import { Query } from "../../utils/genericQuery";

/**
 * Wrapper hook for using with queries.
 * It accepts a valid query (string or Moralis.Object),
 * and a mapping to filter the query
 *
 * It will only update when the provided dependencies change
 */
export const _useSafeUpdatedQuery = <
  Entity extends Moralis.Attributes = Moralis.Attributes
>(
  nameOrObject: string | Moralis.Object,
  queryMap: (q: Query<Entity>) => Query<Entity> = (q) => q,
  dependencies: any[] = [],
  isInitialized: boolean,
) => {
  // Cached version of the queruMap to prevent unwantedUpdates
  const currentQueryMap = useMemo(() => {
    return queryMap;
  }, dependencies);
  const currentNameOrObject = useMemo(() => {
    return nameOrObject;
  }, dependencies);

  const query = useMemo(() => {
    const q = new Moralis.Query<Moralis.Object<Entity>>(
      // Explicit cast to any to prevent ts-error, because Moralis.Query should accept a Moralis.object
      currentNameOrObject as any,
    );
    return currentQueryMap(q);
  }, [isInitialized, currentNameOrObject, currentQueryMap]);

  return query;
};
