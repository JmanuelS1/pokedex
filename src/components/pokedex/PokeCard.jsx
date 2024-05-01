import React from 'react'
import { useEffect } from 'react'
import './styles/pokecard.css'
import { useNavigate } from 'react-router-dom'
import useFectch from '../../hooks/useFectch'

const PokeCard = ({ url }) => {

     const [pokemon, getPokemons] = useFectch()

     const navigate = useNavigate()

     useEffect(() => {
          getPokemons(url)
     }, [])


     const handlePokemon = () => {
          navigate(`/pokedex/${pokemon.id}`)
     }


     return (
          <article onClick={handlePokemon} className={`pokecard pokecard--${pokemon?.types[0].type.name}`}>
               <div className={`pokecard__back ${pokemon?.types[0].type.name}`}></div>
               <figure className='pokecard__img'>
                    <img src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
               </figure>
               
               <h3 className={`pokecard__name name--${pokemon?.types[0].type.name}`}>{pokemon?.name.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}</h3>               
               
               <ul className='pokecard__types'>
                    {
                         pokemon?.types.map(type => (
                              <li className={`slot${type.slot}`} key={type.type.url}>
                                   {type.type.name.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}
                              </li>

                         ))
                    }
               </ul>
               <span className='pokecard__spantype'>Type</span>
               <hr />
               <ul className='pokecard__stats'>
                    {
                         pokemon?.stats.map(stat => (
                              !stat.stat.name.includes('-') &&
                              <li key={stat.stat.url}>
                                   <span className='pokecard__statsname'>{stat.stat.name.toUpperCase()}</span>
                                   <span className={`pokecard__statsnumber${pokemon?.types[0].type.name}`}>{stat.base_stat}</span>
                              </li>
                         ))
                    }
               </ul>
          </article>
     )
}
export default PokeCard