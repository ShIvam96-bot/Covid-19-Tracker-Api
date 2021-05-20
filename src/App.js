import React, {useState, useEffect} from 'react';
import './App.css';
import { MenuItem, FormControl, Select, CardContent,Card } from '@material-ui/core';
import InfoBox from "./InfoBox.js";
import Table from "./Table.js";
import "leaflet/dist/leaflet.css";
import {sortData} from "./util.js";

function App() {
  const [countries,  setCountries] = useState([]);
const  [country ,setCountry] = useState("Worldwide");
const [countryInfo, setCountryInfo] = useState({});
const [tableData, setTableData] = useState([]);


useEffect(() => {
  fetch("https:disease.sh/v3/covid-19/all")
  .then((response) => response.json())
  .then((data) => {
    setCountryInfo(data);
  });
},[]);

useEffect(() => {
const getCountriesData = async () => {
  await fetch("https://disease.sh/v3/covid-19/countries")
  .then((response) => response.json())
  .then((data) => {
    const countries = data.map((country) => ({
      name : country.country,
      value: country.countryInfo.iso2,
    }));

    const sortedData = sortData(data);
    setTableData(data);
    setCountries(countries);
  });
};
getCountriesData();
 }, []);

 const onCountryChange =async(event) =>{
   const countryCode = event.target.value;
   setCountry(countryCode);

const url= countryCode === "worlwide" ? "https://disease.sh/v3/covid-19/all" :
 `https://disease.sh/v3/covid-19/countries/${countryCode}`;

 await fetch(url)
 .then(response => response.json())
 .then(data => {
   setCountry(countryCode);
   setCountryInfo(data);
  {/* setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
 setMapZoom(4);*/}
 }
  )
 };


  return (
    <div className="app">
    <div className="app__left">
    <div className="app__header">
      <h1>Covid 19 Tracker</h1>
      <FormControl className="app__dropdown">
      <Select
      variant ="outlined"
      onChange={onCountryChange}
      value ={country}>
      <MenuItem value="Worldwide"> Worldwide</MenuItem>
  {countries.map((country) => ( <MenuItem value ={country.value}>{country.name}
    </MenuItem>))}
      </Select>
      </FormControl>
      </div>

      <div className="app__stats">
      <InfoBox
      title="Coronavirus Cases" cases={countryInfo.todayCases} total ={countryInfo.cases}/>
      <InfoBox 
             title="recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
      <InfoBox
             title="Deaths" cases ={countryInfo.todayDeaths} total={countryInfo.deaths}/>
       </div>

{/*<Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom}/>*/}
</div>
<Card className="app__right">
<CardContent>
<h3> Live cases by country</h3>
{/* table*/}
<Table countries={tableData}/>
 {/* <LineGraph casesType={casesType}/>*/}
{/* graph*/}
</CardContent>
</Card>
    </div>
  );
}

export default App;
