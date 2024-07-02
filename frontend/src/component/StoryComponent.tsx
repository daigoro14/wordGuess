import React, { useEffect, useState } from 'react'
import {url} from '../App'
import style from '../styles/StoryComponent.module.scss'

export default function StoryComponent() {

    const [story, setStory] = useState([])
    const [translate, setTranslate] = useState('')
    const [firstWordIndex, setFirstWordIndex] = useState<number | null>(null)
    const [secondWordIndex, setSecondWordIndex] = useState<number | null>(null)
  
    useEffect(() => {
      fetch(`${url}/stories/story`, {
        mode: 'cors',
      })
      .then(res => res.json())
      .then(data => {
        setStory(data)
      })
    },[])
  
    async function translateTarget(target: string, index: number): Promise<void> {
      if(firstWordIndex !== null && secondWordIndex !== null && index < secondWordIndex && index > firstWordIndex) {
        setSecondWordIndex(index)
      } else if(firstWordIndex !== null && secondWordIndex !== null && index > secondWordIndex) {
        setSecondWordIndex(index)
      } else if(firstWordIndex !== null && index === firstWordIndex) {
        setFirstWordIndex(null)
        setTranslate('')
      } else if(firstWordIndex !== null && secondWordIndex !== null && index >= firstWordIndex && index <= secondWordIndex){
        // UNSELECT WORDS BY CLICKING ON THEM
        setFirstWordIndex(null)
        setSecondWordIndex(null)
        setTranslate('')
      } else if(firstWordIndex !== null && index < firstWordIndex){
        setFirstWordIndex(index)
        setSecondWordIndex(null)
      } else if(secondWordIndex !== null){
        setSecondWordIndex(null)
        setFirstWordIndex(index)
      } else if(firstWordIndex !== null) {
        setSecondWordIndex(index)
      } else {
        setFirstWordIndex(index)
      }
    }
  
  
    useEffect(() => {
      if(firstWordIndex !== null && secondWordIndex !== null) {
        const sentence = story.slice(firstWordIndex, secondWordIndex + 1)
        const joinedSentence = sentence.join('')
        fetch(`${url}/stories/translate`, {
          method: 'POST',
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({sentence: joinedSentence}),
        })        
        .then(res => res.json())
        .then(data => {
          setTranslate(data)
        })
  
      } else if(firstWordIndex !== null) {
        fetch(`${url}/stories/translate`, {
          method: 'POST',
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({sentence: story[firstWordIndex]}),
        })        
        .then(res => res.json())
        .then(data => {
          setTranslate(data)
        })
      }  
    },[firstWordIndex, secondWordIndex])
  
    console.log(translate)

  return (
    <div className='storyComponent'>
        <p className={style.storyParagraph}>
        {story.map((word, index) => {
          const oneWordSelected =  (firstWordIndex !== null && firstWordIndex === index) 
          const twoWordsSelected = (firstWordIndex !== null && secondWordIndex !== null && index >= firstWordIndex && index <= secondWordIndex)
          const styleConditions = oneWordSelected || twoWordsSelected
          return(
          <>
            {firstWordIndex === index && (
              <>
                <span className={style.translation}>{translate} </span>
                <span
                  className={styleConditions ? style.highlight : ""}
                  onClick={() => translateTarget(word, index)}
                >
                  {word}
                </span>
              </>
            )}
            {firstWordIndex !== index && (
              <span
                className={styleConditions ? style.highlight : ""}
                onClick={() => translateTarget(word, index)}
              >
                {word}
              </span>
            )}
          </>
          )
        })}
      </p>
    </div>
  )
}
