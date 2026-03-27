# Rick and Morty - AsyncStorage Assignment

## Learning Objectives

Learn how to:

- Fetch data from a public API
- Store user data locally using AsyncStorage
- Persist app state between sessions
- Add/remove favorites
- Sync UI state with stored data

## Scenario

You are building a mobile app that lets users browse characters and save their favorites locally on their device.

Users should be able to:

- View a list of items from an API
- Tap ❤️ to favorite an item
- Persist favorites using AsyncStorage
- See favorites after restarting the app

## API

Use this endpoint to fetch characters:

- https://rickandmortyapi.com/api/character

## Install Dependency

```bash
npx expo install @react-native-async-storage/async-storage
```

## Project Structure Overview

The following files support API data fetching, local persistence, and UI rendering for this assignment:

- root/services/api.ts: Handles requests to the Rick and Morty API and returns character data.
- root/keys/keys.ts: Stores constants used as AsyncStorage keys.
- root/storage/storage.ts: Contains helper functions to save/load favorites using AsyncStorage.
- root/interfaces/interfaces.ts: Defines shared TypeScript interfaces for character and app data.
- root/components/RenderCharacter.tsx: Reusable UI component for rendering a character item and favorite interactions.
