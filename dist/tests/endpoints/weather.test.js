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
const weather_1 = __importDefault(require("../../src/endpoints/weather"));
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
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
    ];
    it('errors with no body', () => {
        const request = node_mocks_http_1.default.createRequest({
            method: 'GET',
            url: '/weather',
            body: {}
        });
        const response = node_mocks_http_1.default.createResponse();
        (0, weather_1.default)(request, response);
        let res = response._getData();
        expect(res).toBe("Missing zone in body");
    });
    it('errors with bad zone code', () => __awaiter(void 0, void 0, void 0, function* () {
        global.fetch = jest.fn(() => {
            return {
                json: () => Promise.reject("error")
            };
        });
        const request = node_mocks_http_1.default.createRequest({
            method: 'GET',
            url: '/weather',
            body: { zone: 'UTZ107' }
        });
        const response = node_mocks_http_1.default.createResponse();
        yield (0, weather_1.default)(request, response);
        let res = JSON.parse(response._getData());
        expect(res).toStrictEqual({ error: "error" });
    }));
    it('provides valid data', () => __awaiter(void 0, void 0, void 0, function* () {
        global.fetch = jest.fn().mockImplementation(() => {
            return {
                json: () => {
                    return {
                        properties: {
                            periods: exampleReturnData
                        }
                    };
                }
            };
        });
        const request = node_mocks_http_1.default.createRequest({
            method: 'GET',
            url: '/weather',
            body: { zone: 'UTZ107' }
        });
        const response = node_mocks_http_1.default.createResponse();
        yield (0, weather_1.default)(request, response);
        let res = JSON.parse(response._getData());
        expect(res).toStrictEqual(exampleReturnData);
    }));
});
//# sourceMappingURL=weather.test.js.map