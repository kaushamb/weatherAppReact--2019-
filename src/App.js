
import React from "react";

import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";
import axios from 'axios';
import {countries} from 'country-data';

const API_KEY = "3e9d3d4a1780f25c08ee646658369f20";

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async(e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
   // const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
   // const data = await api_call.json();
   
   console.log(countries["TW"].name);
   console.log("hii");

   axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`).then(response => { 
    console.log(response)
    const data=response.data;

    if (city && country) {
      console.log(data);
      console.log("hiii");
      console.log(data.message);
      if (isNaN(city)===false||isNaN(country)===false){
        this.setState({
          temperature: undefined,
          city: undefined,
          country: undefined,
          humidity: undefined,
          description: undefined,
          error: " enter valid values"
        });
        
      }else{console.log(data.message);
        
      if(data.message==="city not found"){
        this.setState({
          temperature: undefined,
          city: undefined,
          country: undefined,
          humidity: undefined,
          description: undefined,
          error: "wrong Entries! city not found."
        });
      }else{
          let a=countries[data.sys.country].name;
          if(a.toLowerCase()===country.toLowerCase()&&data.main.temp){
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });}else{this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "country is incorrect."
      });}
    //}
    }}
    } else {
      if(city){
        if(country){}
        else{this.setState({
            temperature: undefined,
            city: undefined,
            country: undefined,
            humidity: undefined,
            description: undefined,
            error: "Please enter the country."
          });}
      }else{
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the city."
      });
    }
    }
  })
  .catch(error => {
      //console.log(error.response);
       const data=error.response;
      if (city && country) {
        console.log(data);
        console.log("hello");
        console.log(error.message);
        if (isNaN(city)===false||isNaN(country)===false){
          this.setState({
            temperature: undefined,
            city: undefined,
            country: undefined,
            humidity: undefined,
            description: undefined,
            error: " enter valid values"
          });
          
        }else{//console.log(data.message);
        if(error.message==="Request failed with status code 404"){
          this.setState({
            temperature: undefined,
            city: undefined,
            country: undefined,
            humidity: undefined,
            description: undefined,
            error: "wrong Entries! city not found."
          });
        }else{
        /*this.setState({
          temperature: data.main.temp,
          city: data.name,
          country: data.sys.country,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          error: ""
           //#e67e22    #e74c3c
        });*/
      }}
      } else {
        
        if(city){
          if(country){}
          else{this.setState({
              temperature: undefined,
              city: undefined,
              country: undefined,
              humidity: undefined,
              description: undefined,
              error: "Please enter the country."
            });}
        }else{
        this.setState({
          temperature: undefined,
          city: undefined,
          country: undefined,
          humidity: undefined,
          description: undefined,
          error: "Please enter the city."
        });
      }
      }
  });
    
  }
  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-sm-5 col-xs-12 title-container">
                    <Titles />
                </div>
                <div className="col-sm-7 col-xs-12 form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather 
                    temperature={this.state.temperature} 
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;