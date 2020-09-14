import React from 'react';
import { NavLink } from 'react-router-dom';
import "../style/Country.scss";

const Country = (props) => {

    
    

    const borders = props.borders.map((item, index) => (
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
                    <img className= "country-details__flagImg"  src={props.image} alt={`${props.question} flag`} />
                </div>
                <div className="country-details__info">
                    <h1 className="country-details__headingPrimary">{props.question}</h1>
                    <ul className="info-list info-list--partOne">
                        
                        <li className="info-item">
                            <h4 className="country-details__headingQuaternary">Population:</h4> population
                        </li>
                        
                        
                    </ul>
                    <ul className="info-list info-list--partTwo">
                        <ul className="info-list__domain">
                            <h4 className="country-details__headingQuaternary">Top Level Domain:</h4> topLevelDomain
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
