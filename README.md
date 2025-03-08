### Git repo-clone
git clone https://github.com/mkeshavareddy/spacex-launches-app.git

cd spacex-launches-app


## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app
# Launches List
Displays a list of past and upcoming SpaceX launches (fetched from the SpaceX API).
Allows filtering (e.g., past/upcoming, successful/failed).
Includes a search bar to filter launches by mission name (if implemented).
Launch Details Screen

Shows detailed information about a selected launch (date, rocket details, success status, mission patch, etc.).
Dynamically fetches the corresponding rocket info via /v4/rockets/{rocket_id}.
Navigation

Uses React Navigation to move between the list screen and the details screen.

# Technologies Used:
1.React Native for building the cross-platform mobile app.
2.React Navigation for screen navigation (Stack Navigator).
SpaceX REST API for fetching launch and rocket data.
JavaScript/JSX as the primary language.
Android Studio / Xcode for native builds and emulators.
(Optional) Reanimated for animations or transitions.

# Future Improvements
More Advanced Filtering

Add the ability to filter by launch year or rocket name.
Better Offline Caching

Integrate a library like React Query or Redux Toolkit Query to handle caching, stale data, and offline support more robustly.
Push Notifications

Integrate real push notifications (e.g., Firebase) for upcoming launches, instead of simulated local alerts.
Animations

Use React Native Reanimated or LayoutAnimation for smooth screen transitions or list animations.
iPad / Tablet Layouts

Improve styling and layout responsiveness for larger screens, possibly with split-screen views for list and details.
User Authentication

Add user login so each user’s favorites can sync across devices.
