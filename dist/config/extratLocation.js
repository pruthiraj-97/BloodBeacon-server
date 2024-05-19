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
exports.extractLocation = void 0;
const axios_1 = __importDefault(require("axios"));
function extractLocation(longitude, latitude) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(longitude, latitude);
            const apiendpoint = `https://api.opencagedata.com/geocode/v1/json`;
            const apikey = `4b33eba298244662a109b229d59355bb`;
            const query = `${latitude},${longitude}`;
            const url = `${apiendpoint}?key=${apikey}&q=${query}&pretty=1`;
            const response = yield axios_1.default.get(url);
            const data = response.data;
            const result = data.results[0];
            const components = result.components;
            const address = {
                region: components.county,
                state: components.state,
                postcode: parseInt(components.postcode),
                country: components.country
            };
            return address;
        }
        catch (error) {
            return error;
        }
    });
}
exports.extractLocation = extractLocation;
