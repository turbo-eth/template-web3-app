# Lens Protocol - TurboETH Integration

ntegrate Lens Protocol integration for TurboETH using the [Lens Protocol SDK](https://github.com/lens-protocol/lens-sdk). The integration should allow developers to quickly build on top of Lens features.

## Features

- Authenticate with a Lens profile
- Create a testnet Lens profile
- Display profiles with explore and search capabilities
- Display publications and comments with explore and search capabilities
- Display a profile's feed/posts/replies
- Display a profile/publication revenue information
- Like/Mirror a publication
- Follow/Unfollow a profile

## Components

`ProfileCard`
The main profile card, shows a profile's name, handle, picture and followers/following count.

`PublicationCard`
The main publication card, shows a publication's metadata, date, profile and likes/comments/mirros count and list.

## Hooks

`useCreateTestProfile()`
Creates a testnet profile.

## File Structure

```
integrations/lens-protocol
├── components
│   ├── auth
│   │   ├── is-user-authenticated.tsx
│   │   ├── login-button.tsx
│   │   ├── logout-button.tsx
│   │   └── not-authenticated-yet.tsx
│   ├── feed.tsx
│   ├── load-more-button.tsx
│   ├── navbar.tsx
│   ├── profile
│   │   ├── address-profiles.tsx
│   │   ├── explore-profiles.tsx
│   │   ├── follow-unfollow-button.tsx
│   │   ├── owned-profiles.tsx
│   │   ├── profile-card.tsx
│   │   ├── profile-list-modal.tsx
│   │   ├── profile-publications.tsx
│   │   ├── profile-revenue.tsx
│   │   ├── profile-stats.tsx
│   │   ├── profile.tsx
│   │   └── search-profiles.tsx
│   └── publications
│       ├── actions
│       │   ├── button.tsx
│       │   ├── comment.tsx
│       │   ├── index.tsx
│       │   ├── like.tsx
│       │   └── mirror.tsx
│       ├── commnets.tsx
│       ├── explore-publications.tsx
│       ├── publication-actions-and-stats.tsx
│       ├── publication-card.tsx
│       ├── publication-revenue.tsx
│       ├── publication.tsx
│       ├── search-publications.tsx
│       └── stats
│           ├── index.tsx
│           └── stat.tsx
├── hooks
│   └── use-create-profile.ts
├── lens-provider.ts
├── utils
│   └── index.ts
├── README.md
```
