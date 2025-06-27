import CurrentWeather from "@/components/CurrentWeather";
import HourlyTemperature from "@/components/HourlyTemperature";
import WeatherSkeleton from "@/components/loading_skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button"
import { useGeolocation } from "@/hooks/use_geolocation"
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from "@/hooks/use_weather";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react"

const WeatherDashboard = () => {
const {
  coordinates,
  error:locationError,
  getLocation,
  isLoading: locationLoading,
}= useGeolocation();

const weatherQuery = useWeatherQuery(coordinates);
const forecastQuery = useForecastQuery(coordinates);
const locationQuery = useReverseGeocodeQuery(coordinates);

console.log(weatherQuery);
console.log(forecastQuery);
console.log(locationQuery);


const handleRefresh = () => {
  getLocation();

  if (coordinates) {
    weatherQuery.refetch();
    forecastQuery.refetch();
    locationQuery.refetch();
  }
};

if( locationLoading) {
  return <WeatherSkeleton/>
}

if(locationError){
  return(
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4"/>
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>{locationError}</p>
        <Button onClick={getLocation} variant={"outline"} className="w-fit">
          <MapPin className="h-4 w-4 mr-2"/>
          Enable Location
        </Button>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  );
}

if(!coordinates){
  return(
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>Please enable location access to see your local weather.</p>
        <Button onClick={getLocation} variant={"outline"} className="w-fit">
          <MapPin className="h-4 w-4 mr-2"/>
          Enable Location
        </Button>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  );
}

const locationName = locationQuery.data?.[0];

if(weatherQuery.error || forecastQuery.error || locationQuery.error) {
    return(
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4"/>
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>Failed to fetch weather data.Please try again.</p>
        <Button onClick={handleRefresh} variant={"outline"} className="w-fit">
          <RefreshCw className="h-4 w-4 mr-2"/>
          retry
        </Button>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  );
}

if(!weatherQuery.data || !forecastQuery.data) {
  return <WeatherSkeleton/>
}

  return (
    <div className="space-y-4">
      {/* Favorite Cities */}

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button variant="outline"
        size={"icon"}
        onClick={handleRefresh}
        disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCw className={`h-4 w-4 ${weatherQuery.isFetching ? "animate-spin" : ""}`}/>
        </Button>
      </div>

      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
        {locationName &&  <CurrentWeather 
          data={weatherQuery.data} 
          locationName={locationName } 
        />}

        <HourlyTemperature data= {forecastQuery.data}/>
        </div>

      <div>
        {/* details */}
        {/* forecast*/}
      </div>
      </div>
    </div>
  )
}

export default WeatherDashboard