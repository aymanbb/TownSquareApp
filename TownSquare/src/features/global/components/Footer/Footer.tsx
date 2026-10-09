// Function component for the application's global footer.

//import { subscribedToNewsletter } from '@/server action/footer-newsletter-form'
import { useState, type SubmitEvent, type ChangeEvent, ReactNode } from "react";
import { NewsletterForm } from "./NewsLetterForm";
import { Fragment } from "react/jsx-runtime";

//import { useActionState } from "react";
//import { useFormStatus } from "react-dom";
//useState for the temp solution

const textfont =
  "font-['Cinzel_Decorative']text-3xl sm:text-4xlfont-black text-amber-400[-webkit-text-stroke:0.5px_#6B3B0C] [text-shadow:2px_2px_0_#6B3B0C,3px_4px_2px_#000]";

type FooterProps = {
  children?: ReactNode;
};

//consts for the Social Links in the footer:

const pixelSizeIcon = 20;
const yPosition = 10;
const socialLinks = [
  {
    id: 1,
    name: "Discord",
    href: "https://discord.com",
    icon: "/assets/icons/svg/DiscordIcon.svg",
  },
  {
    id: 2,
    name: "Instagram",
    href: "https://www.instagram.com",
    icon: "/assets/icons/svg/InstagramLogo.svg",
  },
  {
    id: 3,
    name: "Pinterest",
    href: "https://pinterest.com",
    icon: "/assets/icons/svg/PinterestIcon.svg",
  },
  {
    id: 4,
    name: "Facebook",
    href: "https://www.facebook.com",
    icon: "/assets/icons/svg/FaceBookicon.svg",
  },
];
const quickLinks = [
  { id: 1, name: "About Page", href: "/about" },
  { id: 2, name: "Support Page", href: "/support" },
];

export function Footer({ children }: FooterProps) {
  //consts for the Quick Links in the footer:

  return (
    //React-Fragment (must be moved above the first child) used so parent can have multiple children without giving up sematic tags.
    <div
      className="
    relative w-full
    bg-[url('/assets/textures/png/brick-texture.png')]
    bg-repeat bg-[length:128px_128px]
    p-3
     shadow-[0_0_15px_4px_rgba(0,0,0,0.8)]
  "
    >
      <footer
        className="
         shadow-[inset_0_0_12px_4px_rgba(0,0,0,0.85)]
    relative w-full overflow-hidden
    bg-[url('/assets/textures/png/footer-stone.png')]
    bg-repeat bg-[length:150px_150px]
    px-5 py-8 text-white
    sm:px-8
  "
      >
        {/* Left torch */}
        <img
          src="/assets/icons/svg/TorchLeft.svg"
          alt=""
          aria-hidden="true"
          className="
          
      pointer-events-none absolute left-3 top-3
      hidden h-30 w-auto object-contain
      lg:block
    "
        />

        {/* Right torch */}
        <img
          src="/assets/icons/svg/TorchLeft.svg"
          alt=""
          aria-hidden="true"
          className="
      pointer-events-none absolute right-3 top-3
      hidden h-30 w-auto scale-x-[-1] object-contain
      lg:block
    "
        />

        <div
          className="
      relative mx-auto grid max-w-screen-2xl
      grid-cols-1 items-start gap-8
      sm:grid-cols-2
      lg:grid-cols-[1.2fr_1fr_1fr_1.5fr]
      lg:gap-6 lg:px-16 lg:py-6
      xl:gap-10 xl:px-20
    "
        >
          <section className="flex justify-center lg:justify-start">
            <img
              src="/assets/icons/svg/FooterLogo.svg"
              alt="TownSquare"
              className="
              h-auto w-52 sm:w-48 xl:w-60"
            />
          </section>

          <section className="text-center">
            <div
              className="
    relative flex items-center justify-center
    aspect-[2048/700] w-full
    bg-[url('/assets/icons/svg/StoneForm.svg')]
    bg-contain bg-no-repeat bg-center
    px-[10%] py-[8%]
  "
            >
              <h3 className="mb-3 font-['Cinzel_Decorative'] text-xl font-black text-amber-400 sm:text-2xl">
                Quick Links
              </h3>
            </div>

            <ul className="flex list-none flex-col items-center gap-2 p-0">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="font-['Almendra'] text-base text-yellow-400 hover:text-white"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="text-center">
            <div
              className="
    relative flex items-center justify-center
    aspect-[2048/700] w-full
    bg-[url('/assets/icons/svg/StoneForm.svg')]
    bg-contain bg-no-repeat bg-center
    px-[10%] py-[8%]
  "
            >
              {" "}
              <h3 className="mb-3 font-['Cinzel_Decorative'] text-xl font-black text-amber-400 sm:text-2xl">
                Follow Us
              </h3>
            </div>

            <ul className="flex list-none flex-wrap items-center justify-center gap-3 p-0">
              {socialLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.href} aria-label={link.name}>
                    <img
                      src={link.icon}
                      alt=""
                      className="h-12 w-12 object-contain"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="min-w-0">
            <div
              className="
    relative flex items-center justify-center
    aspect-[2048/700] w-full
    bg-[url('/assets/icons/svg/StoneForm.svg')]
    bg-contain bg-no-repeat bg-center
    px-[10%] py-[8%]
  "
            >
              <h3 className="mb-3 text-center font-['Cinzel_Decorative'] text-xl font-black text-amber-400 sm:text-2xl lg:text-left">
                Newsletter
              </h3>
            </div>

            <NewsletterForm />
          </section>
        </div>
      </footer>
    </div>
  );
}
