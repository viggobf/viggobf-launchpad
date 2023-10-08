import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import getLinkArray from '../api/links.ts'
import { ArrowForwardRounded, ArrowOutward, ArrowBackRounded } from '@mui/icons-material'


export default function Page() {
    const router = useRouter()
    const page = router.query.page
    const [name, setName] = useState()
    const [link, setLink] = useState()

    useEffect(() => {
        getLinkArray().then((linkArray) => {
            try {
                if (parseInt(page) !== undefined) {
                    console.log(parseInt(page))
                    setName(linkArray[parseInt(page)].fields.displayName)
                    setLink(linkArray[parseInt(page)].fields.url)
                }
            } catch (e) {
                setName('Site at ' + decodeURIComponent(page))
                setLink(decodeURIComponent(page))
            }
        })
    }, [page])

    return (
        <>
            <Head>
                <title>Viggo BF Launchpad</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>


            <main>

                <div style={{ height: '48px', marginLeft: '2px' }}>
                    <button title='Go back to launchpad' style={{ width: 'fit-content', float: 'left', marginRight: '8px', marginTop: '2px' }} onClick={() => { router.push('/') }}><ArrowBackRounded style={{ fontSize: 'large' }} /></button>
                    <div style={{ float: 'left' }}>
                        <strong style={{ marginBottom: '0', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{name}</strong>
                        <h3 style={{ marginTop: '0', marginLeft: '0' }}>{link}</h3>
                    </div>

                    <button title='Open actual site' style={{ width: 'fit-content', float: 'right', marginRight: '2px', marginTop: '2px' }} onClick={() => { router.push(link) }}><ArrowOutward style={{ fontSize: 'large' }} /></button>


                    <div style={{ clear: 'both', marginBottom: '14px' }} />

                </div>

                <iframe id='website' src={link} style={{ border: 'none', marginLeft: '-10px', width: '100vw', boxSizing: 'border-box', height: 'calc(100vh - 96px)' }} />
            </main>
        </>
    )
}