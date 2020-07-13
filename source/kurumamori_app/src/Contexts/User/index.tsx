import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';

const defaultContext: IUserContext = {
  URL: undefined,
  updateURL: (url: string) => {},
  userInfo: undefined,
  userInfo2: undefined,
  profileSearchRes: undefined,
  settingSearchRes: undefined,
  login: (email: string, password: string) => {},
  login2: (email: string, password: string) => {},
  getUserInfo: () => {},
  getUserInfo2: () => {},
  profileSearch: () => {},
  settingSearch: () => {},
  logout: () => {},
  logout2: () => {},
};

const UserContext = createContext(defaultContext);

interface Props {
  children: JSX.Element | Array<JSX.Element>;
}

const UserContextProvider = ({children}: Props) => {
  // 사용 방법 -> const {} = useContext<IUserContext>(UserContext);
  const [URL,setURL] = useState<string>();
  const updateURL = (url: string): void => {
    setURL(url);
    AsyncStorage.setItem('saveURL', url);
  }
  const initURL = async () => {
    try {
      const myURL = await AsyncStorage.getItem('saveURL');
      if (myURL !== null) {
        setURL(myURL);
      } else if (myURL === null) {
        setURL("http://btrya23.iptime.org:8000");
      }
    } catch (e) {
      console.log(e);
    }
  }

  const [userInfo, setUserInfo] = useState<IUserInfo | undefined>(undefined);
  const [userInfo2, setUserInfo2] = useState<IUserInfo2 | undefined>(undefined);
  const [profileSearchRes, setProfileSearchRes] = useState<any | undefined>(undefined);
  const [settingSearchRes, setSettingSearchRes] = useState<any | undefined>(undefined);

  // 사용 방법 -> const {} = useContext<IUserContext>(UserContext);
  const login = (email: string, password: string): void => {
    let TEST_JSON_DATA = { name : 'WDJ', email : 'YJU.AC.KR', key : '-1'};
    console.log(JSON.stringify(TEST_JSON_DATA));
    AsyncStorage.setItem('login2', JSON.stringify(TEST_JSON_DATA)).then(() => {
      setUserInfo2({
        name: TEST_JSON_DATA.name,
        email: TEST_JSON_DATA.email,
        key: TEST_JSON_DATA.key
      });
    });
  };

  const login2 = (email: string, password: string): void => {
    fetch(
      URL+'/app', { 
        method: 'POST',
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
          _email: email,
          _password: password,
          _option: 0, // 로그인 로직
        })
    })
    .then(response => response.json())
    .then(json => {
      let data = JSON.stringify(json);
      if(json.id){
        AsyncStorage.setItem('login2', data).then(() => {
          // let json = JSON.parse(data)
          setUserInfo2({
            name: json.name,
            email: json.email,
            key: json.id,
          });
        });
      } else {
        Alert.alert("내용을 잘못입력했습니다", data);
      }
    })
    .catch(error => {
      Alert.alert(error.toString());
    });
  };

  const profileSearch = () => {
    if(userInfo2){
      console.log("의료정보 요청입니다");
      console.log(userInfo2.key);
      console.log(URL);
      fetch(
        URL+'/app', { 
          method: 'POST',
          headers: {
            'Accept':'application/json',
            'Content-Type':'application/json;charset=UTF-8',
          },
          body: JSON.stringify({
            _option: 1, // 의료정보 로직
            _key: userInfo2.key,
            // _key: 
          })
      })
      .then(response => response.json())
      .then(json => {
        console.log("의료정보 응답입니다");
        console.log(json);
        setProfileSearchRes(json);
      })
      .catch(error => {
        Alert.alert(error.toString());
      });
    }
  }

  const settingSearch = () => {
    if(userInfo2){
      fetch(
        URL+'/app', { 
          method: 'POST',
          headers: {
            'Accept':'application/json',
            'Content-Type':'application/json;charset=UTF-8',
          },
          body: JSON.stringify({
            _option: 2, // 기기 로직
            _key: userInfo2.key,
          })
      })
      .then(response => response.json())
      .then(json => {
        setSettingSearchRes(json);
      })
      .catch(error => {
        Alert.alert(error.toString());
      });
    }
  }

  // 사용 방법 -> const {} = useContext<IUserContext>(UserContext);
  const getUserInfo = (): void => {
    // AsyncStorage.getItem('token')
    //   .then(value => {
    //     if (value) {
    //       setUserInfo({
    //         name: 'WDJ',
    //         email: 'WDJ@YJU.AC.KR',
    //         key: '-1'
    //       });
    //     }
    //   })
    //   .catch(() => {
    //     setUserInfo(undefined);
    //   });
  };
  const getUserInfo2 = (): void => {
    AsyncStorage.getItem('login2')
      .then(value => {
        if (value && typeof value === 'string') {
          let userInfoAsyncStorage = JSON.parse(value);
          setUserInfo2({
            name: userInfoAsyncStorage.name,
            email: userInfoAsyncStorage.email,
            key: userInfoAsyncStorage.id
          });
        } else {
          console.log("> getUserInfo2 else 발생");
        }
      })
      .catch(() => {
        console.log("> catch getUserInfo2 에러");
        setUserInfo2(undefined);
      });
  };
  // 사용 방법 -> const {} = useContext<IUserContext>(UserContext);
  const logout = (): void => {
    // AsyncStorage.removeItem('token');
    // setUserInfo2(undefined);
    // setUserInfo(undefined);
  };
  const logout2 = (): void => {
    AsyncStorage.removeItem('login2');
    setUserInfo(undefined);
    setUserInfo2(undefined);
    setProfileSearchRes(undefined);
  };

  useEffect(() => {
    getUserInfo2();
    initURL();
  }, []);

  return (
    <UserContext.Provider
      value={{
        URL,
        updateURL,
        userInfo,
        userInfo2,
        profileSearchRes,
        settingSearchRes,
        login,
        login2,
        getUserInfo,
        getUserInfo2,
        profileSearch,
        settingSearch,
        logout,
        logout2,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export {UserContextProvider, UserContext};