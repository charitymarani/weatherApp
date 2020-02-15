const express = require ('express');
const cors = require('cors');
const { DateTime } = require('luxon')
const axios =require('axios')
const dotenv = require('dotenv');

dotenv.config()


const app = express();

app.use(cors());

const ipKey = process.env.IPSTACK_KEY
const darkSkyKey = process.env.DARK_SKY_KEY


const darkSkyBaseUrl = `https://api.darksky.net/forecast`;
const ipBaseUrl =`http://api.ipstack.com`


const getLocation = async (url)=>{
  
  let res = await axios.get(url)
  console.log('=======',res)
  return res.data
}
const getWeather = async (url)=>{
  let res = await axios.get(url)
  return res.data
}
app.get('/location', async (req, res) => {
  const ip = req.query.ip
  const ipUrl = `${ipBaseUrl}/${ip}?access_key=${ipKey}`

  // Get the latitude and longitude of different locations from the Geocoding API
  const ipResponse = await getLocation(ipUrl)
  console.log('=======',ipResponse)
  const latitude = ipResponse.latitude
  const longitude = ipResponse.longitude
  const city = ipResponse.city
  let location;
  let darkSkyUrl;
  if(!req.query.time){
    location = latitude + ',' + longitude
    darkSkyUrl = `${darkSkyBaseUrl}/${darkSkyKey}/${location}`
  }
  else{
    let time = req.query.time
    location = latitude + ',' + longitude + ',' + time
    darkSkyUrl = `${darkSkyBaseUrl}/${darkSkyKey}/${location}`

  }
  //Get the weather details of different locations from the Dark Sky API
  const weather = await getWeather(darkSkyUrl)
  if(weather){
    const time = weather.currently.time
          const formattedTime = DateTime.fromSeconds(time)
            .setZone(weather.timezone)
            .toFormat('DDDD t')
    const temperature = weather.currently.temperature
    let currentSummary = weather.currently.summary
    const humidity = weather.currently.humidity
    const windSpeed = weather.currently.windSpeed
    const cloudCover = weather.currently.cloudCover
    const icon = weather.currently.icon

    const data ={
      temperature,
      currentSummary,
      formattedTime,
      city,
      humidity,
      windSpeed,
      cloudCover,
      icon
    }
     
            
    //Return the response

    res.status(200).json({
      message: 'Data loaded successfully',
      data
    })
  }
  else{
    res.status(500).json({
      message: 'Something went wrong',
    })
  }
  })

// catch all routers
app.use('*', (req, res) => res.status(404).json({
  message: 'Not Found'
}));
module.exports = {app,getLocation,getWeather};