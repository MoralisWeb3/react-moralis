import { resolveIPFS } from "./resolveIPFS";

describe("resolveLink", () => {
  test.each`
    value                                                                            | expected
    ${"ipfs://QmTy8w65yBXgyfG2ZBg5TrfB2hPjrDQH3RCQFJGkARStJb"}                       | ${"https://gateway.ipfs.io/ipfs/QmTy8w65yBXgyfG2ZBg5TrfB2hPjrDQH3RCQFJGkARStJb"}
    ${"https://gateway.ipfs.io/ipfs/QmTy8w65yBXgyfG2ZBg5TrfB2hPjrDQH3RCQFJGkARStJb"} | ${"https://gateway.ipfs.io/ipfs/QmTy8w65yBXgyfG2ZBg5TrfB2hPjrDQH3RCQFJGkARStJb"}
    ${null}                                                                          | ${null}
    ${undefined}                                                                     | ${undefined}
  `("resolves link $value to $expected", ({ value, expected }) => {
    expect(resolveIPFS(value)).toBe(expected);
  });
});
