![enjoyart-banner](/public/static/images/twitter-card.png)

# EnjoyArt

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/enjoy-art/enjoyart.org)

This website is based on [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/) and [Tailwind Next.js Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog). It is based on Next App directory with [React Server Component](https://nextjs.org/docs/getting-started/react-essentials#server-components) and uses [Contentlayer](https://www.contentlayer.dev/) to manage markdown content.

## Features

- Next.js with Typescript
- [Contentlayer](https://www.contentlayer.dev/) to manage content logic
- Easy styling customization with [Tailwind 3.0](https://tailwindcss.com/blog/tailwindcss-v3) and primary color attribute
- [MDX - write JSX in markdown documents!](https://mdxjs.com/)
- Near perfect lighthouse score - [Lighthouse report](https://www.webpagetest.org/result/230805_BiDcBQ_4H7)
- Lightweight, 85kB first load JS
- Mobile-friendly view
- Light and dark theme
- Font optimization with [next/font](https://nextjs.org/docs/app/api-reference/components/font)
- Integration with [pliny](https://github.com/timlrx/pliny) that provides:
  - Multiple analytics options including [Umami](https://umami.is/), [Plausible](https://plausible.io/), [Simple Analytics](https://simpleanalytics.com/), Posthog and Google Analytics
  - Comments via [Giscus](https://github.com/laymonage/giscus), [Utterances](https://github.com/utterance/utterances) or Disqus
  - Newsletter API and component with support for Mailchimp, Buttondown, Convertkit, Klaviyo, Revue, and Emailoctopus
  - Command palette search with [Kbar](https://github.com/timc1/kbar) or Algolia
- Automatic image optimization via [next/image](https://nextjs.org/docs/basic-features/image-optimization)
- Support for tags - each unique tag will be its own page
- Support for multiple authors
- 3 different blog layouts
- 2 different blog listing layouts
- Support for nested routing of blog posts
- Projects page
- Preconfigured security headers
- SEO friendly with RSS feed, sitemaps and more!

## Sample posts

- [A markdown guide](https://tailwind-nextjs-starter-blog.vercel.app/blog/github-markdown-guide)
- [Learn more about images in Next.js](https://tailwind-nextjs-starter-blog.vercel.app/blog/guide-to-using-images-in-nextjs)
- [Simple MDX image grid](https://tailwind-nextjs-starter-blog.vercel.app/blog/pictures-of-canada)
- [Example of long prose](https://tailwind-nextjs-starter-blog.vercel.app/blog/the-time-machine)
- [Example of Nested Route Post](https://tailwind-nextjs-starter-blog.vercel.app/blog/nested-route/introducing-multi-part-posts-with-nested-routing)


## Post

Content is modelled using [Contentlayer](https://www.contentlayer.dev/), which allows you to define your own content schema and use it to generate typed content objects. See [Contentlayer documentation](https://www.contentlayer.dev/docs/getting-started) for more information.

### Frontmatter

Frontmatter follows [Hugo's standards](https://gohugo.io/content-management/front-matter/).

Please refer to `contentlayer.config.ts` for an up to date list of supported fields. The following fields are supported:

```
title (required)
date (required)
tags (optional)
lastmod (optional)
draft (optional)
summary (optional)
images (optional)
authors (optional list which should correspond to the file names in `data/authors`. Uses `default` if none is specified)
layout (optional list which should correspond to the file names in `data/layouts`)
canonicalUrl (optional, canonical url for the post for SEO)
```

Here's an example of a post's frontmatter:

```
---
title: 'Introducing Tailwind Nexjs Starter Blog'
date: '2021-01-12'
lastmod: '2021-01-18'
tags: ['next-js', 'tailwind', 'guide']
draft: false
summary: 'Looking for a performant, out of the box template, with all the best in web technology to support your blogging needs? Checkout the Tailwind Nextjs Starter Blog template.'
images: ['/static/images/canada/mountains.jpg', '/static/images/canada/toronto.jpg']
authors: ['default', 'sparrowhawk']
layout: PostLayout
canonicalUrl: https://tailwind-nextjs-starter-blog.vercel.app/blog/introducing-tailwind-nextjs-starter-blog
---
```

## Deploy

**Vercel**  
The easiest way to deploy the template is to deploy on [Vercel](https://vercel.com). Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

**Netlify**
[Netlify](https://www.netlify.com/)’s Next.js runtime configures enables key Next.js functionality on your website without the need for additional configurations. Netlify generates serverless functions that will handle Next.js functionalities such as server-side rendered (SSR) pages, incremental static regeneration (ISR), `next/images`, etc.

See [Next.js on Netlify](https://docs.netlify.com/integrations/frameworks/next-js/overview/#next-js-runtime) for suggested configuration values and more details.

**Static hosting services / GitHub Pages / S3 / Firebase etc.**

1. Add `output: 'export'` in `next.config.js`. See [static exports documentation](https://nextjs.org/docs/app/building-your-application/deploying/static-exports#configuration) for more information.
2. Comment out `headers()` from `next.config.js`.
3. Add `unoptimized: true` to the `images` key in `next.config.js`:

   Alternatively, to continue using `next/image`, you can use an alternative image optimization provider such as Imgix, Cloudinary or Akamai. See [image optimization documentation](https://nextjs.org/docs/app/building-your-application/deploying/static-exports#image-optimization) for more details.

4. Remove `api` folder and components which call the server-side function such as the Newsletter component. Not technically required and the site will build successfully, but the APIs cannot be used as they are server-side functions.
5. Run `yarn build`. The generated static content is in the `out` folder.
6. Deploy the `out` folder to your hosting service of choice or run `npx serve out` to view the website locally.

**Note**: Deploying on Github pages require addition modifications to the base path. Please refer to the FAQ for more information.

## Frequently Asked Questions

- [How can I add a custom MDX component?](/faq/custom-mdx-component.md)
- [How can I customize the `kbar` search?](/faq/customize-kbar-search.md)
- [How do I deploy on Github pages?](/faq/github-pages-deployment.md)

