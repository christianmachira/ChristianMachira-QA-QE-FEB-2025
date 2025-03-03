var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import library from "/Users/christianmachira/Developer/SWE-QA-2025/TS-1/bookLibraryTs/data.json";
// let library1 : [
//     id:number,
//     title:string,
//     author:string,
//     gener:string,
//     year:number,
//     pages:number,
//     publisher:string,
//     image:string,
//     price:number
// ];
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://localhost:3000/library");
            const data = yield response.json();
        }
        catch (error) {
            console.error("Error fetching data", error);
        }
    });
}
console.log(library);
//# sourceMappingURL=products.js.map