// 費氏數列 fibonacci: f(n) = f(n-1) + f(n-2)
// [{
//   0: 0,
//   1: 1,
//   2: 1,
//   2: 2,
//   4: 3,
//   5: 5,
//   6: 8,
//   7: 13
// }]
var fibonacci = function(n) {

	if (n === 0) return 0;
	if (n === 1) return 1;

    let fib = 1;
    let pre = 0;
    for(let i = 2; i <= n; i++) {
        let temp = fib;
        fib = temp + pre;
        pre = temp;
    }
    
    return fib;
};

// convert int to binary string

const intToBinary = function(number) {

    let result = '';

    while (number > 0) {
       
        const remainder = Math.floor(number % 2) === 0? '0': '1';

        result += remainder;
        number = Math.floor(number / 2);
    }

    return result.split('').reverse().join('');
}