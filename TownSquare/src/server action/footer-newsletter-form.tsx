//need the server up and running and on this branch to complete the routing of the submitted email into the db.

//"use server"
//
//export async function subscribedToNewsletter(prevState, formData) {
//    const email = formData.get('email');
//
//    //Validation. Checking, in a very basic manner for now, that it is an email.
//    if (!email || !email.includes('@')) {
//        return {
//            error: 'Come on now, thats not a real email address',
//            success: false
//        };
//    }
//
//    //add proper-try catch block here later.
//    try {
//        await new Promise(resolve => setTimeout(resolve, 1000));
//
//        return {
//            success: true,
//            message: `The newsletter will now be sending to ${email}`,
//            error: null
//        };
//    } catch (error) {
//        return {
//            error: error.message,
//            success: false
//        };
//    }
//}