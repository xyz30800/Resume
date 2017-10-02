// Solution: 
// https://github.com/hanzichi/leetcode
// https://github.com/chihungyu1116/leetcode-javascript
// https://skyyen999.gitbooks.io/-leetcode-with-javascript/content/

// 1. Two Sum - Easy
// Given an array of integers, return indices of the two numbers such that they add up to a specific target.
// You may assume that each input would have exactly one solution, and you may not use the same element twice.

const nums = [2, 7, 11, 15];
const target = 9;

// Solution 1
const twoSum = function(nums, target) {
	const len = nums.length;
    for(let i = 0; i < len; i ++) {
    	
		for(let j = i + 1; j < len; j ++) {
			if(nums[i] + nums[j] === target) {
				return [i, j];
			}
		}
		
	}
};

// Solution 2
const twoSum2 = function(nums, target) {
	var a = {};
	const len = nums.length;
	for (let i = 0; i < len; i ++){
		const temp = target - nums[i];
		if(a[temp] !== undefined) return [a[temp], i];
		a[nums[i]] = i;
	}
};

// Refactoring from Solution 2
const twoSum3 = function(nums, target) {
	let a = {};
	return nums.map((item, index) => {
		const temp = target - item;
		if(a[temp] !== undefined) return [a[temp], index];
		a[item] = index;
	})
};

/////---------------------------------------------------------------------------------------/////
// 9. Palindrome Number - Easy 回文
// Determine whether an integer is a palindrome. Do this without extra space.
const isPalindrome = function(x) {
    const temp = x.toString();
    const tempReverse = temp.split('').reverse().join('');
    return (temp === tempReverse) ? true : false; 
};

/////---------------------------------------------------------------------------------------/////
// 14. Longest Common Prefix - Easy
// Write a function to find the longest common prefix string amongst an array of strings.
var longestCommonPrefix = function(strs) {

    const len = strs.length;
    
    if(len === 0 || strs === null) return "";

    let sample = strs[0];

    for (let i = 1; i < len; i ++) {
        const temp = strs[i];
        
        let s = 0;
        for (; s < sample.length; s ++) {
            if (sample[s] !== temp[s]) {
                break;
            }
        }

        sample = sample.slice(0, s);
    }

    return sample;
};

/////---------------------------------------------------------------------------------------/////
// 26. Remove Duplicates from Sorted Array
// Given a sorted array, remove the duplicates in place such that each element appear only once and return the new length.
// Do not allocate extra space for another array, you must do this in place with constant memory.
var removeDuplicates = function(nums) {
    
    if(nums == null || nums.length == 0) return 0;
    
    for (let n = 0; n < nums.length - 1; n ++) {
        
        if (nums[n] === nums[n + 1]) {
            nums.splice(n, 1);
			n -= 1;
        } 
    }
    
    return nums.length;
};

/////---------------------------------------------------------------------------------------/////
// 70. Climbing Stairs
// You are climbing a stair case. It takes n steps to reach to the top.
// Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
// Note: Given n will be a positive integer.
// 費氏數列 f(n) = f(n-1) + f(n-2)

var climbStairs = function(n) {

    let fib = 1;
    let pre = 1;
    for(let i = 2; i <= n; i++) {
        let temp = fib;
        fib = temp + pre;
        pre = temp;
    }
    
    return fib;
};


/////---------------------------------------------------------------------------------------/////
// 101. Symmetric Tree (Not solved)
// Given a binary tree, check whether it is a mirror of itself (ie, symmetric around its center)
// For example, this binary tree [1,2,2,3,4,4,3] is symmetric
// But the following [1,2,2,null,3,null,3] is not

var isSymmetric = function(root) {
    if (!root)
    return true;

    // left[n] 代表二叉树左子树从左到右的 value 数组
    var left = [];

    // right[n] 代表二叉树右子树从左到右的 value 数组
    var right = [];

    dfs(root.left, 1, left);
    dfs(root.right, 1, right);

    if (left.length !== right.length)
        return false;

    for (var i = 1, len = left.length; i < len; i++) {
        var a = left[i];
        var b = right[i];
        b.reverse();

        if (a.length !== b.length)
            return false;

        if (a.join('|') !== b.join('|'))
            return false;
    }

    return true;
};

function dfs(node, step, arr) {
    
    if (!arr[step])
        arr[step] = [];

    if (!node) {
        arr[step].push(null);
        return;
    }

    arr[step].push(node.val);

    dfs(node.left, step + 1, arr);
    dfs(node.right, step + 1, arr);
};

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

// Solution 2
var isSymmetric = function(root) {

    if (root == null) return true;

    return checkTwo(root.left, root.right);
}

var checkTwo = function(a , b){

    if (a == null || b == null){
        return a == null && b == null;
    }

    if (a.val !== b.val) {
        return false;
    }

    return checkTwo(a.left, b.right) && checkTwo(b.left, a.right);
};

// 121. Best Time to Buy and Sell Stock
// Say you have an array for which the i-th element is the price of a given stock on day i.
// If you were only permitted to complete at most one transaction (ie, buy one and sell one share of the stock), 
// design an algorithm to find the maximum profit.

// 範例1: Input : [7, 1, 5, 3, 6, 4]
// Output: 5
// 最大獲利為6-1=5，因為賣出價格必須比購入價格高，所以7-1是不可行的。
// 範例2: Input: [7, 6, 4, 3, 1]
// Output: 0
// 因為你不管今天怎麼買，賣掉都是虧錢，所以只能回傳0。
// 
// 單一元素最大獲利 = 目前價錢 - 前面出現的最低價格

// Solution 1 - faster
var maxProfit = function(prices) {

    // min代表目前股票出現的最低價，一開始用MAX_SAFE_INTEGER表示無限大
    var min = Infinity;

    // 目前獲利
    var profit = 0;

    for(var i = 0; i < prices.length ; i++){
        // 找出最低點買進
        if(prices[i] < min){
            min = prices[i];
        }

        // 計算現在的價錢可以獲利多少
        var calProfit = prices[i] - min;       
        // 現在的價錢賣出是否可以獲得更高的獲利
        if(calProfit > profit ){
            profit = calProfit;
        }
    }
    return profit;
};

// Solution 2
var maxProfit = function(prices) {

  var profit = 0;
  
  var min = Infinity;

  for (var i = 0; i < prices.length; i++) {
    min = Math.min(min, prices[i]);
    profit = Math.max(profit, prices[i] - min);
  }

  return profit;

};

/////---------------------------------------------------------------------------------------/////
// 136. Single Number
// Given an array of integers, every element appears twice except for one. Find that single one.
// Note: Your algorithm should have a linear runtime complexity. 
// Could you implement it without using extra memory?

// Bitwise XOR: https://www.w3schools.com/js/js_bitwise.asp

var singleNumber = function(nums) {
  var ans = 0;
  for(var i = 0, len = nums.length; i < len; i++)
    ans ^= nums[i];

  return ans;    
};

/////---------------------------------------------------------------------------------------/////
// 189. Rotate Array
// Rotate an array of n elements to the right by k steps.
// For example, with n = 7 and k = 3, the array [1,2,3,4,5,6,7] is rotated to [5,6,7,1,2,3,4].
// Note: Try to come up as many solutions as you can, there are at least 3 different ways to solve this problem.

// Do not return anything, modify nums in-place instead

var rotate = function(nums, k) {
    var step = k%nums.length;
    for(var i = 0 ; i < step ; i++){
        nums.unshift(nums.pop());
    }
}

/////---------------------------------------------------------------------------------------/////
// 198. House Robber
// You are a professional robber planning to rob houses along a street. 
// Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security system connected 
// and it will automatically contact the police if two adjacent houses were broken into on the same night.
// Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight without alerting the police.
// [2,4,5,3]，最多可以偷到 7，因為4+5+3 = 12雖然可以拿到比較多錢，但是會被警察抓。

var rob = function(nums) {
    var maxS = [];
    if(nums.length === 0) return 0;
    if(nums.length === 1) return nums[0];
    if(nums.length === 2) return Math.max(nums[1],nums[0]);

    maxS.push(nums[0]);
    maxS.push(Math.max(nums[0],nums[1]));

    for(var i = 2 ; i < nums.length ; i++){
        //最大金額   = Max(現在金額+前前一棟最大金額 ， 前一棟最大金額)
        maxS[i] =  Math.max(nums[i] + maxS[i-2] , maxS[i-1]);;
    }

    return maxS.pop();
};

/////---------------------------------------------------------------------------------------/////
// 217. Contains Duplicate
// Given an array of integers, find if the array contains any duplicates. 
// Your function should return true if any value appears at least twice in the array, 
// and it should return false if every element is distinct.

var containsDuplicate = function(nums) {
    let hash = {};
    for(let i = 0, len = nums.length; i < len; i++) {
    	if (hash[nums[i]]) return true;
    	hash[nums[i]] = true;
  	}
  	return false;
};

/////---------------------------------------------------------------------------------------/////
// 7. Reverse Integer
// Reverse digits of an integer.

// Example1: x = 123, return 321
// Example2: x = -123, return -321

// Note: The input is assumed to be a 32-bit signed integer. 
// Your function should return 0 when the reversed integer overflows.
// the int32 range: -2^31 ~ 2^31-1

var reverse = function(x) {

    const minn = - (1 << 30) * 2;
    const maxn = (1 << 30) * 2 - 1;

    if (x < minn || x > maxn) {
        return 0;
    };

    const positiveString = Math.abs(x).toString();
    const len = positiveString.length;

    let reverseString = [];
    for (let i = 0; i < len; i ++) {
        reverseString[i] = positiveString[len - i - 1];
    }

    const reverseInter = (x < 0)? parseInt(reverseString.join('')) * (-1): parseInt(reverseString.join(''));

    return (reverseInter < minn || reverseInter > maxn)? 0: reverseInter;
};

// 13. Roman to Integer
// Given a roman numeral, convert it to an integer.
// Input is guaranteed to be within the range from 1 to 3999.

var romanToInt = function(s) {
    const hash = {
        'I': 1,
        'X': 10,
        'C': 100,
        'M': 1000,
        'V': 5,
        'L': 50,
        'D': 500
    };

    const len = s.length;

    let number = 0;
    for (let i = 0; i < len; i ++) {
        const item = hash[s[i]];

        if (item < hash[s[i+1]] && i < len - 1) {
            const temp = hash[s[i+1]] - item;
            number = number + temp;
            i += 1
        } else {
            number = number + item;
        }
    }

    return number;
};

// 20. Valid Parentheses
// Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
// The brackets must close in the correct order, "()" and "()[]{}" are all valid but "(]" and "([)]" are not.

// arr 陣列只留不是 target 內的 key-value，有 match 的 value，則從 arr 移除 

var isValid = function(s) {

    let arr = [];

    const target = {
        '(': ')',
        '[': ']',
        '{': '}'
    };

    for (let i = 0; i < s.length; i ++) {
        if (!arr.length) {
            arr.push(s[i]);
        } else {
            if (s[i] === target[arr[arr.length - 1]]) {
                arr.pop();
            } else {
                arr.push(s[i]);
            }
        }
    }

    return !arr.length;
};

// 344. Reverse String
// Write a function that takes a string as input and returns the string reversed.

var reverseString = function(s) {

    // if (s === null)
    //     return s;
    
    // let arr = [];
    // const len = s.length
    // for (let u = 0; u < len; u ++) {
    //     arr[len - u] = s[u];
    // }

    // return arr.join('');

    return s.split('').reverse().join('');
};

// 53. Maximum Subarray
// Find the contiguous subarray within an array (containing at least one number) which has the largest sum.

// For example, given the array [-2,1,-3,4,-1,2,1,-5,4],
// the contiguous subarray [4,-1,2,1] has the largest sum = 6.

var maxSubArray = function(nums) {

    let maxn = -Number.MAX_VALUE;
    let sum = 0;

    for (let i = 0; i < nums.length; i ++) {
        sum += nums[i];
        if (sum > maxn) {
            maxn = sum;
        }
        if (sum < 0) {
            sum = 0;
        }
    }

    return maxn
};

// 38. Count and Say
// 1.     1         
// 2.     11        - 1個1
// 3.     21        - 2個1
// 4.     1211      - 1個2 + 1個1
// 5.     111221    - 1個1 + 1個2 + 2個1
var countAndSay = function(n) {

    if (n <= 1) return '1';

    var countNum = function(str) {
        
        if (str.length === 0) {
            return '';
        }

        const num = str.charAt(0);
        let count = 0;
        
        while (str[count] === num) {
            count += 1
        }
        
        const addStr = count.toString() + num.toString();
        const newStr = str.slice(count);
        
        return addStr + countNum(newStr);
    }

    let countSay = '1';
    for (let i = 2; i <= n; i ++) {
        countSay = countNum(countSay);    
    }

    return countSay;
};

// 28. Implement strStr()
// 同 indexOf() 方法，返回某个指定的字符串值在字符串中首次出现的位置。
var strStr = function(haystack, needle) {

    if(!needle) return 0;
    if(!haystack || needle.length > haystack.length) return -1;

    const needleLen = needle.length;

    let count = 0;
    for (let i = 0; i < haystack.length; i ++) {
        if (haystack[i] === needle[count] ) {
            count += 1;
        } else {
            i = (count !== 0)? i - count: i; //沒有一樣，i重新回到上次的i - count地方找
            count = 0;
        }

        if (count === needleLen) {
            return i - count + 1;
        }  
    }

    if (count === 0 || count !== needleLen) {
        return -1;
    }
};

// 66. Plus One
// Given a non-negative number represented as an array of digits, plus one to the number.
// 19 = [1,9] ， 19+1 = 20 = [2,0]。
var plusOne = function(digits) {
    
    const len = digits.length;

    let carry = 1;
    for (let i = len - 1; i >= 0; i --) {

        const added = digits[i] + carry;

        carry = (added % 10 === 0 && added !== 0)? 1: 0;       // added % 10 有進位的話 carry = 1，否則為 0
        digits[i] = (carry === 1)? 0: added;    //有進位的話原本位置為 0，否則仍為 added   
        
        if (i === 0 && carry === 1) {
           digits.unshift(carry);
        } 
    }

    return digits;
};

// 66. Plus One
// 開平方
var mySqrt = function(x) {
    return Math.floor(Math.sqrt(x));
};

// 104. Maximum Depth of Binary Tree - (Tree)
// Given a binary tree, find its maximum depth.
// The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

var maxDepth = function(root) {

    return find(root); 
    // 遞迴函式
    function find(node){
        // 節點到底
        if(node === null){
            return 0;
        } 

        var deepL = 1;
        var deepR = 1;
        // 有左節點，往下一層找
        if(node.left !== null){
            deepL += find(node.left)
        }
        // 有右節點，往下一層找
        if(node.right !== null){
            deepR += find(node.right)
        }

        // 回傳較大的深度depth，給上一層節點
        return deepL > deepR ?　deepL: deepR;
    }
};

// 118. Pascal's Triangle
// Given numRows, generate the first numRows of Pascal's triangle.
// For example, given numRows = 5,
// Return

// [
//      [1],
//     [1,1],
//    [1,2,1],
//   [1,3,3,1],
//  [1,4,6,4,1]
// ]
// 每一列第一個值都是1。
// 每一列第n個值則是上一列n-1位子+n位子的值。

var generate = function(numRows) {
    
    if(numRows == 0) return [];

    let arr = [ [1] ];
    for (let i = 1; i < numRows; i ++) {
        let each = [1];
        const prevRow = arr[i - 1];

        for (let j = 1; j <= prevRow.length; j ++) {

            // 每一列的第n個值都是 前一列pre[n-1] + pre[n]
            const item1 = prevRow[j-1];
            const item2 = prevRow[j]? prevRow[j]: 0; // 最後一筆為 undefined
            
            each.push(item1 + item2)
        }

        arr.push(each);
    }

    return arr;
};

// 202. Happy Number
// Write an algorithm to determine if a number is "happy".

// A happy number is a number defined by the following process: Starting with any positive integer, replace the number by the sum of the squares of its digits, and repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1. Those numbers for which this process ends in 1 are happy numbers.

// Example: 19 is a happy number

// 1^2 + 9^2 = 82
// 8^2 + 2^2 = 68
// 6^2 + 8^2 = 100
// 1^2 + 0^2 + 0^2 = 1
// 使用一個map儲存計算過的數字，如果目前的數字已經計算過，表示無窮迴圈出現，return false。持續計算到1出現true或是無窮迴圈出現false。

var isHappy = function(n) {
    
    var repeatValue = {};

    while (!repeatValue[n] && n !== 1) {
        repeatValue[n] = n;

        n.toString().split('').forEach((item, index) => {
            if(index == 0) n = 0; // 從頭開始
            n += item * item;
        })

        n = parseInt(n);
    }

    return n === 1;
};

// 125. Valid Palindrome
// Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.
// For example,
// "A man, a plan, a canal: Panama" is a palindrome.
// "race a car" is not a palindrome.

// 首先把字串轉為全小寫
// 將字串裡面不是字母與數字的部分去除
// 反轉字串判斷與上一個步驟處理過的字串相等

var validPalindrome = function(s) {
    
    const _s = s.toLowerCase().replace(/[^a-z0-9]/ig, ''); // 匹配任何非a-z0-9的詞。
    console.log(_s)
    const sReverse = _s.split('').reverse().join('');

    return sReverse === _s;
};

// 169. Majority Element
// Given an array of size n, find the majority element. 
// The majority element is the element that appears more than ⌊ n/2 ⌋ times.
// You may assume that the array is non-empty and the majority element always exist in the array.

var majorityElement = function(nums) {
    let count = {};

    for (let i = 0, len = nums.length; i < len; i ++) {
        if (!count[nums[i]]) {
            count[nums[i]] = 1;
        } else {
            count[nums[i]] += 1;
        }

        if (count[nums[i]] > (len / 2)) {
            return nums[i];
        }
    }
};

// 171. Excel Sheet Column Number
// Given a column title as appear in an Excel sheet, return its corresponding column number.
//  A -> 1
//  B -> 2
//  C -> 3
//  ...
//  Z -> 26
//  AA -> 27
//  AB -> 28

// A-Z總共26個字母，因此這就是一個26進位的系統
// 將字串分別取出字元A-Z，根據ANSI CODE，A的code為65，A = 65 - 64 = 1
// 以AB為例， AB = (A)26^1 + (B)26^0 = 126+ 2*1 = 28
// 以AZ為例， AZ = (A)26^1 + (Z)26^0 = 126+ 26*1 = 52

var titleToNumber = function(s) {

    let sum = 0;
    let count = 0;

    for(var i = s.length -1 ; i >= 0 ; i--) {
        const number = s[i].charCodeAt() - 64;

        sum = sum + number * Math.pow(26, count ++);
    }

    return sum;
};

// 172. Factorial Trailing Zeroes
// Given an integer n, return the number of trailing zeroes in n!. 尾零的數量
// 解法應該是log(n)的時間複雜度。

// 當出現0，也就是10的n次方，可以推論一定要出現因子裡面含有2跟5的數字
// 2這個數字到處撿都是，真正決定會出現幾個0的，是n!裡面包含幾個5
// 例如上面的n=5，54321 = 120，可以發現5*2 =10，因此會出現一個0
// n = 25，會出現 25,20,15,10,5共5個帶有5的數字，不過25其實包含了5*5，所以25!總共會出現5+1=6個10

var trailingZeroes = function(n) {
    if(n < 5) return 0

    var count = 0;
    // 算階層內有幾個5出現
    while(n >= 5){
        count += parseInt(n/5);
        n = parseInt(n/5);
    }

    return count;
};

// 190. Reverse Bits
// Reverse bits of a given 32 bits unsigned integer.
// For example, given input 43261596 (represented in binary as 00000010100101000001111010011100), return 964176192 (represented in binary as 00111001011110000010100101000000).

var reverseBits = function(n) {

    if(n == 0) return 0;

    let arr = [];

    for(var i = 0 ; i < 32 ; i++){
        if (n > 0) {

            const remainder = Math.floor(n % 2) === 0? '0': '1';

            arr.push(remainder);

            n = Math.floor(n / 2);

        } else {
            arr.push(0);
        }
            
    }

    return parseInt(arr.join(''), 2);
};


// 191. Number of 1 Bits
var hammingWeight = function(n) {

    let count = 0;
    for(let u = 0; u < 32; u ++) {
        if (n > 0) {

            const remainder = Math.floor(n % 2) === 0? 0: 1;

            if (remainder == 1 ) {
                count += 1;
            }

            n = Math.floor(n / 2);
        } 
    }

    return count;
};

// 204. Count Primes (質數)
// Count the number of prime numbers less than a non-negative number, n.

// 判斷n之下有幾個質數，只要跑迴圈判斷從2~(n-1)中毎一個數是不是質數就可以
// 質數p的定義就是 p/2, p/3, p/4 .... p/(p-1)都不等於0
// 實作上不需要除到p-1，只需要除到"p的平方根"就可以，而且可以跳過2的倍數 p/2, p/3 , p/5 , p/7 .....

var countPrimes = function(n) {

    var hash = [];

    var a = Math.sqrt(n);
   
    for (var i = 2; i <= a; i++) {
        if (!hash[i]) {
            for (var j = i * i; j < n; j += i) {
                hash[j] = true; // 存放不是質數，設為 true
            }
        }
    }

    var ans = 0;
    for (var i = 2; i < n; i++) {
        if (!hash[i]) {
            ans ++;
        }
    }

    return ans;
};

// 242. Valid Anagram
// Given two strings s and t, write a function to determine if t is an anagram of s.

// For example,
// s = "anagram", t = "nagaram", return true.
// s = "rat", t = "car", return false.
var isAnagram = function(s, t) {

    if(s.length != t.length) return false;

    var s = s.split("").sort().join("");
    var t = t.split("").sort().join("");

    return s == t;
};

// 268. Missing Number
// Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, find the one that is missing from the array.

var missingNumber = function(nums) {

    var hash = [];
    for (let i = 0; i < nums.length; i++) {
        hash[nums[i]] = true;
    }

    for (var i = 0; ; i++) {
        if (!hash[i]) {
            return i;
        }
    }
};

// 283. Move Zeroes
// Given an array nums, write a function to move all 0's to the end of it while maintaining the relative order of the non-zero elements.

// For example, given nums = [0, 1, 0, 3, 12], after calling your function, nums should be [1, 3, 12, 0, 0].

// Note:
// You must do this in-place without making a copy of the array.
// Minimize the total number of operations.

var moveZeroes = function(nums) {
    
    var index = 0;
    for(var i = 0 ; i < nums.length ; i++){
        var n = nums[i]; 
        // not zero, index++, push to array
        if(n !== 0){
            nums[index++] = n;    
        }
    }

    // after index to zero
    for(index ; index < nums.length ; index++){
        nums[index] = 0;
    }

    return nums
}