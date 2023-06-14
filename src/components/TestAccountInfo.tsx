import React, { useState } from 'react'
import { AiOutlineCopy } from 'react-icons/ai'
import { FcCheckmark } from 'react-icons/fc'

const TestAccountInfo = () => {
  const [isEmailCopied, setIsEmailCopied] = useState(false)
  const [isPasswordCopied, setIsPasswordCopied] = useState(false)

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value)
  }

  return (
    <div className='absolute -top-24 right-0 z-20 w-max rounded-md border border-white/20 bg-black p-4 text-left'>
      <p className='flex items-center'>
        <span className='mr-1 min-w-[8ch] text-neutral-400'>Username:</span>
        test1@test.com
        <button
          type='button'
          aria-label='Copy email'
          title='Copy email'
          onClick={() => {
            copyToClipboard('test1@test.com')
            setIsEmailCopied(true)
            setIsPasswordCopied(false)
          }}
          className='ml-2'
        >
          {isEmailCopied ? <FcCheckmark /> : <AiOutlineCopy />}{' '}
        </button>
      </p>
      <p className='flex items-center'>
        <span className='mr-1 min-w-[8ch] text-neutral-400'>Password:</span>
        12345
        <button
          type='button'
          aria-label='Copy password'
          title='Copy password'
          onClick={() => {
            copyToClipboard('12345')
            setIsPasswordCopied(true)
            setIsEmailCopied(false)
          }}
          className='ml-2'
        >
          {isPasswordCopied ? <FcCheckmark /> : <AiOutlineCopy />}
        </button>
      </p>
    </div>
  )
}

export default TestAccountInfo
