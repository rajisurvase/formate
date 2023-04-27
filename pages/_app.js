import LayoutComponent from '../layout/LayoutComponent'
import '../styles/globals.css'
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
    <LayoutComponent>
       <Component {...pageProps} />
   </LayoutComponent>
   </SessionProvider>
  )
}

export default MyApp
