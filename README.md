# Multi-Audio Player React Component

A flexible and customizable React component for playing video with multiple audio tracks.

## Features

- Play video with multiple audio tracks
- Switch between different audio languages
- Customizable UI with play/pause, restart, and language selection buttons
- Thumbnail support
- Responsive design

## Installation

Install the package using npm:

```bash
npm install multi-audio-player-react
```

Or using yarn:

```bash
yarn add multi-audio-player-react
```

## Usage

Here's a basic example of how to use the MultiAudioPlayer component:

```jsx
import React from "react";
import MultiAudioPlayer from "multi-audio-player-react";

const App = () => {
  const videoUrl = "https://example.com/video.mp4";
  const audioUrls = {
    english: "https://example.com/audio-en.mp3",
    spanish: "https://example.com/audio-es.mp3",
    french: "https://example.com/audio-fr.mp3",
  };

  return (
    <MultiAudioPlayer
      videoUrl={videoUrl}
      audioUrls={audioUrls}
      height="400px"
      thumbnail="https://example.com/thumbnail.jpg"
    />
  );
};

export default App;
```

## Props

| Prop        | Type     | Description                                             |
| ----------- | -------- | ------------------------------------------------------- |
| videoUrl    | string   | URL of the video to be played                           |
| audioUrls   | object   | Object with language keys and corresponding audio URLs  |
| flagList    | string[] | (Optional) List of flag image URLs for language buttons |
| buttonsName | string[] | (Optional) Custom names for language buttons            |
| height      | string   | (Optional) Height of the video player                   |
| thumbnail   | string   | (Optional) URL of the thumbnail image                   |

## Dependencies

This component relies on the following dependencies:

- React
- @mantine/core
- react-player
- @mui/material
- @mui/icons-material

Make sure to have these dependencies installed in your project.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
