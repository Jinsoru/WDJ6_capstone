import 'react-native-gesture-handler';
import React, {Fragment, useEffect} from 'react';
import Styled from 'styled-components/native';
import {UserContextProvider} from '~/Contexts/User';
import {DrivingDataProvider} from '~/Contexts/DrivingData';
import Navigator from '~/Screens/Navigator';
import SplashScreen from 'react-native-splash-screen'
import {StatusBar} from 'react-native';

interface Props {}

const App = ({ }: Props) => {

  useEffect(() => {
    console.log("===== ===== START ===== =====");
    // console.log(new Date());
    // console.log(+new Date());
    // console.log(new Date().getTime());
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  return (
    <Fragment>
      <UserContextProvider>
        <DrivingDataProvider>
          <StatusBar barStyle="dark-content" backgroundColor={'transparent'} translucent={true} />
          <Navigator />
        </DrivingDataProvider>
      </UserContextProvider>
    </Fragment>
  );
};

export default App;
