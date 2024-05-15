import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import useClipboard from "react-use-clipboard";
import 'regenerator-runtime/runtime';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


function App() {
  const {resetTranscript} = useSpeechRecognition();
  const [textToCopy, setTextToCopy] = useState();
  const [isCopied, setCopied] = useClipboard(textToCopy, {successDuration: 1000});
  const startListening =() => SpeechRecognition.startListening({continuous: true, language: "en-IN"});
  const stopListening = () => SpeechRecognition.stopListening();
  const {transcript, browserSupportsSpeechRecognition} = useSpeechRecognition();
  if(!browserSupportsSpeechRecognition){
    return null
  }

  const handleClear = () => {
     setTextToCopy('');
     resetTranscript
  }

  

  return (
    <section className=''>
      <div className=''>
        <div className='flex flex-col justify-center items-center m-10'>
        <h2 className='font-sans text-4xl font-bold '>Speech to text Converter</h2>
        <br />
        <div  onClick={() => setTextToCopy(transcript)} className='main-container w-[700px] h-[300px] border-gray-500 border-2 rounded-xl p-2 text-pretty text-[18px] text-gray-200'>{transcript}</div>
        </div>
        
        <div className='main-content' ></div>
        <div className='flex justify-center items-center gap-10 w-full'>
        <button onClick={setCopied} type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">{isCopied ? "Copied!" : "Copy to clipboard"}</button>
        <button onClick={startListening} type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Start Listening</button>
        <button onClick={stopListening} type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Stop listening</button>
        
        <button onClick={handleClear} type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Clear
        </button>
        </div>
        
      </div>
      
    </section>
  )
}

export default App
