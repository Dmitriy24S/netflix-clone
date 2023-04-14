import Input from '@/components/Input'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
// import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

const Auth = () => {
  //   const router = useRouter()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [pageMode, setPageMode] = useState<'login' | 'register'>('login')

  const togglePageMode = useCallback(() => {
    setPageMode((currentMode) => (currentMode === 'login' ? 'register' : 'login'))
  }, [])

  const login = useCallback(async () => {
    try {
      const loginResponse = await signIn('credentials', {
        email,
        password,
        redirect: false,
        // callbackUrl: '/',
        callbackUrl: '/profiles',
      })
      //  router.push('/')

      //  console.log('loginResponse', loginResponse)
      //  {
      //     "error": "Email does not exist.",
      //     "status": 401,
      //     "ok": false,
      //     "url": null
      // }
      if (loginResponse?.error) {
        throw new Error(loginResponse.error)
      }
    } catch (error) {
      console.log('login error', error)
      alert(`form login error: ${error}`)
    }
    //   }, [email, password, router])
  }, [email, password])

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        name,
        password,
      })

      login() // !
    } catch (error) {
      console.log('register error', error)
      alert(`form register error: ${error}`)
    }
  }, [email, name, password, login])

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-cover bg-no-repeat">
      <div className='h-full w-full bg-black/50'>
        <nav className='flex justify-center px-12 py-5 md:justify-start'>
          {/* <img src='images/logo.png' alt='netflix' className='h-12' /> */}
          <Image src='/images/logo.png' alt='netflix' height={48} width={177} priority />
        </nav>
        <div className='flex justify-center'>
          <div className='mt-2 rounded-md bg-black/70 p-6 sm:p-16 lg:w-2/5 lg:max-w-md'>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                pageMode === 'register' ? register() : login()
              }}
            >
              <h2 className='mb-8 text-4xl font-semibold'>
                {pageMode === 'login' ? 'Sign in' : 'Create an account'}
              </h2>
              {pageMode === 'register' && (
                <Input
                  type='text'
                  label='Username'
                  value={name}
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                />
              )}
              <Input
                type='email'
                label='Email'
                value={email}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
              <Input
                type='password'
                label='Password'
                value={password}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                // pageMode={pageMode}
                autoComplete={pageMode === 'login' ? 'current-password' : 'new-password'}
              />
              <button
                type='submit'
                className='mt-6 w-full rounded-md bg-red-600 py-3 text-white transition hover:bg-red-700 focus-visible:bg-red-700 '
              >
                {pageMode === 'login' ? 'Login' : 'Sign up'}
              </button>
            </form>
            <div className='mt-8 flex items-center justify-center space-x-6'>
              <button
                aria-label='github account login'
                // onClick={() => signIn('github', { callbackUrl: '/' })}
                onClick={() => signIn('github', { callbackUrl: '/profiles' })}
                className='flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition ease-out hover:opacity-90 focus-visible:opacity-90'
              >
                <FaGithub size={30} />
              </button>
              <button
                aria-label='google account login'
                onClick={() => signIn('google', { callbackUrl: '/profiles' })}
                className='flex h-10 w-10 items-center justify-center rounded-full bg-white transition ease-out hover:opacity-90 focus-visible:opacity-90'
              >
                <FcGoogle size={30} />
              </button>
            </div>
            <p className='mt-10 text-neutral-400'>
              {pageMode === 'login'
                ? 'First time using Netflix? '
                : 'Already have an account? '}
              <button
                type='button'
                onClick={togglePageMode}
                className='cursor-pointer text-white hover:underline'
              >
                {pageMode === 'login' ? 'Create an account' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
