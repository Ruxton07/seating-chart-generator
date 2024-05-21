import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });
export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`flex min-h-screen flex-col ${roboto.className}`}>
      <Component {...pageProps} />
    </main>
  );
}
