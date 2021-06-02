<script>
	import { textInput } from './data.js';
	let user = { showEntries: false };
	const splitted = textInput.split('\n')

	const width = splitted[0].length;
var directions = [[1, 1], [1, 3], [1, 5], [1, 7], [2, 1]];
	
	const directionsMapped = directions.map((item, index) => {
	return `right ${item[1]}, down ${item[0]}  `
	})
	
	let traverser = (changeRow, changeCol, row =0, col = 0) => {
  return row < splitted.length ? traverser(changeRow, changeCol, row + changeRow, (col + changeCol) % width) + (splitted[row][col] === "#" ? 1 : 0) : 0
}
const treeCounts = directions.map(([changeRow, changeCol]) => 
  traverser(changeRow, changeCol)
)

const final = treeCounts.reduce((product, next) =>  product * next)
	
	
		function toggle() {
		user.showEntries = !user.showEntries;
	}

</script>

<h1>
	Advent of Code_Day3  
</h1>
<h2> Input</h2>
{#if user.showEntries}
<button on:click={toggle}>
		Hide ({splitted.length}) Rows
	</button>
 <ul>
	{#each splitted as item}
		<li><p>
			{item}
		</p></li>
	{/each}
</ul>
{:else}
<button on:click={toggle}>
		Show ({splitted.length}) Rows
	</button>
{/if}
<p>
	Each Row is {width} characters long
</p>
<h2>
	Required Slopes
</h2>
 <ol>
	{#each directionsMapped as item}
		<li><p>
			{item}
		</p></li>
	{/each}
</ol>

<h2>
	Number of Trees Per Slope:
</h2>
<p>{treeCounts.join(' , ')}</p>
<h2>
	Final Product
</h2>
	{final}

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
	
	button {
	color: white;
	background-color: #565fca;
	
	}
</style>

