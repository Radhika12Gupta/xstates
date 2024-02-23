import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Xstates = () => {
    const [countries,setCountries]=useState([])
    const [states,setStates]=useState([])
    const [cities,setCities]=useState([])

    const [selectedCountry,setSelectedCountry]=useState("")
    const [selectedState,setSelectedState]=useState("")
    const [selectedCity,setSelectedCity]=useState("")

    useEffect(()=>{
        fetchCountries()
    },[])

    const fetchCountries=async()=>{
     try{
        const res=await axios.get('https://crio-location-selector.onrender.com/countries')
        setCountries(res.data)
     }
     catch(err){
       console.log(err.message)
     }
    }

    const fetchStates=async(country)=>{
        try{
           const res=await axios.get('https://crio-location-selector.onrender.com/country='+`${country}`+'/states')
           setStates(res.data)
        }
        catch(err){
          console.log(err.message)
        }
       }

       const fetchCity=async(country,state)=>{
        try{
           const res=await axios.get('https://crio-location-selector.onrender.com/country='+`${country}`+'/state='+`${state}`+'/cities')
           setCities(res.data)
        }
        catch(err){
          console.log(err.message)
        }
       }


  return (
       <div>
        <h1>Select Location</h1>
      {/* Country */}
           <select name="countries" id="countries" 
           onChange={(e)=>{   setSelectedCountry(e.target.value)
                              fetchStates(e.target.value)
                           }}>
             <option value={selectedCountry}>Select a Country</option>
             {countries.length && countries.map(country=>{
                    return <option value={country}>{country}</option>
            })}
           </select>
      {/* State */}
           <select name="states" id="states" 
           onChange={(e)=>{ setSelectedState(e.target.value)
                            fetchCity(selectedCountry,e.target.value)
    }}>
             <option value={selectedState}>Select a State</option>
                {states.length && states.map(state=>{
                return <option value={state}>{state}</option>
             })}
           </select>
         {/* city------ */}

      <select name="city" id="city" 
      onChange={(e)=>{
        setSelectedCity(e.target.value)
        }}>
          <option value={selectedCity}>Select a City</option>
              {cities.length && cities.map(city=>{
                 return <option value={city}>{city}</option>
                })}
    </select>

    {selectedCity && <p>You Selected {selectedCity}, {selectedState}, {selectedCountry}</p>}
      
    </div>
  )
}

export default Xstates
