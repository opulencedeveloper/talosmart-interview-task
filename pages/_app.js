import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return <main className={inter.className}><Component {...pageProps} /></main>
}
