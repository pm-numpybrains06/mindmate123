
'use client'

import { useState } from 'react'
import { auth } from '../api/firebase/firebaseConfig'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const router = useRouter()

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password)
      } else {
        await createUserWithEmailAndPassword(auth, email, password)
      }
      router.push('/dashboard')
    } catch (err) {
      alert('Authentication failed')
    }
  }

  return (
    <div className='max-w-md mx-auto mt-20 space-y-4'>
      <h1 className='text-2xl font-bold'>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <Input placeholder='Email' onChange={e => setEmail(e.target.value)} />
      <Input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} />
      <Button onClick={handleAuth}>{isLogin ? 'Login' : 'Create Account'}</Button>
      <button onClick={() => setIsLogin(!isLogin)} className='text-sm underline'>
        {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
      </button>
    </div>
  )
}
