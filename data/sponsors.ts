export interface Sponsor {
  name: string;
  logo: string; // Path to the sponsor's logo (ideally in /public/sponsors/)
  url: string;
  tier: 1 | 2 | 3 | 4;
}

export const sponsors: Sponsor[] = [
  {
    name: "Uniswap Foundation",
    logo: "/sponsors/uniswap.png",
    url: "https://www.uniswapfoundation.org",
    tier: 3,
  },
  // {
  //   name: "Last Network",
  //   logo: "/sponsors/last.png",
  //   url: "https://www.last.net/",
  //   tier: 3,
  // },
  {
    name: "Coinbase",
    logo: "/sponsors/coinbase.png",
    url: "https://www.coinbase.com/",
    tier: 3,
  },
  {
    name: "Avalanche",
    logo: "/sponsors/avalanche.png",
    url: "https://avax.network",
    tier: 2,
  },
  {
    name: "Filecoin",
    logo: "/sponsors/filecoin.png",
    url: "https://filecoin.io",
    tier: 2,
  },
  {
    name: "ICP",
    logo: "/sponsors/icp.png",
    url: "https://internetcomputer.org/",
    tier: 3,
  },
  {
    name: "Sonic Labs",
    logo: "/sponsors/sonic.png",
    url: "https://www.soniclabs.com/",
    tier: 3,
  },
  {
    name: "Sui",
    logo: "/sponsors/sui.png",
    url: "https://sui.io",
    tier: 2,
  },
  // {
  //   name: "Pi Squared",
  //   logo: "/sponsors/pisquared.png",
  //   url: "https://pi2.network/",
  //   tier: 2,
  // },
  {
    name: "Franklin Templeton",
    logo: "/sponsors/ft.png",
    url: "https://www.franklintempleton.com/",
    tier: 2,
  },
  {
    name: "Colosseum",
    logo: "/sponsors/colosseum.png",
    url: "https://www.colosseum.org",
    tier: 4,
  },
  {
    name: "Sei",
    logo: "/sponsors/sei.png",
    url: "https://www.sei.io",
    tier: 1,
  },
  {
    name: "Parcl",
    logo: "/sponsors/parcl.png",
    url: "https://www.parcl.co",
    tier: 2,
  },
  {
    name: "Abstract",
    logo: "/sponsors/abstract.png",
    url: "https://www.abs.xyz/",
    tier: 4,
  },
  {
    name: "Michigan Business+Tech",
    logo: "/sponsors/businesstech.png",
    url: "https://businesstech.bus.umich.edu/",
    tier: 1,
  },
  {
    name: "Quai Network",
    logo: "/sponsors/quai.png",
    url: "https://qu.ai/",
    tier: 3,
  },
];
