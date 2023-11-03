import '@/styles/globals.css'
import Image from 'next/image'
import { AppProps } from 'next/app'
import { useState } from 'react'

function getTimeStr(): string {
  var currentDate = new Date()

  if (currentDate.getMinutes() < 10) {
    var currentDateMins = currentDate.getMinutes().toString()
      .replace('0', '00').replace('1', '01').replace('2', '02')
      .replace('3', '03').replace('4', '04').replace('5', '05')
      .replace('6', '06').replace('7', '07').replace('8', '08')
      .replace('9', '09')
  } else {
    var currentDateMins = currentDate.getMinutes().toString()
  }

  if (currentDate.getHours() < 10) {
    var currentDateHrs = currentDate.getHours().toString()
      .replace('0', '00').replace('1', '01').replace('2', '02')
      .replace('3', '03').replace('4', '04').replace('5', '05')
      .replace('6', '06').replace('7', '07').replace('8', '08')
      .replace('9', '09')
  } else {
    var currentDateHrs = currentDate.getHours().toString()
  }


  return currentDate.getUTCMonth().toString()
    .replace('10', 'Nov ').replace('11', 'Dec ')
    .replace('0', 'Jan ').replace('1', 'Feb ')
    .replace('2', 'Mar ').replace('3', 'Apr ')
    .replace('4', 'May ').replace('5', 'Jun ')
    .replace('6', 'Jul ').replace('7', 'Aug ')
    .replace('8', 'Sep ').replace('9', 'Oct ')
    
    + ' ' + currentDate.getUTCDate() + ', ' + currentDate.getUTCFullYear().toString() + ' ' +
    currentDateHrs + ':'
    + currentDateMins

}

export default function App({ Component, pageProps }: AppProps) {





  var [dateTime, setDateTime] = useState(getTimeStr())

  setInterval(() => {
    setDateTime(getTimeStr())
  }, 800)

  return <span>
    {/* <Image alt='VBF icon' className='lightIcon' height='40' width='40' src='/assets/icon.svg' />
    <Image alt='VBF icon' className='darkIcon' height='40' width='40' src='/assets/icon_white.svg' /> */}

    <Component {...pageProps} />

    <div className='bottomBar' style={{ textAlign: 'right' }}>{dateTime}</div>
  </span >
}
