import '@/styles/globals.css'
import Image from 'next/image'
import { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <span>
    {/* <Image alt='VBF icon' className='lightIcon' height='40' width='40' src='/assets/icon.svg' />
    <Image alt='VBF icon' className='darkIcon' height='40' width='40' src='/assets/icon_white.svg' /> */}

    <Component {...pageProps} />
  </span >
}
