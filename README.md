# Weather API Integration

Dette projekt er en NestJS-applikation, der integrerer med en vejr-API for at hente og gemme vejrinformation lokalt i en SQLite-database. Applikationen er konfigureret til at hente vejropdateringer hvert 5. minut og gemme både lokalitets- og vejrdata.

---

## 📋 Funktioner

- Henter vejropdateringer fra en ekstern API.
- Gemmer vejrinformation (både lokalitet og aktuelle data) i en SQLite-database.
- Planlagt dataindsamling via en sheduler hvert 5. minut.
- API-dokumentation og endpoints implementeret via NestJS.

---

## 🛠️ Opsætning og afvikling lokalt

### Forudsætninger

1. **Node.js** installeret (version 16 eller højere anbefales).
2. **Git** installeret.
3. **SQLite-database** (følger med projektet).
4. **Powershell** installeret

## 🛠️Projektstruktur
Følgende er hovedkomponenterne i projektet:

- **`src/weather-job.service.ts`**: Ansvarlig for at køre de planlagte opgaver, hente data fra API'et og gemme dem i databasen.  
- **`src/weather.service.ts`**: Håndterer API-kald til WeatherAPI.  
- **`src/weather.entity.ts`**: Definerer databasen entitet for gemte vejrdata.  
- **`src/app.module.ts`**: Applikationens hovedmodul, hvor alle services og moduler registreres.  


## 🛠️ Database: Entiteter og felter
Projektet bruger en SQLite-database (weather.db) til at gemme data. For at se de gemte data kan du bruge en SQLite-browser såsom:

DB Browser for SQLite - https://sqlitebrowser.org/

### WeatherEntity
Følgende data gemmes i databasen:

#### **Location-data**
- `name`: Navn på stedet.
- `region`: Region (f.eks. Hovedstaden).
- `country`: Land.
- `lat`: Breddegrad.
- `lon`: Længdegrad.
- `tz_id`: Tidszone.
- `localtime_epoch`: Lokal tidspunkt i epoch.
- `localtime`: Lokal tidspunkt i tekstformat.

#### **Current Weather-data**
- `last_updated_epoch`: Seneste opdateringstidspunkt i epoch.
- `last_updated`: Seneste opdateringstidspunkt i tekstformat.
- `temp_c`: Temperatur i Celsius.
- `temp_f`: Temperatur i Fahrenheit.
- `is_day`: Dag/nat indikator.
- `condition_text`: Beskrivelse af vejrforhold (f.eks. "Light drizzle").
- `condition_icon`: URL til vejrikon.
- `condition_code`: Kodet vejrforhold.
- `wind_mph`: Vindhastighed i mph.
- `wind_kph`: Vindhastighed i kph.
- `wind_degree`: Vindretning i grader.
- `wind_dir`: Vindretning (tekstformat).
- `pressure_mb`: Lufttryk i mb.
- `pressure_in`: Lufttryk i inches.
- `precip_mm`: Nedbør i mm.
- `precip_in`: Nedbør i inches.
- `humidity`: Luftfugtighed i %.
- `cloud`: Skydække i %.
- `feelslike_c`: Følt temperatur i Celsius.
- `feelslike_f`: Følt temperatur i Fahrenheit.
- `windchill_c`: Vindafkøling i Celsius.
- `windchill_f`: Vindafkøling i Fahrenheit.
- `heatindex_c`: Varmeindeks i Celsius.
- `heatindex_f`: Varmeindeks i Fahrenheit.
- `dewpoint_c`: Dugpunkt i Celsius.
- `dewpoint_f`: Dugpunkt i Fahrenheit.
- `vis_km`: Sigtbarhed i km.
- `vis_miles`: Sigtbarhed i miles.
- `uv`: UV-indeks.
- `gust_mph`: Vindstød i mph.
- `gust_kph`: Vindstød i kph.

