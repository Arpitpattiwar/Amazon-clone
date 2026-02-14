import { formatMoney } from "../scripts/utils/Math.js";

if(formatMoney(2095) === '2095.00'){
    console.log(`Test passed!`);
}else{
    console.log(`Test failed!`);
}