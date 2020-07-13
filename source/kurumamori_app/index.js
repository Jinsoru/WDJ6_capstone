/**
 * @format
 */

import {AppRegistry, YellowBox} from 'react-native';
import App from '~/App';
import {name as appName} from './app.json';

console.disableYellowBox = true;
YellowBox.ignoreWarnings(['Require cycle:']);

AppRegistry.registerComponent(appName, () => App);
