import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "../components/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",

};
import Provider from './provider'
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>

      <Provider>
      <Layout>
      {children}

      </Layout>  
      </Provider>
      
      
      </body>
    </html>
  );
}
