// Every report submitted to the Franklin Crypto Research Competition at UBC 2026.
// Generated from the title pages of the PDFs in the public submissions folder:
// https://drive.google.com/drive/folders/1_7fQPNVCh8Zn4kV6yLhwdZGZd6WhrmVh
// Names, schools, and tracks are as written on each report. Contact details are
// left out on purpose. An empty `schools` list means the report didn't name one.

export type ResearchTrack = "long-under-250m" | "long-over-250m" | "short-over-1b";

export type ResearchReport = {
  /** Google Drive file ID. */
  id: string;
  token: string;
  project: string;
  track: ResearchTrack;
  title: string;
  team: string[];
  schools: string[];
  pages: number;
};

export const RESEARCH_TRACKS: { id: ResearchTrack; label: string; short: string }[] = [
  { id: "long-under-250m", label: "Long under $250M", short: "Long <$250M" },
  { id: "long-over-250m", label: "Long over $250M", short: "Long >$250M" },
  { id: "short-over-1b", label: "Short over $1B", short: "Short >$1B" },
];

export const SUBMISSIONS_FOLDER_URL =
  "https://drive.google.com/drive/folders/1_7fQPNVCh8Zn4kV6yLhwdZGZd6WhrmVh";

export const reportUrl = (r: Pick<ResearchReport, "id">) =>
  `https://drive.google.com/file/d/${r.id}/view`;

export const researchReports: ResearchReport[] = [
  { id: "1ZvVldC66CxHbLxlDRTEkA8Sb33LgkqOs", token: "GEOD", project: "GEODNET", track: "long-under-250m", title: "Short-form investment thesis on GEODNET", team: ["Blake Staats", "Lin Mills", "Ritvik Botla"], schools: ["University of Oregon"], pages: 7 },
  { id: "1IbqBh1PD6IUDJNiNmlEksrXnXhvFRYHm", token: "RENDER", project: "Render Network", track: "long-over-250m", title: "Long Render: The market is underrating its role in the AI compute boom", team: ["Aryan Farooq"], schools: ["University of Michigan"], pages: 6 },
  { id: "1M-ySE082kMyt1eMBryhieTwXSUNUnCyk", token: "WLFI", project: "World Liberty Financial", track: "short-over-1b", title: "$WLFI short thesis", team: ["Osian Guthrie", "Hugo Okada"], schools: ["University of St Andrews"], pages: 8 },
  { id: "19MZG_utO41SoajAtEZPbVGzbzUwIzV1z", token: "AAVE", project: "Aave", track: "short-over-1b", title: "AAVE investment research", team: ["Asher Nerenberg", "Sophie Warner", "Alejandra Marcos Cortezo"], schools: ["Vanderbilt University"], pages: 5 },
  { id: "17btnJ_8IIbPaAA8PkCLhbjXOpVlaVjEg", token: "AERO", project: "Aerodrome", track: "long-over-250m", title: "AERO long investment thesis", team: ["Mateusz Palusinski", "Jared Vaughn"], schools: ["University of Oregon"], pages: 7 },
  { id: "11pE11r441DpFfP0ad9x6vEiSz7Awl3Kg", token: "AERO", project: "Aerodrome", track: "long-over-250m", title: "AERO: The liquidity layer goes multichain", team: ["Rishabh Shekdar"], schools: ["University of Michigan"], pages: 6 },
  { id: "1K3A2-VcL85tAxGvPz8dK6CAjUay-2MlC", token: "AKT", project: "Akash Network", track: "long-under-250m", title: "Long Akash Network", team: ["Eldwin Cheung", "Chanel Crutchfield", "Thuy Nguyen", "Dyvine Le"], schools: ["Cal State Fullerton", "Cal State Long Beach"], pages: 10 },
  { id: "1g0sf-fFi1dMEZzrKmyc4bTMrJxj_xiUH", token: "AKT", project: "Akash Network", track: "long-under-250m", title: "Akash Network: Long pitch", team: ["Tharun Ekambaram", "Victor Song"], schools: ["Indiana University", "University of Chicago"], pages: 7 },
  { id: "1Yhn1eTDh3V3g1hnpbCdtGMSTWCfx0_J5", token: "ASTER", project: "Aster", track: "short-over-1b", title: "ASTER: Paying a premium for volume that does not pay", team: ["Jonathan Serur"], schools: ["Rutgers University"], pages: 10 },
  { id: "1f_LAo-RlyZj5w5xwcj_KR2DMn7Jqe2qp", token: "WLD", project: "Worldcoin", track: "short-over-1b", title: "Renting fifteen million humans: A short thesis on Worldcoin", team: ["Emmanuel Ayeku"], schools: ["University of Lagos"], pages: 8 },
  { id: "16UZRhLRczfHdkstG5a3N18TA3WWVi_wf", token: "BAT", project: "Basic Attention Token", track: "long-under-250m", title: "Long thesis on Basic Attention Token", team: ["Luka Carlson", "Yezul Maharjan", "Ryan Hudgens"], schools: ["University of Minnesota"], pages: 5 },
  { id: "1uVDMxM3ZcjkfWwMrZq_XyTkaB4Y93_sX", token: "WLFI", project: "World Liberty Financial", track: "short-over-1b", title: "Betting on the blue wave: Short World Liberty Financial", team: ["Sable Martin"], schools: ["Georgia State University"], pages: 4 },
  { id: "1oqpCwKD2ylAaZIUYCwhZCvWAF-ZSnUFQ", token: "INJ", project: "Injective", track: "long-over-250m", title: "Injective: On-chain financial markets", team: ["Biynah Dayok"], schools: ["LeMoyne-Owen College"], pages: 6 },
  { id: "1dwmsI7sHqxZFw_AWUC7MUAS8sPAPwihm", token: "BLND", project: "Blend", track: "long-under-250m", title: "BLND: Real lending, unproven token value capture", team: ["Ishan Singh", "Bhavjit Singh", "Ben Pekurovski", "Ivan Wu"], schools: ["Baruch College", "NYU Stern", "University of Saskatchewan"], pages: 12 },
  { id: "1k2yApgojYN6pNcCYMZIxQ99wigt7vmHj", token: "CAP", project: "Cap", track: "long-under-250m", title: "$CAP: Foundation built, ready to scale", team: ["Chris Kim", "Ringo Du", "Wenyang Zu"], schools: ["Columbia University"], pages: 12 },
  { id: "12-4foR1g5OrMaWt_R_vPdnxgevxt4uoc", token: "ADA", project: "Cardano", track: "short-over-1b", title: "Cardano: Shorting a reserve-subsidized chain running out of capital", team: ["Jack Korinek", "Jonathan Pasaribu", "Joey Bodzenta", "Keaton Zacharia"], schools: ["Ohio State University"], pages: 8 },
  { id: "1PwUEidhiQq5ANDpwBTAVbsFyDaGZcQeD", token: "LINK", project: "Chainlink", track: "long-over-250m", title: "Chainlink: The connectivity layer for tokenized finance", team: ["Mahathi Kuppireddy", "Aryan Patel", "Archisha Chennur", "Vaibhav Sunkada"], schools: ["Purdue University"], pages: 9 },
  { id: "1h26b8zKbqEsyemY4DoNJnDo3kEjGo_uv", token: "WLD", project: "Worldcoin", track: "short-over-1b", title: "Short WLD via ORBS", team: ["Edward Chung", "Owen Schulze"], schools: ["University of Waterloo"], pages: 21 },
  { id: "1BhTDpbv4NY7jNbQy1wjMdGxs7QSkDAUB", token: "CARDS", project: "Collector Crypt", track: "long-under-250m", title: "Collector Crypt: The gacha machine behind $CARDS", team: ["Miles Miller", "Jalen Wang", "Parker Myers"], schools: ["University of Oregon"], pages: 6 },
  { id: "15PxREwRwHUhPxJpT4ZtkSq7pms_Gi-9P", token: "KNTQ", project: "Kinetiq", track: "long-under-250m", title: "Kinetiq: The future of speed on Hyperliquid", team: ["Jeremy Moon", "Ryan Pinsker"], schools: ["University of Michigan"], pages: 11 },
  { id: "1iRjySJktS6oxoltRLEBnuJPi22WLAZEP", token: "QNT", project: "Quant", track: "long-over-250m", title: "Quant (QNT) investment research", team: ["Lucas Tapia"], schools: ["San Diego State University"], pages: 8 },
  { id: "1W1PrsMqmfKIoXgiqMqTziDjRgI5f_fdE", token: "AERO", project: "Aerodrome", track: "long-over-250m", title: "Long AERO: Outgrowing dilution", team: ["Sam Smith", "Brian Marsan"], schools: ["University of Michigan"], pages: 6 },
  { id: "1zzvU-j5fNoVGJyaRYW5_Yedfw-1KrznG", token: "SKY", project: "Sky", track: "long-over-250m", title: "SKY: Stablecoin earnings and token holder returns", team: ["Denis Goubkine"], schools: ["University of Waterloo"], pages: 11 },
  { id: "1BSNch7tyBRtgX5LwV55yWYrT6dB7vQZc", token: "ADA", project: "Cardano", track: "short-over-1b", title: "Short Cardano: Market value still runs far ahead of usage", team: ["Anna Ufaeva", "Amber Chen"], schools: ["The Claremont Colleges"], pages: 10 },
  { id: "18SPahMRoyo9V1R4eQ9n9ZjwMHIR_A_Ql", token: "GEOD", project: "GEODNET", track: "long-under-250m", title: "GEOD: Centimeter-accurate GPS for the robots of the future", team: ["Josué Valles"], schools: ["Instituto Tecnológico de Costa Rica"], pages: 8 },
  { id: "18WOzA0mUQ_war4HKJTHuIr50enm-NIqu", token: "HYPE", project: "Hyperliquid", track: "short-over-1b", title: "HYPE: An exchange multiple without exchange growth", team: ["Palash Pawar"], schools: ["University of Texas at Austin"], pages: 5 },
  { id: "1AuDyJSTqjy4_mV2gShaaDVZUimDGSijz", token: "COW", project: "CoW DAO", track: "long-under-250m", title: "Priced for the trough: A long thesis on CoW DAO", team: ["Sylane Jawadi"], schools: ["EPFL"], pages: 7 },
  { id: "1c8IqBrYzUsbsg8kcq63cu_l5VZ5g5wVc", token: "CARDS", project: "Collector Crypt", track: "long-under-250m", title: "Collector Crypt: The infrastructure for physical collectibles", team: ["Kaviish Sethi"], schools: ["Northeastern University"], pages: 10 },
  { id: "1sN7FCDSOD2O2lJoylKwLgEam9QmqQH_Y", token: "KNTQ", project: "Kinetiq", track: "long-under-250m", title: "Accelerate Elysium: A long $KNTQ thesis", team: ["Spencer Ng"], schools: ["UC Santa Cruz"], pages: 12 },
  { id: "1w9wc9gwlhgHrim4iuY5DhcjnDm1mnYV7", token: "AVAX", project: "Avalanche", track: "short-over-1b", title: "Short AVAX: Avalanche's adoption is real, but it doesn't reach the token", team: ["Landon Wilson"], schools: ["Ohio State University"], pages: 5 },
  { id: "1JqAO4Pk1AySjlmUzkKylVNOXw7GIkKZX", token: "ENA", project: "Ethena", track: "short-over-1b", title: "Short Ethena: ENA prices a buyback that is switched off", team: ["Dipak Yadav", "Kashif Manzer", "Utkarsh Lubal"], schools: ["Cal State Long Beach"], pages: 7 },
  { id: "1DKuRHqO7Ik_yXI3tGk267dxvJYjYygJn", token: "ONDO", project: "Ondo Finance", track: "short-over-1b", title: "Short ONDO: The value capture gap", team: ["Mark-Killian Zinenberg"], schools: ["Kryptosphere"], pages: 7 },
  { id: "1BRvuaPUR7tzbmWzt0fWaeXF98yWRJYCg", token: "DRV", project: "Derive", track: "long-over-250m", title: "Derive: The option worth exercising", team: ["Thomas Morel L'Horset", "Sheena Cao"], schools: ["Villanova University"], pages: 10 },
  { id: "1qZXggorQOoHBIpbFhGL8i6hJrEq2ucmo", token: "SKY", project: "Sky", track: "short-over-1b", title: "SKY: Priced for growth, built to shrink", team: ["Mark Webb", "Aidan Cotter", "Seneca Sharp", "Rannvijay Singh"], schools: ["Villanova University"], pages: 10 },
  { id: "1F2r06TvYBaHL9Yn37CeAIgbp5YyQdwyR", token: "CRO", project: "Cronos", track: "short-over-1b", title: "Shorting a centrally controlled token that dilutes every month", team: ["Zayaan Siddiqui", "Marcus Asimis", "Seamus Chai"], schools: ["University of Waterloo", "Wilfrid Laurier University"], pages: 7 },
  { id: "1S1iPHCVbTdLEPxy1IRqniVZZwGMLVBBC", token: "RENDER", project: "Render Network", track: "long-over-250m", title: "Render is mispriced: Why now is the time for decentralized compute", team: ["David Ji", "Kishan Sreenivasan", "Thomas Ziolkowski"], schools: ["Dartmouth College"], pages: 7 },
  { id: "1YYk0zkE4xHN_Xos8Npby_KikCvbs5Yv3", token: "DRV", project: "Derive", track: "long-over-250m", title: "Derive: Taking crypto options onchain", team: ["Dilan Taneja", "Jai Patel", "Olexiy Slokvenko"], schools: ["University of Maryland"], pages: 8 },
  { id: "1UzcVn81amW7E9nqqDeJqmtdlOo4bl0Tb", token: "DRV", project: "Derive", track: "long-over-250m", title: "Derive: The institutional options exchange for on-chain markets", team: ["Finian Kierstead", "Audrey Hudspeth"], schools: ["University of Oregon"], pages: 11 },
  { id: "1thCxbmbvrWmls_m3uvjiaERAevjJVlKp", token: "DRV", project: "Derive", track: "long-over-250m", title: "The long case for Derive", team: ["Jack Brogan", "Ayman Baba", "Nick Sarubbe"], schools: ["Boston College"], pages: 9 },
  { id: "1zXhx6yV9FARdJfgnXIfZ2TAEcsggOFOI", token: "PUMP", project: "Pump.fun", track: "short-over-1b", title: "Short PUMP: I ran bots inside token factories", team: ["Jean-Baptiste Durand"], schools: ["École 42"], pages: 10 },
  { id: "1zj8_GHbHSpp8OzKUtQpYiHPofOKxh6Yb", token: "ZEC", project: "Zcash", track: "short-over-1b", title: "Zcash: A narrative bid, not an earned valuation", team: ["Eli Dubizh"], schools: ["Purdue University"], pages: 8 },
  { id: "1cEZbRvWHob2_MOg9IfqUME1HiOmxLYD2", token: "ENA", project: "Ethena", track: "long-over-250m", title: "Beyond the basis trade: The case for long ENA", team: ["Julia Fitzgerald", "Julia Ostroff"], schools: ["Cornell University"], pages: 7 },
  { id: "1kdxEctiJYg9uVey3fjt6O_o0rIkon6vQ", token: "PUMP", project: "Pump.fun", track: "short-over-1b", title: "Short Pump.fun", team: ["Salem Alfassam", "Anureet Waraich", "Alana Nguyen", "Huy Voqui"], schools: ["University of Oregon"], pages: 16 },
  { id: "1mckjdb0k2av3LO2rx9ovn0yrFLQlwiHA", token: "SYRUP", project: "Maple Finance", track: "long-under-250m", title: "Maple Finance SYRUP long thesis", team: ["Krish Bhandari", "Paula Hirsch", "Rachel Turney"], schools: ["Cornell University"], pages: 8 },
  { id: "11mRBMLLPMzMDvVm_vxKWuvez1szqi8sp", token: "ONDO", project: "Ondo Finance", track: "short-over-1b", title: "ONDO: A governance token priced like an equity stake", team: ["Jay Choi"], schools: ["University of Southern California"], pages: 10 },
  { id: "1AJ1Wrw9kucEKTNFPNn5rSDTLLa4FRpNi", token: "ORBIO", project: "Orbio", track: "long-under-250m", title: "Orbio long thesis: The undervalued Venice challenger", team: ["Austin Lee"], schools: ["University of Southern California"], pages: 11 },
  { id: "1GYsneY7tPUAKC_A6R_HiHaTuSritteyc", token: "SUI", project: "Sui", track: "short-over-1b", title: "Short Sui: A token priced far ahead of what its chain earns", team: ["Aidan Zhang"], schools: ["University of Pennsylvania"], pages: 5 },
  { id: "14-r2s0EExux9aPbnP5oo8RFM5lqmCwWn", token: "NEAR", project: "NEAR Protocol", track: "long-over-250m", title: "$NEAR: The confidential coordination layer", team: ["Chukwuemeka Ngwu"], schools: ["Voorhees University"], pages: 6 },
  { id: "1wvlwPOu5lGZySP_iDqIKLWLJa_zPjTmT", token: "GEOD", project: "GEODNET", track: "long-under-250m", title: "Long GEODNET", team: ["Shaan Bhasin", "Mahdi Khani", "Andrew Bianchi", "Yusuf Elloumi"], schools: ["University of Michigan", "University of Alberta"], pages: 7 },
  { id: "1VIi-TdbK3GpJaTj98V8Hx7NlKVO3oKZ6", token: "GEOD", project: "GEODNET", track: "long-under-250m", title: "GEODNET: The rails for physical AI", team: ["Andrew Paik", "Daniel Thomas"], schools: ["University of Southern California"], pages: 22 },
  { id: "1HYEx0nlSq93UFJdZ1rsRXpqyNk99eebE", token: "GEOD", project: "GEODNET", track: "long-under-250m", title: "GEODNET: Positioning for the autonomous future", team: ["Ethan Moynan", "Anusha Saxena", "Liron Katsif"], schools: ["University of Waterloo"], pages: 9 },
  { id: "1Apl-g8C0cdMZWmGGKWSvmzLBLEhl7tzM", token: "GRASS", project: "Grass", track: "long-over-250m", title: "Grass: The picks and shovels of the agentic economy", team: ["Aum Pahuja", "Sanjeev Gedela", "Reginald Kung", "Jackson Herleth"], schools: ["University of Texas at Austin"], pages: 8 },
  { id: "16N8WrncSMejWRVT6witR2M7NDVEFZA2b", token: "HYPE", project: "Hyperliquid", track: "short-over-1b", title: "Short Hyperliquid", team: ["Pramay Jain"], schools: ["Boston University"], pages: 10 },
  { id: "1K3QdOmmizNP1e2j4Ho0K3UgtP0cbzm9O", token: "HYPE", project: "Hyperliquid", track: "long-over-250m", title: "Hyperliquid investment thesis: Long position", team: ["Jack Brehmer", "Tyler Martin", "Gabriella Davis"], schools: ["University of Colorado Boulder"], pages: 4 },
  { id: "1OIL0putk05flzLMFGIKKFeWKYg3bFn5c", token: "KNTQ", project: "Kinetiq", track: "long-under-250m", title: "Kinetiq: Hyperliquid's new economic engine", team: ["Dhru Patel", "Cameron Coleman"], schools: ["University of Oregon"], pages: 10 },
  { id: "1b-Do7xHAqhAvpXltYKhPBs08M5mhrnuh", token: "KMNO", project: "Kamino", track: "long-under-250m", title: "Long Kamino", team: ["Zidane Marinez", "Jack Zhang"], schools: ["University of Chicago"], pages: 7 },
  { id: "14-r3WPUaSb0U7oyPM0rClZ0WFi3lepzo", token: "KNTQ", project: "Kinetiq", track: "long-under-250m", title: "Long Kinetiq: Buy KNTQ through the November unlock", team: ["Weitao Su"], schools: ["Cornell University"], pages: 6 },
  { id: "1BXera11vgyejsQSXrPXj6N9D4LVJz1V3", token: "KNTQ", project: "Kinetiq", track: "long-under-250m", title: "Kinetiq is opening Hyperliquid to developers", team: ["Frederic Hsieh"], schools: ["University of Wisconsin–Madison"], pages: 5 },
  { id: "1-ibOm8Dx-nqz4rvpI8-7ZfZOG4DGeZsg", token: "GEOD", project: "GEODNET", track: "long-under-250m", title: "Long GEODNET", team: ["Ian Law", "Amadeus Kosova"], schools: ["Ohio State University"], pages: 9 },
  { id: "1F9C8BMOnC937cOz8IggUbhGelzQweWB2", token: "SKY", project: "Sky", track: "long-over-250m", title: "Long SKY: A profitable stablecoin bank at 9.8x run-rate earnings", team: ["Hugo Wei"], schools: ["CentraleSupélec"], pages: 4 },
  { id: "1v8wAjQiFdd-hp_oNAEXqqFXLe-aMLAKA", token: "LYX", project: "LUKSO", track: "long-under-250m", title: "Long LUKSO", team: ["Vartan Yildiz"], schools: ["NYU Stern"], pages: 8 },
  { id: "1r3VQ6DueZhPafiaPOHRtfQjefeTQSKDp", token: "SYRUP", project: "Maple Finance", track: "long-under-250m", title: "Maple Finance: A sweet spot in the sell-off", team: ["Esteban Añez", "Riya Kesavan"], schools: ["University of Kansas"], pages: 10 },
  { id: "1P7m5mOiZJW89QhmYhCPLqzkhFXKqHgMb", token: "SYRUP", project: "Maple Finance", track: "long-under-250m", title: "Maple Finance: Same revenue, half the price", team: ["Austin Liu", "Sam Warner", "Ruohan Chen", "Justin Huang"], schools: ["Vanderbilt University"], pages: 9 },
  { id: "1HUl4_6p0MaT0H6bQ2ZvPPq7DF4nnxp3g", token: "ZEC", project: "Zcash", track: "short-over-1b", title: "Shorting the privacy narrative: Why Zcash cannot displace Bitcoin", team: ["Nicholas Zhu"], schools: ["University of Pennsylvania"], pages: 14 },
  { id: "1Q33lkHcdC3U02LMQpd7L6L4mzLda97ez", token: "CARDS", project: "Collector Crypt", track: "long-under-250m", title: "Collector Crypt: The infrastructure layer for on-chain collectibles", team: ["Nick Diaz"], schools: ["Purdue University"], pages: 6 },
  { id: "1a4GhWD5NHZqiq0H3JlEsVz2FJlrcd3Nx", token: "ONDO", project: "Ondo Finance", track: "short-over-1b", title: "Ondo not ONDO: A winning business doesn't mean a winning token", team: ["Marcus Lord", "Parker Young", "Nolan Bruno"], schools: ["Dartmouth College"], pages: 8 },
  { id: "1wv2myCkp5maGfKM19w1A8ItkOSxDtXuS", token: "ONDO", project: "Ondo Finance", track: "short-over-1b", title: "ONDO prices in cash flows it does not receive", team: ["Jayden Liu"], schools: ["Purdue University"], pages: 8 },
  { id: "1KLEp0ZFyf5-r0A0RxS6XsllDxZkC8PkE", token: "ONDO", project: "Ondo Finance", track: "short-over-1b", title: "Short ONDO", team: ["Akira Tadehara", "David Barrera", "Edmond Mao", "Patrick Stead"], schools: ["Baruch College"], pages: 7 },
  { id: "13-6Um4Nlc_AkHoY6bvNgltLD6CCNqsP-", token: "ONDO", project: "Ondo Finance", track: "short-over-1b", title: "Short ONDO into the January 2027 unlock", team: ["Christopher Park"], schools: ["Georgia Tech"], pages: 11 },
  { id: "1dz1Hw0nCRZUhXWOvR3zuFasJpSosHMDJ", token: "ONDO", project: "Ondo Finance", track: "short-over-1b", title: "Short ONDO", team: ["Avishka Wickramaratna"], schools: ["San Diego State University"], pages: 8 },
  { id: "1eg9c_vNOpu7xSf950KRnz5LYnfmZeogd", token: "PRL", project: "Pearl", track: "long-over-250m", title: "Long Pearl", team: ["Michael Green", "Quinn Armstrong"], schools: ["Indiana University"], pages: 12 },
  { id: "1fSBpGPlPsbSA4eMFpxxag9VLQyL8RUlx", token: "PRL", project: "Pearl", track: "long-over-250m", title: "Pearl is priced like a GPU coin. Its real market is the AI buildout.", team: ["Braydon Perko", "Shaurya Saxena"], schools: ["University of Oregon"], pages: 7 },
  { id: "1EOgfEw-rbH9AAugQFIRByE846rGF-ACL", token: "PENDLE", project: "Pendle", track: "long-over-250m", title: "Pendle: On-chain interest rate markets", team: ["Brody Grimaldi"], schools: ["University of Pennsylvania"], pages: 8 },
  { id: "1LtCDhNZZi54whJHYVziY7pk72LkdxGig", token: "RAIN", project: "Rain", track: "short-over-1b", title: "Rain's buyback hurdle", team: ["Sean Lee"], schools: ["Vanderbilt University"], pages: 9 },
  { id: "1jJNwWG6m2lib71x1Xlm4Ix6A_t2N6cMb", token: "RENDER", project: "Render Network", track: "long-over-250m", title: "Render Network: Usage is compounding while emissions decline", team: ["Charanpreet Singh"], schools: ["University of Maryland"], pages: 7 },
  { id: "1l7Chx5bpY0XbWoRlbJPTsqzN36W1ArIt", token: "PUMP", project: "Pump.fun", track: "short-over-1b", title: "PUMP: Priced on October", team: ["Carlos Ferreira Gaxiola"], schools: ["Yale University"], pages: 12 },
  { id: "1mDJMAco02X26_rPG_-TubSxVtFTEWRiN", token: "GRASS", project: "Grass", track: "long-under-250m", title: "Grass token research analysis", team: ["Adam Nasseri", "Peter Do"], schools: ["University of Southern California"], pages: 8 },
  { id: "19ldAKda4eSybYZG9Gvpk3pR-KqNfDdez", token: "ONDO", project: "Ondo Finance", track: "short-over-1b", title: "Short Ondo", team: ["Dylan Gutowski"], schools: ["Cornell University"], pages: 5 },
  { id: "13jTqV_xtxvrOUBnObrLbiMzRphmUaBTj", token: "PUMP", project: "Pump.fun", track: "short-over-1b", title: "Short PUMP: Emissions outrun the buyback", team: ["Dayang Niu"], schools: ["University of Maryland"], pages: 8 },
  { id: "1jjP335HNnubNg6kaHNXqQuBZgT-U08LR", token: "SKY", project: "Sky", track: "long-over-250m", title: "Sky: The next dollar matters more", team: ["Nihar Bolineni", "Vamsi Sai Krishna Bapatla", "Rory Geddes"], schools: ["University of Texas at San Antonio", "Dalhousie University"], pages: 10 },
  { id: "1f2AVr80LS9HsP-Vc0n6AgVUvBNTIFYcA", token: "SKY", project: "Sky", track: "short-over-1b", title: "SKY: Payout valuation under weaker stablecoin demand", team: ["Richmond Azadze"], schools: ["Grambling State University"], pages: 12 },
  { id: "1XXSqETZsnP3uEN9zFyVxPBVoI9MVzxZ0", token: "SOL", project: "Solana", track: "long-over-250m", title: "Solana: Long investment proposal", team: ["Alexander Novikov", "Haowen Xiao"], schools: ["Baruch College"], pages: 3 },
  { id: "1YCQ6wlXXPSAH-yRNlXxcBeXAdKv0GzxS", token: "SOLO", project: "Solomon", track: "long-under-250m", title: "SOLO: A live stablecoin business priced at $1.7M", team: ["Hunter Amen", "Daniel Connelly"], schools: ["Boston College"], pages: 12 },
  { id: "1URyy2pgaTmYDZ-SVAXLkVSkKRx3OTBWr", token: "STONK", project: "StonkFun", track: "long-under-250m", title: "STONK: Betting on the house", team: ["Tyler Thompson", "Augie Altes"], schools: ["University of Southern California"], pages: 11 },
  { id: "1U3EvFek-TrULbZudijGndL4ohuIId4KG", token: "SYRUP", project: "Maple Finance", track: "long-under-250m", title: "Long Maple Finance: A January vote decides what holders get", team: ["Clayton Fawthrop", "Matthew Stone", "Shishir Thilavalli"], schools: ["University of Oregon"], pages: 9 },
  { id: "1oe00HuUvs_-oUgcOWId1EalwL1S1HaHR", token: "TREAD", project: "Tread", track: "long-under-250m", title: "TREAD: The execution layer is cheap", team: ["Hasan Taomri"], schools: ["Wilfrid Laurier University"], pages: 10 },
  { id: "1yhN7HznWPMHXebsbmqk0BQiNQjfzqG4Q", token: "SKY", project: "Sky", track: "long-over-250m", title: "Sky: The payout step-up the market isn't pricing", team: ["Vande Holser", "Mitch Ganim", "Liam Dizon", "Chengqian Cai"], schools: ["Ohio State University"], pages: 9 },
  { id: "1xS533X0efcahPnSs-k9RpdLhGVkTcfBp", token: "ASTER", project: "Aster", track: "short-over-1b", title: "Short Aster", team: ["Miles Docktor"], schools: ["Penn State University"], pages: 7 },
  { id: "1P0CON_91lex-02maJi21d9a9OH7UkWpY", token: "GEOD", project: "GEODNET", track: "long-under-250m", title: "GEODNET: The token of real-time geospatial positioning", team: ["Nikoloz Sharvashidze", "Shiwoo Hur", "Hamza Dag", "Elizabeth Yang"], schools: ["University of Texas at Austin"], pages: 8 },
  { id: "12LlnMVhugxefC321SXqJbUYzJgtLO4CB", token: "TAO", project: "Bittensor", track: "short-over-1b", title: "Bittensor: Observation boundaries, emission subsidies, and token valuation", team: ["Aydan Wang", "Sophie Eisenberg", "James Horangic"], schools: ["University of Pennsylvania"], pages: 5 },
  { id: "1YbK3wwBDJkeo7O9tkHY4APZ1MDb6TkEy", token: "DOT", project: "Polkadot", track: "short-over-1b", title: "Why we recommend selling Polkadot", team: ["Jairo Amaya Celis"], schools: ["Pontificia Universidad Javeriana"], pages: 10 },
  { id: "1lkR-qQVNM7F7ECeyAtlhSkI6RNRme_NT", token: "CC", project: "Canton", track: "short-over-1b", title: "Canton: Burn is bought, not earned", team: ["Jay Wang", "Minho Kang", "Jongyun Shin", "Leon Le"], schools: ["Emory University"], pages: 11 },
  { id: "1Au0GBzMoxCE2R-cz0G4QwrN0Ww2jm0Qw", token: "UMBRA", project: "Umbra", track: "long-under-250m", title: "Umbra: Long pitch", team: ["Robert Sun", "Dylan Gu"], schools: ["Emory University"], pages: 10 },
  { id: "1ZQWkH58_iQiCa-tUTBipamS8A_11RqUN", token: "ASTER", project: "Aster", track: "short-over-1b", title: "Short Aster", team: ["Shrey Patel", "Alexander Solovianenko", "David Yusupov", "Elizabeth Ciceu"], schools: ["University of Waterloo"], pages: 7 },
  { id: "13Sbqx-AdaO_4J9KHBc7iBC-WOWZ8Y5NK", token: "VVV", project: "Venice", track: "short-over-1b", title: "Short Venice", team: ["Charlie Sneed"], schools: ["University of Oregon"], pages: 9 },
  { id: "13D7ICfO285rgDnr0LM3RuTwFARQdekoK", token: "VVV", project: "Venice", track: "short-over-1b", title: "Venice: An AI token priced oblivious to its fundamentals", team: ["Zachary Wei", "Micah Killmer", "Ethan Liu", "Sahas Goli"], schools: ["Cornell University"], pages: 6 },
  { id: "1mahsV-YF9Q0G_6mHNFnhPrtL27aZBDqu", token: "GEOD", project: "GEODNET", track: "long-under-250m", title: "$GEOD: Well positioned", team: ["Peter Garenani", "Dylan Klein", "Curtis Roberts", "Luke Chandra"], schools: ["Villanova University"], pages: 8 },
  { id: "1WS9Rln4l7RK7x67P5Ps4Yws_sygTZIB0", token: "AAVE", project: "Aave", track: "short-over-1b", title: "What is an AAVE buyback worth?", team: ["Vishal Pentela"], schools: ["Purdue University"], pages: 9 },
  { id: "1hnZ2-pR7AlOAvbUDqlRx5UdIOo4SJT0u", token: "VVV", project: "Venice", track: "short-over-1b", title: "Venice AI: Priced like equity for a non-equity token", team: ["Lucas Jang", "Luke Zhang", "Lam Nguyen"], schools: ["New York University"], pages: 8 },
  { id: "1SxkPEbqF6px-2Z9MT6hTTB1aHPe8NR99", token: "WLFI", project: "World Liberty Financial", track: "short-over-1b", title: "Short WLFI: Token holders own none of the business", team: ["Nathan Shadzeka"], schools: ["University of Texas at Austin"], pages: 12 },
  { id: "1r-Z2C_X1TqTNtPRujljRBJSm3-yH2dXl", token: "XLM", project: "Stellar", track: "long-over-250m", title: "Stellar and the investment case for XLM", team: ["Kateryna Chevplianska", "Zaynab Reem Elhari"], schools: ["Baruch College"], pages: 12 },
  { id: "1pvkU665fsiQrh7GzepouW-zZgsWoovXF", token: "XPL", project: "Plasma", track: "long-under-250m", title: "Plasma: A live stablecoin network at its 2025 public sale price", team: ["Krithik Ramesh", "Maanas Pabbathi"], schools: ["University of Texas at Austin"], pages: 8 },
  { id: "1Lj9NRGWBP3bhNz0HCgo_4xFH2sTXU_HH", token: "ZEC", project: "Zcash", track: "short-over-1b", title: "Zcash: Price over privacy", team: ["Eron Torres-Concoha", "Darshan Lorenzana", "Sebastian Flores"], schools: ["University of Texas at San Antonio"], pages: 10 },
  { id: "1N8LYyAi9986GMxwzvZDcKK3a5CS4X_6X", token: "ZRO", project: "LayerZero", track: "long-over-250m", title: "Long LayerZero", team: ["Ruopu Tan", "Tyler Vu", "Abdullah Noaman"], schools: ["University of Waterloo", "Wilfrid Laurier University"], pages: 11 },
];
