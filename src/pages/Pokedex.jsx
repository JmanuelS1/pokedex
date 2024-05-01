import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './styles/pokedex.css'
import useFectch from '../hooks/useFectch'
import PokeCard from '../components/pokedex/PokeCard'
import { useRef } from 'react'
import PokeSelect from '../components/pokedex/PokeSelect'
import Pagination from '../components/pokedex/Pagination'


const Pokedex = () => {

  const [selectValue, setSelectValue] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [pokemons, getPokemons, getTypes] = useFectch()
  const [currentPage, setCurrentPage] = useState(1)
  const cardsPerPage = 12

  const trainer = useSelector(store => store.trainer)

  useEffect(() => {
    if (selectValue) {
      getTypes(selectValue)
    } else {
      const url = 'https://pokeapi.co/api/v2/pokemon?limit=30'
      getPokemons(url)
    }
  }, [selectValue])

  const textInput = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    setInputValue(textInput.current.value.toLowerCase().trim())
    textInput.current.value = ''
  }

  const pokeFilter = (poke) => {
    const perName = poke.name.includes(inputValue)
    return perName
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const indexOfLastCard = currentPage * cardsPerPage
  const indexOfFirstCard = indexOfLastCard - cardsPerPage
  const currentCards = pokemons?.results?.filter(pokeFilter).slice(indexOfFirstCard, indexOfLastCard)


  return (
    <>
      <header className='pokedex__header'></header>
      <section className='pokedex'>
        <h2><span className='pokedex__title'>Welcome {trainer},</span> here you can find your favorite pokemon:</h2>
        <div className='pokedex__form'>
          <form onSubmit={handleSubmit}>
            <input ref={textInput} placeholder='Search your pokemon' type="text" />
            <button>Search</button>
          </form>
          <PokeSelect
            setSelectValue={setSelectValue}
          />
        </div>
        <Pagination
          cardsPerPage={cardsPerPage}
          totalCards={pokemons?.results?.filter(pokeFilter).length}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        <div className='pokedex__container'>
          {
            currentCards?.map((poke) => (
              <PokeCard
                key={poke.url}
                url={poke.url}
              />
            ))
          }
        </div>
        <Pagination
          cardsPerPage={cardsPerPage}
          totalCards={pokemons?.results?.filter(pokeFilter).length}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </section>
    </>
  )
}
export default Pokedex



// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import './styles/pokedex.css'
// import useFectch from '../hooks/useFectch'
// import PokeCard from '../components/pokedex/PokeCard'
// import { useRef } from 'react'
// import PokeSelect from '../components/pokedex/PokeSelect'


// const Pokedex = () => {

//   const [selectValue, setSelectValue] = useState('')
//   const [inputValue, setInputValue] = useState('')
//   const [pokemons, getPokemons, getTypes] = useFectch()

//   const trainer = useSelector(store => store.trainer)

//   useEffect(() => {
//     if (selectValue) {
//       getTypes(selectValue)
//     } else{
//       const url = 'https://pokeapi.co/api/v2/pokemon?limit=30'
//       getPokemons(url)
//     }
//   }, [selectValue])

//   const textInput = useRef()

//   const handleSubmit = (event) => {
//     event.preventDefault()
//     setInputValue(textInput.current.value.toLowerCase().trim())
//     textInput.current.value = ''
//   }

//   const pokeFilter = (poke) => {
//     const perName = poke.name.includes(inputValue)
//     return perName
//   }



//   return (
//     <>
//     <header className='pokedex__header'></header>
//     <section className='pokedex'>
//       <h2><span className='pokedex__title'>welcome {trainer},</span> here you can find your favorite pokemon</h2>
//       <div className='pokedex__form'>
//         <form onSubmit={handleSubmit}>
//           <input ref={textInput} placeholder='Search your pokemon' type="text" />
//           <button>Search</button>
//         </form>
//         <PokeSelect
//           setSelectValue={setSelectValue}
//         />
//       </div>
//       <div className='pokedex__container'>
//         {
//           pokemons?.results.filter(pokeFilter).map((poke) => (
//             <PokeCard
//               key={poke.url}
//               url={poke.url}
//             />
//           ))
//         }
//       </div>
//     </section>
//     </>
//   )
// }
// export default Pokedex