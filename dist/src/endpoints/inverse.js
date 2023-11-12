"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function inverse(req, res) {
    const object = req.body;
    if (!Object.keys(object).length) {
        res.status(401).send("Missing object in body");
        return;
    }
    if (!isBodyProperlyStructured(object)) {
        res.status(401).send("Invalid object structure");
        return;
    }
    let returnObject = {};
    for (const [key, value] of Object.entries(object)) {
        Object.assign(returnObject, Object.fromEntries([[value, key]]));
    }
    res.status(200).json(returnObject);
    return;
}
exports.default = inverse;
function isBodyProperlyStructured(object) {
    let valid = true;
    Object.keys(object).forEach(key => {
        if (typeof object[key] !== 'string') {
            valid = false;
        }
    });
    return valid;
}
//# sourceMappingURL=inverse.js.map