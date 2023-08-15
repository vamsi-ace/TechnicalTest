/*Explanation:

Divide the original array in two arbitary parts, each of size n. LeftPart: [0, n-1], RightPart[n,2 * n-1]
Find all possible sums in each part.
As each part will be of size <= 15
We can safely enumerate all possible sums in each part.
For each part, store the sum of a subset along with the size of the subset.
In Code:
I have used two 2-D vectors, left and right, to store sums of all possible subset.
Left[i]: stores all possible sums of the subset of size i, in the left part.
Similarly, for right part.
Requirement: We need to divide the original array in two parts of size n, each. Such that the absolute difference of sum is minimised.
Let say from left part we take a subset of size sz (Let's say its sum is a), then from right part we need to take a subset of size of n-sz (Let's say its sum is b). Then, Part1Sum = a+b.
We have to minimise abs(Part1Sum - Part2Sum)
Now, Part1Sum = a+b and Part2Sum = TotalSum - (a+b)
Thus we have to minimise, abs(TotalSum -2 a - 2 b)
Now we iterate over a, and binary search b in the vector right
TC: O(2^n * log(2^n)) */
function minimumDifference(nums) {
    const n = nums.length;
    let res = 0;
    let sum = nums.reduce((acc, num) => acc + num, 0);
  
    const N = Math.floor(n / 2);
    const left = new Array(N + 1).fill(null).map(() => []);
    const right = new Array(N + 1).fill(null).map(() => []);
  
    // Storing all possible sum in left and right part
    for (let mask = 0; mask < (1 << N); ++mask) {
      let sz = 0;
      let l = 0;
      let r = 0;
      for (let i = 0; i < N; ++i) {
        if (mask & (1 << i)) {
          sz++;
          l += nums[i];
          r += nums[i + N];
        }
      }
      left[sz].push(l);
      right[sz].push(r);
    }
  
    for (let sz = 0; sz <= N; ++sz) {
      right[sz].sort((a, b) => a - b);
    }
  
    res = Math.min(Math.abs(sum - 2 * left[N][0]), Math.abs(sum - 2 * right[N][0]));
  
    // Iterating over left part
    for (let sz = 1; sz < N; ++sz) {
      for (const a of left[sz]) {
        const b = (sum - 2 * a) / 2;
        const rsz = N - sz;
        const v = right[rsz];
        const itr = binarySearch(v, b); // Binary search over right part
  
        if (itr !== v.length) res = Math.min(res, Math.abs(sum - 2 * (a + v[itr])));
        if (itr !== 0) res = Math.min(res, Math.abs(sum - 2 * (a + v[itr - 1])));
      }
    }
    return res;
  }
  
  // Helper function for binary search
  function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
  
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] === target) return mid;
      else if (arr[mid] < target) left = mid + 1;
      else right = mid - 1;
    }
  
    return left;
  }
  
  function testMinimizeAbsoluteDifference() {
    console.log(minAbsoluteDifference([76,8,45,20,74,84,28,1])); // Should output: 2
    console.log(minAbsoluteDifference([-36, -12, -23 , 21, 4, 23 ])); // Should output: 1
    console.log(minAbsoluteDifference([0,0,0,12,0,-11])); // Should output:1
    console.log(minAbsoluteDifference([[10, 20, 30, 40, 50, 60]])); // Should output: 10
    console.log(minAbsoluteDifference([1, 2, 3, 4, 5, 6, 7, 8 ])); // Should output: 0
    console.log(minAbsoluteDifference([100, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])); // output:100
    console.log(minAbsoluteDifference([7772197,4460211,-7641449,-8856364,546755,-3673029,527497,-9392076,3130315,-5309187,-4781283,5919119,3093450,1132720,6380128,-3954678,-1651499,-7944388,-3056827,1610628,7711173,6595873,302974,7656726,-2572679,0,2121026,-5743797,-8897395,-9699694])) // output: 1
  }
  
  testMinimizeAbsoluteDifference();
  