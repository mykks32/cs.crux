"use strict";
class Roman {
    constructor() {
    }
    romanToInt(s) {
        const romans = {
            "I": 1,
            "V": 5,
            "X": 10,
            "L": 50,
            "C": 100,
            "D": 500,
            "M": 1000
        };
        const arr = s.split('');
        let output = 0;
        for (let i = 0; i < arr.length; i++) {
            const current = romans[arr[i]];
            const next = romans[arr[i + 1]] ?? 0;
            if (next && current < next) {
                output -= current;
            }
            else {
                output += current;
            }
        }
        console.log(output);
        return output;
    }
}
(() => new Roman().romanToInt('XXVII'))();
