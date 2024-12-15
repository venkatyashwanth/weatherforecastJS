const CurrentWeather = ({ data }) => {
    const {
        weather: [currentWeather],
        main: { temp, feels_like, temp_min, temp_max, humidity },
        wind: { speed }
    } = data;
    console.log(speed)

    return (
        <div>
            Wind Speed = {speed}
        </div>
    )
}

export default CurrentWeather