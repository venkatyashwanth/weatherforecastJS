import UseGeolocation from '@/hooks/use-geolocation'
import { useReverseGeocodeQuery, useWeatherQuery } from '@/hooks/use-weather';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle, MapPin, RefreshCw } from 'lucide-react';
import { WeatherSkeleton } from '@/components/loading-skeleton';
import CurrentWeather from '@/components/current-weather';

const WeatherDashboard = () => {
  const { coordinates, error: locationError, getLocation, isLoading: locationLoading } = UseGeolocation();

  const weatherQuery = useWeatherQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);


  const handleRefresh = () => {
    getLocation();
  }

  if (locationLoading) {
    return <WeatherSkeleton />
  }
  if (locationError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locationError}</p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (!coordinates) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locationError}</p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (!weatherQuery.data) {
    return <WeatherSkeleton />
  }


  const locationName = locationQuery.data?.[0];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button variant={'outline'}
          size={"icon"}
          onClick={handleRefresh}
        >
          <RefreshCw className={`h-4 w-4`} />
        </Button>
      </div>

      <div>
        <CurrentWeather data={weatherQuery.data} locationName={locationName} />
      </div>
    </div>
  )
}

export default WeatherDashboard