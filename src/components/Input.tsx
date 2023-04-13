import React from 'react'

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string
  type: string
  onChange: any
  value: string
  required?: boolean
}

// const Input = ({ label, type = 'text' }: InputProps) => {
const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  required = false,
}) => {
  return (
    <div className='relative mb-4'>
      <input
        type={type}
        name={label}
        id={label}
        placeholder=' '
        value={value}
        onChange={onChange}
        required={required}
        className='text-md peer block w-full rounded-md bg-neutral-700 px-6 pb-1 pt-6 text-white'
      />
      <label
        htmlFor={label}
        onChange={onChange}
        className='text-md absolute left-6 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-zinc-400 duration-150
        peer-placeholder-shown:translate-y-0
        peer-placeholder-shown:scale-100
        peer-focus:-translate-y-3
        peer-focus:scale-75'
      >
        {label}
      </label>
    </div>
  )
}

export default Input
