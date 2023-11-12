"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fibonacci_1 = __importDefault(require("../../src/endpoints/fibonacci"));
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
describe('fibonacci', () => {
    it('defaults to 100 numbers if body is empty', () => __awaiter(void 0, void 0, void 0, function* () {
        const request = node_mocks_http_1.default.createRequest({
            method: 'GET',
            url: '/inverse',
            body: {}
        });
        const response = node_mocks_http_1.default.createResponse();
        yield (0, fibonacci_1.default)(request, response);
        let res = response._getData();
        expect(res).toContain("first 100 numbers");
    }));
    it('defaults to 200 if iteration is greater than 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const request = node_mocks_http_1.default.createRequest({
            method: 'GET',
            url: '/inverse',
            body: { iterations: 300 }
        });
        const response = node_mocks_http_1.default.createResponse();
        yield (0, fibonacci_1.default)(request, response);
        let res = response._getData();
        expect(res).toContain("first 200 numbers");
    }));
    it('defaults to 100 if iterations is less than 0', () => __awaiter(void 0, void 0, void 0, function* () {
        const request = node_mocks_http_1.default.createRequest({
            method: 'GET',
            url: '/inverse',
            body: { iterations: -1 }
        });
        const response = node_mocks_http_1.default.createResponse();
        yield (0, fibonacci_1.default)(request, response);
        let res = response._getData();
        expect(res).toContain("first 100 numbers");
    }));
    it('defaults to 100 if iterations is not a number', () => __awaiter(void 0, void 0, void 0, function* () {
        const request = node_mocks_http_1.default.createRequest({
            method: 'GET',
            url: '/inverse',
            body: { iterations: 'asdf' }
        });
        const response = node_mocks_http_1.default.createResponse();
        yield (0, fibonacci_1.default)(request, response);
        let res = response._getData();
        expect(res).toContain("first 100 numbers");
    }));
    it('returns the fibonacci sequence', () => __awaiter(void 0, void 0, void 0, function* () {
        const request = node_mocks_http_1.default.createRequest({
            method: 'GET',
            url: '/inverse',
            body: { iterations: 5 }
        });
        const response = node_mocks_http_1.default.createResponse();
        yield (0, fibonacci_1.default)(request, response);
        let res = response._getData();
        expect(res).toContain("1,1,2,3,5");
    }));
});
//# sourceMappingURL=fibonacci.test.js.map