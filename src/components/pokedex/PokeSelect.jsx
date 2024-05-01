import { useEffect, useRef } from 'react'
import useFectch from '../../hooks/useFectch'
import './styles/PokeSelect.css'

 
const PokeSelect = ({setSelectValue}) => {

const[types, getTypes] = useFectch();


useEffect(() => {
     const url =  'https://pokeapi.co/api/v2/type/';
  getTypes(url)
}, [])

const selectOption = useRef();

const handleChange = () => {
     setSelectValue(selectOption.current.value);
}


  return (
    <select className='pokeselect__select' ref={selectOption} onChange={handleChange}>
     <option className='pokeselect__option' value="">All pokemons</option>
     {
          types?.results?.map(type => (
               <option className='pokeselect__option' key={type.url} value={type.url}>{type.name}</option>
          ))
     }
    </select>
  )
}
export default PokeSelect