import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchdata = async (country) => {
    let changeableUrl = url;

    if(country) {
        changeableUrl = `${url}/countries/${country}`;
    }

    try {
        const {data: {confirmed, recovered, deaths, lastUpdate}} = await axios.get(changeableUrl);

        return {
            confirmed,
            recovered,
            deaths,
            lastUpdate
        };

    } catch (error) {
        alert('Erro ao carregar os dados')
    }
}

export const fetchDailyData = async () => {
    try {
        const {data} = await axios.get(`${url}/daily`);

        const modifildData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));

        return modifildData
    } catch (error) {
        alert('Dados não encontrados');
    }
} 

export const fetchCountries = async () => {
    try {
        const {data:{countries}} = await axios.get(`${url}/countries`);

        return countries.map((country) => country.name)

    } catch (error) {
        alert('dados não encontrados')
    }
}