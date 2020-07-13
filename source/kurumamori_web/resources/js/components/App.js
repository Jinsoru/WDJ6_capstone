import React, {useState, useEffect, createContext, useContext} from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter } from "react-router-dom";
import Axios from 'axios';

//css
import Header from "../layout/Header";
import Footer from "../layout/Footer";

//routes
import Home from "../routes/Home/Home"
import Login from "../routes/Auth/AuthContainer";
import Info_index from "../routes/Profile/ProfileContainer"; 
import Info_medical from "../routes/Medical/MedicalContainer";
import Info_drive from "../routes/Drive/DriveContainer";
import Bigdata from "../routes/Bigdata/BigdataContainer";

import Product from "../routes/Product/Product";
import More from "../routes/Product/More";
import Buy from "../routes/Buy/BuyContainer";
// import Completed from "../routes/Buy/partial/Completed";

import Control from "../routes/Product/Control";
import Users from "../routes/Product/Users";

import Board from "../routes/Board/BoardContanier";

import Review from "../routes/Board/Review";


//전역변수
export const AppContext = createContext();

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(false);
    // 언어
    const [language, setLanguage] = useState("korea");
    
    useEffect(()=>{
        // console.log(user);
        console.log("app useEffect");
        if(localStorage.getItem('userToken')){
            const url = "/api/profile";
            // const token = localStorage;
            // console.log(token);
            const config = {
                headers: {
                    Authorization : `Bearer ${localStorage.userToken}`
                }
            }
            Axios.get(url, config)
            .then(res => {
                // console.log(res);
                if(res.data.user){
                    console.log("user value call");
                    setUser(res.data.user);
                    setIsLoggedIn(true);
                }
                else{
                    localStorage.removeItem("userToken");
                }
            }) 
        }
    }, [isLoggedIn]);

    return ( user.id ? (
        <AppContext.Provider value={{isLoggedIn, setIsLoggedIn, user, setUser}}>
            <BrowserRouter>
                <Header/>
                {/* 메인페이지 */}
                <Route path="/" exact={true} component={Home}/>

                {/* 로그아웃 */}
                <Route path="/logout" exact component={Login}/>
                {/* 내정보 */}
                <Route path="/info/index" component={Info_index}/>
                {/* 의료정보 */}
                <Route path="/info/medical_info" component={Info_medical}/>
                {/* 운전점수 */}
                <Route path="/info/drive_score" exact component={Info_drive}/>
                {/* 빅데이터 자료실 */}
                <Route path="/bigdata" component={Bigdata}/>

                <Route path="/products" exact component={Product}/>
                <Route path="/products/more" exact component={More}/>
                <Route path="/products/buy"  component={Buy}/>
                {/* <Route path="/products/buy/completed"  component={Completed}/> */}
                <Route path="/products/control" exact component={Control}/>
                <Route path="/products/users" exact component={Users}/>

                <Route path="/boards/questions" component={Board}/>

                <Footer/>
            </BrowserRouter>
        </AppContext.Provider>
    ) : (
        <AppContext.Provider value={{isLoggedIn, setIsLoggedIn, user, setUser}}>
            <BrowserRouter>
                <Header/>
                {/* 메인페이지 */}
                <Route path="/" exact={true} component={Home}/>
                {/* 로그인 페이지 */}
                <Route path="/auth/login" exact component={Login}/>
                {/* 회원가입 페이지 */}
                <Route path="/auth/register" exact component={Login}/>
                {/* 빅데이터 자료실 */}
                <Route path="/bigdata" component={Bigdata}/>

                <Route path="/products" exact component={Product}/>
                <Route path="/products/more" exact component={More}/>
                <Route path="/products/buy" exact component={Buy}/>
                
                {/* <Route path="/products/buy/completed" exact component={Completed}/> */}

                <Route path="/products/control" exact component={Control}/>
                <Route path="/products/users" exact component={Users}/>

                <Route path="/boards/questions" exact component={Board}/>

                {/* <Route path="/board/review" exact component={Review}/> */}


                <Footer/>
            </BrowserRouter>
        </AppContext.Provider>
        )
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
