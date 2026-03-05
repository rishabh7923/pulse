import { Button } from '@/components/ui/button'
import { FcGoogle } from "react-icons/fc";
import React from 'react'
import { FaDiscord } from 'react-icons/fa';
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

function AuthForm({ variant }: { variant: "login" | "signup" }) {
    const title = variant === "login" ? "Login" : "Create Account";
    const btnText = variant === "login" ? "Forgot password?" : "Already have an account?";
    const submitBtnText = variant === "login" ? "Login" : "Sign up";

    return (
        <div className='flex flex-col lg:flex-row'>
            <div className='lg:w-1/2 text-left'>
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
                    <form>

                        <FieldGroup>
                            {variant === "signup" && <Field>
                                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                                    Username
                                </FieldLabel>
                                <Input
                                    id="checkout-7j9-card-name-43j"
                                    placeholder="Evil Rabbit"
                                    required
                                />
                            </Field>}
                            <Field>
                                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                                    Email
                                </FieldLabel>
                                <Input
                                    id="checkout-7j9-card-name-43j"
                                    placeholder="Evil Rabbit"
                                    type='email'
                                    required
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                                    Password
                                </FieldLabel>
                                <Input
                                    id="checkout-7j9-card-name-43j"
                                    placeholder="Evil Rabbit"
                                    type='password'
                                    required
                                />
                            </Field>
                        </FieldGroup>
                        <Button className="w-full  text-base py-4 mt-4" >{submitBtnText}</Button>
                        <Button variant="link">{btnText}
                        </Button>
                    </form>
                </div>
            </div>
            <div className="lg:w-1/2 bg-[url('/images/bg.jpg')] flex items-end relative bg-top bg-cover">
                <p className=' text-gray-200 text-left text-lg max-w-3xl lg:p-12'>
                    Lorem ipsum dolor sit porro et excepturi adipisci quaerat atque cumque quisquam hic non! Vitae ullam commodi nemo?
                </p>
            </div>
        </div>
    )
}

export default AuthForm