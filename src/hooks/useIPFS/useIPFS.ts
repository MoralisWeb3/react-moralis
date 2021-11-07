export const useIPFS = () => {
  const resolveLink = (url: string) => {
    if (!url.includes("ipfs://") || !url) return url;
    return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
  };

  return { resolveLink };
};
