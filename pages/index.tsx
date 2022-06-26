import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Feed from '../components/Feed'
import Header from '../components/Header'
import PostBox from '../components/PostBox'

const Home: NextPage = () => {
  return (
    <div className="max-w-5xl mx-auto my-7">
      <Head>
        <title>Reddit</title>
      </Head>

	  <PostBox />

	  <div className="flex">
		  <Feed />
	  </div>
    </div>
  )
}

export default Home
