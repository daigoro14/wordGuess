import React from 'react'
import Topbar from '../component/TopBar'

export default function MenuPage() {
  return (
    <div>
      <Topbar />
      <div className='flex flex-col items-center gap-4'>
        <div className='flex flex-col items-center'>
          <label htmlFor="firstLanguage">Select your first language</label>
          <select name="firstLanguage" className='border-2 border-cyan-500 rounded-full p-2'>
            <option value="en">English</option>
            <option value="pt">Portuguese</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
          </select>
        </div>
        <div className='flex flex-col items-center'>
          <label htmlFor="secondLanguage">Select your second language</label>
          <select name="secondLanguage" className='border-2 border-cyan-500 rounded-full p-2'>
            <option value="en">English</option>
            <option value="pt">Portuguese</option>
            <option value="es">Spanish</option>
            <option value="sw">Swedish</option>
          </select>
        </div>
        <div className='flex flex-col items-center'>
          <label htmlFor="">Choose length of story</label>
          <div className='flex gap-3'>
            <div>
              <label htmlFor="">100 Words</label>
              <input type="checkbox" />
            </div>
            <div>
              <label htmlFor="">500 Words</label>
              <input type="checkbox" />
            </div>
            <div>
              <label htmlFor="">1000 Words</label>
              <input type="checkbox" />
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <label htmlFor="">Stories</label>
          <select name="" className='border-2 border-cyan-500 rounded-full p-2'>
            <option value="1">Story 1</option>
            <option value="2">Story 2</option>
            <option value="3">Story 3</option>
            <option value="4">Story 4</option>
            <option value="5">Story 5</option>
          </select>
        </div>
        <button className=' bg-cyan-500 rounded-full p-3 text-white font-semibold'>Read Story</button>
      </div>
    </div>
  )
}
