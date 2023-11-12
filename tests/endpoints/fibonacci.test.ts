import fibonacci from "../../src/endpoints/fibonacci";
import httpMocks from "node-mocks-http";
describe('fibonacci', () => {
  it('defaults to 100 numbers if body is empty', async () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/inverse',
      body: {}
    })
    const response = httpMocks.createResponse();

    await fibonacci(request, response)

    let res = response._getData();

    expect(res).toContain("first 100 numbers")
  })
  it('defaults to 200 if iteration is greater than 200', async () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/inverse',
      body: {iterations: 300}
    })
    const response = httpMocks.createResponse();

    await fibonacci(request, response)

    let res = response._getData();

    expect(res).toContain("first 200 numbers")
  })
  it('defaults to 100 if iterations is less than 0', async () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/inverse',
      body: {iterations: -1}
    })
    const response = httpMocks.createResponse();

    await fibonacci(request, response)

    let res = response._getData();

    expect(res).toContain("first 100 numbers")
  })
  it('defaults to 100 if iterations is not a number', async () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/inverse',
      body: {iterations: 'asdf'}
    })
    const response = httpMocks.createResponse();

    await fibonacci(request, response)

    let res = response._getData();

    expect(res).toContain("first 100 numbers")
  })
  it('returns the fibonacci sequence', async () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/inverse',
      body: {iterations: 5}
    })
    const response = httpMocks.createResponse();

    await fibonacci(request, response)

    let res = response._getData();

    expect(res).toContain("1,1,2,3,5")
  })
});