import express from 'express'
import inverse from "./endpoints/inverse"
import weather from "./endpoints/weather";
import fibonacci from "./endpoints/fibonacci";
const app = express()
const port = 3000


app.use(express.urlencoded({extended: false}))
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/inverse', (req, res) => {
  inverse(req, res)
})
app.get('/weather', async (req, res) => {
  await weather(req, res)
})
app.get('/fibonacci', async (req, res) => {
  await fibonacci(req, res)
})
app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`)
})
