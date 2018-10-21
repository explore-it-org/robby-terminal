# Sample program accessing the robot from explore-it

## Installing dependencies

https://github.com/Polidea/react-native-ble-plx
```
npm install --save react-native-ble-plx
react-native link react-native-ble-plx

npm install
```


## Start of the progam:

Have an Android emulator running (quickest way to get started), or a device connected

```
$ emulator list-avds
Nexus_6_API_25
$ emulator @Nexus_6_API_25
$ react-native run-android
```


## Found UIDs

```
service uuid:        0000ffe0-0000-1000-8000-00805f9b34fb
characteristic uuid: 0000ffe1-0000-1000-8000-00805f9b34fb
```

## Hints upgrading to new react native versions

### Version 0.56.0

On Windows, there seems to be a bug with version 0.56.0 of React Native. A proposed [fix](https://github.com/facebook/react-native/issues/20331) is to use version 0.55.4.

### Version 0.57.1

Task: 
    Renaming of project and upgrading from v0.56.0 to v0.75.1

Idea: 
    Start new React Native project from scratch with new name 'terminal' and copy all missing artefacts from the old project.

```
$ react-native init terminal
$ cd terminal
```

### Issues

1. See https://github.com/facebook/react-native/issues/21310

    ```
    $ npm install --save-dev @babel/core
    $ npm install --save-dev @babel/runtime
    ````

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
    $ react-native link react-native-vector-icons
    ```

4. You can use free Web Services to create the iconset for both android and ios.

    - Android: 
    
        e.g. http://romannurik.github.io/AndroidAssetStudio/index.html
        
        Add launcher icons to android project under 'android/app/src/main/res'
   
    - iOS:

        e.g. http://appiconmaker.co/

        Add launcher icons to ios project under 'ios/terminal/Images.xcassets'
