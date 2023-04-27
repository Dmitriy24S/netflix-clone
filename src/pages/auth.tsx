import Input from '@/components/Input'
import TestAccountInfo from '@/components/TestAccountInfo'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

const Auth = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [pageMode, setPageMode] = useState<'login' | 'register'>('login')
  const [showTestAccountInfo, setShowTestAccountInfo] = useState(true)

  const toggleShowAccountInfo = () => {
    setShowTestAccountInfo((prev) => !prev)
  }

  const togglePageMode = useCallback(() => {
    setPageMode((currentMode) => (currentMode === 'login' ? 'register' : 'login'))
  }, [])

  const login = useCallback(async () => {
    try {
      const loginResponse = await signIn('credentials', {
        email,
        password,
        redirect: false,
        // redirect: true, // ! redirect to error page with error url
        // callbackUrl: '/',
        // callbackUrl: '/profiles',
      })

      console.log('auth login loginResponse', loginResponse)
      //  {
      //     "error": "Email does not exist.",
      //     "status": 401,
      //     "ok": false,
      //     "url": null
      // }
      if (loginResponse?.error) {
        throw new Error(loginResponse.error)
      }
      router.push('/profiles')
    } catch (error) {
      console.log('login error', error)
      alert(`form login error: ${error}`)
    }
  }, [email, password, router])

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
    <div className="relative min-h-screen w-full bg-[url('/images/hero.jpg')] bg-cover bg-no-repeat">
      <div className='min-h-screen w-full bg-black/50'>
        <nav className='flex justify-center px-12 py-5 md:justify-start'>
          {/* <img src='images/logo.png' alt='netflix' className='h-12' /> */}
          <Image src='/images/logo.png' alt='netflix' height={48} width={177} priority />
        </nav>
        <div className=' flex justify-center'>
          <div className='relative mb-16 mt-20 rounded-md bg-black/70 p-6 sm:p-16 lg:max-w-md'>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                pageMode === 'register' ? register() : login()
              }}
            >
              <div className='relative flex items-start justify-between'>
                <h2 className='mb-8 text-4xl font-semibold'>
                  {pageMode === 'login' ? 'Sign in' : 'Create an account'}
                </h2>
                <button
                  type='button'
                  aria-label='Test account info'
                  title='Test account info'
                  // onMouseEnter={() => setShowTestAccountInfo(true)}
                  // onMouseLeave={() => setShowTestAccountInfo(false)}
                  // onClick={() => setShowTestAccountInfo((prev) => !prev)}
                  onClick={toggleShowAccountInfo}
                >
                  <AiOutlineInfoCircle size={30} />
                </button>
                {showTestAccountInfo && <TestAccountInfo />}
              </div>
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
