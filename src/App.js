import React from 'react';

import { Card, Chart, Country } from './components/index';
import styles from './App.module.css';

/* importando dados da api */
import {fetchdata} from './api/index';

import coronaImage from './images/logo.svg'

class App extends React.Component {

    state = {
        data: {}, 
        country: '',
    }

    async componentDidMount() {
        const fetcheddata = await fetchdata();

        this.setState({data: fetcheddata});
    }

    handleCountryChange = async (country) => {
        const fetcheddata = await fetchdata(country);
        console.log(fetcheddata);

        this.setState({data: fetcheddata, country: country});

    }

    render(){
        const {data, country} =  this.state

        return(
            <div className={styles.container}>
                <div className={styles.logo}>
                    <h1>Covid-19</h1>
                    <img className={styles.image} alt="Corona19" src={coronaImage}/>
                </div>
                <Card data={data}/>
                <Country handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>
                
            </div>
        )
    }
}

export default App;