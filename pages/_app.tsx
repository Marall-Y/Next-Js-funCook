import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ClerkProvider, UserButton } from '@clerk/nextjs';
import Header from '@/components/layout/header/Header';
import Layout from '@/components/layout/layout/Layout';
import Footer from '@/components/layout/footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <Layout>
        <Header />
        <ToastContainer position="top-right" autoClose={3000} closeOnClick pauseOnHover />
        <Component {...pageProps} />
        <Footer />
      </Layout>
    </ClerkProvider>
  );
}
