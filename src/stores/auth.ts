import { supabase } from "@/services/supabase_client";
import { proxy } from "valtio";
import { number, z } from "zod";

type Credentials = {
    email: string,
    password: string
}

// Käytössä oleva tilanhallintakirjasto: https://valtio.dev/docs/api/basic/proxy
// Supabase auth reactin kanssa: https://supabase.com/docs/guides/auth/quickstarts/react
export const authStore = proxy({
    authToast: '',
    email: '',
    setAuthToast(text: string) {

        this.authToast = text

        setTimeout(() => {
            this.authToast = ''
        }, 5000)

    },
    async login(credentials: Credentials) {
        const validateEmail = z.string().email({message: "Invalid email"});
        const validatePassword = z.union([
            z.number().max(20,{message: "Too large of a password"}).min(5,{message: "Too small of a password"}), 
            z.string().max(20,{message: "Too large of a password"}).min(5,{message: "Too small of a password"})]);

       
        try {
            validateEmail.parse(credentials.email);
            validatePassword.parse(credentials.password);
        } catch (e) {
            if (e instanceof z.ZodError) {
                // Extract the first error message
                this.setAuthToast(e.errors[0]?.message || "Invalid input");
            } else {
                // For any other type of error
                this.setAuthToast("An unknown error occurred");
            }
            return;
        }
        const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password
        })
        
        

        if (error || !data.user.email) {
            this.setAuthToast('Kirjautuminen epäonnistui, tarkista sähköposti ja salasana')
            return
        }
        
        

        this.setAuthToast('Kirjautuminen onnistui, tervetuloa ' + data.user.email)

        this.email = data.user.email
    },
    async logout() {

        const { error } = await supabase.auth.signOut()

        if (!error) {
            this.setAuthToast('Sinut kirjattiin ulos')
        } else if (error) {
            this.setAuthToast('Virhe käyttäjän kirjaamisessa ulos: ' + error.message)
        }

        this.email = ''
    },
    async tryAutoLogin() {

        const { data, error } = await supabase.auth.getSession()

        if (data.session?.user && !error) {
            this.email = data.session.user.email!
        }

    },
    get isAuth() {
        return !!this.email
    }
})


