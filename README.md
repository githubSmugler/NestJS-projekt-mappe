# Weather API Integration

Dette projekt er en NestJS-applikation, der integrerer med en vejr-API for at hente og gemme vejrinformation lokalt i en SQLite-database. Applikationen er konfigureret til at hente vejropdateringer hvert 5. minut og gemme både lokalitets- og vejrdata.

---

## 📋 Funktioner

- Henter vejropdateringer fra en ekstern API.
- Gemmer vejrinformation (både lokalitet og aktuelle data) i en SQLite-database.
- Planlagt dataindsamling via en scheduler hvert 5. minut.
- API-dokumentation og endpoints implementeret via NestJS.

---

## 🛠️ Opsætning og afvikling lokalt

### Forudsætninger

### Forudsætninger for at afvikle projektet lokalt
**Node.js:** Version 16 eller højere anbefales. Kan downloades fra Node.js officielle hjemmeside.
  
    **npm install** kommando skal afvikles for at indstallere projektets afhængigheder fra package.json filen

**Git:** Anvendes til at klone projektet og administrere versionsstyring. Kan downloades fra Gits officielle hjemmeside.

**SQLite-database:** Projektet bruger SQLite som database. Databasefilen database.sqlite oprettes automatisk ved første opstart.

**Powershell eller en tilsvarende terminal:**
På Windows: Powershell anbefales.
På macOS/Linux: Standard terminal kan bruges.

**Internetforbindelse:** Nødvendigt for at hente afhængigheder fra npm og til at foretage API-kald til WeatherAPI.

**WeatherAPI-nøgle:** En API-nøgle følger med projektet i .env filen.
  **Vejr APIet som benyttes er dette: https://www.weatherapi.com/** 

Projektet afvikles ved at hente kildekoden fra github. Herefter navigeres til projektets rod mappe: ...\NestJS projekt mappe\weather-app. Herfra kan projektet startes med en powershell kommando ved at afvikle kommandoen **npm run start**

## 🛠️Projektstruktur
Følgende er hovedkomponenterne i projektet:

- **`src/weather-job.service.ts`**: Ansvarlig for at køre de planlagte opgaver, hente data fra API'et og gemme dem i databasen.  
- **`src/weather.service.ts`**: Håndterer API-kald til WeatherAPI.  
- **`src/weather.entity.ts`**: Definerer databasens entitet for gemte vejrdata.  
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

## 🏛️ Arkitektur og Dataflow

Projektet er bygget på **NestJS**, et framework baseret på TypeScript. Arkitekturen følger en modulær struktur, der adskiller ansvar og letter vedligeholdelse og udvidelse.

### Dataflow

1. **Tidsplan og API-kald**:  
   - `WeatherJobService` kører periodiske opgaver ved hjælp af en **`setInterval`-funktion**, som initierer et kald til **WeatherAPI** gennem `WeatherService` hvert 5. minut.

2. **Modtagelse af data**:  
   - API'et returnerer en JSON-struktur, der indeholder både **lokationsdata** og **aktuelle vejrdata**.

3. **Validering og behandling**:  
   - `WeatherJobService` validerer og parser dataene fra API'et.
   - Kun relevante felter fra API-svaret gemmes for at reducere unødvendige data.

4. **Skrivning i databasen**:  
   - `WeatherJobService` bruger `TypeORM` til at gemme dataene i databasen via `WeatherEntity`.
   - Felter fra både lokationsdata og aktuelle vejrdata bliver mappet til entiteten og derefter persisteret i SQLite-databasen.

5. **Logging**:  
   - Alle nøgleprocesser, som succesfulde API-kald, datavalidering, og gemning i databasen, bliver logget via NestJS' **Logger**-modul. Eventuelle fejl håndteres og logges med detaljerede fejlbeskeder.

### Dataflowdiagram

```plaintext
+-------------------+
| WeatherJobService |
+-------------------+
         |
         v
+-------------------+
|  WeatherService   |
+-------------------+
         |
         v
+-------------------+
| WeatherAPI (Ekstern) |
+-------------------+
         |
         v
+-------------------+
|  WeatherEntity    |
+-------------------+
         |
         v
+-------------------+
|    SQLite DB      |
+-------------------+

