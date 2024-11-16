import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherEntity } from './weather/weather.entity';
import { WeatherJobService } from './weather/weather-job.service';
import { WeatherService } from './weather/weather.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'weather.sqlite',
      synchronize: true, // Kun til udvikling!
      entities: [WeatherEntity],
    }),
    TypeOrmModule.forFeature([WeatherEntity]),
  ],
  controllers: [AppController],
  providers: [AppService, WeatherJobService, WeatherService],
})
export class AppModule {}
