import {
  RiAsterisk,
  RiBookmarkLine,
  RiCodeBoxLine,
  RiCodeSSlashLine,
  RiCodepenLine,
  RiGithubLine,
  RiGuideLine,
  RiHomeLine,
  RiMacLine,
  RiMacbookLine,
  RiProductHuntLine,
  RiQuillPenLine,
  RiTestTubeLine,
  RiTwitterXLine,
} from "@remixicon/react"

import {
  GitHub,
  CSS,
  Html,
  JavaScript,
  Nuxt,
  React,
  TailwindCSS,
  TypeScript,
  Vercel,
  Vue,
  Netlify,
  Railway,
  Pnpm,
  Next,
  Figma,
  Render,
  UnoCSS,
  Pinia,
  Supabase,
  VueUse,
  VSCode,
  Git,
  Paw,
  Zustand,
  FramerMotion,
  GreenSock,
  Vite,
  Windsurf,
} from "@/components/icons"
import {
  FramerLogoIcon,
  NotionLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons"

export const stackList = {
  Language: [
    {
      title: "HTML",
      description: "",
      icon: <Html className="w-12 h-12" />,
      link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    },
    {
      title: "CSS",
      description: "",
      icon: <CSS className="w-12 h-12" />,
      link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    },
    {
      title: "JavaScript",
      description: "",
      icon: <JavaScript className="w-12 h-12" />,
      link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },

    {
      title: "TypeScript",
      description: "",
      icon: <TypeScript className="w-12 h-12" />,
      link: "https://www.typescriptlang.org/",
    },
    {
      title: "TailwindCSS",
      description: "",
      icon: <TailwindCSS className="w-12 h-12" />,
      link: "https://tailwindcss.com/",
    },
    {
      title: "UnoCSS",
      description: "",
      icon: <UnoCSS className="w-12 h-12" />,
      link: "https://unocss.dev/",
    },
  ],
  Vue: [
    {
      title: "Vue",
      description: "",
      icon: <Vue className="w-12 h-12" />,
      link: "https://vuejs.org/",
    },
    {
      title: "Pinia",
      description: "",
      icon: <Pinia className="w-12 h-12" />,
      link: "https://pinia.vuejs.org/",
    },
    {
      title: "VueUse",
      description: "",
      icon: <VueUse className="w-12 h-12" />,
      link: "https://vueuse.org",
    },
    {
      title: "Nuxt",
      description: "",
      icon: <Nuxt className="w-12 h-12" />,
      link: "https://nuxt.com",
    },
  ],
  React: [
    {
      title: "React",
      description: "",
      icon: <React className="w-12 h-12" />,
      link: "https://react.com",
    },
    {
      title: "Zustand",
      description: "",
      icon: <Zustand className="w-12 h-12" />,
      link: "https://zustand-demo.pmnd.rs/",
    },
    {
      title: "Framer Motion",
      description: "",
      icon: <FramerMotion className="w-12 h-12" />,
      link: "https://www.framer.com/motion/",
    },
    {
      title: "Next",
      description: "",
      icon: <Next className="w-12 h-12" />,
      link: "https://nextjs.org/",
    },
  ],
  Deploy: [
    {
      title: "Vercel",
      description: "",
      icon: <Vercel className="w-12 h-12" />,
      link: "https://vercel.com",
    },
    {
      title: "Netlify",
      description: "",
      icon: <Netlify className="w-12 h-12" />,
      link: "https://netlify.com",
    },
    {
      title: "Render",
      description: "",
      icon: <Render className="w-12 h-12" />,
      link: "https://render.com",
    },
    {
      title: "Railway",
      description: "",
      icon: <Railway className="w-12 h-12" />,
      link: "https://railway.app",
    },
  ],
  "Dev Tools": [
    {
      title: "VSCode",
      description: "",
      icon: <VSCode className="w-12 h-12" />,
      link: "https://code.visualstudio.com/",
    },
    {
      title: "Git",
      description: "",
      icon: <Git className="w-12 h-12" />,
      link: "https://git-scm.com/",
    },
    {
      title: "GitHub",
      description: "",
      icon: <GitHub className="w-12 h-12" />,
      link: "https://github.com",
    },
    {
      title: "Pnpm",
      description: "",
      icon: <Pnpm className="w-12 h-12" />,
      link: "https://pnpm.io",
    },
    {
      title: "Vite",
      description: "",
      icon: <Vite className="w-12 h-12" />,
      link: "https://vitejs.dev/",
    },
    {
      title: "Paw",
      description: "",
      icon: <Paw className="w-12 h-12" />,
      link: "https://paw.cloud",
    },
    {
      title: "GreenSock",
      description: "",
      icon: <GreenSock className="w-12 h-12" />,
      link: "https://gsap.com/",
    },
    {
      title: "Supabase",
      description: "",
      icon: <Supabase className="w-12 h-12" />,
      link: "https://supabase.com",
    },
  ],
  Design: [
    {
      title: "Figma",
      description: "",
      icon: <Figma className="w-12 h-12" />,
      link: "https://figma.com",
    },
  ],
}

export const allLogbook = [
  {
    year: 2025,
    logs: [
      {
        title: "Indie hacking",
        description: "As a solopreneur, I am working in the field of AI/AIGC.",
      },
      {
        title: "OSS works",
        description: `Never stop building, 
          [stunningui.design](https://github.com/xiaoluoboding/stunning-ui) /
          [bookmark.style](https://github.com/xiaoluoboding/bookmark.style) /
          [techstack.tools](https://github.com/xiaoluoboding/techstack.tools) / 
          [ultrashot.pics](https://github.com/xiaoluoboding/ultrashot)`,
      },
      {
        title: "Become a dad",
        description: "I became a dad, having a baby girl on 2025-01-17.",
      },
    ],
  },
  {
    year: 2024,
    logs: [
      {
        title: "AI Startup",
        description:
          "I joined another AI startup company dedicated to AI Writng tools, like cursor for writing.",
      },
      {
        title: "OSS works",
        description: `In recent years, I have contributed to several popular Vue.js projects in the open-source community, which has led to me being sponsored on GitHub.
           [vue-sonner](https://github.com/xiaoluoboding/vue-sonner)
          / [vue-command-palette](https://github.com/xiaoluoboding/vue-command-palette)
          / [@supa-kit/auth-ui-vue](https://github.com/supa-kit/auth-ui-vue)
          / [vue-color-wheel](https://github.com/xiaoluoboding/vue-color-wheel)`,
      },
      {
        title: "Migrate blog to Next",
        description: "Rewrite blog using `Next`, and deployed it on `Vercel`.",
      },
    ],
  },
  {
    year: 2023,
    logs: [
      {
        title: "AI Startup",
        description:
          "I joined an AI startup company dedicated to revolutionizing the e-commerce landscape through the power of Generative AI as the lead developer.",
      },
      {
        title: "Indie Hacker",
        description:
          "As an indie hacker, I manage multiple small products with an Annual Recurring Revenue (ARR) exceeding $10. Moving forward, I aim to continue pushing for further growth.",
      },
    ],
  },
  {
    year: 2022,
    logs: [
      {
        title: "Married",
        description:
          "I have started a new life and got married. I have settled down in Dali, China.",
      },
    ],
  },
  {
    year: 2021,
    logs: [
      {
        title: "Join Bytebase",
        description:
          "I left JD.com and joined Bytebase. I started working remotely.",
      },
    ],
  },
  {
    year: 2020,
    logs: [
      {
        title: "Migrate blog to Nuxt",
        description: "Rewrite blog using `Nuxt`, and deployed it on `Netlify`.",
      },
    ],
  },
  {
    year: 2018,
    logs: [
      {
        title: "Beyond works",
        description: `At JD.com, I have focused on data visualization platforms and
          at the same time I contribute to some open-source vue component library like:
           [ve-charts](https://github.com/vueblocks/ve-charts)
          / [vue-smart-widget](https://github.com/xiaoluoboding/vue-smart-widget)
          / [vuex-stateshot](https://github.com/xiaoluoboding/vuex-stateshot)
          / [@vueblock/vue-use-vuex](https://www.npmjs.com/package/@vueblocks/vue-use-vuex)
        `,
      },
    ],
  },
  {
    year: 2017,
    logs: [
      {
        title: "Join JD.com",
        description:
          "I self-taught front-end dev and found my first job in the field, marking the beginning of my career in web dev.",
      },
    ],
  },
  {
    year: 2016,
    logs: [
      {
        title: "Learn React.js",
        description:
          "Due to work requirements, I started learning React.js from scratch. Eventually, I successfully completed the project delivery.",
      },
      {
        title: "Migrate blog to Ghost",
        description:
          "Migrated my `WordPress` blog to `Ghost` and created my own theme for the Ghost blog: [Kaldorei](https://github.com/xiaoluoboding/ghost-theme-kaldorei).",
      },
    ],
  },
  {
    year: 2015,
    logs: [
      {
        title: "Learn Vue.js",
        description: "I self-taught front-end tech stack, including `Vue.js`.",
      },
    ],
  },
  {
    year: 2013,
    logs: [
      {
        title: "First Blog",
        description:
          "I create my first blog using `WordPress` and deploy it on `Linode`.",
      },
    ],
  },
  {
    year: 2011,
    logs: [
      {
        title: "Got First Backend Job",
        description:
          "I studied software engineering at university and now work as a backend development engineer, primarily using `C` language and `SQL`.",
      },
    ],
  },
  {
    year: 1988,
    logs: [
      {
        title: "Born",
        description: "I was born in 1988. I was 36 years old.",
      },
    ],
  },
]

export const PROFILES = {
  twitter: {
    title: "X (Twitter)",
    username: "robert_shaw_x",
    url: "https://twitter.com/intent/user?screen_name=robert_shaw_x",
    icon: <RiTwitterXLine size={16} />,
  },
  github: {
    title: "GitHub",
    url: "https://github.com/xiaoluoboding",
    icon: <RiGithubLine size={16} />,
  },
  codepen: {
    title: "CodePen",
    url: "https://codepen.io/xiaoluoboding",
    icon: <RiCodepenLine size={16} />,
  },
  producthunt: {
    title: "ProductHunt",
    url: "https://www.producthunt.com/@xiaoluoboding",
    icon: <RiProductHuntLine size={16} />,
  },
  indiehackers: {
    title: "IndieHackers",
    url: "https://www.indiehackers.com/xiaoluoboding",
    icon: <RiCodeBoxLine size={16} />,
  },
}

export const LINKS = [
  {
    href: "/",
    label: "Home",
    icon: <RiHomeLine size={16} />,
  },
  {
    href: "/writing",
    label: "Writing",
    icon: <RiQuillPenLine size={16} />,
  },
  {
    href: "/journey",
    label: "Journey",
    icon: <RiGuideLine size={16} />,
  },
  {
    href: "/techstack",
    label: "Tech Stack",
    icon: <RiCodeSSlashLine size={16} />,
  },
  {
    href: "/dock",
    label: "Dock",
    icon: <RiMacbookLine size={16} />,
  },
  {
    href: "/things",
    label: "Things",
    icon: <RiAsterisk size={16} />,
  },
  {
    href: "/playground",
    label: "Playground",
    icon: <RiTestTubeLine size={16} />,
  },
  {
    href: "/bookmarks",
    label: "Bookmarks",
    icon: <RiBookmarkLine size={16} />,
  },
]

export const toolList = {
  Productivity: [
    {
      title: "Notion",
      icon: <NotionLogoIcon className="w-5 h-5" />,
      link: "https://www.notion.so/",
      price: 10,
      priceType: "Subscription",
    },
    {
      title: "Linear",
      icon: <Figma className="w-5 h-5" />,
      link: "https://linear.app/",
      price: "Free",
      priceType: null,
    },
    {
      title: "Raycast",
      icon: <Figma className="w-5 h-5" />,
      link: "https://www.raycast.com/",
      price: 8,
      priceType: "Subscription",
    },
    {
      title: "Readwise",
      icon: <Figma className="w-5 h-5" />,
      link: "https://readwise.io/",
      price: 8,
      priceType: "Subscription",
    },
    {
      title: "SetApp",
      icon: <Figma className="w-5 h-5" />,
      link: "https://setapp.com",
      price: 12,
      priceType: "Subscription",
    },
    {
      title: "Popclip",
      icon: <Figma className="w-5 h-5" />,
      link: "https://www.popclip.app/",
      price: "SetApp",
      priceType: null,
    },
    {
      title: "CleanShot X",
      icon: <Figma className="w-5 h-5" />,
      link: "https://cleanshot.com/",
      price: "SetApp",
      priceType: null,
    },
    {
      title: "Notchnook",
      icon: <Figma className="w-5 h-5" />,
      link: "https://lo.cafe/notchnook",
      price: "SetApp",
      priceType: null,
    },
    {
      title: "MindNode",
      icon: <Figma className="w-5 h-5" />,
      link: "https://mindnode.com/",
      price: "SetApp",
      priceType: null,
    },
    {
      title: "TabTab",
      icon: <Figma className="w-5 h-5" />,
      link: "https://www.producthunt.com/products/tabtab-2",
      price: 24,
      priceType: "LTD",
    },
  ],
  Development: [
    {
      title: "GitHub",
      icon: <GitHub className="w-5 h-5" />,
      link: "https://github.com",
      price: "Free",
    },
    {
      title: "Vercel",
      icon: <Vercel className="w-5 h-5" />,
      link: "https://vercel.com",
      price: 20,
      priceType: "Subscription",
    },
    {
      title: "Windsurf",
      icon: <Windsurf className="w-5 h-5" />,
      link: "https://windsurf.com/",
      price: 10,
      priceType: "Subscription",
    },
    {
      title: "Cursor",
      icon: <VSCode className="w-5 h-5" />,
      link: "https://www.cursor.com/",
      price: 20,
      priceType: "Subscription",
    },
    {
      title: "Warp",
      icon: <VSCode className="w-5 h-5" />,
      link: "https://www.warp.dev/",
      price: "Free",
      priceType: null,
    },
    {
      title: "Supabase",
      icon: <Supabase className="w-5 h-5" />,
      link: "https://supabase.com/",
      price: 45,
      priceType: "Subscription",
    },
    {
      title: "Rapid API",
      icon: <Supabase className="w-5 h-5" />,
      link: "https://rapidapi.com/",
      price: "Free",
      priceType: null,
    },
    {
      title: "TablePlus",
      icon: <Figma className="w-5 h-5" />,
      link: "https://tableplus.com/",
      price: "SetApp",
      priceType: null,
    },
  ],
  Design: [
    {
      title: "Figma",
      icon: <Figma className="w-5 h-5" />,
      link: "https://www.figma.com",
      price: "Free",
      priceType: null,
    },
    {
      title: "Framer",
      icon: <FramerLogoIcon className="w-5 h5" />,
      link: "https://www.framer.com/",
      price: "Free",
      priceType: null,
    },
  ],
  Marketing: [
    {
      title: "Ahrefs",
      icon: <Figma className="w-5 h-5" />,
      link: "https://ahrefs.com/",
      price: 29,
      priceType: "Subscription",
    },
    {
      title: "Typefully",
      icon: <Figma className="w-5 h-5" />,
      link: "https://typefully.com/",
      price: 10,
      priceType: "Subscription",
    },
    {
      title: "Twitter Blue",
      icon: <TwitterLogoIcon className="w-5 h-5" />,
      link: "https://x.com",
      price: 14,
      priceType: "Subscription",
    },
    {
      title: "Domain Service",
      icon: <TwitterLogoIcon className="w-5 h-5" />,
      link: "https://www.namecheap.com/",
      price: 156,
      priceType: "Subscription",
    },
  ],
  AI: [
    {
      title: "OpenAI",
      icon: <Figma className="w-5 h-5" />,
      link: "https://www.openai.com/",
      price: 20,
      priceType: "Subscription",
    },
    {
      title: "Perplexity",
      icon: <Figma className="w-5 h-5" />,
      link: "https://www.perplexity.ai/",
      price: "Free",
      priceType: null,
    },
    {
      title: "Claude",
      icon: <Figma className="w-5 h-5" />,
      link: "https://www.anthropic.com/",
      price: 20,
      priceType: "Subscription",
    },
    {
      title: "Groq",
      icon: <Figma className="w-5 h-5" />,
      link: "https://groq.com/",
      price: "Free",
      priceType: null,
    },
    {
      title: "Midjourney",
      icon: <Figma className="w-5 h-5" />,
      link: "https://www.midjourney.com/",
      price: 8,
      priceType: "Subscription",
    },
    {
      title: "Replicate",
      icon: <Figma className="w-5 h-5" />,
      link: "https://replicate.com/",
      price: 20,
      priceType: "Subscription",
    },
    {
      title: "Ollama",
      icon: <Figma className="w-5 h-5" />,
      link: "https://ollama.com/",
      price: "Free",
      priceType: null,
    },
    {
      title: "ChatWise",
      icon: <Figma className="w-5 h-5" />,
      link: "https://chatwise.app/",
      price: 29,
      priceType: "LTD",
    },
  ],
  UI: [
    {
      title: "MakerKit",
      icon: <Figma className="w-5 h-5" />,
      link: "https://makerkit.dev/",
      price: 249,
      priceType: "LTD",
    },
    {
      title: "SuperSaaS",
      icon: <Figma className="w-5 h-5" />,
      link: "https://supersaas.dev/",
      price: 149,
      priceType: "LTD",
    },
    {
      title: "Align UI",
      icon: <Figma className="w-5 h-5" />,
      link: "https://www.alignui.com/",
      price: 149,
      priceType: "LTD",
    },
    {
      title: "Shadcn UI",
      icon: <Figma className="w-5 h-5" />,
      link: "https://ui.shadcn.com/",
      price: "Free",
      priceType: null,
    },
    {
      title: "Tailwind CSS",
      icon: <Figma className="w-5 h-5" />,
      link: "https://tailwindcss.com/",
      price: "Free",
      priceType: null,
    },
  ],
}

export const useConstants = () => {
  return {
    stackList,
    allLogbook,
    PROFILES,
    LINKS,
  }
}
