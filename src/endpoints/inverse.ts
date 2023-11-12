import { Request, Response } from "express";


type reqBody = Record<string, string>



export default function inverse(req: Request, res: Response) {
  const object: reqBody = req.body;
  if(!Object.keys(object).length) {
    res.status(401).send("Missing object in body");
    return;
  }
  if(!isBodyProperlyStructured(object)) {
    res.status(401).send("Invalid object structure");
    return;
  }
  let returnObject = {}
  for(const [key, value] of Object.entries(object)) {
    Object.assign(returnObject, Object.fromEntries( [[value, key]]));
  }
  res.status(200).json(returnObject);
  return;
}

function isBodyProperlyStructured(object: Object): boolean {
  let valid = true;
  Object.keys(object).forEach(key => {
    if(typeof object[key] !== 'string') {
      valid = false
    }
  })
  return valid;
}