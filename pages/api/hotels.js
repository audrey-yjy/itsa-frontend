const hotelsData = [];

// Limit hotels to return per page
const getLimitedHotels = limit => {
  const refinedHotels = []
  for (let i = 0; i < limit; i++) {
    refinedHotels.push(hotelsData[i])
  }
  return refinedHotels
}

export default function handler(req, res) {
  const curPage = req.query.page || 1
  // Display 30 users per page load
  const perPage = 30

  try {
    const totalHotels = hotelsData.length
    const refinedHotels = getLimitedHotels(perPage * curPage)

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(
      JSON.stringify({
        message: 'Fetched hotels',
        users: refinedHotels,
        curPage: curPage,
        maxPage: Math.ceil(totalHotels / perPage),
      })
    )
  } catch (err) {
    console.log(err) ///
  }
}