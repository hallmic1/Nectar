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
let sequence = [];
function fibonacci(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { iterations } = req.body;
        let limit = Math.min(parseInt(iterations), 200);
        if (isNaN(limit) || limit < 0) {
            limit = 100;
        }
        yield generateFibonacci(limit);
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
  `);
    });
}
exports.default = fibonacci;
function generateFibonacci(iterations) {
    return __awaiter(this, void 0, void 0, function* () {
        if (sequence.length >= iterations) {
            return;
        }
        if (sequence.length < 2) {
            sequence = sequence.concat([1, 1]);
        }
        const lastTwoElements = sequence.slice(-2);
        sequence.push(lastTwoElements[0] + lastTwoElements[1]);
        yield generateFibonacci(iterations);
    });
}
//# sourceMappingURL=fibonacci.js.map