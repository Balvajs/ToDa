import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>ToDa</title>
        <meta name="description" content="Apartman ToDa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to ToDa apartment</h1>
      </main>
    </div>
  );
}
