import React from 'react';
import { NavLink } from 'react-router-dom';
import "../style/Country.scss";

const Country = (props) => {
        const borders = props.borders.map(( answer, index) => (
        <li className="borders-item" key={index}>
            <NavLink to= {answer} className="navLink">
                <button className="btn btn--borders"> {answer} </button>
            </NavLink>
        </li>
    ))
        
        const topLevelDomain = props.topLevelDomain.map((answer, index) => (
        <li className="info-item" key={index}>{answer}</li>
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
                    <img className={`country-details__flagImg country-details__flagImg--${props.alpha3Code}`} src={props.flag} alt= {props.name} />
                </div>
                <div className="country-details__info">
                    <h1 className="country-details__headingPrimary">{props.name}</h1>
                    <ul className="info-list info-list--partOne">
                        <li className="info-item info-item--nativeName">
                            <h4 className="country-details__headingQuaternary">Native Name:</h4>{props.nativeName}
                        </li>
                       
                        
                    </ul>
                    
                    <ul className="info-list info-list--partThree">
                        <ul className="info-list__borders">
                            <h4>Border Countries:</h4>
                                {borders}
{topLevelDomain}

                                    
                           
                        </ul>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Country;
