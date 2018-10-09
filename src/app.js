import React, { Component } from 'react'
import About-Loc from './info';
import about-map from './map-info';
import './app.css'
import About-locscreen from './show';
import axios from 'axios'


class App extends component
{

  state = {
    venues: []
  }
componentDidMount()
{
this.getVenues()
	this.renderMap()

}
renderMap = () => {
loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBMsiraNHO17myp7iRIhMmn1ZLIjEFpuOA&callback=initMap")	

window.initMap = this.initMap
}

getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "DFILIPIMPDVFCA0ZXMHYSZMITBDU2CJKGJA1Z0ZKBZU10T2N",
      client_secret: "3PECO0LM3ANJHUV5VOZHZKDP1WFZFFGXN5ZV24XG412HOBIF",
      query: "shops",
      near: "Sydney",
      v: "YYYYMMDD"
    }
axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items
        }, this.renderMap())
      })
      .catch(error => {
        console.log("ERROR!! " + error)
      })

  }

  initMap = () => {

    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat:  40.74,lng: -73.985},
      zoom: 8
    })

    // Create An InfoWindow
    var infowindow = new window.google.maps.InfoWindow()

    // Display Dynamic Markers
    this.state.venues.map(myVenue => {

      var contentString = `${myVenue.venue.name}`

      // Create A Marker
      var marker = new window.google.maps.Marker({
        position: {lat: myVenue.venue.location.lat , lng: myVenue.venue.location.lng},
        map: map,
        title: myVenue.venue.name
      })
    // Create A Map

      // Click on A Marker!
      marker.addListener('click', function() {

        // Change the content
        infowindow.setContent(contentString)

        // Open An InfoWindow
        infowindow.open(map, marker)
      })

    })

    

  }

  render() {
    return (
      <main>
        <div id="map"></div>
      </main>
    )
  }
}

function loadScript(url) {
  var index  = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default App;
