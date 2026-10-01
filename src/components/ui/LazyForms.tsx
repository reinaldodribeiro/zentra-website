"use client";

import { Deferred } from "./Deferred";

const loadContactForm = () => import("./ContactForm").then((module) => module.ContactForm);
const loadNewsletterForm = () => import("./NewsletterForm").then((module) => module.NewsletterForm);

export function LazyContactForm() {
  return <Deferred load={loadContactForm} props={{}} />;
}

export function LazyNewsletterForm() {
  return <Deferred load={loadNewsletterForm} props={{}} />;
}
