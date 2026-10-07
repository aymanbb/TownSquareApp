//temporary form and submit for the newsletter.
import { useState, type SubmitEvent, type ChangeEvent, ReactNode } from "react";
export function NewsletterForm() {
  const [email, setEmail] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    //setEmail(event.target.value);
    console.log(event.target.value);
  }

  function handleSubscribing(event: SubmitEvent) {
    event.preventDefault();
    alert(email);
  }

  return (
    <section>
      <h3>Newsletter</h3>
      <form onSubmit={handleSubscribing}>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(event) => handleChange}
          required
          placeholder="Enter your email address and subscribe!"
        />
        <button type="submit">Subscribe</button>
      </form>
    </section>
  );
}
