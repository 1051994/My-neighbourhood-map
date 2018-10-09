import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";


// class InformationMap  if window loaded=false  call function error
class About_Map extends Component {
  componentDidMount() {
    window.Loaded = false;
    setTimeout(() => {
      if (!window.Loaded) {
        this.props.error();
      }
      else {
        window.alert("Error While Loading");
      }
    }, 8000);
  }

  render() {
    return <div

       className='containerMap'>
       <CM
        googleMapURL='https://maps.googleapis.com/maps/api/geocode/json?address=Sharm%20El-Sheikh,Egypt&language=en&key=AIzaSyBMsiraNHO17myp7iRIhMmn1ZLIjEFpuOA&callback=initMap'
        Marker_Apear={this.props.Loc_List.length > 0}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        loadingElement={<div style={{ height: `100%` }} />}
        Exit_win={this.props.Exit_win}
        Marker_Click={this.props.Marker_Click}
        Loc_List={this.props.Loc_List}

      />
     
    </div>;
  }
}

export default About_Map ;

let  CM = withScriptjs(withGoogleMap(props => {
    return <GoogleMap
      defaultOptions={{scrollwheel: false}}
      defaultZoom={8}
      defaultCenter={props.Loc_List.length > 1 ? props.Loc_List[0] : {lat:  27.9158175lng 34.3299505}
      onClick={props.Exit_win}
      >
      {props.Marker_Apear && (props.Loc_List.map((Place, Element) =>
        <Marker
          key={Element}
          position={Place}
          animation={Place.clicked ? window.google.maps.Animation.BOUNCE : 0}
          onClick={() => {props.Marker_Click(Element)}} /> ))
      }
    </GoogleMap>
    
  }
))
