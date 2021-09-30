import { Assets } from "./modules/Assets";
import { Authentication } from "./modules/Authentication";
import { Login } from "./modules/Login";
import { QueryLive } from "./modules/QueryLive";
import { QueryManual } from "./modules/QueryManual";
import { QueryObject } from "./modules/QueryObject";
import { QuerySimple } from "./modules/QuerySimple";
import { Subscription } from "./modules/Subscription";
import { File } from "./modules/File";
import { User } from "./modules/User";
import { FileIpfs } from "./modules/FileIpfs";
import { CloudFunction } from "./modules/CloudFunction";
import { Web3 } from "./modules/Web3";
import { Web3Api } from "./modules/Web3Api";
import { ExecuteFunction } from "./modules/ExecuteFunction";
import { Transfer } from "./modules/Transfer";

export const menu = [
  {
    path: "/authentication",
    label: "Authentication",
    component: Authentication,
  },
  {
    path: "/login",
    label: "Login",
    component: Login,
  },
  {
    path: "/user",
    label: "User",
    component: User,
  },
  {
    path: "/query-simple",
    label: "Query (simple)",
    component: QuerySimple,
  },
  {
    path: "/query-manual",
    label: "Query (manual",
    component: QueryManual,
  },
  {
    path: "/query-object",
    label: "Query (object)",
    component: QueryObject,
  },
  {
    path: "/query-live",
    label: "Query (live)",
    component: QueryLive,
  },
  {
    path: "/subscription",
    label: "Subscription",
    component: Subscription,
  },
  {
    path: "/file",
    label: "File",
    component: File,
  },
  {
    path: "/file-ipfs",
    label: "File (IPFS)",
    component: FileIpfs,
  },
  {
    path: "/cloud",
    label: "CloudFunction",
    component: CloudFunction,
  },
  {
    path: "/web3",
    label: "Web3",
    component: Web3,
  },
  {
    path: "/web3Api",
    label: "Web3Api",
    component: Web3Api,
  },
  {
    path: "/executeFunction",
    label: "Execute Function",
    component: ExecuteFunction,
  },
  {
    path: "/transfer",
    label: "Transfer",
    component: Transfer,
  },
  {
    path: "/assets",
    label: "Assets",
    component: Assets,
  },
];
