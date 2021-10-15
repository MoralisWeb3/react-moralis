import { WritableDraft } from "immer/dist/internal";
import { Moralis } from "moralis";
import { useCallback } from "react";
import { DefaultQueryAttribute, Query } from "../../utils/genericQuery";
import { useMoralis } from "../useMoralis";
import { useMoralisSubscription } from "../useMoralisSubscription";
import {
  UseResolveCallOptions,
  _useResolveCall,
} from "../_useResolveAsyncCall";
import { _useSafeUpdatedQuery } from "./_useSafeUpdatedQuery";

export interface MoralisQueryFetchOptions<Entity = DefaultQueryAttribute> {
  onError?: (error: Error) => void;
  onSuccess?: (result: Moralis.Object<Entity>[]) => void;
  onComplete?: () => void;
  throwOnError?: boolean;
}

export type OnLiveHandler<Entity = DefaultQueryAttribute> = (
  entity: Moralis.Object<Entity>,
  all: Moralis.Object<Entity>[] | WritableDraft<Moralis.Object<Entity>>[],
) => Moralis.Object<Entity>[];

export interface UseMoralisQueryOptions<Entity = DefaultQueryAttribute>
  extends UseResolveCallOptions {
  live?: boolean;
  onLiveCreate?: OnLiveHandler<Entity>;
  onLiveEnter?: OnLiveHandler<Entity>;
  onLiveLeave?: OnLiveHandler<Entity>;
  onLiveUpdate?: OnLiveHandler<Entity>;
  onLiveDelete?: OnLiveHandler<Entity>;
}

const defaultUseMoralisQueryOptions: UseMoralisQueryOptions = {
  autoFetch: true,
  live: false,
  onLiveEnter: (entity, all) => [...all, entity],
  onLiveCreate: (entity, all) => [...all, entity],
  onLiveDelete: (entity, all) => all.filter((e) => e.id !== entity.id),
  onLiveLeave: (entity, all) => all.filter((e) => e.id !== entity.id),
  onLiveUpdate: (entity, all) =>
    all.map((e) => (e.id === entity.id ? entity : e)),
};

export const useMoralisQuery = <
  Entity extends Moralis.Attributes = Moralis.Attributes,
>(
  nameOrObject: string | Moralis.Object,
  queryMap: (q: Query<Entity>) => Query<Entity> = (q) => q,
  dependencies: any[] = [],
  options: UseMoralisQueryOptions<Entity> = {},
) => {
  const { isInitialized } = useMoralis();
  const {
    live,
    onLiveCreate,
    onLiveDelete,
    onLiveEnter,
    onLiveLeave,
    onLiveUpdate,
  } = {
    ...defaultUseMoralisQueryOptions,
    ...options,
  };
  const query = _useSafeUpdatedQuery(
    nameOrObject,
    queryMap,
    dependencies,
    isInitialized,
  );

  const call = useCallback(() => query.find(), [query]);

  const { data, error, fetch, isFetching, isLoading, setData } =
    _useResolveCall<Moralis.Object<Entity>[], object>(
      call,
      [],
      undefined,
      options,
    );

  const handleOnCreate = useCallback(
    (entity) => {
      if (onLiveCreate) {
        setData((data) => onLiveCreate(entity, data));
      }
    },
    [onLiveCreate],
  );

  const handleOnEnter = useCallback(
    (entity) => {
      if (onLiveEnter) {
        setData((data) => onLiveEnter(entity, data));
      }
    },
    [onLiveEnter],
  );

  const handleOnUpdate = useCallback(
    (entity) => {
      if (onLiveUpdate) {
        setData((data) => onLiveUpdate(entity, data));
      }
    },
    [onLiveUpdate],
  );

  const handleOnDelete = useCallback(
    (entity) => {
      if (onLiveDelete) {
        setData((data) => onLiveDelete(entity, data));
      }
    },
    [onLiveDelete],
  );

  const handleOnLeave = useCallback(
    (entity) => {
      if (onLiveLeave) {
        setData((data) => onLiveLeave(entity, data));
      }
    },
    [onLiveLeave],
  );

  // Update the data upon updated
  useMoralisSubscription(nameOrObject, queryMap, dependencies, {
    enabled: live,
    onCreate: handleOnCreate,
    onEnter: handleOnEnter,
    onUpdate: handleOnUpdate,
    onDelete: handleOnDelete,
    onLeave: handleOnLeave,
  });

  return { fetch, isFetching, isLoading, error, data };
};
