import React, { useContext } from 'react';
import GoogleMapReact from 'google-map-react';
import { DriveContext } from "../../DriveContainer";

const AnyReactComponent = ({img_color}) => <img src={`/icon/${img_color}_map_icon.png`}/>

export const Map_api = () => {
    const {
        day_5_drive_detection,
    } = useContext(DriveContext);
    // console.log(day_5_drive_detection);

    const location = [];
    const location_color = [];
    //1차배열은 날짜 2차배열은 값
    // console.log(day_5_drive_detection);
    if(day_5_drive_detection[0]){
        for(var i = 0; i < day_5_drive_detection[0].length; i++){
            location.push({
                lat : Number(day_5_drive_detection[0][i].latitude), 
                lng : Number(day_5_drive_detection[0][i].longitude)
            }); 
            if(day_5_drive_detection[0][i].bool_report) location_color.push("red");
            else if(day_5_drive_detection[0][i].bool_sleep) location_color.push("blue");
            else if(day_5_drive_detection[0][i].bool_sudden_acceleration) location_color.push("orange");
            else if(day_5_drive_detection[0][i].bool_sudden_stop) location_color.push("green");
        }
    }
    return (
    <GoogleMapReact
        bootstrapURLKeys={{key:process.env.MIX_GCP_API_KEY}}
        defaultCenter={{
            // lat: 59.95,
            // lng: 30.33
            lat: location[0] ? location[0].lat : 37.3857469,
            lng: location[0] ? location[0].lng : 127.245579
            }}
        defaultZoom={12}
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