import React from 'react';
import './map.css';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol, MDBRow } from "mdbreact";


export default class Page extends React.Component {

  render() {
    return (
        <div>
            <h2> Welcome to the UI of <b>Search With Google Maps Places API</b> </h2>
            <br></br>
            <MDBRow className="mb-4" style={{bottom:"40px"}}>
            <MDBCol sm="4">
            <MDBCard>
                <MDBCardBody>
                <MDBCardTitle>Step 1</MDBCardTitle>
                <MDBCardText>
                    The Google Map UI is present under the Map tab on the Navigation Bar.<br></br>
                    Don't forget to allow the web browser to access your location.<br></br>
                    The application takes in your location and searches nearby for queries.<br></br>
                </MDBCardText>
                </MDBCardBody>
            </MDBCard>
            </MDBCol>

            <MDBCol sm="4">
            <MDBCard>
                <MDBCardBody>
                <MDBCardTitle>Step 2</MDBCardTitle>
                <MDBCardText>
                    There is a searchbar at the top position in the Map for search queries.<br></br>
                    The search bar autocompletes most of your queries and selecting an autocomplete suggestion begins the search.<br></br>
                    The list of search results are populated under the Map. Selecting the result tab will take you to the location on the Map.<br></br>
                    You can also click on a marker to go to the location and details of the location will be in the selected result.<br></br>
                </MDBCardText>
                </MDBCardBody>
            </MDBCard>
            </MDBCol>

            <MDBCol sm="4">
            <MDBCard>
                <MDBCardBody>
                <MDBCardTitle>Step 3</MDBCardTitle>
                <MDBCardText>
                    The extra feature I implemented is to add Street View Functionality in the Application.<br></br>
                    After the search results are populated, Click on the globe icon next to the result name.<br></br>
                    This will open a Google Maps Street View at the result Location. Feel free to check out the surroundings.<br></br>
                </MDBCardText>
                </MDBCardBody>
            </MDBCard>
            </MDBCol>
        </MDBRow>
        <br></br>
        <h4> All ready to explore the application. Go Ahead!</h4>
            
        </div>
    );
  }
};