import React, {useState, useRef, useEffect} from 'react';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import PrimeReact from 'primereact/api';
import { AutoComplete } from 'primereact/autocomplete';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import logo from './logo.svg';
import './App.css';
import axios from "axios";
import {
    convertCurrency,
    getCurrencyList,
    storeDataToServer, timer
} from "./services/convertionHandler";

function App() {

    const [convertedValue, setConvertedValue] = useState('');
    const [amount, setAmount] = useState('');
    const [from, setFrom] = useState(null);
    const [destinationCurrency, setSelectedDestinationCurrency] = useState(null);
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState(null);

  // active ripple effect
  PrimeReact.ripple = true;



    useEffect(async () => {

        let list = await getCurrencyList();

        setCountries(list);

    }, []);




  const onFormSubmit = async (e) => {

      e.preventDefault();

      let converted = await convertCurrency(amount, from, destinationCurrency);
      setConvertedValue(converted);
      await timer(100);
      await storeDataToServer(amount, from, destinationCurrency, convertedValue, convertedValue);

  }

  const searchCountry = (event) => {
        setTimeout(() => {
            let _filteredCountries;
            if (!event.query.trim().length) {
                _filteredCountries = [...countries];
            }
            else {
                _filteredCountries = countries.filter((country) => {
                    return country.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }

            setFilteredCountries(_filteredCountries);
        }, 250);
    }



  const itemTemplate = (item) => {
        return (
            <div className="country-item">
                <div>{item.name}</div>
            </div>
        );
    }


  return (
    <div className="App">


      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <form className="p-d-flex p-jc-center p-mt-6" onSubmit={onFormSubmit}>

          <div>
              <h4>Amount</h4>
              <br/>
              <InputText value={amount} onChange={(e) => setAmount(e.target.value)}/>
          </div>
          <div>
            <h4>From</h4>
            <br/>
            <AutoComplete value={from} suggestions={filteredCountries} completeMethod={searchCountry} field="unit" dropdown forceSelection itemTemplate={itemTemplate} onChange={(e) => setFrom(e.value)} />
          </div>
          <div>
              <h4>To</h4>
            <br/>
            <AutoComplete value={destinationCurrency} suggestions={filteredCountries} completeMethod={searchCountry} field="unit" dropdown forceSelection itemTemplate={itemTemplate} onChange={(e) => setSelectedDestinationCurrency(e.value)} />
          </div>
          <Button type="submit" label="Submit" icon="pi pi-check" className="p-ml-2"/>
      </form>

        <h1>{convertedValue}</h1>

    </div>
  );
}

export default App;
