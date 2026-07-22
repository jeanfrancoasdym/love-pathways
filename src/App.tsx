/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import type { RouteRecord } from 'vite-react-ssg';
import i18n, { esI18n } from './i18n/config';
import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';
import OurTeam from './components/OurTeam';
import Impact from './components/Impact';
import Program from './components/Program';
import Events, { eventsLoader } from './components/Events';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Career from './components/Career';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import { BLOG_INDEX } from './data/blogIndex';
import Donate from './components/Donate';
import ResourceHub, { resourcesLoader } from './components/ResourceHub';
import PrivacyPolicy from './components/PrivacyPolicy';
import WebinarRegistration from './components/WebinarRegistration';
import WebinarRegistration2 from './components/WebinarRegistration2';
import WebinarRegistration3 from './components/WebinarRegistration3';
import ThankYou from './components/ThankYou';
import ThankYou2 from './components/ThankYou2';
import ThankYou3 from './components/ThankYou3';
import NotFound from './components/NotFound';

// Binds the correct fixed-language i18n instance for the active locale, so each
// page prerenders in its real language during SSG and switches on the client.
// (Deriving locale from the URL - root = EN, /es/* = ES.)
function RootProviders() {
  const { pathname } = useLocation();
  const isEs = pathname === '/es' || pathname.startsWith('/es/');
  useEffect(() => {
    if (typeof document !== 'undefined') document.documentElement.lang = isEs ? 'es' : 'en';
  }, [isEs]);
  return (
    <I18nextProvider i18n={isEs ? esI18n : i18n}>
      <Layout />
    </I18nextProvider>
  );
}

// Lazy per-article content modules (see src/data/blogTypes.ts for the split).
const postModules = import.meta.glob('./data/posts/*.ts');

// Every page, relative to the locale root. Built fresh per locale branch so the
// EN tree (root) and ES tree (/es) hold distinct route objects.
const buildPages = (): RouteRecord[] => [
  { index: true, element: <Home /> },
  { path: 'about-us', element: <About /> },
  { path: 'our-team', element: <OurTeam /> },
  { path: 'impact', element: <Impact /> },
  { path: 'our-program', element: <Program /> },
  { path: 'events', element: <Events />, loader: eventsLoader },
  { path: 'faq', element: <FAQ /> },
  { path: 'contact-us', element: <Contact /> },
  { path: 'career', element: <Career /> },
  { path: 'blog', element: <Blog /> },
  // One literal route per article (known, fixed set) so vite-react-ssg
  // prerenders real static HTML for each post. Content is code-split: each
  // route's loader pulls only its own article module, so the full EN+ES text
  // of every post never lands in the shared JS bundle.
  ...BLOG_INDEX.map((p) => ({
    path: `blog/${p.slug}`,
    element: <BlogPost slugProp={p.slug} />,
    loader: async () => {
      const mod = (await postModules[`./data/posts/${p.slug}.ts`]()) as { default: unknown };
      return mod.default;
    },
  })),
  { path: 'donate', element: <Donate /> },
  { path: 'resource-hub', element: <ResourceHub />, loader: resourcesLoader },
  { path: 'privacy-policy', element: <PrivacyPolicy /> },
  { path: 'webinar-event1', element: <WebinarRegistration /> },
  { path: 'webinar-event2', element: <WebinarRegistration2 /> },
  { path: 'webinar-event3', element: <WebinarRegistration3 /> },
  { path: 'thank-you1', element: <ThankYou /> },
  { path: 'thank-you2', element: <ThankYou2 /> },
  { path: 'thank-you3', element: <ThankYou3 /> },
  { path: '404', element: <NotFound /> },
  { path: '*', element: <NotFound /> },
];

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <RootProviders />,
    entry: 'src/components/Layout.tsx',
    children: [
      ...buildPages(),
      { path: 'es', children: buildPages() },
    ],
  },
];
