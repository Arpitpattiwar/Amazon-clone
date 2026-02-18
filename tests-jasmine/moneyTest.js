import { formatMoney } from "../scripts/utils/Math.js";

describe('test suite: formatCurrency', () => {
    it('round to 2 decimal places', () => {
        expect(formatMoney(2095)).toEqual('2095.00');
    });
});