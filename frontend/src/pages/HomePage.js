import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import TopClinics from '../components/TopClinics'

const HomePage = () => {
  return (
    <div>
     <Header/>
     <SpecialityMenu/>
     <TopDoctors/>
     <TopClinics />
     <Banner/>
    </div>
  )
}

export default HomePage
