# Livepeer API - React Hook Integration

This integration with the [Livepeer API](https://livepeer.org/) offers a user-friendly approach for managing video content and livestreams directly within the browser, thanks to its suite of reusable React Components.

## Features

- File Uploading Interface: It equips users with an interface to upload MP4 video files to an on-chain server. This feature is critical in preserving data immutability and security.

- Video Playback: It supports video playback capabilities, allowing users to watch previously uploaded videos.

- Livestream Creation: It facilitates the creation of livestreams using OBS (Open Broadcaster Software) or a web browser, offering flexible options to broadcasters.

- Livestream Playback: It enables users to watch livestreams.

- Stream Configuration: It includes a copy-to-clipboard feature that simplifies the use of new live stream configuration information.

- Notifications: It offers toast notifications for copy-to-clipboard actions and error handling, ensuring a smooth user experience.

## API

`useCheckLivepeerApiKey`
A custom React hook that checks if the provided API Key is valid for use on Livepeer API. It includes the following properties and methods:

- `checkLivepeerApiKey(apiKey)`: A method that tries to delete a hypothetical livestream and according to its errors defines if the provided API Key is valid for Livepeer API.
  - error with status 404 `NotFoundError` means that the API key is valid and has Full API access
  - error with status 403 `PermissionError` means that the API key is valid but doesn't have Full API access
  - error with the message 'Failed to fetch' `FailedToFetchError` means that the API key is not valid, it can be an error to fetch or the valid API Key doesn't have CORS access

`useLivepeerApiKey`
A custom React hook that provides state regarding Livepeer API Key. It includes the following properties and methods:

- `useLivepeerApiKey`: A method that provides the current state of a custom API Key set by the client
- `useIsLivepeerApiKeySet`: A method that checks if the Livepeer API Key is set by the client or the server and returns true if one of the cases is defined and false if neither is.

## Components

`ButtonShare`
A React component that facilitates sharing a specific asset, such as a livestream, video, or IPFS URL. It provides a button that, when clicked, copies the corresponding URL to the clipboard for easy sharing.

`CreateStream`
A React component that sets up a livestream. The user is prompted to provide a name for the stream and upon creation with useCreateStream hook, instructions are given on how to setup the stream using OBS or Browser. The component also handles copying the streaming details to the clipboard for easy configuration. In case the user does not have an API key set for Livepeer, a form is rendered to collect the key.

`DialogStopStream`
A React component that displays a dialog to confirm if the user wants to end the Broser Livestream. Once the user confirms, the Broadcast component is unmounted as the route is set to `/integration/livepeer/livestream/`

`FormLivepeerApiKey`
A React component that displays a form to collect the user's Livepeer API key. Once the form is submitted, the key is validated and saved if it is correct. The user is alerted if the key is invalid or if there are any other errors. If no key is set, a persistent notification prompts the user to set the key.

`FormLivepeerAsset`
A React component that renders a form to collect the user's Livepeer asset ID. Upon form submission, the component redirects the user to a page where the user can watch the video associated with the provided asset ID. The submission button is disabled until a valid asset ID is entered.

`FormLivepeerStream`
A React component that renders a form to collect the user's Livepeer stream ID. Upon form submission, the component redirects the user to a page displaying the livestream associated with the provided stream ID. The submission button is disabled until a valid stream ID is entered.

`PlayerComponent`
This is a React component that uses Livepeer's player to play a stream, file, or an IPFS URL. The type of player and the source of the content is determined by the props provided.

If the type is PlayerType.IPFS_URL, then an ipfsUrl must be provided and playbackId should not exist. In contrast, if the type is PlayerType.FILE or PlayerType.STREAM, a playbackId must be provided and ipfsUrl should not exist.

The player also includes controls that autohide after 3000 milliseconds. The poster attribute is an optional image that is displayed before the video starts playing, and autoPlay determines whether the video should start playing as soon as it is ready.

If containerBorderRadius is provided, it changes the border-radius of the player container. If it is not provided, the default value is '0px'.

The title of the video can be set using the title attribute. If autoPlay is true, the video will start playing as soon as it is ready.

`Spinner`
This is a simple React functional component that renders a loading spinner SVG. It's typically used to indicate that the application is in the process of loading some data or executing an operation.

`UploadFile`
This React component is designed for uploading a video file to the Livepeer service. Initially, it checks if the Livepeer API key is set. If not, it prompts for it using FormLivepeerApiKey.

Once the key is set, it enables a user-friendly interface for users to drop or select an MP4 video file. Upon selection, the file is uploaded using the useCreateAsset hook, with the progress displayed to the user. When the upload completes, the user is redirected to the video page.

## Environment Variables

To use the Livepeer API with a predefined API key, you need to set the `NEXT_PUBLIC_LIVEPEER_API_KEY` environment variable in your `.env` file:

```
NEXT_PUBLIC_LIVEPEER_API_KEY=<your_livepeer_api_key>
```

## File Structure

```
integrations/livepeer
├─ assets
│  ├─ default_poster.png
├─ components
│  ├─ create-stream.tsx
│  ├─ dialog-stop-stream.tsx
│  ├─ form-livepeer-api-key.tsx
│  ├─ form-livepeer-asset.tsx
│  ├─ form-livepeer-stream.tsx
│  ├─ player.tsx
│  ├─ spinner.tsx
│  ├─ upload-file.tsx
├─ hooks
│  ├─ use-check-livepeer-api-key.ts
│  ├─ use-livepeer-api-key.ts
├─ livepeer-client.tsx
├─ livepeer-provider.tsx
├─ README.md
```
