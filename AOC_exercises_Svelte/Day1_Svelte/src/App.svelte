<script>
	import { nums } from './data.js';
	
	nums.sort((a,b)=> a-b)
	let val1,val2;
	const findTarget = (target, l = 0, r = nums.length - 1) => {
  const num1 = nums[l];
  const num2 = nums[r];
  const sum = num1 + num2;

  return l >= r
    ? -1
    : sum === target
    ? `${num1} x ${num2} = ${num1 * num2}`
    : sum < target
    ? findTarget(target, l + 1, r)
    : findTarget(target, l, r - 1);
};
	
//SUM3 IN JS
const result = nums.filter((num) => {
  // assuming num is one of the numbers, the other two should sum to 2020 - num
  const product = findTarget(2020 - num);
  return product > -1;
});
	
	const threeSum = (arr, sum) => {
  for (let i = 0; i < arr.length - 2; i++) {
    for (let j = i + 1; j < arr.length - 1; j++) {
      for (let k = j + 1; k < arr.length; k++) {
        if (arr[i] + arr[j] + arr[k] == sum) {
          return ` ${arr[i]} x ${arr[j]} x ${arr[k]} = ${arr[i] * arr[j] * arr[k]}`;
        }
      }
    }
  }
};
</script>

<h1>
	Advent of Code_Day1  
</h1>
<h2>Sorted Input</h2>

<p>{nums.join(' , ')}</p>
<h2>
	Final Value
</h2>
<p>{findTarget(2020)}</p>
<p>
	
</p>
<h2>
	
	Summing 3 Numbers Value
</h2>
<p> {threeSum(nums, 2020)}</p>

<style>
	p {
		margin: 0.8em 0;
	}
	h1 {
		color: purple;
	}
	h2 {
		color: #cc6699;
	}
</style>

