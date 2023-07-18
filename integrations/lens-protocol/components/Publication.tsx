import { convertIpfsUrl } from '@/lib/utils'

type PublicationProps = {
  publication: any
}

export function Publication({ publication }: PublicationProps) {
  const profile: any = publication?.profile

  return (
    <>
      <h1 className="text-4xl font-bold text-center text-blue-600 my-4">{`Post by ` + profile?.handle}</h1>
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="p-4">
          <p className="text-gray-800">{publication.metadata.content}</p>
        </div>
        {publication.metadata?.media[0]?.original && ['image/jpeg', 'image/png'].includes(publication.metadata?.media[0]?.original.mimeType) && (
          <img className="object-cover w-full h-48 rounded-b-lg" src={convertIpfsUrl(publication.metadata.media[0].original.url)} />
        )}
      </div>
    </>
  )
}
