export default async (req, res) => {
  console.log(req.query)
  const { _id } = req.query
  res.end(`Id: ${_id}`)
}