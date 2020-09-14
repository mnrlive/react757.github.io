import React from 'react';
import { NavLink } from 'react-router-dom';
import '../style/Countries.scss'
import { populationDotted } from "./Functions";

const Countries = (props) => {

    const countries = props.itemsAll.map((item, index) => (

        <NavLink to={item.alpha3Code} className="navLink" key={index}>
            {/* country.cioc ? country.cioc : country.name - jesli ma cioc to uzywaj w celu dobrego linkowanie z borderami, ktore posluguja sie skrotami, a cioc to skrot */}
            {/* badz sposob z alpha3Code zeby bylo zgodne z linkami z border, np border IRN to w alpha3Code Iranu tez IRN, ale juz cioc to IRI wiec linki sa sprzeczne, kilka jest takich wyjatkow, alpha3Code===border */}
            <div className="countryCard" key={index}>
                <div className="countryCard__flag">
                    <img className={`countryCard__flagImg countryCard__flagImg--${item.alpha3Code}`} src={item.flag} alt={`${item.name} flag`} />
                </div>
                <div className="countryCard__description">
                    <h1 className="countryCard__primary">{item.name}</h1>
                    <ul className="countryCard__itemList">
                        <li className="countryCard__item"><span>Population: </span>{populationDotted(item.population)}</li>
                        <li className="countryCard__item"><span>Region: </span>{item.region}</li>
                        <li className="countryCard__item"><span>Capital: </span>{item.capital}</li>
                    </ul>
                </div>

            </div>
        </NavLink>
    ))
    return (
        <>
            <div className='countries-container'>
                {countries}
            </div>
        </>
    );
}

export default Countries;
