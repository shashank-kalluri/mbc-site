export interface Sponsor {
  name: string;
  logo: string; // Path to the sponsor's logo (ideally in /public/sponsors/)
  url: string;
  tier: 1 | 2 | 3 | 4;
}

export const sponsors: Sponsor[] = [
  // Tier 1
  {
    name: "Solana",
    logo: "/sponsors/solana.png",
    url: "https://solana.com",
    tier: 1,
  },
  {
    name: "Coinbase",
    logo: "/sponsors/coinbase.png",
    url: "https://www.coinbase.com",
    tier: 1,
  },

  // Tier 2
  {
    name: "Ethereum",
    logo: "/sponsors/ethereum.png",
    url: "https://ethereum.org",
    tier: 2,
  },
  {
    name: "Polygon",
    logo: "/sponsors/polygon.png",
    url: "https://polygon.technology",
    tier: 2,
  },
  {
    name: "Arbitrum",
    logo: "/sponsors/arbitrum.png",
    url: "https://arbitrum.io",
    tier: 2,
  },
  {
    name: "Base",
    logo: "/sponsors/base.png",
    url: "https://base.org",
    tier: 2,
  },
  {
    name: "Uniswap Foundation",
    logo: "/sponsors/uniswap.png",
    url: "https://www.uniswapfoundation.org",
    tier: 2,
  },

  // Tier 3
  {
    name: "Avalanche",
    logo: "/sponsors/avalanche.png",
    url: "https://avax.network",
    tier: 3,
  },
  {
    name: "Filecoin",
    logo: "/sponsors/filecoin.png",
    url: "https://filecoin.io",
    tier: 3,
  },
  {
    name: "ICP",
    logo: "/sponsors/icp.png",
    url: "https://internetcomputer.org/",
    tier: 3,
  },
  {
    name: "Sonic",
    logo: "/sponsors/sonic.png",
    url: "https://sonic.ooo",
    tier: 3,
  },
  {
    name: "Sui",
    logo: "/sponsors/sui.png",
    url: "https://sui.io",
    tier: 3,
  },

  // Tier 4
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
    tier: 4,
  },
  {
    name: "Parcl",
    logo: "/sponsors/parcl.png",
    url: "https://www.parcl.co",
    tier: 4,
  },
  {
    name: "Abstract",
    logo: "/sponsors/abstract.png",
    url: "https://www.abstract.money",
    tier: 4,
  },
];
