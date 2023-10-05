import Image from 'next/image'
import { Inter } from 'next/font/google'
//components
import Navbar from '@/components/Navbar'
import Main from '@/components/Main'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
     <main className=''>
          <Navbar/>
          <Main/>
     </main>
  )
}
