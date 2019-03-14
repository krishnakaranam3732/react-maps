import React from 'react';
import './map.css';
import { MDBCard, MDBListGroup, MDBListGroupItem, MDBRow, MDBCol } from "mdbreact";


export default class Setup extends React.Component {

  render() {
    return (
        <div>
            <h2> Welcome to the UI of <b>Search With Google Maps Places API</b> </h2>
            <h4> Instructions to setup the application locally </h4>
            <br></br>
            <MDBRow className="mb-4" style={{bottom:"40px"}}>
            <MDBCol>
            </MDBCol>
            <MDBCol>
                <MDBCard style={{ width: "22rem", marginTop: "-1rem" }}>
                    <MDBListGroup>
                        <MDBListGroupItem>Open the folder react-maps in the terminal</MDBListGroupItem>
                        <MDBListGroupItem>execute command: npm install</MDBListGroupItem>
                        <MDBListGroupItem>execute command: npm run build</MDBListGroupItem>
                        <MDBListGroupItem>execute command: npm start</MDBListGroupItem>
                        <MDBListGroupItem>headover to http://localhost:3000/</MDBListGroupItem>
                    </MDBListGroup>
                </MDBCard>
            </MDBCol>
            <MDBCol>
            </MDBCol>
        </MDBRow>
        <br></br>
        <h4> All ready to explore the application. Go Ahead!</h4>
            
        </div>
    );
  }
};