import Card from "@/components/Card";
import Layout from "@/components/Layout";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useState } from "react";

export default function LoginPage() {
    const supabase = useSupabaseClient();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(type, email, password) {
        try {
            const { error, user } = type === 'LOGIN' 
            ? await supabase.auth.signInWithPassword({email, password}) 
            : await supabase.auth.signUp({email, password,
                options: {
                    emailRedirectTo: `${location.origin}/`,
                },
            })
            if (!error && !user) alert('Welcome to the social!')
            if (error) alert('Invalid email or password')
        } catch (error) {
            console.log('Error thrown:', error.message)
            alert(error)
        }
    }

    async function loginWithGoogle() {
        await supabase.auth.signInWithOAuth({
            provider: 'google'
        });
    }

    async function loginWithFacebook() {
        await supabase.auth.signInWithOAuth({
            provider: 'facebook'
        })
    }
    return (
        <Layout hideNavigation={true}>
            <div className="h-screen flex items-center">
                <div className="max-w-xs mx-auto grow -mt-24">
                <h1 className="text-6xl mb-4 text-gray-300 text-center">Login</h1>
                    <Card noPadding={true}>
                        <div className="rounded-md overflow-hidden">
                            <button onClick={loginWithGoogle} className="flex w-full gap-4 items-center justify-center p-4 border-b border-b-gray-100 hover:bg-socialBlue hover:text-white hover:border-b-socialBlue transition-all hover:scale-110"> 
                                <svg className="h-8 fill-current" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 488 512"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg>
                                Login with Google
                            </button>
                            <button className="flex w-full gap-4 items-center justify-center p-4 border-b border-b-gray-100 hover:bg-socialBlue hover:text-white hover:border-b-socialBlue transition-all hover:scale-110"> 
                                <svg className="h-8 fill-current" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/></svg>
                                Login with Twitter
                            </button>
                            <button onClick={loginWithFacebook} className="flex w-full gap-4 items-center justify-center p-4 border-b border-b-gray-100 hover:bg-socialBlue hover:text-white hover:border-b-socialBlue transition-all hover:scale-110"> 
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/></svg>
                                Login with Facebook
                            </button>
                        </div>
                    </Card>
                    <Card>
                        <div className="rounded-md overflow-hidden">
                            <div className="mb-4">
                                <label className="font-bold text-grey-darker block mb-2">Email</label>
                                <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"/>
                            </div>
                            <div>
                                <label className="font-bold text-grey-darker block mb-2">Password</label>
                                <input type="password" placeholder="Your password (6 characters minimum)" value={password} onChange={(e) => setPassword(e.target.value)} className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"/>
                            </div> 
                            <div className="flex flex-col gap-2">
                                <a onClick={(e) => {
                                    e.preventDefault()
                                    handleLogin('SIGNUP', email, password)
                                }}
                                href="/"
                                className="btn-black"
                                >
                                    Sign up
                                </a>
                                <a onClick={(e) => {
                                    e.preventDefault()
                                    handleLogin('LOGIN', email, password)
                                }}
                                href="/"
                                className="btn-black-outline"
                                >
                                    Login
                                </a>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
            
        </Layout>
    );
}