import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ClerkProvider, UserButton} from '@clerk/nextjs'
import Header from '@/components/layout/header/Header'
import Layout from '@/components/layout/layout/Layout'
import Footer from '@/components/layout/footer/Footer'

export default function App({ Component, pageProps }: AppProps) {
  return(
    <ClerkProvider {...pageProps}>
      <Layout>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </Layout>
    </ClerkProvider>
    )
}
