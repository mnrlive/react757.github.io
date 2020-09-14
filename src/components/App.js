import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../components/Header';
import Home from '../components/Home';
import Country from '../components/Country';
import Footer from '../components/Footer';
import WrongPage from '../components/WrongPage';
import '../style/App.scss';

class App extends Component {

  /* https://restcountries.eu/ */
  /* ALL  https://restcountries.eu/rest/v2/all */
  /* Name - Search by country name. It can be the native name or partial name
  https://restcountries.eu/rest/v2/name/{name}, https://restcountries.eu/rest/v2/name/united 
  */
  /* Full Name - Search by country full name
  https://restcountries.eu/rest/v2/name/{name}?fullText=true
  https://restcountries.eu/rest/v2/name/aruba?fullText=true
  */
  /* Region - Search by region: Africa, Americas, Asia, Europe, Oceania
  https://restcountries.eu/rest/v2/region/{region}
  https://restcountries.eu/rest/v2/region/europe
  */

  state = {
    countriesAll: [],
  }


  componentDidMount() {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(response => {
        if (response.ok) {
          return response;
        }
        else {
          throw Error(response.status)
        }
      })
      .then(response => response.json())
      .then(data => {
        this.setState({
          countriesAll: data,
        })
      })
      .catch(error => console.log(error));
  }



  render() {
    const routeCountries = this.state.countriesAll.map((country, index) => (
      <Route exact path={`/${country.alpha3Code}`} key={index}
        render={() => <main className="main main--country"><Country countryAll={this.state.countriesAll} flag={country.flag} name={country.name} nativeName={country.nativeName} population={country.population}
          region={country.region} subRegion={country.subregion} capital={country.capital} topLevelDomain={country.topLevelDomain} currencies={country.currencies} languages={country.languages} borders={country.borders} alpha3Code={country.alpha3Code}
        /></main>} //zeby country wyswietlalo odpowiednie panstwo zwiazane z linkiem
      />
    ))
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <>
          <div className="App">
            <div className="container">
              <Header />

              <Switch>
                <Route exact path="/" render={() => <main className="main main--home"><Home /> </main>}
                />
                {routeCountries}
                <Route render={() => <main className="main main--error"><WrongPage /></main>}
                />
              </Switch>
              <Footer />
            </div>
          </div>
        </>
      </Router >
    );
  }
}

export default App;
