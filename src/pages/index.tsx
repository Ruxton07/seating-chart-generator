import Image from "next/image";
import { Roboto } from "next/font/google";
import PeriodSelector from "@/components/home/PeriodSelector";
import CurrentPeriodDisplay from "@/components/home/CurrentPeriodDisplay";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${roboto.className}`}
    >
      <CurrentPeriodDisplay />
      <PeriodSelector />
    </main>
  );
}
