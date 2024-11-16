import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WeatherService {
  async getWeather(): Promise<any> {
   /* console.log('Henter vejrdata fra API...');*/
    // Brug miljøvariabler
    const apiKey = process.env.WEATHER_API_KEY;
    const address = process.env.ADDRESS;

    if (!apiKey || !address) {
        console.error('Manglende API-nøgle eller adresse i miljøvariablerne');
        return;
      }

    // Byg URL'en dynamisk
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${address}`;

    try {
      const response = await axios.get(url);
      return response.data; // Returner vejrdata
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
      throw error;
    }
  }
}
