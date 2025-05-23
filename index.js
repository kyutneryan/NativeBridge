import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.info('Reactotron Configured'));
}

AppRegistry.registerComponent(appName, () => App);
