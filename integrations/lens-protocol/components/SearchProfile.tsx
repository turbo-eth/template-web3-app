import { useSearchProfiles } from '@lens-protocol/react-web'
import React, { ChangeEvent, useState } from 'react'
import { ProfileCard } from './ProfileCard'
import Link from 'next/link'

type SearchResultsProps = {
  query: string
}
function SearchResults({ query }: SearchResultsProps) {
  const { data, loading } = useSearchProfiles({ query })

  if (loading) {
    return (
      <div className="flex w-full justify-center mt-10">
        <div className=" text-primary inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      </div>
    )
  }

  if (data?.length === 0) {
    return <p>No profiles found</p>
  }
  return (
    <div>
      {data?.map((profile) => (
        <Link key={profile.id} passHref href={`/integration/lens-protocol/profile/${profile.handle}`}>
          <ProfileCard key={profile.id} profile={profile} />
        </Link>
      ))}
    </div>
  )
}
const SearchProfile = () => {
  const [inputValue, setInputValue] = useState('')
  const [selectedQuery, setSelectedQuery] = useState<string>()

  const handleSubmit = () => {
    setSelectedQuery(inputValue)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-blue-600 my-4">Search Profiles</h1>
      <div className="my-5 flex items-center justify-center bg-gray-200 p-4 rounded-lg">
        <input
          className="flex-grow mr-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={handleChange}
        />
        <button
          className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-none transition-all duration-200"
          onClick={handleSubmit}>
          Search
        </button>
      </div>

      {selectedQuery && <SearchResults query={selectedQuery} />}
    </div>
  )
}

export default SearchProfile
