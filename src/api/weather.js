import { API_CONFIG } from "./config";

class WeatherAPI {
    createUrl(endpoint, params) {
        const searchParams = new URLSearchParams({
            appid: API_CONFIG.API_KEY, ...params
        })
        return `${endpoint}?${searchParams.toString()}`
    }

    async fetchData(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Weather API Error: ${response.statusText}`);
        }
        return response.json();
    }

    async getCurrentWeather({ lat, lon }) {
        const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`, {
            lat: lat.toString(),
            lon: lon.toString(),
            units: API_CONFIG.DEFAULT_PARAMS.units
        });
        return this.fetchData(url);
    }

    async reverseGeocode({ lat, lon }){
        const url = this.createUrl(`${API_CONFIG.GEO}/reverse`, {
            lat: lat.toString(),
            lon: lon.toString(),
            limits: 1
        })
        return this.fetchData(url);
    }
}

export const weatherAPI = new WeatherAPI();