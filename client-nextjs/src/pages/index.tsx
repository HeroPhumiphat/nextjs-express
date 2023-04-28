import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  React.useEffect(() => {
    router.replace('/users')
  }, [])
  return (
    <div>
      <Head>
        <title>หน้าหลัก | Herophumiphat</title>
      </Head>
      <main>
        <div className='w-full text-center py-8'>
          {/* <h1 className='text-xl'>Hi!, I&rsquo;m Herophumiphat</h1> */}
        </div>
      </main>
    </div>
  )
}

