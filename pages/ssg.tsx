import { connectToDatabase } from "../util/mongodb";

export default function Ssg({ movies, timeTaken }) {
  
  return (
    <div>
      <div>{`Took ${timeTaken}`}</div>
      <h1>Top 1000 Movies of All Time(SSG)</h1>
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
export async function getStaticProps() {
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
  };
}

/*

SSG: Static Site Generation

The HTML is generated at build time and is reused for each request. 

This method is good for static sites only where you are not serving 
any dynamic data to the users.

In NextJS, you can use getStaticpProps() method for SSG.

Here the getStaticpProps() method runs on build time and it will fetch 
the todos and pass it as props to the component. 

But if your todos get updated, it won't reflect on the UI. You have to 
re-deploy the site to reflect the latest todos.

So, this method is not useful for dynamic data. This can be good for a 
static site like a portfolio site or a landing page.

=================

Static Site Generation is like Server Side Rendering with the exception that you 
render the pages at build time instead of at request time. In the Next world that 
means that the NextJS build process first calls the getStaticPaths method exported 
from your page Javascript file to get an inventory of all the routes it should render. 
The build process then calls the getStaticProps method for each of the routes and renders 
the page the same way it does in Server Side Rendering.

At the end of the build process you then have a set of HTML files that you can then host 
on a static hosting service and you have a site that you no longer need a server to run.

Pros

Content immediately available - Because you are sending rendered HTML to the client the 
customer will start to see content almost immediately.

No additional client fetches  - Ideally the server rendering process will make all the required 
calls to get the data, so you won't be making any additional service calls from the client. 
At least until the user starts to play around with the page a little.

Great for SEO - Search engines like HTML content. If you are using client side rendering only 
then you are counting on search engines running your Javascript, which may or may not happen.

Incredible Fast To Serve - Static content is crazy fast to serve. You can also edge cache it very cleanly.
No Server - You don't have to run a server. So you don't need to monitor that server and you are going to 
get far less pager duty pings.

Cons

Can be slow to rebuild large sites - If you have tens of thousands of routes you should expect slowdowns. 
Though the NextJS team is working on incremental rebuilds.

Incompatible with some UI libraries - If the UI library you like uses window then you are going to need 
to fix that or use something else because Node doesn't have window or document.

*/