import { connectToDatabase } from "../util/mongodb";

export default function Ssr({ movies, timeTaken }) {
  
  return (
    <div>
      <div>{`Took ${timeTaken}`}</div>
      <h1>Top 1000 Movies of All Time(SSR)</h1>
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
export async function getServerSideProps() {
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
SSR: Server-Side Rendering

HTML is generated on each request. When you are dealing with dynamic 
data that changes every second, then you should use SSR.

In NextJS, you can use getServerSideProps() method for SSR.

Here, getServerSideProps() will run on every request and fetch 
always the latest data.

========

In the Server Side Rendering model the NextJS server first calls the getServerSideProps method 
exported from your page file. This method returns props which are then sent to the component. 
The server renders the page component with those props and it converts that to an HTML string 
which it sends back to the client.

NextJS also takes the returned props from getServerSideProps and send that to the client as 
well for a process called hydration.

On the client side the browser gets the HTML payload and renders out the page contents. 
It then starts parsing and running the React app in the Javascript bundle. The React app 
then hydrates from the state that NextJS stored for you. Your application initializes and 
you are off to the races.

Pros

Content immediately available - Because you are sending rendered HTML to the client the 
customer will start to see content almost immediately.

No additional client fetches  - Ideally the server rendering process will make all the 
required calls to get the data, so you won't be making any additional service calls from 
the client. At least until the user starts to play around with the page a little.

Great for SEO - Search engines like HTML content. If you are using client side rendering
only then you are counting on search engines running your Javascript, which may or may not happen.

Cons

Slower on the server - You are rendering the page twice, once on the server and once on the client. 
You are also probably making service calls from the server to render the page. All of that takes time 
so the initial send of the HTML to the client could be delayed.

Incompatible with some UI libraries - If the UI library you like uses window then you are going to
need to fix that or use something else because Node doesn't have window or document.

*/