import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator, DrawerNavigationProp} from '@react-navigation/drawer';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {UserContext} from '~/Contexts/User';

import CustomDrawer from '~/Screens/Drawer';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import IconButton from '~/Components/IconButton';

import Modal from './Modal';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ResetPassword from './ResetPassword';

import Driving from './Driving';
import Profile from './Profile';
import InfoList from './InfoList';
import Bluetooth from './Bluetooth';
import Setting from './Setting';

import MapData from './MapData';
import MapMarker from './MapMarker';
import MapTest from './MapTest';
import MapDataWiFi from './MapDataWiFi';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();

type TypeDrawerProp = DrawerNavigationProp<DrawNaviParamList, 'MainTabNavi'>;
interface DrawerProp {
  navigation: TypeDrawerProp;
}

const LoginStackNavi = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#AAAAAA',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false,
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerBackTitleVisible: false,
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          headerBackTitleVisible: false,
          animationEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

const MainFirstStackNavi = ({navigation}: DrawerProp) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#002EF0',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24,
        },
        headerRight: () => (
          <IconButton
            style={{marginRight:8}}
            icon="menu"
            color="#FFFFFF"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    >
      <Stack.Screen
        name="Driving"
        component={Driving}
        options={{
          headerTitle:"クルマモリ9",
          headerBackTitleVisible: false
        }}
      />
    </Stack.Navigator>
  );
};

const MainSecondStackNavi = ({navigation}: DrawerProp) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#002EF0',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24,
        },
        headerRight: () => (
          <IconButton
            style={{marginRight:8}}
            icon="menu"
            color="#FFFFFF"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle:"クルマモリ9",
          headerBackTitleVisible: false
        }}
      />
      <Stack.Screen
        name="InfoList"
        component={InfoList}
        options={{
          headerTitle:"クルマモリ9",
          headerBackTitleVisible: false
        }}
      />
    </Stack.Navigator>
  );
};
const MainThirdStackNavi = ({navigation}: DrawerProp) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#002EF0',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24,
        },
        headerRight: () => (
          <IconButton
            style={{marginRight:8}}
            icon="menu"
            color="#FFFFFF"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    >
      <Stack.Screen
        name="Bluetooth"
        component={Bluetooth}
        options={{
          headerTitle:"クルマモリ9",
          headerBackTitleVisible: false
        }}
      />
    </Stack.Navigator>
  );
};

const MainFourthStackNavi = ({navigation}: DrawerProp) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#002EF0',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24,
        },
        headerRight: () => (
          <IconButton
            style={{marginRight:8}}
            icon="menu"
            color="#FFFFFF"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    >
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{
          headerTitle:"クルマモリ9",
          headerBackTitleVisible: false
        }}
      />
    </Stack.Navigator>
  );
};

const MainTabNavi = () => {
  return (
    <Tab.Navigator
      initialRouteName="MainFirstStackNavi"
      shifting={true}
      activeColor={'#000000'}
      inactiveColor={'#AAAAAA'}
      barStyle={{backgroundColor: '#FFFFFF'}}
    >
      <Tab.Screen
        name="MainFirstStackNavi"
        component={MainFirstStackNavi}
        options={{
          tabBarLabel: '운전',
          tabBarIcon: 'car',
        }}
      />
      <Tab.Screen
        name="MainThirdStackNavi"
        component={MainThirdStackNavi}
        options={{
          tabBarLabel: '연결',
          tabBarIcon: 'bluetooth',
        }}
      />
      <Tab.Screen
        name="MainSecondStackNavi"
        component={MainSecondStackNavi}
        options={{
          tabBarLabel: '정보',
          tabBarIcon: 'account-outline',
        }}
      />
      <Tab.Screen
        name="MainFourthStackNavi"
        component={MainFourthStackNavi}
        options={{
          tabBarLabel: '설정',
          tabBarIcon: 'settings-outline',
        }}
      />
    </Tab.Navigator>
  );
};

const MapTabNavi = () => {
  return (
    <Tab.Navigator
      initialRouteName={"MapData"}
      shifting={true}
      activeColor={'#000000'}
      inactiveColor={'#AAAAAA'}
      barStyle={{backgroundColor: '#FFFFFF'}}
    >
      <Tab.Screen
        name={"MapData"}
        component={MapData}
        options={{
          tabBarLabel: '지도',
          tabBarIcon: 'map-outline',
        }}
      />
      <Tab.Screen
        name={"MapMarker"}
        component={MapMarker}
        options={{
          tabBarLabel: '통계',
          tabBarIcon: 'chart-bar',
        }}
      />
    </Tab.Navigator>
  );
};

const DrawNavi = () => {
  return (
    <Drawer.Navigator
      initialRouteName={"MainTabNavi"}
      drawerPosition={"right"}
      drawerType={'slide'}
      drawerContent={props => <CustomDrawer props={props} />}
      drawerContentOptions={{
        activeTintColor: '#0000FF'
      }}
    >
      <Drawer.Screen
        name={"MainTabNavi"}
        component={MainTabNavi}
        options={{
          title: '메인',
          drawerIcon: ({ }) => (
            <Icon
              name="home"
              color={'#888'}
              size={24}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={"MapTabNavi"}
        component={MapTabNavi}
        options={{
          title: '지도',
          drawerIcon: ({ }) => (
            <Icon
              style={{margin:0, padding:0}}
              name="map"
              color={'#888'}
              size={24}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const RootNavi = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen     
        name="DrawNavi"
        component={DrawNavi}
        options={{
          headerShown: false,
          animationEnabled: false,
        }}
      />
      {/* <Stack.Screen name="FullModal" component={} /> */}
    </Stack.Navigator>
  );
};

export default () => {
  const {userInfo, userInfo2} = useContext<IUserContext>(UserContext);
  return (
    <NavigationContainer>
      {userInfo || userInfo2 ? <RootNavi /> : <LoginStackNavi />}
    </NavigationContainer>
  );
};
