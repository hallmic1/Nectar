import { Request, Response} from "express";

export default async function weather(req: Request, res: Response) {
  const { zone } = req.body;
  if(!zone) {
    res.status(401).send("Missing zone in body");
    return;
  }
  await getWeatherData(zone).then(data => {
    res.status(200).json(data.properties.periods)
  }).catch(e => {
    console.error("error", e)
    res.status(500).json({error: e})
  })
}

async function getWeatherData(zone: string) {
  const res = await fetch(`https://api.weather.gov/zones/land/${zone}/forecast`, {
    headers: {
      accept: "application/geo+json"
    }
  })
  return res.json();
}