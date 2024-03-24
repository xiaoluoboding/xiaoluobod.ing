"use client"

import { HoverEffect } from "@/components/ui/CardHoverEffect"
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
} from "@/components/icons"
import Vite from "@/components/icons/Vite"

const stackList = {
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

export default function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-16">
      {Object.keys(stackList).map((key) => {
        return (
          <>
            <fieldset className="p-0 m-0">
              <figcaption className="p-0 m-0 text-lg font-semibold">
                {key}
              </figcaption>
              <figure className="p-0 m-0">
                <HoverEffect
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-4"
                  items={stackList[key as keyof typeof stackList]}
                />
              </figure>
            </fieldset>
          </>
        )
      })}
    </div>
  )
}
