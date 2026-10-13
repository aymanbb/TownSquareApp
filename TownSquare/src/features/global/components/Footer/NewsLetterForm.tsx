//temporary form and submit for the newsletter.
import { useState, type SubmitEvent, type ChangeEvent, ReactNode } from "react";
export function NewsletterForm() {
  return (
    <form className="flex w-full flex-col gap-3 sm:flex-row sm:items-stretch">
      <input
        type="email"
        id="email"
        name="email"
        required
        placeholder="Enter your email address and subscribe!"
        className="
            min-w-0 flex-1
            rounded-lg border-4 border-[#9b7749]
            bg-[#dfbd87] px-4 py-3
            text-lg text-[#49301b]
            placeholder:text-[#725333]
            shadow-[inset_0_0_8px_#76502b]
            outline-none
            focus:border-[#e8b94f]
          "
      />
      <button
        className="
            shrink-0 rounded-lg border-4 border-[#b98228]
            bg-gradient-to-b from-[#754018] to-[#3b1c0c]
            px-6 py-3
            text-xl font-bold text-[#ffe18a]
            [text-shadow:1px_2px_2px_#000]
            shadow-[inset_0_0_0_2px_#291307,0_3px_4px_#0009]
            transition-colors
            hover:from-[#925323] hover:to-[#552710]
            active:translate-y-0.5
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-yellow-300
          "
        type="submit"
      >
        Subscribe
      </button>
    </form>
  );
}
