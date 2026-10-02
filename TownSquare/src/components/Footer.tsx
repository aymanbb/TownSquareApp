// Function component for the application's global footer.

//import "HomeIcon_#0001.svg" as Logo from "@/app/assets/icons/svg/HomeIcon_#0001.svg";

import { Fragment } from "react/jsx-runtime";

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

    return (
        
        /*<section>
            <img 
                src={Logo}
                alt="Application's Logo"
            />
        </section>*/

        //React-Fragment (must be moved above the first child) used so parent can have multiple children without giving up sematic tags.
        <>

        //Quick links. Uses the const "linksList" from above.
        
            <section>
                <h3>Quick Links:</h3>
                <ul>
                    {quickLinksList}
                </ul>
            </section>


        //Social Links. Uses the const socialLinks from above.

            <section>
                <h3>Socials:</h3>
                <ul>
                    {socialLinksList}
                </ul>
            </section>
        </>
    );
}
