import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useNavigate } from 'react-router-dom' 

export const supabase = createClient(
    'https://cjijadaipqdlssuuiatk.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqaWphZGFpcHFkbHNzdXVpYXRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwOTA1ODcsImV4cCI6MjA2NDY2NjU4N30.TS4IeVRzM-cSK-HqlGEnjQCt34X7_D5r_p6X2bXWRQU'
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
