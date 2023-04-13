import Input from '@/components/Input'
import axios from 'axios'
import Image from 'next/image'
import React, { FormEvent, useCallback, useState } from 'react'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [pageMode, setPageMode] = useState<'login' | 'register'>('login')

  const togglePageMode = useCallback(() => {
    setPageMode((currentMode) => (currentMode === 'login' ? 'register' : 'login'))
  }, [])

  const register = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()

      try {
        await axios.post('/api/register', {
          email,
          name,
          password,
        })
      } catch (error) {
        console.log('register error', error)
        alert(`form register error: ${error}`)
      }
    },
    [email, name, password]
  )

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-cover bg-no-repeat">
      <div className='h-full w-full bg-black/50'>
        <nav className='flex justify-center px-12 py-5 md:justify-start'>
          {/* <img src='images/logo.png' alt='netflix' className='h-12' /> */}
          <Image src='/images/logo.png' alt='netflix' height={48} width={177} priority />
        </nav>
        <div className='flex justify-center'>
          <div className='mt-2 rounded-md bg-black/70 p-6 sm:p-16 lg:w-2/5 lg:max-w-md'>
            <form onSubmit={register}>
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
              />
              <button
                type='submit'
                className='mt-6 w-full rounded-md bg-red-600 py-3 text-white transition hover:bg-red-700 '
              >
                {pageMode === 'login' ? 'Login' : 'Sign up'}
              </button>
            </form>
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
