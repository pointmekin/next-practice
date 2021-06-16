import { connectToDatabase } from "../util/mongodb";
export default function Top({ movies, timeTaken }) {
  
  return (
    <div>
      <div>{`Took ${timeTaken}`}</div>
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