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

export const friendLinks: FriendLink[] = [
  {
    title: "圈友们",
    items: [
      {
        name: "Kroxitine-克罗西丁",
        link: "https://kroxitine.com/",
        description: "如果让我多睡一会儿，我什么都愿意做的（辣鸡小伊）",
        avatar: "http://q1.qlogo.cn/g?b=qq&nk=2657124519&s=640",
      },
      {
        name: "炎忍",
        link: "https://imyan.ren/",
        description: "热爱创造有趣的项目。",
        avatar: "http://q1.qlogo.cn/g?b=qq&nk=2323355219&s=640",
      },
      {
        name: "扶摇 Skyrocketing",
        link: "https://fuyaoskyrocket.ing/",
        description: "凡事豫则立，不豫则废",
        avatar: "	https://github.com/skyrocketingHong.png",
      },
      {
        name: "Ctone",
        link: "https://onect.one/",
        description: "普普通通，勉勉强强算一名大学生（",
        avatar:
          "https://c.disquscdn.com/uploads/users/40625/5129/avatar92.jpg?1714050307",
      },
      {
        name: "Meiage-米来吉",
        link: "https://miraged.fun/",
        description: "",
        avatar: "http://q1.qlogo.cn/g?b=qq&nk=669205145&s=640",
      },
    ],
  },
  {
    title: "失联人士",
    items: [
      {
        name: "Pi(品品)",
        link: "https://b.dopi.cc/",
        description: "这个人非常的懒，非常非常的懒",
        avatar: "http://q1.qlogo.cn/g?b=qq&nk=910083634&s=640",
        disable: true,
      },
      {
        name: "Wainbaro(肖究佟)",
        link: "https://wainbaro.github.io/",
        description: "“画画使我快乐。”",
        avatar: "http://q1.qlogo.cn/g?b=qq&nk=1411878525&s=640",
        disable: true,
      },
      {
        name: "Gking(ZhanXiaoSong)",
        link: "https://www.gking.icu/",
        description: "自己来选择，不会后悔的道路",
        avatar: "https://www.gking.icu/img/avatar.png",
        disable: true,
      }
    ],
  },
];

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
  blogUrl: "https://www.wucheng.work", // External Blog Link
  avatar: "http://q1.qlogo.cn/g?b=qq&nk=3241748701&s=640", // User Avatar URL
};
