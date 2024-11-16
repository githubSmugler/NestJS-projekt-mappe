import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeatherEntity } from './weather.entity';
import { WeatherService } from './weather.service';
import { WeatherResponse, Location, Current } from './weather-response.interface';

@Injectable()
export class WeatherJobService implements OnModuleInit {
  private readonly logger = new Logger(WeatherJobService.name);

  constructor(
    private readonly weatherService: WeatherService,
    @InjectRepository(WeatherEntity)
    private readonly weatherRepository: Repository<WeatherEntity>,
  ) {}

  /**
   * Henter og gemmer vejrdata fra API'et
   */
  async fetchWeatherData(): Promise<void> {
    try {
      this.logger.log('Henter vejrdata fra API...');
      const weather: WeatherResponse = await this.weatherService.getWeather();

      if (weather?.location && weather?.current) {
        this.logger.log('Hentede vejrdata:', weather);

        // Gem kun relevante data
        await this.saveWeatherData(weather.location, weather.current);
      } else {
        this.logger.error('Ufuldstændig data modtaget fra API.');
      }
    } catch (error) {
      this.logger.error('Fejl under hentning af vejrdata:', error.message);
    }
  }

  /**
   * Gemmer vejrdata i databasen
   * @param location Lokationsdata
   * @param current Aktuelt vejrdata
   */
  async saveWeatherData(location: Location, current: Current): Promise<void> {
    try {
      const weatherData = this.weatherRepository.create({
        // Location data
        name: location.name,
        region: location.region,
        country: location.country,
        lat: location.lat,
        lon: location.lon,
        tz_id: location.tz_id,
        localtime_epoch: location.localtime_epoch,
        localtime: location.localtime,

        // Current weather data
        last_updated_epoch: current.last_updated_epoch,
        last_updated: current.last_updated,
        temp_c: current.temp_c,
        temp_f: current.temp_f,
        is_day: current.is_day,
        condition_text: current.condition.text,
        condition_icon: current.condition.icon,
        condition_code: current.condition.code,
        wind_mph: current.wind_mph,
        wind_kph: current.wind_kph,
        wind_degree: current.wind_degree,
        wind_dir: current.wind_dir,
        pressure_mb: current.pressure_mb,
        pressure_in: current.pressure_in,
        precip_mm: current.precip_mm,
        precip_in: current.precip_in,
        humidity: current.humidity,
        cloud: current.cloud,
        feelslike_c: current.feelslike_c,
        feelslike_f: current.feelslike_f,
        windchill_c: current.windchill_c,
        windchill_f: current.windchill_f,
        heatindex_c: current.heatindex_c,
        heatindex_f: current.heatindex_f,
        dewpoint_c: current.dewpoint_c,
        dewpoint_f: current.dewpoint_f,
        vis_km: current.vis_km,
        vis_miles: current.vis_miles,
        uv: current.uv,
        gust_mph: current.gust_mph,
        gust_kph: current.gust_kph,
      });

      await this.weatherRepository.save(weatherData);
      this.logger.log('Vejrdata gemt i databasen:', weatherData);
    } catch (error) {
      this.logger.error('Fejl under gemning af vejrdata:', error.message);
    }
  }

  /**
   * Initialiserer modulet og opsætter tidsplan for API-kald
   */
  onModuleInit(): void {
    // Hent vejrdata straks ved opstart
    this.fetchWeatherData();

    // Opsæt tidsplan til at hente data hvert 5. minut
    setInterval(() => this.fetchWeatherData(), 300000); // 300000 ms = 5 minutter
  }
}
