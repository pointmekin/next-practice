import { connectToDatabase } from "../util/mongodb"
import { GetStaticProps } from 'next'

export default function Isr({ movies, timeTaken }) {
  
  return (
    <div>
      <h2>{`Took ${timeTaken}`}</h2>
      <h1>Top 1000 Movies of All Time(CSR)</h1>
      <p>
        <small>(According to Metacritic)</small>
      </p>
      {movies.map((movie) => (
        <div style={{backgroundColor:"#f3f3f3", padding:"16px", margin:"12px", borderRadius:"8px"}}>
          <h2>{movie.title}</h2>
          <h3>{movie.metacritic}</h3>
          <p>{movie.plot}</p>
        </div>
      ))}
    </div>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  let t0 = new Date()

  const { db } = await connectToDatabase();
  const movies = await db
    .collection("movies")
    .find({})
    .sort({ metacritic: -1 })
    .limit(1000)
    .toArray();
  let t1: Date
  t1 = new Date()
  let timeTaken: number
  timeTaken = t1.valueOf() - t0.valueOf()

  return {
    props: {
      movies: JSON.parse(JSON.stringify(movies)),
      timeTaken
    },
    revalidate: 10
  };
}

/*

ISR: Incremental Static Regeneration

In ISR also HTML is generated at build time, but here we can pass a 
revalidate prop that will make the data stale after the specified time 
and we will fetch the recent data in the background, invalidate the cache 
and replace it with the new data.

As you can see, we have added revalidate:60, which will make the data stale 
after every 60s and this method will run to get the latest data.

Using this method we can have dynamic data on our site and can achieve 
a very good performance.

================================

Client Side Rendering
Client side rendering, or CSR, is the most common way of rendering React apps. It's what you 
get out of the box if you are using Create React App. The lifecycle is very simple. The server 
renders a blank page with a script tag pointing at the React app's bundle. That page is then 
sent to the client which renders the blank page, and starts to run the app. The React app then 
makes whatever API calls it needs to and renders the contents of the page.

This is also how NextJS by default, renders the page, assuming you do not have a getServerSideProps 
method exported from your page.

Pros

Fast on the server - Because you are only rendering a blank page it's very fast to render.
Supports static - The blank page can be statically generated and served from something like S3, 
which makes it even faster.

Supports Single Page Applications - Client Side Rendering is the only model that supports 
Single Page Applications, or SPAs.

Cons
No initial render - You are sending a blank page to the customer. So if your app is big, or the 
customer is on a slow connection, that's going to be less than ideal.

*/