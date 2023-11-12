"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inverse_1 = __importDefault(require("../../src/endpoints/inverse"));
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
describe('inverse', () => {
    it('errors with no body', () => {
        const request = node_mocks_http_1.default.createRequest({
            method: 'GET',
            url: '/inverse',
            body: {}
        });
        const response = node_mocks_http_1.default.createResponse();
        (0, inverse_1.default)(request, response);
        let res = response._getData();
        expect(res).toBe("Missing object in body");
    });
    it('errors if body is not of expected structure', () => {
        const request = node_mocks_http_1.default.createRequest({
            method: 'GET',
            url: '/inverse',
            body: { "hello": {
                    "world": "bad"
                }
            }
        });
        const response = node_mocks_http_1.default.createResponse();
        (0, inverse_1.default)(request, response);
        let res = response._getData();
        expect(res).toBe("Invalid object structure");
    });
    it('returns an inversed object', () => {
        const request = node_mocks_http_1.default.createRequest({
            method: 'GET',
            url: '/inverse',
            body: { "hello": "world" }
        });
        const response = node_mocks_http_1.default.createResponse();
        (0, inverse_1.default)(request, response);
        let res = JSON.parse(response._getData());
        expect(res).toStrictEqual({ world: "hello" });
    });
});
//# sourceMappingURL=inverse.test.js.map