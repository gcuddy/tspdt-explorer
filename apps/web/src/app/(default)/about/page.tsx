import Link from "next/link";

const Page = () => {
  return <div className="grid w-full h-full">
    <div className='flex flex-col gap-x-4 gap-y-1 text-lg font-normal leading-tight text-white'>
      <div className="flex items-center gap-2"><span className="text-white font-medium">
        Source
      </span><Link href={`https://theyshootpictures.com/`}>They Shoot Pictures, Don{`'`}t They</Link></div>

      <div className="flex items-center gap-2"><span className="text-white font-medium">
        Behind the Scenes
      </span><Link href={`https://www.guscuddy.com/notes/some-notes-on-csv-spelunking/`}>Note on CSV Spelunking</Link></div>
    </div>
  </div>
}

export default Page;
