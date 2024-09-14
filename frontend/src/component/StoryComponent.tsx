import React, { useEffect, useState, useCallback } from 'react'
import {url} from '../App'
import style from '../styles/StoryComponent.module.scss'
// ICONS FROM https://react-icons.github.io/react-icons/search/#q=eye
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { BsTranslate } from "react-icons/bs";



export default function StoryComponent() {

    const [story, setStory] = useState<{ firstLanguage: string, secondLanguage: string, inputGuess?: string }[]>([]);
    const [firstWordIndex, setFirstWordIndex] = useState<number>(0);
    const [translate, setTranslate] = useState(false)
    const [guessValue, setGuessValue] = useState('');
    // const [secondWordIndex, setSecondWordIndex] = useState<number | null>(null)
  
    useEffect(() => {
      fetch(`${url}/stories/story`, {
        mode: 'cors',
      })
      .then(res => res.json())
      .then(data => {
        setStory(data)
      })
    }, [])
  
  console.log(story)

  const nextWord = useCallback(() => {
    if (firstWordIndex !== null && firstWordIndex < story.length - 1) {
      setFirstWordIndex(firstWordIndex + 1);
      setTranslate(false);
      setGuessValue(story[firstWordIndex + 1].inputGuess || '');
    }
  }, [firstWordIndex, story]);

  const previousWord = useCallback(() => {
    if (firstWordIndex !== null && firstWordIndex > 0) {
      setFirstWordIndex(firstWordIndex - 1);
      setTranslate(false);
      setGuessValue(story[firstWordIndex - 1].inputGuess || '');
    }
  }, [firstWordIndex, story]);
  
    useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        previousWord();
      } else if (event.key === 'ArrowRight') {
        nextWord();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [firstWordIndex, story, previousWord, nextWord]);
    
    // useEffect(() => {
    //   if (firstWordIndex !== null) {
    //     console.log("word:", story[firstWordIndex])
    //     // REMOVED SENTENCES. CHECK STORYTRANSLATE ON GITHUB IF WANT TO INCLUDE IT AGAIN
    //     // const sentence = story.slice(firstWordIndex, secondWordIndex + 1)
    //     // const joinedSentence = sentence.join('')
    //     fetch(`${url}/stories/translate`, {
    //       method: 'POST',
    //       headers: {
    //           "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify({sentence: story[firstWordIndex]}),
    //     })        
    //     .then(res => res.json())
    //     .then(data => {
    //       setTranslate(data)
    //     })
    //   }  
    // },[firstWordIndex])
    

  const handleInputChange = (e: any) => {
    const newValue = e.target.value;
    setGuessValue(newValue);

    // Create a copy of the story array
    const updatedStory = [...story];
    // Update the object at the current index with the new value
    updatedStory[firstWordIndex].inputGuess = newValue;
    // Update the story state
    setStory(updatedStory);
  };
  
  // const correctGuess = story[firstWordIndex].inputGuess === 

  return (
    <div className='storyComponent'>
        <div className={`${style.storyParagraph} relative py-4 w-[80%] text-2xl flex-1 text-center overflow-auto box-border`}>
        <div className='pb-10'>
          {story.map((word, index) => {
            const styleConditions = (firstWordIndex !== null && firstWordIndex === index)
            const correctGuess = word.inputGuess === word.secondLanguage
            const incorrectGuess = word.inputGuess && word.inputGuess !== word.secondLanguage
            return(
              <div
                className={`${styleConditions ? style.highlight : ""} ${correctGuess ? style.correctGuess : ""} ${incorrectGuess ? style.incorrectGuess : ""} inline-block mr-1 cursor-pointer`}
                onClick={() => setFirstWordIndex(index)}
                key={index}
              >
                {word.firstLanguage}
              </div>
            )
          })}
        </div>
        <div className={`${style.whiteShadow} w-full sticky bottom-0`}></div>
      </div>
      <div className='relative flex-none border-t-2 border-b-2 border-blue-300 py-8 w-full flex flex-col gap-4 justify-center items-center box-border'>
        {translate && 
          <h1 className='bg-cyan-500 rounded text-white px-2 ml-48 text-lg absolute top-3'>
            {story[firstWordIndex] ? story[firstWordIndex].secondLanguage : ''}
          </h1>
        }

        <h1 className='text-6xl'>{story[firstWordIndex] ? story[firstWordIndex].firstLanguage : ''}</h1>
        <input
          placeholder='Guess the word'
          type="text"
          className='outline-none text-center border-b-2 border-red-300 px-2'
          value={guessValue}
          onChange={handleInputChange}
        />
        <div className='flex gap-5'>
          <FaAngleLeft className='w-7 h-7 cursor-pointer text-gray-500' onClick={previousWord}/>
          <FaAngleRight className='w-7 h-7 cursor-pointer text-gray-500' onClick={nextWord}/>
          <BsTranslate className='w-7 h-7 cursor-pointer text-gray-500' onClick={() => {translate ? setTranslate(false) : setTranslate(true)}}/>
        </div>
      </div>
      <div className='h-full py-4 w-[80%] text-2xl flex-1 text-center box-border overflow-auto'>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit animi culpa omnis quaerat perferendis, in, illum minus error commodi cupiditate vero et beatae vitae nulla, odio consequuntur cumque ex doloremque! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem minus corporis consequatur repellendus inventore atque ad sint numquam tenetur, aperiam aut. Alias a similique ea numquam magnam. Dignissimos, saepe consectetur! Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet eaque est sint! Nemo dolor quisquam iste quid
        </p>
          <div className={`${style.whiteShadow} w-full sticky bottom-0`}></div>
      </div>
    </div>
  )
}
