# Lens Protocol - TurboETH Integration

Integrate TurboETH with the Lens Protocol using the [Lens Protocol SDK](https://github.com/lens-protocol/lens-sdk). This integration aims to enable developers to seamlessly utilize the features of the Lens Protocol.

## Features

- Authenticate using a Lens profile
- Generate a testnet Lens profile
- View profiles with browsing and search functionalities
- View publications and comments, also with browsing and search functionalities
- View a profile's feed, posts, and replies
- Display revenue information for a profile or publication
- Like or Mirror a publication
- Follow or Unfollow a profile

## Components

- `ProfileCard`: Displays the primary profile information, including the name, handle, picture, and follower/following count.

- `PublicationCard`: Presents the primary publication details, such as metadata, date, associated profile, and count and list of likes, comments, and mirrors.

## Hooks

- `useCreateTestProfile()`: Hook to create a testnet profile.

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
