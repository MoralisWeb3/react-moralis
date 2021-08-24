import Moralis from "moralis";
import { useContext, useEffect, useRef, useState } from "react";
import { MoralisContext } from "src/context";
import { Query } from "src/utils/genericQuery";
import { _useSafeUpdatedQuery } from "../useMoralisQuery/_useSafeUpdatedQuery";
import {
  MoralisListenerHandler,
  _useSubscriptionListener,
} from "./_useMoralisSubscriptionListener";

export interface UseSubscriptionQueryOptions {
  enabled?: boolean;
  onCreate?: MoralisListenerHandler;
  onUpdate?: MoralisListenerHandler;
  onEnter?: MoralisListenerHandler;
  onLeave?: MoralisListenerHandler;
  onDelete?: MoralisListenerHandler;
}

const defaultUseSubscriptionQueryOptions: UseSubscriptionQueryOptions = {
  enabled: true,
};

export const useMoralisSubscription = <
  Entity extends Moralis.Attributes = Moralis.Attributes
>(
  nameOrObject: string | Moralis.Object,
  queryMap: (q: Query<Entity>) => Query<Entity> = (q) => q,
  dependencies: any[] = [],
  options: UseSubscriptionQueryOptions = {},
) => {
  const { enabled, onCreate, onDelete, onEnter, onLeave, onUpdate } = {
    ...defaultUseSubscriptionQueryOptions,
    ...options,
  };
  const moralisContext = useContext(MoralisContext);
  const isInitialized = moralisContext?.isInitialized ?? false;
  const subscriptionRef = useRef<Moralis.LiveQuerySubscription>();
  const [isReady, setIsReady] = useState(false);

  const query = _useSafeUpdatedQuery(
    nameOrObject,
    queryMap,
    dependencies,
    isInitialized,
  );

  /**
   * Subscribe (and cleanup) to this query
   */
  useEffect(() => {
    setIsReady(false);
    if (!enabled || !isInitialized) {
      return;
    }

    query.subscribe().then((sub) => {
      subscriptionRef.current = sub;
      setIsReady(true);
    });

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
    };
  }, [enabled, isInitialized, query]);

  _useSubscriptionListener({
    name: "create",
    handler: onCreate,
    subscription: subscriptionRef.current,
    enable: (enabled && isReady) ?? false,
  });

  _useSubscriptionListener({
    name: "update",
    handler: onUpdate,
    subscription: subscriptionRef.current,
    enable: (enabled && isReady) ?? false,
  });

  _useSubscriptionListener({
    name: "enter",
    handler: onEnter,
    subscription: subscriptionRef.current,
    enable: (enabled && isReady) ?? false,
  });

  _useSubscriptionListener({
    name: "leave",
    handler: onLeave,
    subscription: subscriptionRef.current,
    enable: (enabled && isReady) ?? false,
  });

  _useSubscriptionListener({
    name: "delete",
    handler: onDelete,
    subscription: subscriptionRef.current,
    enable: (enabled && isReady) ?? false,
  });
};
