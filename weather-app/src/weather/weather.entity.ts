import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WeatherEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // Location data
  @Column()
  name: string;

  @Column()
  region: string;

  @Column()
  country: string;

  @Column('float')
  lat: number;

  @Column('float')
  lon: number;

  @Column()
  tz_id: string;

  @Column('bigint')
  localtime_epoch: number;

  @Column()
  localtime: string;

  // Current weather data
  @Column('bigint')
  last_updated_epoch: number;

  @Column()
  last_updated: string;

  @Column('float')
  temp_c: number;

  @Column('float')
  temp_f: number;

  @Column('int')
  is_day: number;

  @Column()
  condition_text: string;

  @Column()
  condition_icon: string;

  @Column('int')
  condition_code: number;

  @Column('float')
  wind_mph: number;

  @Column('float')
  wind_kph: number;

  @Column('int')
  wind_degree: number;

  @Column()
  wind_dir: string;

  @Column('float')
  pressure_mb: number;

  @Column('float')
  pressure_in: number;

  @Column('float')
  precip_mm: number;

  @Column('float')
  precip_in: number;

  @Column('int')
  humidity: number;

  @Column('int')
  cloud: number;

  @Column('float')
  feelslike_c: number;

  @Column('float')
  feelslike_f: number;

  @Column('float')
  windchill_c: number;

  @Column('float')
  windchill_f: number;

  @Column('float')
  heatindex_c: number;

  @Column('float')
  heatindex_f: number;

  @Column('float')
  dewpoint_c: number;

  @Column('float')
  dewpoint_f: number;

  @Column('float')
  vis_km: number;

  @Column('float')
  vis_miles: number;

  @Column('float')
  uv: number;

  @Column('float')
  gust_mph: number;

  @Column('float')
  gust_kph: number;
}
