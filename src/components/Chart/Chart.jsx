import React, {useEffect, useState} from 'react'
import {Line, HorizontalBar} from 'react-chartjs-2'

import styles from './Chart.module.css'

import {fetchDailyData} from '../../api/index'

const Chart = ({data: {confirmed, recovered, deaths}, country}) => {

    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            setDailyData(await fetchDailyData());
        }

        fetchApi();
    }, []);

    const lineChart = (
        dailyData.length
            ?(
                <Line
                    data={{
                    labels: dailyData.map(({date}) => date),
                    datasets: [{
                        data: dailyData.map(({confirmed}) => confirmed),
                        label: 'Infectados',
                        borderColor: 'rgba(0,0, 255, 0.5)',
                        fill: false
                    }],

                    }}
                />): null
    );

    const barChar = (
        confirmed
            ?(
                <HorizontalBar
                    data={{
                        labels: ['Infectados', 'Recuperados', 'Mortos'],
                        datasets: [{
                            label: 'Pessoas',
                            backgroundColor: ['rgba(0,0, 255, 0.5)','rgba(0,255,0, 0.5)','rgba(255,0,0, 0.5)'],
                            data: [confirmed.value, recovered.value, deaths.value],
                        }]
                    }}
                    options={{
                        legend: {display: false},
                        title: {display: true, text: `Atual estado deste pais ${country}`},
                    }}
                />
            ): null
    );

    return (
        <div className={styles.container}>
            {country ? barChar : lineChart}
        </div>
    )
}

export default Chart
