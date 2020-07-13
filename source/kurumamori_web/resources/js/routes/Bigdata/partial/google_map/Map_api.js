import React, { useContext } from 'react';
import GoogleMapReact from 'google-map-react';
import { BigdataContext } from "../../BigdataContainer";

const AnyReactComponent = ({img_color}) => <img src={`/icon/${img_color}_map_icon.png`}/>

export const Map_api = () => {
    const {
        action,
        day_7_drive_detection,
    } = useContext(BigdataContext);

    const location = [];
    const location_color = [];
    //1차배열은 날짜 2차배열은 값
    // console.log(day_7_drive_detection);
    if(day_7_drive_detection[0]){

        for(var i = 0; i < day_7_drive_detection.length; i++){
            if(day_7_drive_detection[i] != null){
                for(var j = 0; j < day_7_drive_detection[i].length; j++){          
                    if(day_7_drive_detection[i][j].bool_sleep && action == "sleep"){
                        location.push({
                            lat : Number(day_7_drive_detection[i][j].latitude), 
                            lng : Number(day_7_drive_detection[i][j].longitude)
                        });   
                        location_color.push("blue");  //신고 : red
                    } 
                    else if(day_7_drive_detection[i][j].bool_report && action == "accident"){
                        location.push({
                            lat : Number(day_7_drive_detection[i][j].latitude), 
                            lng : Number(day_7_drive_detection[i][j].longitude)
                        });   
                        location_color.push("red");  //신고 : red
                    } 
                    else if(day_7_drive_detection[i][j].bool_sudden_acceleration && action == "sudden"){
                        location.push({
                            lat : Number(day_7_drive_detection[i][j].latitude), 
                            lng : Number(day_7_drive_detection[i][j].longitude)
                        });   
                        location_color.push("orange");  //가속 : orange
                    } 
                    else if(day_7_drive_detection[i][j].bool_sudden_stop && action == "sudden"){
                        location.push({
                            lat : Number(day_7_drive_detection[i][j].latitude), 
                            lng : Number(day_7_drive_detection[i][j].longitude)
                        });   
                        location_color.push("green");  //감속 : green
                    } 
                }
            }
            
        }
    }
    return (
    <GoogleMapReact
        bootstrapURLKeys={{key:process.env.MIX_GCP_API_KEY}}
        defaultCenter={{
            lat: location[0] ? location[0].lat : 37.3857469,
            lng: location[0] ? location[0].lng : 127.245579
            }}
        defaultZoom={8}
    >
        {location && location.map( (value, index) => {
            return (
            <AnyReactComponent
                key={index}
                lat={location[index].lat}
                lng={location[index].lng}
                img_color={location_color[index]}
            />
            )
        })}
        

    </GoogleMapReact>
    )
} 