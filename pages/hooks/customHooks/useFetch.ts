
import { connectToDatabase } from "../../../util/mongodb"

export const useFetch = async () => {
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
    movies,
    timeTaken
  }

}