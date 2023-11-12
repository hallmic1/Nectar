import weather from "../../src/endpoints/weather";
import httpMocks from 'node-mocks-http';

describe('weather', () => {
  const exampleReturnData = [
    {
      "number": 1,
      "name": "Tonight",
      "detailedForecast": "Mostly clear. Lows in the mid 20s."
    },
    {
      "number": 2,
      "name": "Sunday",
    }
  ]
  it('errors with no body', () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/weather',
      body: {}
    })
    const response = httpMocks.createResponse()
    weather(request, response)
    let res = response._getData()
    expect(res).toBe("Missing zone in body")
  });
  it('errors with bad zone code', async () => {
    global.fetch = jest.fn(() => {
      return {
        json: () => Promise.reject("error")
      }
    }) as jest.Mock;
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/weather',
      body: {zone: 'UTZ107'}
    })
    const response = httpMocks.createResponse()
    await weather(request, response)
    let res = JSON.parse(response._getData())
    expect(res).toStrictEqual({error: "error"})

  });
  it('provides valid data', async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      return {
        json: () => {
          return {
            properties: {
              periods: exampleReturnData
            }
          }
        }
      }
    }) as jest.Mock;
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/weather',
      body: {zone: 'UTZ107'}
    })
    const response = httpMocks.createResponse()
    await weather(request, response)
    let res = JSON.parse(response._getData())
    expect(res).toStrictEqual(exampleReturnData)
  });
});