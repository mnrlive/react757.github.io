import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Countries.scss'

const Countries = (props) => {

    const countries = props.itemsAll.map((item, index) => (

        <Link to={item.answer} className="navLink" key={index}>
            {/* country.cioc ? country.cioc : country.name - jesli ma cioc to uzywaj w celu dobrego linkowanie z borderami, ktore posluguja sie skrotami, a cioc to skrot */}
            {/* badz sposob z alpha3Code zeby bylo zgodne z linkami z border, np border IRN to w alpha3Code Iranu tez IRN, ale juz cioc to IRI wiec linki sa sprzeczne, kilka jest takich wyjatkow, alpha3Code===border */}
            <div className="countryCard" key={index}>
                <div className="countryCard__flag">
                    <img className= "countryCard__flagImg" src={item.image} alt={`${item.question} flag`} />
                </div>
                <div className="countryCard__description">
                    <h1 className="countryCard__primary">{item.question}</h1>
                    <ul className="countryCard__itemList">
                        <li className="countryCard__item"><span>Population: </span> population </li>
                       
                        
                    </ul>
                </div>

            </div>
        </Link>
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