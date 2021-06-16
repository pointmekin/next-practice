import { connectToDatabase } from "../util/mongodb";
export default function Top({ movies, timeTaken }) {
  
  return (
    <div>
      <div>{`Took ${timeTaken}`}</div>
      <h1>Top 1000 Movies of All Time (ISR)</h1>
      <p>
        <small>(According to Metacritic)</small>
      </p>
      <ul>
        {movies.map((movie) => (
          <li>
            <h2>{movie.title}</h2>
            <h3>{movie.metacritic}</h3>
            <p>{movie.plot}</p>
          </li>
        ))}
      </ul>
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

  let t1 = new Date()
  const timeTaken = t1 - t0

  return {
    props: {
      movies: JSON.parse(JSON.stringify(movies)),
      timeTaken
    },
    revalidate: 10
  };
}