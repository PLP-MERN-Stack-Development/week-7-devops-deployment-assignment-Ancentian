import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { authService } from '../services/api' 

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    // const handleLogin = async (e) => {
    //     e.preventDefault()
    //     try {
    //         const res = await axios.post('/api/auth/login', {
    //             email,
    //             password
    //         })

    //         // Save token and user to localStorage
    //         localStorage.setItem('token', res.data.token)
    //         localStorage.setItem('user', JSON.stringify(res.data.user))

    //         // Show success toast and navigate
    //         toast.success('Login successful!')
    //         navigate('/myposts')

    //     } catch (error) {
    //         console.error('Error:', error)
    //         const message = error.response?.data?.message || 'Login failed'
    //         toast.error(message)
    //     }
    // }

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const res = await authService.login({ email, password })

            toast.success('Login successful!')
            navigate('/myposts')
            
        } catch (error) {
            console.error('Login error:', error)
            const message = error.response?.data?.message || 'Login failed'
            toast.error(message)
        }
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    Ancent
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4" onSubmit={handleLogin}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white outline-blue-500">Your email</label>
                                <input type="email" name="email" id="email" value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@company.com"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="*******"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required />
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                Sign in
                            </button>

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <Link to='/signup' className="font-medium text-primary-600 hover:underline dark:text-primary-500 hover:cursor-pointer">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
