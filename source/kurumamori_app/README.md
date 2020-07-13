# TEST
react-native run-ios --simulator="iPhone X"

### styled, types, babel
```
npm i -S styled-components
npm i -D typescript @types/react @types/react-native @types/styled-components babel-plugin-root-import
```
### storage, navi, vector
```
npm i -S @react-native-community/async-storage @react-navigation/native
npm i -S react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
npm i -S @react-navigation/compat @react-navigation/stack @react-navigation/drawer @react-navigation/bottom-tabs
npm i -S @react-navigation/material-bottom-tabs react-native-paper
npm i -S react-native-vector-icons
npm i -D @types/react-native-vector-icons
```
### mpas, ble
```
npm i -E react-native-maps
npm i -S react-native-geolocation-service @react-native-community/geolocation
npm i -S react-native-ble-manager
```
###  icon, splash, lottie
```
npm i -S react-native-splash-screen
npm i -D @bam.tech/react-native-make
npm i -S lottie-react-native lottie-ios@3.1.3
```
###  sound, status-bar-height, iphone-x-helper
```
npm i -S react-native-sound react-native-status-bar-height react-native-iphone-x-helper
```

###  base, elements, interval(useState interval Check)
```
npm i -S native-base react-native-elements
npm i -S react-interval
```

### 생각중 -> sqlite-storage, animatable, linear-gradient, firebase, push-notification
```
android -> app -> build.gradle
apply from: "../../node_modules/react-native/react.gradle" // 중복주의
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"

react-native set-icon --path ./src/Assets/images/app_icon.png --background "#FFFFFF"
react-native set-splash --path ./src/Assets/images/splash.png --resize cover --background "#FFFFFF"
#import "RNSplashScreen.h"  // here
[RNSplashScreen show];  // here  + 스토리보드 생성 SplashScreen
```