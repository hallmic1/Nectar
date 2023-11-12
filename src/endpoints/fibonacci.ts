import { Request, Response } from "express";
let sequence: number[] = []
export default async function fibonacci(req: Request, res: Response) {
  const { iterations } = req.body;
  let limit = Math.min(parseInt(iterations), 200)
  if(isNaN(limit) || limit < 0) {
    limit = 100
  }
  await generateFibonacci(limit)
  //present fib from [0] to [n]
  res.status(200).send(`
    <html lang="en">
      <head>  
        <title>
            Fib!
        </title>
      </head>
      <body style="background-color: lightblue; padding: 20px; font-family: Arial,serif">
        <h1>
          Fib Time (first ${limit} numbers)
        </h1>
        <div style="word-wrap: break-word">
          ${sequence.slice(0, limit)}
        </div>
      </body>
    </html>
  `)
}

async function generateFibonacci(iterations: number) {
  if(sequence.length >= iterations) {
    return
  }
  if(sequence.length < 2) {
    sequence = sequence.concat([1,1])
  }
  const lastTwoElements = sequence.slice(-2)
  sequence.push(lastTwoElements[0] + lastTwoElements[1])
  await generateFibonacci(iterations)
}