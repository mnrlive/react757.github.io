import React, { Component } from 'react';
import { BrowserRouter as NavLink } from 'react-router-dom';
import Countries from '../components/Countries';
import '../style/Home.scss'
class Home extends Component {
    state = {
        itemsAll: [],
        isLoaded: false,
        option: "all",
        optionUpper: "",
        searchValue: "",
        filtered: "",
        filterActive: false,
        regionChoosed: false,
        scroll: false,

    }

    componentDidMount() {
        //Nasłuchiwanie scrolla, który umożliwi powrót na początek strony
        window.addEventListener('scroll', this.scrollCheck, false);

        fetch('https://mnrlive.github.io/api/resources.json')
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
                    itemsAll: data.item,
                    isLoaded: true,
                })
            })
            .catch(error => console.log(error));
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.option !== this.state.option) {
            //warunek jest po to, żeby fetch się zmieniał jeśli została wybrana opcja all to niech nie dodaje region, tylko opcje, żeby wyszło
            //https://restcountries.eu/rest/v2/all, a jeśli została wybrana jakakolwiek inna opcja to niech doda region i wybrana opcje, żeby
            //wyszło https://restcountries.eu/rest/v2/region/europe
            fetch(`https://restcountries.eu/rest/v2/${this.state.option === "all" ? "" : "region/"}${this.state.option}`)
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
                        filtered: "", //wyczysc tablice filtered, jesli jest ona pusta to wyswietla sie wszystkie opcje z danej kategorii (wiaze sie z inputem, czyli jesli wybiore jakas opcje to wyzeruj tablice filtered i wartosc z input)
                        searchValue: "", //w celu wyczyszczenia inputa wyszukiwania, przy zmianie regionu
                        itemsAll: data,
                        isLoaded: true,
                    })
                })
                .catch(error => console.log(error));
        }

    }

    //Odmontowanie scrolla
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollCheck, false);
    }

    scrollCheck = () => {
        const beginScroll = window.scrollY < 100;
        if (beginScroll === false) {
            this.setState({
                scroll: true,
            })
        } else {
            this.setState({
                scroll: false,
            })
        }
    }

    handleSearchCountry = (e) => {
        this.setState({
            searchValue: e.target.value,
        })
        let actualCountriesList = []; //aktualna lista krajów
        let newCountriesList = []; //nowa lista, którą następnie będzie tablica filtered
        if (e.target.value !== "") {//jeśli zostało coś wpisane
            actualCountriesList = this.state.itemsAll; //aktualna lista krajów równa się tablicy krajów z api (mogą być z wszystkich krajów, bądź jeśli została wybrana jakaś opcja z danego regionu)
            newCountriesList = actualCountriesList.filter(country => { //filtrowanie, jeśli jakiś kraj zawiera wpisaną frazę to go zwróć, toLowerCase() jest zastosowane, żeby porównywany kraj i wartość z inputa miały małe litery, żeby nie wystąpił konflikt
                return country.name.toLowerCase().includes(e.target.value.toLocaleLowerCase());
            })
        } else {
            newCountriesList = this.state.itemsAll; //jeśli nic nie zostało wpisane to nowa lista posiada wartość z api
        }
        this.setState({
            filtered: newCountriesList, //tablica filtered ma teraz wartość newCountriesList, czyli nowej tablicy
        });
    }

    //Toggle, jesli uzytkownik kliknie na Filter By Region to niech filter activ zmieni sie na true, jesli kliknie ponownie to na false
    handleFilterRegion = () => {
        this.setState({
            filterActive: !this.state.filterActive,
        })
    }

    //sluzy do zamkniecia dropdown listy zwiazanej z filtrowaniej jesli jest ona otwarta i uzytkownik kliknie w obszar diva homa
    handleCloseGlobalFilterRegion = () => {
        if (this.state.filterActive === true) {
            this.setState({
                filterActive: false,
            })
        }
    }


    //Pobranie wartosci kliknietej opcji w dropdown list, ustawienie stanu, jesli opcja zostanie wybrana to filterActive bedzie ustawiony na false w celu zamkniecia dropDown listy, regionChoosed zostaje ustawiony na true, w celu uzycia warunku, ktory zastapi Filter By Region wybrana opcja
    handleChangeRegion = (e) => {
        let value = e.currentTarget.getAttribute('value')
        let valueUpper = value.slice(0, 1).toUpperCase() + value.slice(1, value.length);
        this.setState({
            option: value,
            optionUpper: valueUpper,
            regionChoosed: true,
            filterActive: false,
        })
    }

    render() {
        return (
            <div className='home' onClick={this.handleCloseGlobalFilterRegion}>
                <div className="filter">
                    <div className="filter__searchPanel">
                        <svg className="filter__icon" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <title>magnifying-glass</title>
                            <path d="M17.545 15.467l-3.779-3.779c0.57-0.935 0.898-2.035 0.898-3.21 0-3.417-2.961-6.377-6.378-6.377s-6.186 2.769-6.186 6.186c0 3.416 2.961 6.377 6.377 6.377 1.137 0 2.2-0.309 3.115-0.844l3.799 3.801c0.372 0.371 0.975 0.371 1.346 0l0.943-0.943c0.371-0.371 0.236-0.84-0.135-1.211zM4.004 8.287c0-2.366 1.917-4.283 4.282-4.283s4.474 2.107 4.474 4.474c0 2.365-1.918 4.283-4.283 4.283s-4.473-2.109-4.473-4.474z"></path>
                        </svg>
                        <input className="filter__searchInput" type="text" placeholder="Search for a country..." value={this.state.searchValue} onChange={this.handleSearchCountry} />
                    </div>

                    <div className="filter__selectPanel">
                        <NavLink to="./">
                            <span onClick={this.handleFilterRegion} className={this.state.filterActive ? "filter__chooseRegion filter__chooseRegion--caretUp" : "filter__chooseRegion filter__chooseRegion--caretDown"}>{this.state.regionChoosed ? this.state.optionUpper : "Filter by Region"}</span>
                            <ul className={this.state.filterActive ? "filter__dropdown visible" : "filter__dropdown"}>
                                <li className="filter__dropdown-item filter__dropdown-item--all" value="all"
                                    onClick={this.handleChangeRegion}>All</li>
                                <li className="filter__dropdown-item filter__dropdown-item--africa" value="africa"
                                    onClick={this.handleChangeRegion}>Africa</li>
                                <li className="filter__dropdown-item filter__dropdown-item--americas" value="americas"
                                    onClick={this.handleChangeRegion}>Americas</li>
                                <li className="filter__dropdown-item filter__dropdown-item--asia" value="asia"
                                    onClick={this.handleChangeRegion}>Asia</li>
                                <li className="filter__dropdown-item filter__dropdown-item--europe" value="europe"
                                    onClick={this.handleChangeRegion}>Europe</li>
                                <li className="filter__dropdown-item filter__dropdown-item--oceania" value="oceania"
                                    onClick={this.handleChangeRegion}>Oceania</li>
                            </ul>
                        </NavLink>
                    </div>
                </div>
                {/* Warunek 1 jeśli dane jeszcze się nie załadowały, to niech wyświetli się napis Loading */}
                {/* Warunek 2 jeśli tablica pofiltrowana jest pusta (bo nic nie ma w inpucie, bądź została wybrana jakaś opcja z droplisty) to wyświetl tablicę countries (czyli bezpośrednio z api), jeśli filtered nie jest puste to wyświetl kraje pofiltrowane */}
                {this.state.isLoaded ? <Countries itemsAll={this.state.filtered === "" ? this.state.itemsAll : this.state.filtered} /> : <div className='loading'><span className='loading__loader'></span></div>}
                <div className={this.state.scroll ? 'scroll' : null} onClick={() => { window.scrollTo(0, 0) }}>
                    <i className={this.state.scroll ? "fas fa-arrow-up scroll__arrowUp" : null}></i>
                </div>
            </div >
        );
    }
}

export default Home;
