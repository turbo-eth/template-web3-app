# Lit Protocol - TurboETH Integration

This React Hook integrates with [Lens Protocol](https://www.lens.xyz/), The Lens Protocol is a Web3 social graph on the Polygon Proof-of-Stake blockchain. It is designed to empower creators to own the links between themselves and their community, forming a fully composable, user-owned social graph. The protocol is built from the ground up with modularity in mind, allowing new features and fixes to be added while ensuring immutable user-owned content and social relationships. The integration is built on top of the [Lens Protocol SDK](https://docs.lens.xyz/).

## Features

- Authenticate with a Lens profile
- Display profiles with explore and search capabilities
- Display publications and comments with explore and search capabilities
- Display a profile feed
- Display revenue information


## File Structure

```
integrations/lens-protocol
├─ components/
│  ├─ AppearAnimation.tsx
│  ├─ Comment.tsx
│  ├─ CommentSection.tsx
│  ├─ ExploreProfiles.tsx
│  ├─ LensSection.tsx
│  ├─ LoginButton.tsx
│  ├─ LogoutButton.tsx
│  ├─ ProfileCard.tsx
│  ├─ ProfilePublicationRevenue.tsx
│  ├─ ProfileSection.tsx
│  ├─ Publication.tsx
│  ├─ ProfileSwitcher.tsx
│  ├─ Publications.tsx
│  ├─ PublicationSection.tsx
│  ├─ SearchProfile.tsx
│  ├─ SearchPublication.tsx
│  ├─ WhenLoggedInWithProfile.tsx
│  ├─ TwitterIcon.tsx
├─ lens-provider.ts
├─ Layout.tsx
└─ README.md

```
