# react-moralis

Utility library to bootstrap your Moralis project in React

Please check the [official documentation of Moralis](https://docs.moralis.io/#user) for all the functionalities of Moralis.

This library provides components and hooks to use these functionalities inside React components.

# ⚙️ Setup

Install via `npm install react-moralis` or `add react-moralis`

Make sure to have `react`, `react-dom` and `moralis`
installed.

To install everything at once:

```sh
npm install react-moralis react react-dom moralis
```

or:

```sh
add react-moralis react react-dom moralis
```

# 🧭 Table of contents

- [react-moralis](#react-moralis)
- [⚙️ Setup](#️-setup)
- [🧭 Table of contents](#-table-of-contents)
- [🚀 Usage](#-usage)
  - [Wrap your app in a `MoralisProvider`](#wrap-your-app-in-a-moralisprovider)
  - [`useMoralis()`](#usemoralis)
    - [Authenticate](#authenticate)
    - [Authentication state](#authentication-state)
    - [`authenticate()` (web3)](#authenticate-web3)
    - [`signup()` (non-crypto)](#signup-non-crypto)
    - [`login()` (non-crypto)](#login-non-crypto)
    - [`logout()`](#logout)
    - [Update the user with `setUserData()`](#update-the-user-with-setuserdata)
  - [`useMoralisQuery()`](#usemoralisquery)
    - [Fetch Queries](#fetch-queries)
    - [Filter queries](#filter-queries)
    - [Automatic updates with dependencies](#automatic-updates-with-dependencies)
  - [`useMoralisQuery()`](#usemoralisquery-1)
    - [Realtime queries](#realtime-queries)
  - [`useMoralisSubscription()`](#usemoralissubscription)
    - [Listen for query events](#listen-for-query-events)
  - [`useMoralisFile()`](#usemoralisfile)
    - [Save to Moralis](#save-to-moralis)
    - [Save to IPFS](#save-to-ipfs)
    - [Other options](#other-options)
  - [`useMoralisCloudFunction()`](#usemoraliscloudfunction)
  - [Trigger manually](#trigger-manually)
- [⌨️ Typescript](#️-typescript)
- [🤟 Contribute](#-contribute)
  - [Development](#development)

# 🚀 Usage

## Wrap your app in a `MoralisProvider`

In order to let your components have access to Moralis functions, wrap your app in a `<MoralisProvider />` component. This will handle the whole initialization for you.
You need to provide the `appId` and `serverUrl`, which can be obtained from your dashboard.

```jsx
<MoralisProvider appId="xxxxxxxx" serverUrl="xxxxxxxx">
  <App />
</MoralisProvider>
```

This component will automatically initialize Moralis with the provided key and appId.
It will also keep the authentication of the user automatically in sync and easy accessible (see `useMoralis`), and give access to all the other hooks.

Now you can use the hooks below in all App.tsx and all of its children:

- `useMoralis` for authentication and user data
- `useMoralisQuery` for easy query
- `useMoralisCloudFunction` for easy cloud functions
- `useMoralisSubscription` for easy subscription
- `useMoralisFile` for easy file uploads

## `useMoralis()`

### Authenticate

the `useMoralis` hook provides all the basics functionalities that you need for authentication and user data.

You can use it inside a component and have access to various data and functions:

```jsx
const { Moralis, isInitialized, ...rest } = useMoralis();
```

You will have access to the following values by using this hook:

| Option          | Description                                                     |
| --------------- | --------------------------------------------------------------- |
| `Moralis`       | The global Moralis instance (same as the global Moralis object) |
| `isInitialized` | A boolean, indicating if Moralis has been initialized           |

| Option              | Description                                                                   |
| ------------------- | ----------------------------------------------------------------------------- |
| `authenticate()`    | The authentication function, to authenticate via web3                         |
| `logout()`          | The logout function that will end the users session                           |
| `signup()`          | The signup function that will signup a new user with an username and password |
| `signin()`          | The signin function that will sign in a user with a username and password     |
| `auth`              | Auth state object (see below)                                                 |
| `authError`         | Error object when authentication failed (auth.state will be "error");         |
| `isAuthenticated`   | A boolean, indication if authenticated                                        |
| `isUnauthenticated` | A boolean, indication if user is authenticated                                |
| `isAuthenticating`  | A boolean, indication if user is authenticating (started but not finished)    |
| `hasAuthError`      | A boolean, indication if authentication has an error                          |
| `isLoggingOut`      | A boolean, indication if the uer is logging out (started but not finished)    |

| Option          | Description                                                                                                                                                                       |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `setUserData()` | function to set userData and directly sync it in the app AND Moralis (see below)                                                                                                  |
| `user`          | user object from `Moralis.User.current`, containing the state of the logged in user. It automatically will be (un)set automatically when logging in and out, or setting user data |
| `enableWeb3`    | function to enable web3 manually (will automatically be done when user logs in)                                                                                                   |
| `web3`          | The web3 instance of `Moralis.Web3`;                                                                                                                                              |

### Authentication state

The authentication state, and the user object will be updated, when the user authenticates or logs out.

The auth object has the following format:

```js
{
  state: "unauthenticated",
  error: null,
}
```

where state can be one of the following enums

```js
enum AuthenticationState {
  UNAUTHENTICATED = "unauthenticated",
  AUTHENTICATED = "authenticated",
  AUTHENTICATING = "authenticating",
  LOGGING_OUT = "logging_out",
  ERROR = "error",
}
```

### `authenticate()` (web3)

You can call the `authenticate()` function to authenticate the user via web3, as long as a user has an active web3Provider (such as MetaMask).

This function calls the `MoralisWeb3.authenticate()` internally and will update the `auth` state and `user` state of your app automatically.

```jsx
const User = () => {
  const { authenticate, isAuthenticated, user } = useMoralis();

  if (!isAuthenticated) {
    return (
      <div>
        <button onClick={() => authenticate()}>Authenticate</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Hi {user.username}</h1>
    </div>
  );
};
```

If you need direct feedback after authentication, you can provide an `option` object as argument to the a`authenticate` call with `onComplete`, `onError` and/or `onSuccess`

### `signup()` (non-crypto)

To signup users without web3, and use a password/username, you can use the signup function.

```jsx
const Signup = () => {
  const { signup, isAuthenticated, user } = useMoralis();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div>
      // [Your form and inputs somewhere here... ]
      <button onClick={() => signup(username, password, email)}>Sign up</button>
    </div>
  );
};
```

If you need to provide more data, than just the username, password and email, then you can provide an extra argument with an object, containing the data:

```jsx
signup(username, password, email, { phone: "01234567" });
```

After calling this function the `auth` and `user` will automatically be updated to reflect the new state.

### `login()` (non-crypto)

Similar to signup, you can also login via a hook function:

```jsx
const Login = () => {
  const { login } = useMoralis();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
]
  return (
    <div>
      // [Your form and inputs somewhere here... ]
      <button onClick={() => login(username, password)}>Login</button>
    </div>
  );
};
```

After calling this function the `auth` and `user` will automatically be updated to reflect the new state.

### `logout()`

Following the same principle as authentication/login, you can call `logout` and let the MoralisProvider handle the internal authentication state.

```jsx
const LogoutButton = () => {
  const { logout, isAuthenticating } = useMoralis();

  <button onClick={() => logout()} disabled={isAuthenticating}>
    Authenticate
  </button>;
};
```

After calling this function the `auth` and `user` will automatically be updated to reflect the new state.

### Update the user with `setUserData()`

When you want to set userData, you can use the `setUserData()` function.
This accepts an object with key-value pairs of data that you want to set.

Upon calling this function:

- The user is updated on Moralis
- The user is updated in the React app

So places where you use `const {user} = useMoralis()` will automatically be updated.

example:

```jsx
setUserData({
  username: "Batman",
  email: "batman@marvel.com",
  numberOfCats: 12
});
```

## `useMoralisQuery()`

### Fetch Queries

The `useMoralisQuery` is heavily inspired by react-query. It handles all the async logic and manages the loading/error/data state internally and will automatically execute the query upon mounting in your component.

Example:

```jsx
const { data, error, isLoading } = useMoralisQuery("GameScore");
```

This query will fetch "GameScore" for you when the component mounts.

The hook will return `data`, `error` and `isLoading`, which you can use to render the component.

```js
const { data, error, isLoading } = useMoralisQuery("GameScore");

if (error) {
  return <span>🤯</span>;
}

if (isLoading) {
  return <span>🙄</span>;
}

return <pre>{JSON.stringify(data, null, 2)}</pre>;
```

### Filter queries

You can filer the query via a second argument. You can mutate the query in any way that Moralis.Quey can.

```jsx
const { data, error, isLoading } = useMoralisQuery("GameScore", query =>
  query
    .greaterThanOrEqualTo(100)
    .limit(limit)
    .descend("score")
);
```

This example will fetch the top 3 scores that are at least 100, in descending order.

You can also filter dynamically, but you need to provide a dependency array as third argument (similar to other hooks), to specify when this hook needs to update.

```jsx
const [limit, setLimit] = useState(3);
const { data, error, isLoading } = useMoralisQuery(
  "GameScore",
  query =>
    query
      .greaterThanOrEqualTo(100)
      .limit(limit)
      .descend("score"),
  [limit]
);
```

### Automatic updates with dependencies

This query will automatically refetch when the limit is changed.

If you want to disable the automatic fetching, you can also manually fetch. You need to provide `autoFetch: false` as option in the 4th argument. In that case it will ignore the dependencies and will only fetch if you manually call `fetch()`

```jsx
const { fetch, data, error, isLoading } = useMoralisQuery(
  "GameScore",
  query =>
    query
      .greaterThanOrEqualTo(100)
      .limit(limit)
      .descend("score"),
  [],
  { autoFetch: false }
);

return <button onClick={() => fetch}>Fetch manually</button>;
```

## `useMoralisQuery()`

### Realtime queries

The `useMoralisQuery` hook can also be used to update upon realtime events. All you need to do is provide `live: true`. If any events update the query, then the `data` is automatically updated.

```jsx
const [limit, setLimit] = useState(3);
const { data, error, isLoading } = useMoralisQuery(
  "GameScore",
  query =>
    query
      .greaterThanOrEqualTo(100)
      .limit(limit)
      .descend("score"),
  [limit],
  {
    live: true
  }
);
```

By default we use these rules

| Eventname  | Action                              |
| ---------- | ----------------------------------- |
| `"create"` | Add to the data                     |
| `"update"` | Update if object is already in data |
| `"enter"`  | Add to the data                     |
| `"leave"`  | Remove to the data                  |
| `"delete"` | Remove to the data                  |

You can override these rules with your own functions.

```jsx
const [limit, setLimit] = useState(3);
const { data, error, isLoading } = useMoralisQuery(
  "GameScore",
  query =>
    query
      .greaterThanOrEqualTo(100)
      .limit(limit)
      .descend("score"),
  [limit],
  {
    live: true,
    onLiveEnter: (entity, all) => [...all, entity],
    onLiveCreate: (entity, all) => [...all, entity],
    onLiveDelete: (entity, all) => all.filter(e => e.id !== entity.id),
    onLiveLeave: (entity, all) => all.filter(e => e.id !== entity.id),
    onLiveUpdate: (entity, all) =>
      all.map(e => (e.id === entity.id ? entity : e))
  }
);
```

## `useMoralisSubscription()`

### Listen for query events

This hook is used when you use `useMoralisQuery` with `live: true`. But if you want fine-grained control over subscriptions, and want to do actions upon the events, then you can ue this hook.

It's as simple as calling this hook with the callbacks that you want. The first 3 aruguments are the same as `useMoralisQuery` (queryName, filter, dependencies). In the last argument, you can specify the callbacks:

| Eventname  | callback |
| ---------- | -------- |
| `"create"` | onCreate |
| `"update"` | onUpdate |
| `"enter"`  | onEnter  |
| `"leave"`  | onLeave  |
| `"delete"` | onDelete |

They will all return the object as data.

For example if you want to notify when a new player was added:

```jsx
useMoralisSubscription("GameScore", q => q, [], {
  onCreate: data => alert(`${data.attributes.playerName} was just created`)
});
```

This hook will handle the subscribing and unsubscribing automatically. It will automatically subscribe/unsubscribe when the component mounts/unmounts. All you have to do is use this hook.

You can disable the subscription by providing: `enabled: false`

```jsx
useMoralisSubscription("GameScore", q => q, [], {
  onCreate: data => alert(`${data.attributes.playerName} was just created`),
  enabled: false
});
```

## `useMoralisFile()`

Get the data, and saveFunction with the `useMoralisFile` hook

```jsx
const {
  error,
  isSuccess,
  isUploading,
  moralisFile,
  saveFile
} = useMoralisFile();
```

### Save to Moralis

All you need to do is call the save function with a valid file:

```jsx
saveFile("batman.jpeg", file);
```

Then you can read the state from the provided variables `error`,
`isSuccess`,
`isUploading` and
`moralisFile`,

### Save to IPFS

```jsx
saveFile("batman.jpeg", file, { saveIPFS: true });
```

Then you can get the ipfs data via `moralisFile.ipfs` and `moralisFile.hash`

### Other options

Additionally you can also provide metadata, dags or specify the fileType in the options like:

```jsx
const metadata = { createdById: "some-user-id" };
const tags = { groupId: "some-group-id" };

saveFile("batman.jpeg", file, {
  type: "image/jpeg",
  metadata,
  tags,
  saveIPFS: true
});
```

## `useMoralisCloudFunction()`

You can use the `useMoralisCloudFunction` hook to run cloud functions easily. All you need to do is provide a name for the function, and it will automatically fetch the data for you.

```jsx
const { data, error, isLoading } = useMoralisCloudFunction("topScores");
```

If you have a function that requires parameters, then you can provide it as second argument:

```jsx
const { data, error, isLoading } = useMoralisCloudFunction("topScores", {
  limit
});
```

## Trigger manually

If you rather want to trigger the fetching manually, you can provide `autoFetch: false` as option. And call the `fetch` function manually.

```jsx
const { fetch, data, error, isLoading } = useMoralisCloudFunction(
  "topScores",
  {
    limit
  },
  { autoFetch: false }
);

<button onClick={() => fetch()}>Fetch manually<button>
```

# ⌨️ Typescript

This library offers first-class Typescript support.
However `moralis` is not fully typed just yet.
Also, not all queries are fully generic just yet.

# 🤟 Contribute

t.b.d.

## Development

Make sure to have `node` and `yarn` installed.

- Clone this repo
- ```sh
    cd react-moralis
    yarn install
  ```

Please follow the code guidelines before submitting a PR.

- Make sure the code is clear and readable
- Adhere to the style rules of Eslint, Prettier and Conventional Commit

## Examples

To preview and work and see the examples;

1. Make an `.env` file in `/examples` with the keys:

   ```sh
   # Your appId
   REACT_APP_MORALIS_APP_ID="xxx"

   # Your serverUrl
   REACT_APP_MORALIS_SERVER_URL="xxx"
   ```

2. Install and start the example app

   ```sh
   cd examples
   yarn install
   yarn start
   ```

Note: if you want to compile changes of react-moralis directly, run (in a second terminal)

```sh
  yarn build:watch
```
