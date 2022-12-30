import { Head } from 'components/layout/Head'
import { SITE_DESCRIPTION, SITE_EMOJI, SITE_NAME } from 'utils/config'

export default function Home() {
  return (
    <>
      <Head />
      <main className="flex flex-1">
        <div className="flex-center flex h-full flex-1 flex-col items-center justify-center text-center">
          <h3 className="text-6xl font-normal">{SITE_EMOJI}</h3>
          <h3 className="text-5xl font-bold">{SITE_NAME}</h3>

          <h5 className="my-4 text-lg">{SITE_DESCRIPTION}</h5>
        </div>
      </main>
    </>
  )
}
