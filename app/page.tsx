
import { GettingStarted } from "@/components/GettingStarted";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="">
        <Image
          className=" dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />        
      </div>
      
      <div className="mb-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Getting Started
          </h1>
          <p className="text-sm font-light"> with</p>
          <p className="text-xl font-normal"> Next.js and Appwrite</p>
        </div>

        <div className="flex justify-center mt-12">
          <GettingStarted />
        </div>  
      </div>

      <div className="">
      <Image
          className=" dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert w-auto"
          src="/appwrite.svg"
          alt="appwrite Logo"
          width={180}
          height={37}
          priority
        />
      </div>
    </main>
  );
}
