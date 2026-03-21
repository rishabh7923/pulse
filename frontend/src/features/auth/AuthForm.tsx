import { Button } from '@/components/ui/button'
import { FcGoogle } from "react-icons/fc";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useAuth } from './AuthContext';
import { useRef, type FormEvent } from 'react';
import { Navigate } from 'react-router-dom';

function AuthForm({ variant }: { variant: "login" | "signup" }) {
    const title = variant === "login" ? "Login" : "Create Account";
    const btnText = variant === "login" ? "Forgot password?" : "Already have an account?";
    const submitBtnText = variant === "login" ? "Login" : "Sign up";
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const { login, signup, isAuthenticated, isLoading } = useAuth();
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const email = emailRef.current?.value || "";
        const username = usernameRef.current?.value || "";
        const password = passwordRef.current?.value || "";
        if (variant === "login") {
            login({ username, password });
        } else {
            signup({ username, password, email });
        }

    }
    if (isAuthenticated) return <Navigate to="/" replace />
    return (
        <div className='flex flex-col lg:flex-row'>
            <div className='lg:w-1/2 text-left justify-center'>
                <div className='lg:px-20'>
                    <div className='w-10 h-10 border border-amber-600 my-8'></div>
                    <h3 className='text-3xl font-semibold'>
                        {title}
                    </h3>
                    <p className='mt-2 text-gray-500'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure maiores deleniti delectus doloremque repudiandae?</p>
                    <div className='mt-8'>
                        <Button className="w-full  text-base py-4" variant="outline"><FcGoogle /> Continue with google</Button>
                        {/* <Button className="w-full  text-base py-4 mt-2" variant="outline"><FaDiscord /> Continue with Discord</Button> */}
                    </div>
                    <p className='text-center my-4 uppercase text-gray-500'>or</p>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                                    Username
                                </FieldLabel>
                                <Input
                                    id="checkout-7j9-card-name-43j"
                                    placeholder="Evil Rabbit"
                                    ref={usernameRef}
                                    required
                                />
                            </Field>
                            {variant === "signup" && <Field>
                                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                                    Email
                                </FieldLabel>
                                <Input
                                    id="checkout-7j9-card-name-43j"
                                    placeholder="Evil Rabbit"
                                    type='email'
                                    ref={emailRef}
                                    required
                                />
                            </Field>}
                            <Field>
                                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                                    Password
                                </FieldLabel>
                                <Input
                                    id="checkout-7j9-card-name-43j"
                                    placeholder="Evil Rabbit"
                                    type='password'
                                    ref={passwordRef}
                                    required
                                />
                            </Field>
                        </FieldGroup>
                        <Button className="w-full  text-base py-4 mt-4" disabled={isLoading}>{submitBtnText}</Button>
                        <Button variant="link">{btnText}
                        </Button>
                    </form>
                </div>
            </div>
            <div className="hidden md:flex lg:w-1/2 bg-[url('/images/bg.jpg')] items-end relative bg-top bg-cover lg:min-h-screen">
                <p className=' text-gray-200 text-left text-lg max-w-3xl lg:p-12'>
                    Lorem ipsum dolor sit porro et excepturi adipisci quaerat atque cumque quisquam hic non! Vitae ullam commodi nemo?
                </p>
            </div>
        </div>
    )
}

export default AuthForm