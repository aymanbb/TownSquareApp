// Function component for the application's global footer.

//import { subscribedToNewsletter } from '@/server action/footer-newsletter-form'
import { useState, type SubmitEvent, type ChangeEvent, ReactNode } from "react";
import { NewsletterForm } from "./NewsLetterForm";
import { Fragment } from "react/jsx-runtime";
//import { useActionState } from "react";
//import { useFormStatus } from "react-dom";
//useState for the temp solution

type FooterProps = {
  children?: ReactNode;
};

//consts for the Social Links in the footer:
const socialLinks = [
  { id: 1, name: "Discord", href: "https://discord.com" },
  { id: 2, name: "Instagram", href: "https://www.instagram.com" },
  { id: 3, name: "Pinterest", href: "https://pinterest.com" },
  { id: 4, name: "Facebook", href: "https://www.facebook.com" },
];
const quickLinks = [
  { id: 1, name: "About Page", href: "/about" },
  { id: 2, name: "Support Page", href: "/support" },
];

export function Footer({ children }: FooterProps) {
  //consts for the Quick Links in the footer:

  return (
    //React-Fragment (must be moved above the first child) used so parent can have multiple children without giving up sematic tags.
    <footer>
      <section>
        <img src="/assets/icons/svg/logo.svg" alt="Application's Logo" />
      </section>

      <section>
        <h3>Quick Links</h3>
        {
          // Listing all quicklinks
        }
        <ul>
          {quickLinks.map((quickLink) => (
            <li key={quickLink.id}>
              <a href={quickLink.href}>
                <b>{quickLink.name}</b>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Socials</h3>
        <ul>
          {socialLinks.map((socialLink) => (
            <li key={socialLink.id}>
              <a href={socialLink.href}>
                <b>{socialLink.name}</b>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </footer>
  );
}
