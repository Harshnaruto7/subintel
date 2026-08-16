import {
  SiNetflix,
  SiSpotify,
  SiYoutube,
  SiFigma,
  SiGithub,
  SiNotion,
  SiDiscord,
  SiDropbox,
  SiGoogle,
  SiGooglenews,
  SiGooglecloud,
  SiApple,
  SiAppstore,
  SiZoom,
  SiTwitch,
  SiSteam,
  SiPlaystation,
  SiHbomax,
  SiCrunchyroll,
  SiParamountplus,
  SiStarz,
  SiAudible,
  SiDeezer,
  SiSoundcloud,
  SiTidal,
  SiPandora,
  SiMedium,
  SiX,
  SiFacebook,
  SiInstagram,
  SiWhatsapp,
  SiTelegram,
  SiMessenger,
  SiTiktok,
  SiPinterest,
  SiSnapchat,
  SiReddit,
  SiAnthropic,
  SiOpenid,
  SiMini,
  SiPerplexity,
  SiDeepseek,
  SiMistralai,
  SiClaude,
  SiCursor,
  SiGithubcopilot,
  SiReplit,
  SiVercel,
  SiNetlify,
  SiRailway,
  SiRender,
  SiCloudflare,
  SiHeroui,
  SiDigitalocean,
  SiLinear,
  SiClickup,
  SiAsana,
  SiTrello,
  SiTodoist,
  SiEvernote,
  SiObsidian,
  SiMiro,
  SiAirtable,
  SiCalendly,
  SiLoom,
  SiGrammarly,
  SiBox,
  SiWetransfer,
  SiCoursera,
  SiUdemy,
  SiDuolingo,
  SiKhanacademy,
  SiSkillshare,
  SiPluralsight,
  SiDatacamp,
  SiCodecademy,
  SiLeetcode,
  SiFrontendmentor,
  SiNordvpn,
  SiExpressvpn,
  SiProtonvpn,
  SiProtonmail,
  Si1Password,
  SiLastpass,
  SiBitwarden,
  SiDashlane,
  SiNorton,
  SiMcafee,
  SiMalwarebytes,
  SiPaypal,
  SiPaytm,
  SiPhonepe,
  SiRazorpay,
  SiStripe,
  SiWise,
  SiRevolut,
  SiVenmo,
  SiCashapp,
  SiGoogleplay,
  SiEbay,
  SiEtsy,
  SiFlickr,
  SiAliexpress,
  SiGitlab,
  SiBitbucket,
  SiDocker,
  SiKubernetes,
  SiPostman,
  SiInsomnia,
  SiJetbrains,
  SiIntellijidea,
  SiWebstorm,
  SiPycharm,
  SiDatagrip,
  SiAndroidstudio,
  SiVsco,
  SiNpm,
  SiNodedotjs,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiSupabase,
  SiFirebase,
  SiMongodb,
  SiPostgresql,
  SiFramer,
  SiWebflow,
  SiWix,
  SiSquarespace,
  SiWordpress,
  SiShopify,
  SiDribbble,
  SiBehance,
  SiUnsplash,
  SiPexels,
  SiPhotopea,
  SiDavinciresolve,
  SiSketch,
  SiEpicgames,
  SiUbisoft,
  SiEa,
  SiRoblox,
  SiRiotgames,
  SiBattledotnet,
  SiStrava,
  SiFitbit,
  SiNike,
  SiAdidas,
  SiNewyorktimes,
  SiFresh,
  SiSubstack,
  SiPatreon,
} from "react-icons/si";

import { BiLogoAdobe } from "react-icons/bi";
import { AiOutlineSlack } from "react-icons/ai";
import { FaXbox } from "react-icons/fa";
import { TbDeviceNintendo } from "react-icons/tb";
import { TbBrandDisney } from "react-icons/tb";
import { FaLinkedin } from "react-icons/fa";
import { AiOutlineAmazon , AiOutlineOpenAI } from "react-icons/ai";
import { RiGeminiLine } from "react-icons/ri";
import { VscAzure } from "react-icons/vsc";
import { TbBrandMongodb } from "react-icons/tb";
import { VscVscodeInsiders } from "react-icons/vsc";
import { TbBrandWalmart } from "react-icons/tb";
import { FaMicrosoft } from "react-icons/fa";



// ============================================================
// SERVICES
// ============================================================

export const SERVICES = {
  // ==========================================================
  // STREAMING
  // ==========================================================

  netflix: {
    icon: SiNetflix,
    color: "#E50914",
  },

  spotify: {
    icon: SiSpotify,
    color: "#1DB954",
  },

  youtube: {
    icon: SiYoutube,
    color: "#FF0000",
  },

  disneyplus: {
    icon: TbBrandDisney,
    color: "#113CCF",
  },

  hbo: {
    icon: SiHbomax,
    color: "#000000",
  },


  paramount: {
    icon: SiParamountplus,
    color: "#0064FF",
  },


  crunchyroll: {
    icon: SiCrunchyroll,
    color: "#F47521",
  },

  starz: {
    icon: SiStarz,
    color: "#000000",
  },

  twitch: {
    icon: SiTwitch,
    color: "#9146FF",
  },

  amazonprime: {
    icon: AiOutlineAmazon,
    color: "#00A8E1",
  },

  audible: {
    icon: SiAudible,
    color: "#F8991D",
  },

  deezer: {
    icon: SiDeezer,
    color: "#A238FF",
  },

  soundcloud: {
    icon: SiSoundcloud,
    color: "#FF5500",
  },

  tidal: {
    icon: SiTidal,
    color: "#FFFFFF",
  },

  pandora: {
    icon: SiPandora,
    color: "#224099",
  },


  // ==========================================================
  // AI
  // ==========================================================

  chatgpt: {
    icon: AiOutlineOpenAI,
    color: "#FFFFFF",
  },

  openai: {
    icon: AiOutlineOpenAI,
    color: "#FFFFFF",
  },

  claude: {
    icon: SiClaude,
    color: "#D97757",
  },

  anthropic: {
    icon: SiAnthropic,
    color: "#D97757",
  },

  gemini: {
    icon: RiGeminiLine,
    color: "#4285F4",
  },

  perplexity: {
    icon: SiPerplexity,
    color: "#20B8CD",
  },

  deepseek: {
    icon: SiDeepseek,
    color: "#4D6BFE",
  },

  mistral: {
    icon: SiMistralai,
    color: "#FA520F",
  },

  cursor: {
    icon: SiCursor,
    color: "#FFFFFF",
  },

  githubcopilot: {
    icon: SiGithubcopilot,
    color: "#FFFFFF",
  },


  // ==========================================================
  // DEVELOPMENT
  // ==========================================================

  github: {
    icon: SiGithub,
    color: "#FFFFFF",
  },

  gitlab: {
    icon: SiGitlab,
    color: "#FC6D26",
  },

  bitbucket: {
    icon: SiBitbucket,
    color: "#2684FF",
  },

  docker: {
    icon: SiDocker,
    color: "#2496ED",
  },

  kubernetes: {
    icon: SiKubernetes,
    color: "#326CE5",
  },

  postman: {
    icon: SiPostman,
    color: "#FF6C37",
  },

  insomnia: {
    icon: SiInsomnia,
    color: "#4000BF",
  },

  replit: {
    icon: SiReplit,
    color: "#F26207",
  },

  vercel: {
    icon: SiVercel,
    color: "#FFFFFF",
  },

  netlify: {
    icon: SiNetlify,
    color: "#00C7B7",
  },

  railway: {
    icon: SiRailway,
    color: "#FFFFFF",
  },

  render: {
    icon: SiRender,
    color: "#46E3B7",
  },

  cloudflare: {
    icon: SiCloudflare,
    color: "#F38020",
  },


  digitalocean: {
    icon: SiDigitalocean,
    color: "#0080FF",
  },


  microsoftazure: {
    icon: VscAzure,
    color: "#0078D4",
  },

  firebase: {
    icon: SiFirebase,
    color: "#FFCA28",
  },

  supabase: {
    icon: SiSupabase,
    color: "#3ECF8E",
  },

  mongodb: {
    icon: TbBrandMongodb,
    color: "#47A248",
  },

  postgresql: {
    icon: SiPostgresql,
    color: "#4169E1",
  },

  npm: {
    icon: SiNpm,
    color: "#CB3837",
  },

  nodejs: {
    icon: SiNodedotjs,
    color: "#5FA04E",
  },

  react: {
    icon: SiReact,
    color: "#61DAFB",
  },

  nextjs: {
    icon: SiNextdotjs,
    color: "#FFFFFF",
  },

  typescript: {
    icon: SiTypescript,
    color: "#3178C6",
  },

  tailwindcss: {
    icon: SiTailwindcss,
    color: "#06B6D4",
  },

  vscode: {
    icon: VscVscodeInsiders,
    color: "#007ACC",
  },

  visualstudio: {
    icon: VscVscodeInsiders,
    color: "#5C2D91",
  },

  androidstudio: {
    icon: SiAndroidstudio,
    color: "#3DDC84",
  },

  jetbrains: {
    icon: SiJetbrains,
    color: "#000000",
  },

  intellijidea: {
    icon: SiIntellijidea,
    color: "#FE2857",
  },

  webstorm: {
    icon: SiWebstorm,
    color: "#00CDD7",
  },

  pycharm: {
    icon: SiPycharm,
    color: "#21D789",
  },

  datagrip: {
    icon: SiDatagrip,
    color: "#21D789",
  },
    // ==========================================================
  // PRODUCTIVITY
  // ==========================================================

  notion: {
    icon: SiNotion,
    color: "#FFFFFF",
  },

  slack: {
    icon: AiOutlineSlack,
    color: "#36C5F0",
  },

  discord: {
    icon: SiDiscord,
    color: "#5865F2",
  },

  zoom: {
    icon: SiZoom,
    color: "#2D8CFF",
  },

  linear: {
    icon: SiLinear,
    color: "#5E6AD2",
  },

  clickup: {
    icon: SiClickup,
    color: "#7B68EE",
  },

  asana: {
    icon: SiAsana,
    color: "#F06A6A",
  },

  trello: {
    icon: SiTrello,
    color: "#0052CC",
  },

  todoist: {
    icon: SiTodoist,
    color: "#E44332",
  },

  evernote: {
    icon: SiEvernote,
    color: "#00A82D",
  },

  obsidian: {
    icon: SiObsidian,
    color: "#7C3AED",
  },

  miro: {
    icon: SiMiro,
    color: "#FFD02F",
  },

  airtable: {
    icon: SiAirtable,
    color: "#18BFFF",
  },

  calendly: {
    icon: SiCalendly,
    color: "#006BFF",
  },

  loom: {
    icon: SiLoom,
    color: "#625DF5",
  },

  grammarly: {
    icon: SiGrammarly,
    color: "#15C39A",
  },

  box: {
    icon: SiBox,
    color: "#0061D5",
  },

  wetransfer: {
    icon: SiWetransfer,
    color: "#409FFF",
  },


  // ==========================================================
  // CLOUD / STORAGE
  // ==========================================================

  googleone: {
    icon: SiGoogle,
    color: "#4285F4",
  },

  googlecloud: {
    icon: SiGooglecloud,
    color: "#4285F4",
  },

  google: {
    icon: SiGoogle,
    color: "#4285F4",
  },

  dropbox: {
    icon: SiDropbox,
    color: "#0061FF",
  },


  // ==========================================================
  // DESIGN / CREATIVE
  // ==========================================================

  figma: {
    icon: SiFigma,
    color: "#F24E1E",
  },

  adobe: {
    icon: BiLogoAdobe,
    color: "#FF0000",
  },

  framer: {
    icon: SiFramer,
    color: "#0055FF",
  },

  webflow: {
    icon: SiWebflow,
    color: "#146EF5",
  },

  wix: {
    icon: SiWix,
    color: "#FFFFFF",
  },

  squarespace: {
    icon: SiSquarespace,
    color: "#FFFFFF",
  },

  wordpress: {
    icon: SiWordpress,
    color: "#21759B",
  },

  shopify: {
    icon: SiShopify,
    color: "#96BF48",
  },

  dribbble: {
    icon: SiDribbble,
    color: "#EA4C89",
  },

  behance: {
    icon: SiBehance,
    color: "#1769FF",
  },

  unsplash: {
    icon: SiUnsplash,
    color: "#FFFFFF",
  },

  pexels: {
    icon: SiPexels,
    color: "#05A081",
  },

  photopea: {
    icon: SiPhotopea,
    color: "#18A497",
  },

  davinci: {
    icon: SiDavinciresolve,
    color: "#23395B",
  },

  sketch: {
    icon: SiSketch,
    color: "#FDB300",
  },


  // ==========================================================
  // EDUCATION
  // ==========================================================

  coursera: {
    icon: SiCoursera,
    color: "#0056D2",
  },

  udemy: {
    icon: SiUdemy,
    color: "#A435F0",
  },

  duolingo: {
    icon: SiDuolingo,
    color: "#58CC02",
  },

  khanacademy: {
    icon: SiKhanacademy,
    color: "#14BF96",
  },

  skillshare: {
    icon: SiSkillshare,
    color: "#00FF84",
  },

  pluralsight: {
    icon: SiPluralsight,
    color: "#F15B2A",
  },

  datacamp: {
    icon: SiDatacamp,
    color: "#03EF62",
  },

  codecademy: {
    icon: SiCodecademy,
    color: "#1F4056",
  },

  leetcode: {
    icon: SiLeetcode,
    color: "#FFA116",
  },

  frontendmentor: {
    icon: SiFrontendmentor,
    color: "#3F54A3",
  },


  // ==========================================================
  // SECURITY
  // ==========================================================

  nordvpn: {
    icon: SiNordvpn,
    color: "#4687FF",
  },

  expressvpn: {
    icon: SiExpressvpn,
    color: "#DA3940",
  },

  protonvpn: {
    icon: SiProtonvpn,
    color: "#6D4AFF",
  },

  protonmail: {
    icon: SiProtonmail,
    color: "#6D4AFF",
  },

  onepassword: {
    icon: Si1Password,
    color: "#145FE4",
  },

  lastpass: {
    icon: SiLastpass,
    color: "#D32D27",
  },

  bitwarden: {
    icon: SiBitwarden,
    color: "#175DDC",
  },

  dashlane: {
    icon: SiDashlane,
    color: "#0E6FFF",
  },

  norton: {
    icon: SiNorton,
    color: "#FFE000",
  },

  mcafee: {
    icon: SiMcafee,
    color: "#C01818",
  },

  malwarebytes: {
    icon: SiMalwarebytes,
    color: "#00AEEF",
  },


  // ==========================================================
  // SOCIAL
  // ==========================================================

  instagram: {
    icon: SiInstagram,
    color: "#E4405F",
  },

  facebook: {
    icon: SiFacebook,
    color: "#1877F2",
  },

  whatsapp: {
    icon: SiWhatsapp,
    color: "#25D366",
  },

  telegram: {
    icon: SiTelegram,
    color: "#26A5E4",
  },

  messenger: {
    icon: SiMessenger,
    color: "#00B2FF",
  },

  tiktok: {
    icon: SiTiktok,
    color: "#FFFFFF",
  },

  twitter: {
    icon: SiX,
    color: "#FFFFFF",
  },

  linkedin: {
    icon: FaLinkedin,
    color: "#0A66C2",
  },

  reddit: {
    icon: SiReddit,
    color: "#FF4500",
  },

  pinterest: {
    icon: SiPinterest,
    color: "#BD081C",
  },

  snapchat: {
    icon: SiSnapchat,
    color: "#FFFC00",
  },


  // ==========================================================
  // GAMING
  // ==========================================================

  steam: {
    icon: SiSteam,
    color: "#FFFFFF",
  },

  playstation: {
    icon: SiPlaystation,
    color: "#003791",
  },

  xbox: {
    icon: SiBox,
    color: "#107C10",
  },

  nintendo: {
    icon: TbDeviceNintendo,
    color: "#E60012",
  },

  epicgames: {
    icon: SiEpicgames,
    color: "#FFFFFF",
  },

  ubisoft: {
    icon: SiUbisoft,
    color: "#FFFFFF",
  },

  ea: {
    icon: SiEa,
    color: "#FFFFFF",
  },

  roblox: {
    icon: SiRoblox,
    color: "#FFFFFF",
  },

  riotgames: {
    icon: SiRiotgames,
    color: "#D32936",
  },

  battlenet: {
    icon: SiBattledotnet,
    color: "#148EFF",
  },


  // ==========================================================
  // FINANCE / PAYMENTS
  // ==========================================================

  paypal: {
    icon: SiPaypal,
    color: "#003087",
  },

  paytm: {
    icon: SiPaytm,
    color: "#00BAF2",
  },

  phonepe: {
    icon: SiPhonepe,
    color: "#5F259F",
  },

  razorpay: {
    icon: SiRazorpay,
    color: "#3395FF",
  },

  stripe: {
    icon: SiStripe,
    color: "#635BFF",
  },

  wise: {
    icon: SiWise,
    color: "#9FE870",
  },

  revolut: {
    icon: SiRevolut,
    color: "#FFFFFF",
  },

  venmo: {
    icon: SiVenmo,
    color: "#3D95CE",
  },

  cashapp: {
    icon: SiCashapp,
    color: "#00D632",
  },


  // ==========================================================
  // SHOPPING
  // ==========================================================

  amazon: {
    icon: AiOutlineAmazon,
    color: "#FF9900",
  },

  apple: {
    icon: SiApple,
    color: "#FFFFFF",
  },

  appstore: {
    icon: SiAppstore,
    color: "#0D96F6",
  },

  googleplay: {
    icon: SiGoogleplay,
    color: "#414141",
  },

  ebay: {
    icon: SiEbay,
    color: "#E53238",
  },

  etsy: {
    icon: SiEtsy,
    color: "#F16521",
  },

  walmart: {
    icon: TbBrandWalmart,
    color: "#0071CE",
  },



  // ==========================================================
  // NEWS / CONTENT
  // ==========================================================

  medium: {
    icon: SiMedium,
    color: "#FFFFFF",
  },

  substack: {
    icon: SiSubstack,
    color: "#FF6719",
  },

  patreon: {
    icon: SiPatreon,
    color: "#FF424D",
  },

  nytimes: {
    icon: SiNewyorktimes,
    color: "#FFFFFF",
  },

  forbes: {
    icon: SiFresh,
    color: "#FFFFFF",
  },

  kindle: {
    icon: SiAudible,
    color: "#FFFFFF",
  },


  // ==========================================================
  // FITNESS
  // ==========================================================

  strava: {
    icon: SiStrava,
    color: "#FC4C02",
  },

  fitbit: {
    icon: SiFitbit,
    color: "#00B0B9",
  },

  nike: {
    icon: SiNike,
    color: "#FFFFFF",
  },

  adidas: {
    icon: SiAdidas,
    color: "#FFFFFF",
  },


  // ==========================================================
  // MICROSOFT / GENERAL
  // ==========================================================

  microsoft: {
    icon: FaMicrosoft,
    color: "#737373",
  },
} as const;


// ============================================================
// TYPES
// ============================================================

export type ServiceIconName = keyof typeof SERVICES;


// ============================================================
// GET SERVICE ICON NAME
// ============================================================

export function getServiceIconName(
  name: string
): ServiceIconName | null {
  const normalized = name.toLowerCase().trim();

  if (normalized in SERVICES) {
    return normalized as ServiceIconName;
  }

  return null;
}


// ============================================================
// GET SERVICE
// ============================================================

export function getServiceIcon(name: string) {
  const iconName = getServiceIconName(name);

  if (!iconName) {
    return null;
  }

  return SERVICES[iconName];
}