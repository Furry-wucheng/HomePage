import linksData from './config/links.yml';

export interface FriendLink {
  title: string;
  items: {
    name: string;
    link: string;
    description: string;
    avatar: string;
    disable?: boolean;
  }[];
}

export interface SocialLink {
  name: string;
  link: string;
  icon: string; // Iconify icon name or similar, or we can use an SVG component later
}

export const friendLinks: FriendLink[] = linksData;

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    link: "https://github.com/Furry-wucheng",
    icon: "simple-icons:github",
  },
  {
    name: "Twitter",
    link: "https://x.com/wu__cheng",
    icon: "simple-icons:twitter",
  },
  {
    name: "Telegram",
    link: "https://t.me/Furry_wucheng",
    icon: "mdi:telegram",
  },
];

export const siteConfig = {
  title: "戊成的主页", // Browser Tab Title
  siteTitle: "主页", // Navbar Logo Text
  subTitle: "你好，我是戊成", // Used as main heading
  slogan: [
    { text: "你好!\n", styled: false },
    { text: "我是", styled: false },
    { text: "戊成!", styled: false },
  ], // Typewriter slogan, styled text will be colored
  highlightText: "欢迎来到我的主页！", // Text to be highlighted/colored
  description: "我是一名后端开发者，会一点前端。想学习更多有趣的技术！", // Meta Description
  blogUrl: "https://blog.wucheng.work", // External Blog Link
  avatar: "https://q1.qlogo.cn/g?b=qq&nk=3241748701&s=640", // User Avatar URL
};
