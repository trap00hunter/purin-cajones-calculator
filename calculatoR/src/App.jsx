import './index.css';
import { useState } from 'react';
import { IoReturnUpBackOutline } from "react-icons/io5";
import { evaluate } from 'mathjs';
import { FaPlay, FaPause } from "react-icons/fa";
import bgm from './assets/bgm/Florapolis.mp3';

const buttonValues = [
  '7', '8', '9', '*',
  '4', '5', '6', '/',
  '1', '2', '3', '-',
  '0', '.', '=', '+'
];

function CalcButtons({ label, onClick }) {
  return (
    <button 
      onClick={() => onClick(label)} 
      className="m-1 hover:bg-amber-900 hover:border-white hover:text-white w-[22%] aspect-square bg-yellow-400 border border-amber-900 rounded-lg text-xl sm:text-2xl font-semibold transition-all duration-200"
    >
      {label}
    </button>
  );
}

function App() {
  const [input, setInput] = useState('');
  const [bg, setNewBg] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = (value) => {
    if (value === '=') {
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
  };

  const handleBgChange = () => {
    setNewBg(prev => !prev);
  };

  const toggleMusic = () => {
    const audioElement = document.getElementById('bgMusic');
    if (isPlaying) {
      audioElement.pause();
      setIsPlaying(false);
    } else {
      audioElement.play();
      setIsPlaying(true);
    }
  };

  const sideButtonStyles = "m-1 hover:bg-amber-900 hover:border-white hover:text-white w-[22%] sm:w-[80px] aspect-square border border-amber-900 rounded-lg text-xl sm:text-2xl font-semibold flex items-center justify-center transition-all duration-200";

  return (
    <div className={`flex flex-col md:flex-row items-center justify-center min-h-screen w-full p-2 sm:p-4 gap-2 sm:gap-4 ${bg ? 'bg-amber-900' : 'bg-amber-50'} transition-all duration-300`}>
      <audio id='bgMusic' src={bgm} type="audio/mpeg" autoPlay loop className='hidden' />
      <div className={`flex flex-col w-full max-w-[90vw] sm:max-w-[400px] h-[80vh] max-h-[600px] bg-[url(assets/images/purin.webp)] bg-cover bg-center p-2 sm:p-4 items-center gap-2 sm:gap-4 rounded-xl border-2 ${bg ? 'border-amber-400' : 'border-amber-900'} shadow-lg`}>
        <input 
          className='h-[20%] w-full bg-amber-50 rounded-md text-right text-2xl sm:text-3xl md:text-4xl p-2 border-2 border-amber-900 focus:outline-none' 
          id="txtarea" 
          value={input} 
          readOnly 
        />
        <div className='flex-1 w-full flex flex-wrap justify-center items-center'>
          {buttonValues.map((val, index) => (
            <CalcButtons key={index} label={val} onClick={handleClick} />
          ))}
        </div>
      </div>
      <div className='flex flex-row md:flex-col gap-2 sm:gap-3 justify-center w-full md:w-auto'>
        <button 
          className={`${sideButtonStyles} bg-yellow-400`} 
          onClick={() => handleClick('C')}
        >
          C
        </button>
        <button 
          onClick={() => setInput(input.slice(0, -1))} 
          className={`${sideButtonStyles} bg-yellow-400`}
        >
          <IoReturnUpBackOutline />
        </button>
        <button 
          onClick={handleBgChange} 
          className={`${sideButtonStyles} bg-[url(assets/images/pompom.avif)] bg-cover bg-center`}
        />
        <button 
          onClick={toggleMusic} 
          className={`${sideButtonStyles} bg-amber-400`}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
      </div>
    </div>
  );
}

export default App;