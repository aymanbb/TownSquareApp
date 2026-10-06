// Function component for the application's global footer.

//import { subscribedToNewsletter } from '@/server action/footer-newsletter-form'

import { Fragment } from "react/jsx-runtime";
//import { useActionState } from "react";
//import { useFormStatus } from "react-dom";
//useState for the temp solution
import { useState, type SubmitEvent, type ChangeEvent } from 'react';

export function Footer() {
    //consts for the Quick Links in the footer:
    const quickLinks = [
        {id: 1, name: "About Page", href: '/about'},
        {id: 2, name: "Support Page", href: '/support'}
    ]
    
    const quickLinksList = quickLinks.map(quickLink => 
        <Fragment key={quickLink.id}>
            <li>
                <a href={quickLink.href}><b>{quickLink.name}</b></a>
            </li>
        </Fragment>);

    //consts for the Social Links in the footer:
    const socialLinks = [
        {id: 1, name: "Discord", href: 'https://discord.com'},
        {id: 2, name: "Instagram", href: 'https://www.instagram.com'},
        {id: 3, name: "Pinterest", href: 'https://pinterest.com'},
        {id: 4, name: "Facebook", href: 'https://www.facebook.com'}
    ]

    const socialLinksList = socialLinks.map(socialLink => 
        <Fragment key={socialLink.id}>
            <li>
                <a href={socialLink.href}><b>{socialLink.name}</b></a>
            </li>
        </Fragment>);

    //functions for handling submissions of emails for the newsletter, button for submitting email and the form itself.
    //finish this when db is up and running and connected to this branch. Lesson 5 på fullstæck i "useFormStatus og useActionState - Form handling".
    //function SubmitButton() {
    //    const { pending } = useFormStatus();
//
    //    return (
    //        <button type="submit" disabled={pending}>
    //            {pending ? 'Subscribing...' : 'Subscribe'}
    //        </button>
    //    );
    //}
//
    //function NewsletterSubscriptionForm() {
    //    const [state, action, isPending] = useActionState(subscribedToNewsletter, {
    //        error: null,
    //        success: false,
    //        message: null
    //    });
//
    //    return (
    //        <section>
    //            <h3>Newsletter</h3>
//
    //            {state.error && (
    //                <div className='error-message'>
    //                    {state.error}
    //                </div>
    //            )}
//
    //            {state.success && (
    //                <div className='success-message'>
    //                    {state.message}
    //                </div>
    //            )}
//
    //            <form action={action}>
    //                <label htmlFor='email'>Email:</label>
    //                <input 
    //                    type="email"
    //                    id="email"
    //                    name='email'
    //                    required
    //                    placeholder="Enter your email address and subscribe!"
    //                    disabled={isPending}
    //                />
    //                
    //                <SubmitButton />
    //            </form>
    //        </section>
    //    );
    //}

    //temporary form and submit for the newsletter.
    function NewsletterForm() {
        const [email, setEmail] = useState("");

        function handleChange(event: ChangeEvent<HTMLInputElement>) {
            setEmail(event.target.value);
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
                        name='email'
                        value={email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email address and subscribe!"
                    />
                    <button type="submit">Subscribe</button>
                </form>
           </section>
        );
    }

    return (
        //React-Fragment (must be moved above the first child) used so parent can have multiple children without giving up sematic tags.
        <>
        
        <section>
            <img 
                src="/Dislike.svg"
                alt="Application's Logo"
            />
        </section>

            <section>
                <h3>Quick Links</h3>
                <ul>
                    {quickLinksList}
                </ul>
            </section>


            <section>
                <h3>Socials</h3>
                <ul>
                    {socialLinksList}
                </ul>
            </section>

        <NewsletterForm />
        </>
    );
}
