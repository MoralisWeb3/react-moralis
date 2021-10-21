import { WritableDraft } from "immer/dist/internal";
import MoralisType from "moralis";
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
  onSuccess?: (result: MoralisType.Object<Entity>[]) => void;
  onComplete?: () => void;
  throwOnError?: boolean;
}

export type OnLiveHandler<Entity = DefaultQueryAttribute> = (
  entity: MoralisType.Object<Entity>,
  all:
    | MoralisType.Object<Entity>[]
    | WritableDraft<MoralisType.Object<Entity>>[],
) => MoralisType.Object<Entity>[];

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
  Entity extends MoralisType.Attributes = MoralisType.Attributes,
>(
  nameOrObject: string | MoralisType.Object,
  queryMap: (q: Query<Entity>) => Query<Entity> = (q) => q,
  dependencies: unknown[] = [],
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
    _useResolveCall<MoralisType.Object<Entity>[], object>(
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
