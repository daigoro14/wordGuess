import React, { useEffect, useState } from 'react'
import StoryComponent from '../component/StoryComponent'
import '../styles/ReadPage.scss'
import '../styles/Global.scss'
import TopBar from '../component/TopBar'

export default function ReadPage() {
  return (
    <div>
      <TopBar/>
      <StoryComponent/>
    </div>
  )
}
