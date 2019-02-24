# Terminal App to control the robot from explore-it

## Installation

This is the entire source code of the terminal app. It is based on [react-native](https://facebook.github.io/react-native/).

To build the app run

```
$ npm install
```

or

```
$ yarn install
```

This will download and install all dependencies into directory ``node_modules``.

# Development Environment

You'll need [Node](https://nodejs.org/en/download/), the [React Native CLI](https://facebook.github.io/react-native/docs/getting-started#the-react-native-cli) and a Text Editor like [Visual Studio Code](https://code.visualstudio.com/). That's all!

More information can be found on [React Native's Website](https://facebook.github.io/react-native/docs/getting-started). **The app does NOT use [Expo](https://expo.io/)!**

## Run App on Android

**NOTE**: You will need [Java 8](https://facebook.github.io/react-native/docs/getting-started#java-development-kit).

Have an Android emulator running (quickest way to get started), or a device connected

```
$ emulator -list-avds
Nexus_6_API_25
$ emulator @Nexus_6_API_25
$ react-native run-android
```

## Run App on iOS

No need to start a simulator first! Run command

```
$ react-native run-ios
```

to start simulator (from Xcode) and deploy app or deploy app onto attached iPhone.

**NOTE**:

- Several starts are needed for the first time! The whole compilation cycle takes too long to finish in time.
- **Signing** properties in Xcode are needed. Start Xcode and go to "Signing" paragraph.

# Hints for BLE support

The library used in this project to support BLE is: https://github.com/Polidea/react-native-ble-plx
```
$ npm install --save react-native-ble-plx
$ react-native link react-native-ble-plx

$ npm install
```


## Found UIDs

```
service uuid:        0000ffe0-0000-1000-8000-00805f9b34fb
characteristic uuid: 0000ffe1-0000-1000-8000-00805f9b34fb
```


# Hints upgrading to new React-Native (RN) versions

### RN Version 0.56.0

On Windows, there seems to be a bug with version 0.56.0 of React Native. A proposed [fix](https://github.com/facebook/react-native/issues/20331) is to use version 0.55.4.

### RN Version 0.57.1

Task: 
    Renaming of project and upgrading from v0.56.0 to v0.57.1

Idea: 
    Start new React Native project from scratch with new name 'terminal' and copy all missing artefacts from the old project.

```
$ react-native init terminal
$ cd terminal
```

### RN Version 0.57.3

Task: 
    Renaming of project and upgrading from v0.57.1 to v0.57.3

Idea: 
    Start new React Native project from scratch with new name 'terminal' and copy all missing artefacts from the old project.

```
$ react-native init terminal
$ cd terminal
```

### RN Version 0.57.8

Tasks: 
 1. Upgrading the project itself to v1.0.0-Beta
 2. Upgrading React Native from v0.57.3 to v0.57.8

Steps:
 1. Follow instructions on [upgrade notes 0.57.8](https://github.com/react-native-community/react-native-releases/blob/master/CHANGELOG.md#0578)
 2. Running Xcode 10 change the build system to "Legacy Build System" as described on [github](https://github.com/facebook/react-native/issues/21631)

### RN Version 0.58.5

Task: 
 - Renaming of project and upgrading from v0.57.8 to v0.58.5
 - Changed from `react-native-languages` to `react-native-localize`, because `react-native-languages` is deprecated. **Update code!**

Actions: 
- Start new React Native project from scratch with new name 'terminal' and copy all missing artefacts from the old project.
- Copy image assets for android from `android/app/src/main/res` and for ios from `ios/terminal/Images.xcassets/AppIcon.appiconset`

```
$ react-native init terminal
$ cd terminal
$ yarn install
$ react-native link react-native-ble-plx
$ react-native link react-native-localize
```

Read project [react-native-plx-ble](https://github.com/Polidea/react-native-ble-plx) carefully. Their are some updates needed 
    
 - for Android in `app/build.gradle` and `AndroidManifest.xml`!
 - for iOS. Open Xcode and add empty Swift file

# Issues

1. Testing in simulators on localhost

    Testing on android; should work!

    ```
    $ react-native run-android
    ````

    Testing on iOS; should work, (maybe needs 2 tries!):
    ```
    $ react-native run-ios
    ````

2. Adding "react-native-ble-plx"

    See https://github.com/Polidea/react-native-ble-plx

    Check ios and android setup carefully

3. Linking of dependencies

    Don't forget the links

    ```
    $ react-native link react-native-languages
    ```

4. You can use free Web Services to create the iconset for both android and ios.

    - Android: 
    
        e.g. http://romannurik.github.io/AndroidAssetStudio/index.html
        
        Add launcher icons to android project under 'android/app/src/main/res'
   
    - iOS:

        e.g. http://appiconmaker.co/

        Add launcher icons to ios project under 'ios/terminal/Images.xcassets'

# Adding AppCenter

To distribute the App during the development cycle the Cloud Service [AppCenter](https://visualstudio.microsoft.com/de/app-center/) will be used.

    
