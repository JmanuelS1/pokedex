import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFectch from '../hooks/useFectch'
import './styles/PokeInfo.css'

const PokeInfo = () => {
  
  const params = useParams();
  
  const [pokemon, getPokemon] = useFectch();
  
  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${params.id}`;
    getPokemon(url);
  }, [])

  
  return (
    <>
    <header className='pokeinfo__header'>
    </header>
    <section className='pokeinfo'>
      <div className={`pokeinfodiv---${pokemon?.types[0].type.name}`}></div>
    <figure className='pokeinfo__img'>
      <img src={pokemon?.sprites.other['official-artwork'].front_default} alt="pokemon image"/>
     </figure>
      <span className='span__id'># {pokemon?.id}</span>
      <h2 className='pokemon__name'>{pokemon?.name.split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}</h2>
      {/* pokemon?.name.charAt(0).toUpperCase() + pokemon?.name.slice(1) */}
      <ul className='pokeinfo__data'>
        <li><span className='span'>Weight:</span> <span className='span2'>{pokemon?.weight}</span></li>
        <li><span className='span'>Height:</span>  <span className='span2'>{pokemon?.height}</span></li>
      </ul>
      <div className='pokeinfo__details'>
        <article>
          <h3 className='title'>Types</h3>
          <ul className='pokeinfo__types'>
            {
              pokemon?.types.map(type => (
                <li key={type.type.url} className={`pokeinfocard---${pokemon?.types[0].type.name}`}>{type.type.name}</li>
              ))
            }
          </ul>
        </article>
        <article>
          <h3 className='title'>Skills</h3>
          <ul className='pokeinfo__skills'>
            {
              pokemon?.abilities.map(skill => (
                <li key={skill.ability.url} className='skills__ab'>{skill.ability.name}</li>
              ))
            }
          </ul>
        </article>
      </div>
      <h2 className='pokeinfo__stats'>Stat</h2>
      <ul className='pokeinfo__stats'>
        {
          pokemon?.stats.map(stat => (
            <li key={stat.stat.url}><span>{stat.stat.name}</span>  <span>{stat.base_stat}/150</span>
            <div className='stats__bar'><div style={{ width: `${(stat.base_stat / 150) * 100}%`}} className='stats__prog'>  </div ></div>
            </li>
          ) )
        }
      </ul>
      <h2 className='pokeinfo__movements'>Movemenets</h2>
      <ul className='pokeinfo__movementsul'>
        {
          pokemon?.moves.map(move => (
            <li key={move.move.url} className='pokeinfo__movementsli'>{move.move.name}</li>
          ))
        }
      </ul>
   </section>
   </>
  )
}
export default PokeInfo