import { Profile } from "@lens-protocol/react-web"

export const getProfilePictureSrc = (profile: Profile): string | undefined => {
  if (!profile || !profile.picture) return undefined
  if (profile.picture.__typename === "MediaSet") {
    const splittedUrl = profile.picture.original.url.split("ipfs://")
    if (splittedUrl.length === 2)
      return `https://gateway.ipfs.io/ipfs/${splittedUrl[1]}`
    return profile.picture.original.url
  }
  if (profile.picture.__typename === "NftImage")
    return `https://cdn.stamp.fyi/avatar/eth:${profile.picture.uri}`
  return undefined
}
