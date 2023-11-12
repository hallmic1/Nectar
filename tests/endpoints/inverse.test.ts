import inverse from '../../src/endpoints/inverse'
import httpMocks from 'node-mocks-http';

describe('inverse', () => {
  it('errors with no body', () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/inverse',
      body: {}
    })
    const response = httpMocks.createResponse();

    inverse(request, response)

    let res = response._getData();

    expect(res).toBe("Missing object in body")
  })
  it('errors if body is not of expected structure', () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/inverse',
      body: {"hello": {
          "world": "bad"
        }
      }
    })
    const response = httpMocks.createResponse();

    inverse(request, response)

    let res = response._getData();

    expect(res).toBe("Invalid object structure")
  })
  it('returns an inversed object', () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/inverse',
      body: {"hello": "world"}
    })
    const response = httpMocks.createResponse();

    inverse(request, response)

    let res = JSON.parse(response._getData());

    expect(res).toStrictEqual({world: "hello"})
  })
});