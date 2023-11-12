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
Object.defineProperty(exports, "__esModule", { value: true });
function weather(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { zone } = req.body;
        if (!zone) {
            res.status(401).send("Missing zone in body");
            return;
        }
        yield getWeatherData(zone).then(data => {
            res.status(200).json(data.properties.periods);
        }).catch(e => {
            console.error("error", e);
            res.status(500).json({ error: e });
        });
    });
}
exports.default = weather;
function getWeatherData(zone) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`https://api.weather.gov/zones/land/${zone}/forecast`, {
            headers: {
                accept: "application/geo+json"
            }
        });
        return res.json();
    });
}
//# sourceMappingURL=weather.js.map