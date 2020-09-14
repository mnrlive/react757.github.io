import React from 'react';
import { NavLink } from 'react-router-dom';
import "../style/Country.scss";

const Country = (props) => {

    const topLevelDomain = props.topLevelDomain.map((domain, index) => (
        <li className="info-item" key={index}>{domain}</li>
    ))
    const languages = props.languages.map((language, index) => (
        <li className="info-item" key={index}>{language.name}</li>
    ))

    const currencies = props.currencies.map((currency, index) => (
        <li className="info-item" key={index}>{currency.name}</li>
    ))

    const borders = props.borders.map((border, index) => (
        <li className="borders-item" key={index}>
            <NavLink to={border} className="navLink">
                <button className="btn btn--borders">{border}</button>
            </NavLink>
        </li>
    ))

    return (
        <div className="country-container">
            <div className="country-container__back">
                <NavLink to="/" className="navLink">
                    <button className="btn country-container__button-back">Back</button>
                </NavLink>

            </div>
            <div className="country-details">
                <div className="country-details__flag">
                    <img className={`country-details__flagImg country-details__flagImg--${props.alpha3Code}`} src={props.flag} alt={`${props.name} flag`} />
                </div>
                <div className="country-details__info">
                    <h1 className="country-details__headingPrimary">{props.name}</h1>
                    <ul className="info-list info-list--partOne">
                        <li className="info-item info-item--nativeName">
                            <h4 className="country-details__headingQuaternary">Native Name:</h4>{props.nativeName}
                        </li>
                        
                      
                        <li className="info-item">
                            <h4 className="country-details__headingQuaternary">Region:</h4>{props.region}
                        </li>
                        <li className="info-item">
                            <h4 className="country-details__headingQuaternary">Sub Region:</h4>{props.subRegion}
                        </li>
                        <li className="info-item">
                            <h4 className="country-details__headingQuaternary">Capital:</h4>{props.capital}
                        </li>
                    </ul>
                    <ul className="info-list info-list--partTwo">
                        <ul className="info-list__domain">
                            <h4 className="country-details__headingQuaternary">Top Level Domain:</h4>{topLevelDomain}
                        </ul>
                        <ul className="info-list__curriences">
                            <h4 className="country-details__headingQuaternary">Curriences: </h4>{currencies}
                        </ul>
                        <ul className="info-list__languages">
                            <h4 className="country-details__headingQuaternary">Languages:</h4>{languages}
                        </ul>
                    </ul>
                    <ul className="info-list info-list--partThree">
                        <ul className="info-list__borders">
                            <h4>Border Countries:</h4>
                            {borders}
                        </ul>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Country;
