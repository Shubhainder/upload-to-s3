import { Button } from "@/components/ui/button";
import FileList from "@/components/ui/FileList";
import UploadPage from "@/components/ui/Upload";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";


export default async function Home() {
  const userId = await auth();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
         {userId?
         <>
         <UploadPage />
         <FileList />
         </>
         :
         <Link href='/sign-up'>
         <Button> Upload </Button>
         </Link>
      }
      </main>
    </div>
  );
}
