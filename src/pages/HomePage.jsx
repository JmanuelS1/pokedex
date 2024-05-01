import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setTrainer } from '../store/slices/trainer.slice'
import { useNavigate } from 'react-router-dom'
import './styles/HomePage.css'

const HomePage = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const textInput = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(setTrainer(textInput.current.value.trim()))
    textInput.current.value = ''
    navigate('/pokedex')
  }

  return (
    <div className='homepage'>
      <img className='homepage__img' src="\assets\98042af437fdff212d3259040db2e2db.png" alt="" />
      <h1 className='homepage__title'>Hi Trainer!</h1>
      <h2 className='homepage__title2'>to start give me your name</h2>
      <form className='homepage__form' onSubmit={handleSubmit}>
        <input className='homepage__input' ref={textInput} type="text" placeholder='Your name... ' />
        <button className='homepage__btn'>Start</button>
      </form>
      <footer className='homepage__footer'>
      </footer>
    </div>
  )
}
export default HomePage