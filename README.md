<div align="center">
    <p align="center">
      <img src="./docs/head.png" alt="React Hook Form Logo - React hook custom hook for form validation" />
    </p>
</div>

<div align="center">

![npm](https://img.shields.io/npm/v/react-moralis)
![node-current](https://img.shields.io/node/v/react-moralis)
![GitHub last commit](https://img.shields.io/github/last-commit/ErnoW/react-moralis)
![David](https://img.shields.io/david/ErnoW/react-moralis)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-moralis)
![npm type definitions](https://img.shields.io/npm/types/react-moralis)

</div>

# `react-moralis`

> React components and hooks for your Moralis project

This project is a thin React wrapper around [Moralis](https://moralis.io/), to easily call functionalities and display data.

Please check the [official documentation of Moralis](https://docs.moralis.io/#user) for all the functionalities of Moralis.

# ⚙️ Quick start

Make sure to have `react`, `react-dom` and `moralis`
installed as dependencies. Then install react-moralis:

```
npm install react-moralis
```

or

```
yarn add react-moralis
```

Then wrap your app in a `<MoralisProvider>`:

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { MoralisProvider } from "react-moralis";

ReactDOM.render(
  <MoralisProvider appId="xxxxxxxx" serverUrl="xxxxxxxx">
    <App />
  </MoralisProvider>,
  document.getElementById("root"),
);
```

And call the hooks inside your app:

```jsx
import React from "react";
import { useMoralis } from "react-moralis";

function App() {
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
      <h1>Welcome {user.username}</h1>
    </div>
  );
}
```

# 🧭 Table of contents

- [`react-moralis`](#react-moralis)
- [⚙️ Quick start](#️-quick-start)
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
  - [`useNewMoralisObject()`](#usenewmoralisobject)
- [Handling responses](#handling-responses)
- [😖 Error handling](#-error-handling)
- [⌨️ Typescript](#️-typescript)
- [🧑‍💻 Development](#-development)

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

| Option              | Description                                                                                                                                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `authenticate()`    | The authentication function, to authenticate via web3                                                                                                                                                               |
| `logout()`          | The logout function that will end the users session                                                                                                                                                                 |
| `signup()`          | The signup function that will signup a new user with an username and password                                                                                                                                       |
| `signin()`          | The signin function that will sign in a user with a username and password                                                                                                                                           |
| `auth`              | Auth state object (see below)                                                                                                                                                                                       |
| `authError`         | Error object when authentication failed (auth.state will be "error");                                                                                                                                               |
| `isAuthenticated`   | A boolean, indication if authenticated                                                                                                                                                                              |
| `isUnauthenticated` | A boolean, indication if user is authenticated                                                                                                                                                                      |
| `isAuthenticating`  | A boolean, indication if user is authenticating (started but not finished)                                                                                                                                          |
| `hasAuthError`      | A boolean, indication if authentication has an error                                                                                                                                                                |
| `isLoggingOut`      | A boolean, indication if the user is logging out (started but not finished)                                                                                                                                         |
| `isAuthUndefined`   | A boolean, indication if the authentication is unknown, this is the initial state, before checking if the user is already logged in. It will resolve withing a few ms into `isAuthenticated` or `isUnauthenticated` |

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
  UNDEFINED = "undefined",
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
  numberOfCats: 12,
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
    .greaterThanOrEqualTo("score", 100)
    .descending("score")
    .limit(limit),
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
      .greaterThanOrEqualTo("score", 100)
      .descending("score")
      .limit(limit),
  [limit],
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
      .greaterThanOrEqualTo("score", 100)
      .descending("score")
      .limit(limit),
  [],
  { autoFetch: false },
);

return <button onClick={() => fetch}>Fetch manually</button>;
```

### Realtime / live queries

The `useMoralisQuery` hook can also be used to update upon realtime events. All you need to do is provide `live: true`. If any events update the query, then the `data` is automatically updated.

```jsx
const [limit, setLimit] = useState(3);
const { data, error, isLoading } = useMoralisQuery(
  "GameScore",
  query =>
    query
      .greaterThanOrEqualTo("score", 100)
      .descending("score")
      .limit(limit),
  [limit],
  {
    live: true,
  },
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
      .greaterThanOrEqualTo("score", 100)
      .descending("score")
      .limit(limit),
  [limit],
  {
    live: true,
    onLiveEnter: (entity, all) => [...all, entity],
    onLiveCreate: (entity, all) => [...all, entity],
    onLiveDelete: (entity, all) => all.filter(e => e.id !== entity.id),
    onLiveLeave: (entity, all) => all.filter(e => e.id !== entity.id),
    onLiveUpdate: (entity, all) =>
      all.map(e => (e.id === entity.id ? entity : e)),
  },
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
  onCreate: data => alert(`${data.attributes.playerName} was just created`),
});
```

This hook will handle the subscribing and unsubscribing automatically. It will automatically subscribe/unsubscribe when the component mounts/unmounts. All you have to do is use this hook.

You can disable the subscription by providing: `enabled: false`

```jsx
useMoralisSubscription("GameScore", q => q, [], {
  onCreate: data => alert(`${data.attributes.playerName} was just created`),
  enabled: false,
});
```

## `useMoralisFile()`

Get the data, and saveFunction with the `useMoralisFile` hook

```jsx
const {
  error,
  isUploading,
  moralisFile,
  saveFile,
} = useMoralisFile();
```

### Save to Moralis

All you need to do is call the save function with a valid file:

```jsx
saveFile("batman.jpeg", file);
```

Then you can read the state from the provided variables `error`,
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
  saveIPFS: true,
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
  limit,
});
```

### Trigger manually

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

## `useNewMoralisObject()`
This is a wrapper around the save method for a `Moralis.Object`. It creates a new object, and resolves the data, error and loading state, similar to the other hooks.

```jsx
const AddScoreButton = ({user, score}) => {
  const { isSaving, error, save } = useNewMoralisObject('GameScore');

  return (<div>
    {error && <ErrorMessage error={error} />}
    <button onClick={() => save({score, user})} disabled={isSaving}>Save score</button>
  </div>)
}

```

#  Handling responses
The easiest way to handle the responses of the different async methods (fetch, save etc.), is to read the data directly from the hook. The data will return `error`, `data` and `isLoading`/`isFetching`. These values can easily be used to (conditionally) render different parts of your app.

For other logic, you might want to listen directly for success/error responses. This is facilitated by passing one or more callback (`onComplete`, `onError` and/or `onSuccess`) to the fetch/save etc. functions:


| Callback    | Description |
| ----------- | ----------- |
| `onSuccess` | Fires when the request resolves successfully. If possible it is returned with the resolved data.        |
| `onError` | Fires when the request returns an error. It will return the corresponding error.        |
| `onComplete` | Fires when a request finishes (regardless of a success/error response)        |

Example: 
```jsx
const { fetch } = useMoralisQuery("GameScore");

const fetchAndNotify = () => {
  fetch({ 
    onSuccess: () => notifyUser(user.id),
    onError: (error) => showErrorToast(error)
  });
};
```





# 😖 Error handling

For most hooks, we will resolve the error for you in an error variable. For example, the following function will not throw an error (initially or when you call `fetch` manually).

If you have a useCase where you do want to respond to an error directly you can provide `throwOnError` as an options parameter. For example:

```jsx
const { data, error, isLoading, fetch } = useMoralisQuery("GameScore");

const fetchAndUseError = async () => {
  try {
    await fetch({ throwOnError: true });
  } catch (error) {
    alert("You got an error");
  }
};
```

# ⌨️ Typescript

This library offers first-class Typescript support.
However `moralis` is not fully typed just yet.
Also, not all queries are fully generic just yet.

# 🧑‍💻 Development

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
