import { Head } from 'components/layout/Head'

export default function Home() {
  return (
    <>
      <Head />
      <main className="flex flex-1">
        <div className="flex-center flex h-full flex-1 flex-col items-center justify-center ">
          <div className="card w-[420px] hover:scale-[102%]"></div>
        </div>
      </main>
    </>
  )
}
