import './index.css';
import { useState } from 'react';
import { IoReturnUpBackOutline } from "react-icons/io5";
import { evaluate } from 'mathjs';
import { FaPlay } from "react-icons/fa";
import bgm from './assets/bgm/Florapolis.mp3';
import { FaPause } from "react-icons/fa";


const buttonValues = [
  '7', '8', '9', '*',
  '4', '5', '6', '/',
  '1', '2', '3', '-',
  '0', '.', '=', '+'
]



function CalcButtons({label, onClick}) {
  return (
    <button onClick={() => onClick(label)} className={`mt-2 mx-1 mb-2 hover:bg-amber-900 hover:border-white hover:text-white w-[4.5rem] h-[4.5rem] bg-yellow-400 border border-amber-900 rounded-lg`}>
      {label}
    </button>
  )
}

function App() {
  const [input, setInput] = useState('');
  const handleClick = (value) => {
    if(value === '=') {
      try {
        const result = evaluate(input);
        setInput(String(result));
      } catch (error) {
        setInput('Error');
      }
    } else if (value === 'C') {
      setInput('');
    } else {
      setInput(input + value);
    }
  }

  const [bg, setNewBg] = useState(false);
  const handleBgChange = () => {
    setNewBg(prev => !prev);
  }

  const [isPlaying, setIsPlaying] = useState(false);
  const toggleMusic = () => {
    const audioElement = document.getElementById('bgMusic');
    if (isPlaying) {
      audioElement.pause();
      setIsPlaying(false);
    } else {
      audioElement.play();
      setIsPlaying(true);
    }
  }


  return (
    <div className={`flex items-center justify-center w-screen h-screen gap-1 ${bg ? 'bg-amber-900' : 'bg-amber-50'}`}>
      <audio id='bgMusic' src={bgm} type="audio/mpeg" autoPlay loop className='hidden'>

      </audio>
      <div className={`flex flex-col h-[80%] w-[30%] bg-[url(assets/images/purin.webp)] bg-cover p-5 items-center gap-5 rounded-xl border-3  ${bg == true ? 'border-amber-400' : 'border-amber-900'}`}>
        <input className='h-[150px] w-[90%] bg-amber-50 rounded-sm text-end text-4xl pr-1 flex justify-center border-2 border-amber-900' id="txtarea" value={input} readOnly>
        </input>

        <div className='h-[500px] w-[95%] text-black text-2xl font-semibold flex justify-center flex-wrap'>
          {buttonValues.map((val, index) => (
            <CalcButtons key={index} label={val} onClick={handleClick}/>
          ))}
        </div>

      </div>
      <div className='flex flex-col gap-3'>
        <button className='hover:bg-amber-900 hover:border-white hover:text-white w-[4.5rem] h-[4.5rem] bg-yellow-400 border border-amber-900 rounded-lg font-semibold text-2xl' onClick={() => handleClick('C')}>
          C
        </button>
        <button onClick={() => setInput(input.slice(0,-1))} className='flex justify-center items-center hover:bg-amber-900 hover:border-white hover:text-white w-[4.5rem] h-[4.5rem] bg-yellow-400 border border-amber-900 rounded-lg font-semibold text-2xl'>
          <IoReturnUpBackOutline />
        </button>
        <button onClick={handleBgChange} className='flex justify-center items-center hover:border-white hover:text-white w-[4.5rem] h-[4.5rem] bg-[url(assets/images/pompom.avif)] bg-cover bg-center bg-no-repeat border border-amber-900 rounded-lg font-semibold text-2xl'>
        </button>
        <button onClick={toggleMusic} className='flex justify-center items-center hover:border-white hover:text-white w-[4.5rem] h-[4.5rem] bg-amber-300 border border-amber-900 rounded-lg font-semibold text-2xl'>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
      </div>
    </div>
  )
}

export default App
