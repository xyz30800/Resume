// http://blog.techbridge.cc/2017/08/19/sotring-algorithm/
// http://spaces.isu.edu.tw/upload/18833/3/web/sorting.htm#_Toc229730277
// http://notepad.yehyeh.net/Content/Algorithm/Sort/Sort.php

const unsortedArray = [10,7,3,5,7,5,0,5,1];
const unsortedArray2 = [10,7,3,5,7,5,0,5,1,5,1,0,2,3,3,6,5,9,0,5,4,0,40,12,5,6,5,8,7,4,5,2,1,30,2,54,41,2,65,8,5,0,1,2,5,4,78];
console.error('Original Array', unsortedArray)

/////---------------------------------------------------------------------------------------/////
// Selection Sort
	// * Time Complexity
	// 		Best Case：Ο(n2)
	// 		Worst Case：Ο(n2)
	// 		Average Case：Ο(n2)
	// 		說明：無論資料順序如何，都會執行兩個迴圈
	//
	// * Space Complexity：θ(1)
	// * 不穩定

	// 找到最小值，移到最左邊

	const selectionSort = (a) => {

		const arr = [...a];
	  	const length = arr.length;
	  
		// 有幾個元素，就要找幾輪的最小值
		// 這邊的 i 代表 i 以前的元素都排序好了
		for (let i = 0; i < length; i++) {

			// 先預設第一個是最小的
			let min = arr[i];
			let minIndex = i;

			// 從還沒排好的元素開始找最小值
			// 找出剩下的最小值放到左邊
			for (let j = i; j < length; j++) {
				if (arr[j] < min) {
					min = arr[j];
					minIndex = j;
				}
			}

			// ES6 的用法，交換兩個數值
			// 將目前位置的值，與最小值的位置互換 
			[arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];

			// ES5 method
			// let tmp = arr[minIndex];
			// arr[minIndex] = arr[i];
			// arr[i] = tmp;
		}

		return arr;
	}

/////---------------------------------------------------------------------------------------/////
// Bubble Sort
	// * Time Complexity
	// 		Best Case：Ο(n)
	//			當資料的順序恰好為由小到大時
	//			第一次執行後，未進行任何swap ⇒ 提前結束
	// 		Worst Case：Ο(n2)
	//			當資料的順序恰好為由大到小時
	//			每回合分別執行：n-1、n-2、…、1次
	//			(n-1) + (n-2) + … + 1 = n(n-1)/2 ⇒ Ο(n2)
	// 		Average Case：Ο(n2)
	//			第n筆資料，平均比較 (n-1)/2 次
	// 		說明：無論資料順序如何，都會執行兩個迴圈
	//
	// * Space Complexity：θ(1)
	// * 穩定

	// 跟隔壁互相比較，順序錯了就交換，讓大的元素一直依序浮到最後

	// 時間複雜度: O(n^2)
	const bubbleSort = (a) => {

		const arr = [...a];
		const length = arr.length;

		// 一共要跑 n 輪
		for (let i = 0; i < length; i++) {

			// 從第一個元素開始，不斷跑到第 length - 1 - i 個
			// 原本是 length - 1，會再加上 - i 是因為最後 i 個元素已經排好了
			// 所以沒必要跟那些排好的元素(最大的已經依序排在最後)比較
			for (let j = 0; j < length - 1 - i; j++) {
				if (arr[j] > arr[j + 1]) {
					[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
				}
			}
		}

		return arr;
	}

	// 時間複雜度: O(n) - Optimized
	const optimzedBubbleSort = (a) => {

		const arr = [...a];
		const n = arr.length;
		let swapped = true;

		// 一共要跑 n 輪
		for (let i = 0; i < n && swapped; i++) {

			// 從第一個元素開始，不斷跑到第 n - 1 - i 個
			// 原本是 n - 1，會再加上 - i 是因為最後 i 個元素已經排好了
			// 所以沒必要跟那些排好的元素比較
			swapped = false;
			for (let j = 0; j < n - 1 - i; j++) {
				if (arr[j] > arr[j + 1]) {
					swapped = true;
					[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
				}
			}
		}
		return arr;
	}

/////---------------------------------------------------------------------------------------/////
// Insertion Sort
	// * Time Complexity
	// 		Best Case：Ο(n)
	//			當資料的順序恰好為由小到大時，每回合只需比較1次
	// 		Worst Case：Ο(n2)
	//			當資料的順序恰好為由大到小時，第i回合需比i次
	// 		Average Case：Ο(n2)
	//			第n筆資料，平均比較 (n-1)/2 次
	//
	// * Space Complexity：θ(1)
	// * 穩定

	const insertionSort = (a) => {

		const arr = [...a];
		const length = arr.length;

		// 假設第一個元素已經排好，所以從 1 開始跑
		for (let i = 1; i < length; i++) {

			// position 表示可以插入的位置
			let position = i;

			// 先把要插入的元素存起來
			const value = arr[i];

			// 開始往前找，只要符合這條件就代表這個位置是可以插入的
			// 邊找的時候就可以邊把元素往後挪，騰出空間
			while (i >= 0 && arr[position - 1] > value) {
				[arr[position], arr[position - 1]] = [arr[position - 1], arr[position]];
				position --;
			}

			// 找到適合的位置，放入元素
			arr[position] = value;
		}

		return arr;
	}

	// 自己寫的 (比較快)
	const insert2 = (a) => {

		const arr = [...a];
		const len = arr.length;

		for (let i = 1; i < len; i ++) {
			
			const insert = arr[i]; // 要插入的值先存起來

			for (let j = 0; j < i; j ++) {
				const pre = i - j;
				if (insert < arr[pre - 1]) {
					const temp = arr[pre];
					arr[pre] = arr[pre - 1];
					arr[pre - 1] = temp;
				}
			}
		}

		return arr;
	}

/////---------------------------------------------------------------------------------------/////
// Merge Sort - Hard
	// 切一半，排好左邊，排好右邊，合併

	const simpleMergeSort = (a) => {
	  
	  	const arr = [...a];
		// 合併
		const mergeTwo = (leftArray, rightArray) => {

			let result = [];
			let nowIndex = 0, left = 0, right = 0;
			const leftLength = leftArray.length;
			const rightLength = rightArray.length;

			// 如果左右兩邊都沒抓完，就看誰比較小抓誰
			while (left < leftLength && right < rightLength) {
				if (leftArray[left] < rightArray[right]) {
					result[nowIndex++] = leftArray[left++];
				} else {
					result[nowIndex++] = rightArray[right++];
				}
			}

			// 跑到這裡代表左右兩邊其中一邊抓完了
			// 如果是左邊沒抓完，全部抓下來
			while (left < leftLength) {
				result[nowIndex++] = leftArray[left++];
			}

			// 右邊沒抓完，全部抓下來
			while (right < rightLength) {
				result[nowIndex++] = rightArray[right++];
			}

			// 把合併好的陣列直接傳回去
			return result;
		}

		const _mergeSort = (arr) => {
			
			const length = arr.length;
			if (length <= 1) return arr;

			// 切兩半
			const middle = Math.floor(length / 2);
			// 排左邊
			const leftArray = _mergeSort(arr.slice(0, middle));
			// 排右邊
			const rightArray = _mergeSort(arr.slice(middle, length));
			// 合併後丟回去
			return mergeTwo(leftArray, rightArray);
		}

		return _mergeSort(arr);
	}

	// 較省記憶體
	// function mergeSort = (arr) => {
	// 	const merge = (array, start, middle, end) => {  

	// 		// 宣告一個暫時的陣列來放合併後的結果
	// 		let temp = [];
	// 		let nowIndex = 0;
	// 		let left = start;
	// 		let right = middle + 1;

	// 		// 這邊都跟上面一樣
	// 		while (left <= middle && right <= end) {
	// 			if (array[left] < array[right]) {
	// 				temp[nowIndex++] = array[left++];
	// 			} else {
	// 				temp[nowIndex++] = array[right++];
	// 			}
	// 		}

	// 		while (left <= middle) {
	// 			temp[nowIndex++] = array[left++];
	// 		}

	// 		while (right <= end) {
	// 			temp[nowIndex++] = array[right++];
	// 		}

	// 		// 要把合併後的陣列放回去 array[start ~ end]
	// 		for (let i = start; i <= end; i++) {
	// 			array[i] = temp[i - start];
	// 		}
	// 	}
			
	// 	// 代表要從 start 排到 end
	// 	const _mergeSort = (array, start, end) => {

	// 		if (end <= start) return;

	// 		const middle = Math.floor((start + end) / 2);

	// 		// 對左右兩半排序
	// 		_mergeSort(array, start, middle);
	// 		_mergeSort(array, middle + 1, end);
	// 		merge(array, start, middle, end);

	// 		return array;
	// 	}

	// 	return _mergeSort(arr, 0, arr.length - 1);
	// }

/////---------------------------------------------------------------------------------------/////
// Quick Sort
	// * Time Complexity
	// 		Best Case：Ο(n log n)
	// 		Worst Case：Ο(n2)
	// 		Average Case：Ο(n log n)
	//
	// * Space Complexity：θ(n)
	// * 不穩定

	// 找一個數，並且把這個數調整到：讓左邊的元素比它小，右邊的元素比它大，再對左右兩遍做一樣的事

/////---------------------------------------------------------------------------------------/////
// Heap Sort
	// 平均時間複雜度為Ο(n）

	const heapSort = (arr) => { 

		const arr = [...a];

		function heapify(arr, length, node) {
			const left = node * 2 + 1;
			const right = node * 2 + 2;

			// 先預設最大的節點是自己
			let max = node;

			if (left < length && arr[left] > arr[max]) {
				max = left;
			}

			if (right < length && arr[right] > arr[max]) {
				max = right;
			}

			// 如果左右兩邊有任何一個比 node 大的話
			if (max !== node) {
				// 就把兩個互換
				[arr[node], arr[max]] = [arr[max], arr[node]];

				// 接著繼續 heapfiy
				heapify(arr, length, max);
			}
		}

		// build max heap
		const length = arr.length;
		for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
			heapify(arr, length, i);
		}

		// 排序
		for (let i = length - 1; i > 0; i--) {
			[arr[0], arr[i]] = [arr[i], arr[0]];
			heapify(arr, i, 0);
		}

		return arr;
	}

/////---------------------------------------------------------------------------------------/////
// Shell Sort
	// https://openhome.cc/Gossip/AlgorithmGossip/ShellSort.htm#JavaScript
	// 
	// 希爾排序法為插入排序法的改良
	function shellSort(arr) {
	    var increment = arr.length / 2;
	    while (increment > 0) {
	        for (i = increment; i < arr.length; i++) {
	            var j = i;
	            var temp = arr[i];
	    
	            while (j >= increment && arr[j-increment] > temp) {
	                arr[j] = arr[j-increment];
	                j = j - increment;
	            }
	    
	            arr[j] = temp;
	        }
	    
	        if (increment == 2) {
	            increment = 1;
	        } else {
	            increment = parseInt(increment*5 / 11);
	        }
	    }
	  	return arr;
	}