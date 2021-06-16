import { connectToDatabase } from "../util/mongodb";
export default function Movies({ movies, timeTaken }) {
  return (
    <div>
      <h3>{timeTaken}</h3>
      <h1>Top 20 Movies of All Time (Redeployed)</h1>
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

export async function getServerSideProps() {
  let t0 = new Date()
  const { db } = await connectToDatabase();
  const movies = await db
    .collection("movies")
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();
  let t1 = new Date()
  const timeTaken = t1 - t0
  return {
    props: {
      movies: JSON.parse(JSON.stringify(movies)),
      timeTaken
    },
  };
}