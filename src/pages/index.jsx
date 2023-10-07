import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Router from 'next/router'
import getLinkArray from './api/links'
import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'

const inter = Inter({ subsets: ['latin'] })

function LaunchpadLink(props) {
  return <button className='link' onClick={() => { Router.push(props.link) }}>
    <span style={{ float: 'left' }}>
      <strong style={{ fontSize: '16px' }}>{props.children}</strong><br />
      <span style={{ fontSize: '11px' }}>{props.link}</span>
    </span>

    <span style={{ float: 'right' }}>
      &rarr;
    </span>
  </button>
}

var num = 0

export default function Home() {
  var [linkElArray, setLinkElArray] = useState()

  // set initial date/time
  var currentDate = new Date()

  if (currentDate.getMinutes() < 10) {
    var currentDateMins = currentDate.getMinutes().toString()
      .replace('0', '00').replace('1', '01').replace('2', '02')
      .replace('3', '03').replace('4', '04').replace('5', '05')
      .replace('6', '06').replace('7', '07').replace('8', '08')
      .replace('9', '09')
  } else {
    var currentDateMins = currentDate.getMinutes()
  }

  if (currentDate.getHours() < 10) {
    var currentDateHrs = currentDate.getHours().toString()
      .replace('0', '00').replace('1', '01').replace('2', '02')
      .replace('3', '03').replace('4', '04').replace('5', '05')
      .replace('6', '06').replace('7', '07').replace('8', '08')
      .replace('9', '09')
  } else {
    var currentDateHrs = currentDate.getHours()
  }

  var [dateTime, setDateTime] = useState(
    currentDate.getUTCMonth().toString()
      .replace('0', 'Jan ').replace('1', 'Feb ')
      .replace('2', 'Mar ').replace('3', 'Apr ')
      .replace('4', 'May ').replace('5', 'Jun ')
      .replace('6', 'Jul ').replace('7', 'Aug ')
      .replace('8', 'Sep ').replace('9', 'Oct ')
      .replace('10', 'Nov ').replace('11', 'Dec ')
    + ' ' + currentDate.getUTCDate() + ', ' + currentDate.getUTCFullYear().toString() + ' ' +
    currentDateHrs + ':'
    + currentDateMins
  )

  useEffect(() => {
    console.log('hej')
    getLinkArray().then((linkArray) => {
      var array = []

      linkArray.forEach((item, index) => {
        console.log(item)
        array.push(<LaunchpadLink link={item.fields.url}>{item.fields.displayName}</LaunchpadLink>)
      })

      setLinkElArray(array)
    })
  }, [])

  setInterval(() => {
    var currentDate = new Date()

    if (currentDate.getMinutes() < 10) {
      var currentDateMins = currentDate.getMinutes().toString()
        .replace('0', '00').replace('1', '01').replace('2', '02')
        .replace('3', '03').replace('4', '04').replace('5', '05')
        .replace('6', '06').replace('7', '07').replace('8', '08')
        .replace('9', '09')
    } else {
      var currentDateMins = currentDate.getMinutes()
    }

    if (currentDate.getHours() < 10) {
      var currentDateHrs = currentDate.getHours().toString()
        .replace('0', '00').replace('1', '01').replace('2', '02')
        .replace('3', '03').replace('4', '04').replace('5', '05')
        .replace('6', '06').replace('7', '07').replace('8', '08')
        .replace('9', '09')
    } else {
      var currentDateHrs = currentDate.getHours()
    }

    setDateTime(currentDate.getUTCMonth().toString()
      .replace('0', 'Jan ').replace('1', 'Feb ')
      .replace('2', 'Mar ').replace('3', 'Apr ')
      .replace('4', 'May ').replace('5', 'Jun ')
      .replace('6', 'Jul ').replace('7', 'Aug ')
      .replace('8', 'Sep ').replace('9', 'Oct ')
      .replace('10', 'Nov ').replace('11', 'Dec ')
      + ' ' + currentDate.getUTCDate() + ', ' + currentDate.getUTCFullYear().toString() + ' ' +
      currentDateHrs + ':'
      + currentDateMins)
  }, 800)


  return (
    <>
      <Head>
        <title>Viggo BF Launchpad</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main>
        <h3>Go to URL</h3><br />
        <input onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (document.getElementById('url')?.value) {
              if (document.getElementById('url')?.value.includes('https://') || document.getElementById('url')?.value.includes('http://')) {
                Router.push(document.getElementById('url')?.value)
              } else {
                Router.push('https://' + document.getElementById('url')?.value)
              }
            }
          }
        }} id='url' style={{ marginLeft: '8px', float: 'left', width: 'calc(100vw - 90px)', marginRight: '6px' }} placeholder='Type a URL' />
        <button style={{ float: 'left', width: '40px', height: '28px' }} onClick={() => {
          if (document.getElementById('url')?.value) {
            if (document.getElementById('url')?.value.includes('https://') || document.getElementById('url')?.value.includes('http://')) {
              Router.push(document.getElementById('url')?.value)
            } else {
              Router.push('https://' + document.getElementById('url')?.value)
            }
          }
        }}>&rarr;</button>

        <br /><br />

        <h3>Go to saved URL</h3><br />

        {linkElArray}



        <div className='bottomBar' style={{ textAlign: 'right' }}>{dateTime}</div>
      </main>
    </>
  )
}
