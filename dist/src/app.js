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
const express_1 = __importDefault(require("express"));
const inverse_1 = __importDefault(require("./endpoints/inverse"));
const weather_1 = __importDefault(require("./endpoints/weather"));
const fibonacci_1 = __importDefault(require("./endpoints/fibonacci"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/inverse', (req, res) => {
    (0, inverse_1.default)(req, res);
});
app.get('/weather', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, weather_1.default)(req, res);
}));
app.get('/fibonacci', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, fibonacci_1.default)(req, res);
}));
app.listen(port, () => {
    console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map