import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBRow, MDBIcon } from "mdbreact";
import './map.css';
import { Link } from 'react-router-dom';
export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      map : null,
      zoom: 14,
      maptype: 'roadmap',
      latitude: 47.618580, 
      longitude: -122.341810,
      marker : null,
      location: false,
      places: [],
      markers: [],
      selected_location: '',
      selected_location_id: '',
      inputNode: null
    }
    this.showPosition = this.showPosition.bind(this);
    this.setPlaces = this.setPlaces.bind(this);
    this.isActive = this.isActive.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  showPosition(position) {
    this.setState({latitude: position.coords.latitude,
                   longitude: position.coords.longitude,
                   location: true,
                   inputNode: null });
    this.componentDidMount();
  }

  setPlaces(places) {
    this.setState({places: places});
  }

  handleClick(id) {
    this.setState({selected_location_id:id});
    this.state.map.setZoom(16);
    var loc = this.state.places.find(x => x.id === id).geometry.location;
    this.state.map.setCenter(loc);
  }

  isActive(id) {
    return this.state.selected_location_id === id;
  }

  componentDidMount() {
    const self = this;
    if ( !this.state.location && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    }

    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: this.state.latitude, lng: this.state.longitude},
      zoom: this.state.zoom,
      mapTypeId: this.state.maptype,
    });

    this.setState({marker : new window.google.maps.Marker({
      map: map,
      position: {lat: this.state.latitude, lng: this.state.longitude},
    })});
    
    map.addListener('zoom_changed', () => {
      this.setState({
        zoom: map.getZoom(),
      });
    });
    
    // initialize the autocomplete functionality using the #pac-input input box
    if(this.state.inputNode == null){
      this.setState({inputNode : document.getElementById('pac-input')});
    }
    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(this.state.inputNode);
    let searchBox  = new window.google.maps.places.SearchBox(this.state.inputNode);
    
    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    var placeSearch = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();
      self.setState({places: places});
      if (places.length === 0) {
        return;
      }
      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new window.google.maps.LatLngBounds();
      places.forEach(function(place) {

        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        placeSearch.push(place);
        var icon = {
          url: place.icon,
          size: new window.google.maps.Size(71, 71),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(17, 34),
          scaledSize: new window.google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        var mark = new window.google.maps.Marker({
          map: map,
          icon: icon,
          title: place.id,
          position: place.geometry.location
        })

        mark.addListener('click', function() {
          map.setZoom(16);
          map.setCenter(mark.getPosition());
          self.setState({marker: mark, selected_location: mark.position});
          var id = self.state.places.find(x => x.geometry.location.lat() === self.state.selected_location.lat() && 
                                               x.geometry.location.lng() === self.state.selected_location.lng()).id;
          self.setState({selected_location_id: id});
        });

        markers.push(mark);

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
      self.setState({map:map});
    });
  }

  render() {
    let active = this.isActive;
    let handleClick = this.handleClick;
    return (
        <div>
          <input onClick={this.setPosition} id='pac-input' style = {{ marginLeft: "6vw", outline: "none",
                 width: "20vw", fontSize:"16px", fontWeight: "300", padding: "0 11px 0 13px",
                 textOverflow: "ellipsis", fontFamily: "Roboto", backgroundColor: "#fff",
                 marginTop: "8px", border: "1px solid transparent", borderRadius: "2px 0 0 2px",
                 boxSizing: "border-box", height: "32px", boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)" }} 
            type="text" placeholder="   Search Places Here" aria-label="Search" />
          <div id='map' />
          <div className="results">
            <MDBListGroup>
            <MDBRow>
            {this.state.places.map(function(place){
              return (
                    <MDBListGroupItem
                    active={ active(place.id) }
                    style={{width:"20vw", left:"8.5vw"}} key={place.id}
                    onClick={() => { handleClick(place.id) }}
                    >
                    <div className="d-flex w-100 justify-content-between">
                    <MDBRow>
                      <h5 className="mb-1">{place.name}</h5>
                      <Link className="mb-1 circle" to={{ pathname: '/street', state: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() } }}>
                        <MDBIcon icon="fas fa-globe-americas" style = {{paddingTop: "0.55vw", color: "black"}} />
                      </Link>
                    </MDBRow>
                    </div>
                    <p className="mb-1">{place.formatted_address}</p>
                  </MDBListGroupItem>
                )
            })}              
            </MDBRow>
            </MDBListGroup>
          </div>
      </div>
    );
  }
};