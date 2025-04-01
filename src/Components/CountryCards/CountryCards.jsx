import React,{useEffect,useState,useRef} from "react";
import styles from "./CountryCards.module.css"
const CountryCards =()=>{
    const [countries,setCountries]=useState([]);
    const [countryName,setCountryName]=useState("");
    const [filteredCountries,setFilteredCountries]=useState([]);
    const timeId = useRef(null);
    const fetchCountries =async()=>{
        try {
            const response = await fetch("https://countries-search-data-prod-812920491762.asia-south1.run.app/countries");
            const jsonData = await response.json();
            setCountries(jsonData);
        } catch (error) {
            console.error("error fetching data:",error);
        }
    }
    const handleSearch=(e)=>{
        if(timeId.current){
            clearTimeout(timeId.current);
        }
        timeId.current = setTimeout(()=>{
            setCountryName(e.target.value);
        },1000)
    }
    useEffect(()=>{
        fetchCountries();
    },[]);

    useEffect(()=>{
        setFilteredCountries(countries.filter((country)=>(
            country.common.toLowerCase().includes(countryName.toLowerCase())
        ))) 
    },[countryName,countries])
return (
    <div className={styles.container}>
        <input type="text" placeholder ="search a country" style={{width:"350px"}} onChange={handleSearch}/>
        <div className={styles.cards}>
            {(countryName?filteredCountries:countries).map((country)=>(
                <div className={styles.countryCard}>
                    <img src={country.png} alt={country.common} style={{height:"100px",width:"100px"}}/>
                    <h2>{country.common}</h2>
                </div>
            ))}
        </div>
    </div>
);
}

export default CountryCards;