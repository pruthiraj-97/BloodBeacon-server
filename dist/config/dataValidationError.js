"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataValidationError = void 0;
function dataValidationError(error) {
    let errorMessage = [];
    error.forEach((err) => {
        errorMessage.push(err.message);
    });
    return errorMessage;
}
exports.dataValidationError = dataValidationError;
