import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useNavigate } from 'react-router-dom' 


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseApiKey = import.meta.env.VITE_SUPABASE_API_KEY;

export const supabase = createClient(
    supabaseUrl,
    supabaseApiKey
);

export default function SignUp({ session, setSession }) {
    const navigate = useNavigate()

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if(session) {
            navigate("/")
        }
    }, [session, navigate])

    if (!session) {
        return (
            <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
            />
        );
    } else {
        return (
            <div>Logged in!</div>
        );
    }
}