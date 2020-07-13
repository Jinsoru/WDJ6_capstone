import React, {useContext, useState, useEffect} from "react";
import {AppContext} from "../../components/App";
import Axios from "axios";
import Geocode from "react-geocode";
import ProfileView from "./ProfileView";



export default ( {history} ) => {
    const { user } = useContext(AppContext);
    // const [profile, setProfile] = useState("");         //프로필
    // const [product, setProduct] = useState("");         //등록 제품
    // const [product_buy, setProduct_buy] = useState("")  //등록 제품(구입날짜 때문에 (유저가 안샀는 경우도 있으니))
    // const [user_product_buy_key, setUser_product_buy_key] = useState([]);  //구입한 제품의 키
    // const [boards, setBoards] = useState([]);     //작성한 게시글
    // const [board_categories, setBoard_categories] = useState([]);   //작성한 게시글의 카테고리
    // const [board_comments, setBoards_comments] = useState([]);      //작성한 게시글의 댓글
    
    const [reports, setReports] = useState([]);   //신고 위치
    const [data, setData] = useState("");
    const [product_action, setProduct_action] = useState("create");
    const [product_key_input, setProduct_key_input] = useState("");
    const [error_text, setError_text] = useState("");
    const [arr, setArr] = useState([]);
    Geocode.setApiKey(process.env.MIX_GCP_API_KEY);
    Geocode.setLanguage("ko");
    //값 받기



    useEffect(()=>{
        
        console.log("profile useEffect");
        Axios.get(`/info/index/${user.id}`).then(res => {
            setData(res.data);

            if(res.data.product){
                setProduct_action("update");
            }

            // 해치움 ㅋㅋ gps
            if(res.data.reports){
                // const arr = [];
                for(var i = 0; i < (res.data.reports.data).length; i++){
                    Geocode.fromLatLng(res.data.reports.data[i].latitude, res.data.reports.data[i].longitude).then(
                        res => {
                            setArr(arr.push(res.results[0].formatted_address))
                            setReports(arr);
                        }
                    )
                }
            }

        });
    }, []);
    // console.log(data);
    //제품 생성
    const create_product = () => {
        const url = "/products";
        const body = {
            user_id : user.id,
            product_key : product_key_input
        }
        const config = {
            headers: {
                'Content-Type' : 'application/json'
              }
        }
        return Axios.post(url, body, config).then(res => {
            if(res.data){
                window.alert("제품을 등록하였습니다.");
                // history.push("/info/index");
                window.location.reload();
            }
            else{
                setError_text("값을 잘 못 입력하였거나 이미 사용중인 key입니다. 다시 확인해 주세요.");

            }
        })
    }

    //제품 수정
    const update_product = () => {
        const url = `/products/${data.product.id}`;
        const body = {
            user_id : user.id,
            product_key : product_key_input
        }
        const config = {
            'Content-Type' : 'application/json'
        }
        return Axios.put(url, body, config).then(res => {
            if(res.data){
                window.alert("제품을 재등록하였습니다.");
                // history.push("/info/index");
                window.location.reload();
            }
            else{
                setError_text("잘못된 key입니다. 다시 확인해 주세요.");

            }
        })

    }

    //제품 삭제
    const delete_product = () => {
        if(window.confirm("제품등록을 취소하시겠습니까?")){
            const url = `/products/${data.product.id}`;
            return Axios.delete(url).then(res => {
                window.location.reload();
                // history.push('/info/index');
            })
        }
    }

    //제출 폼
    const onSubmit = (del = null) => {
        if(del == "delete"){
            delete_product();
        }
        else if(product_action == "create"){
            create_product();
        }
        else if(product_action == "update"){
            update_product();
        }
    }

    return (
        <ProfileView
            history={history}
            data={data}
            setProduct_key_input={setProduct_key_input}
            error_text={error_text}
            onSubmit={onSubmit}
            reports={reports}
            setData={setData}
        />        
    )
}