import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Router from 'next/router'
import getLinkArray from './api/links'
import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowForwardRounded } from '@mui/icons-material'


const inter = Inter({ subsets: ['latin'] })

function openInputURL(ev) {
  if (document.getElementById('url')?.value) {
    if (document.getElementById('url')?.value.includes('https://') || document.getElementById('url')?.value.includes('http://')) {
      if (ev.shiftKey) {
        Router.push(document.getElementById('url')?.value)
      } else {
        Router.push('/page/' + encodeURIComponent(document.getElementById('url')?.value))
      }

    } else {
      if (ev.shiftKey) {
        Router.push('https://' + document.getElementById('url')?.value)
      } else {
        Router.push('/page/https%3A%2F%2F' + encodeURIComponent(document.getElementById('url')?.value))
      }
    }
  }
}

function LaunchpadLink(props) {
  return <button className='link' onClick={(ev) => {
    if (ev.shiftKey) {
      Router.push(props.link)
    } else {
      Router.push('/page/' + props.index.toString())
    }

  }}>
    <span style={{ float: 'left' }}>
      <strong style={{ fontSize: '16px' }}>{props.children}</strong><br />
      <span style={{ fontSize: '11px' }}>{props.link}</span>
    </span>

    <span style={{ float: 'right' }}>
      <ArrowForwardRounded style={{ fontSize: 'large' }} />
    </span>
  </button>
}

var num = 0

export default function Home() {
  var [linkElArray, setLinkElArray] = useState()

  var [greeting, setGreeting] = useState()

  var date = new Date()

  useEffect(() => {
    if (date.getHours() > 11 && date.getHours() < 17) {
      setGreeting('Good afternoon')
    } else if (date.getHours() < 12) {
      setGreeting('Good morning')
    } else if (date.getHours() > 17) {
      setGreeting('Good evening')
    }
  }, [])

  setInterval(() => {
    console.log('yo')
    if (date.getHours() > 11 && date.getHours() < 17) {
      setGreeting('Good afternoon')
    } else if (date.getHours() < 12) {
      setGreeting('Good morning')
    } else if (date.getHours() > 17) {
      setGreeting('Good evening')
    }
  }, 60000)


  useEffect(() => {
    getLinkArray().then((linkArray) => {
      var array = []

      linkArray.forEach((item, index) => {
        console.log(item)
        array.push(<LaunchpadLink index={index} link={item.fields.url}>{item.fields.displayName}</LaunchpadLink>)
      })

      setLinkElArray(array)
    })
  }, [])


  return (
    <>
      <Head>
        <title>Viggo BF Launchpad</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main>
        <h2 style={{marginLeft: '14.5px', marginTop: '20px'}}>{greeting}</h2><br/>

        <h3>Go to URL</h3><br />
        <input onKeyDown={(e) => {
          if (e.key === 'Enter') {
            openInputURL(e)
          }
        }} id='url' style={{ marginLeft: '8px', float: 'left', width: 'calc(100vw - 90px)', marginRight: '6px' }} placeholder='Type a URL' />
        <button style={{ float: 'left', width: '40px' }} onClick={(ev) => {
          openInputURL(ev)
        }}><ArrowForwardRounded style={{ fontSize: 'large' }} /></button>

        <br /><br />

        <h3>Go to saved URL</h3><br />

        {linkElArray}
      </main>
    </>
  )
}
