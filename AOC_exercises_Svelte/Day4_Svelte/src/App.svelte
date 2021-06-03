<script>
	import { textInput } from './data.js';
	let user = { showEntries: false,
						 showCriterias2: false};
	const buttonId = "Entries"
	let button = { id1: "Entries",
						 criteria: "Required Keys"};
	const splitted = textInput.split('\n')
	
	
const newArr = splitted.map((item) => {
  return item === "" ? (item = "---") : (item = item);
});
	
const reformattedArr = newArr.join().split(",---,");
  let separators = [" ", ","];
	
const arrOfArr = reformattedArr.map((item) => {
  return item.split(new RegExp(separators.join("|"), "g"));
});
	
	const arrOfObjs = arrOfArr.map((item, index) => {
  let finalObj = {};
  item.map((entries) => {
    let splitEntry = entries.split(":");
    finalObj[splitEntry[0]] = splitEntry[1];
  });
  return finalObj;
});

	const checkInRange = (numString, min, max) => {
  const num = parseInt(numString);
  return min <= num && num <= max;
};

	const requiredKeys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
	
	const requiredKeysDescription = ["byr- four digits; at least 1920 and at most 2002.", 
																	 "iyr - four digits; at least 2010 and at most 2020.", 
																	 "eyr - four digits; at least 2020 and at most 2030", 
																	 "hgt - a number followed by either cm or in", 
																	 "hcl - a # followed by exactly six characters 0-9 or a-f" , 
																	 "ecl - exactly one of: amb blu brn gry grn hzl oth.", 
																	 "pid - a nine-digit number, including leading zeroes.",
																	"cid (Country ID) - ignored, missing or not."];
	
	const completenessCheck = (obj) => requiredKeys.every((key) => key in obj)

	const validityCheck = (obj) => {
  const byrCheck = checkInRange(obj.byr, 1920, 2002);
  const iyrCheck = checkInRange(obj.iyr, 2010, 2020);
  const eyrCheck = checkInRange(obj.eyr, 2010, 2030);

  const hgtPat = /^(\d+)(cm|in)$/;
  let hgtCheck = false;
  if (hgtPat.test(obj.hgt)) {
    const [_, num, unit] = obj.hgt.match(hgtPat);
    const intNum = parseInt(num);
    hgtCheck =
      (unit === "cm" && checkInRange(intNum, 150, 193)) ||
      (unit === "in" && checkInRange(intNum, 59, 76));
  }

  const hclCheck = /^#[0-9a-f]{6}$/.test(obj.hcl);
  const eclCheck = /^(?:amb|blu|brn|gry|grn|hzl|oth)$/.test(obj.ecl);
  const pidCheck = /^\d{9}$/.test(obj.pid);

  const results = {
    byrCheck,
    iyrCheck,
    eyrCheck,
    hgtCheck,
    hclCheck,
    eclCheck,
    pidCheck,
  };
  return Object.values(results).every((bool) => bool);
};
	
		const part1PassportCheck = arrOfObjs.filter((obj) => {
  return completenessCheck(obj)
});
	
	const part2PassportCheck = arrOfObjs.filter((obj) => {
  return completenessCheck(obj) && validityCheck(obj);
});
	
	
	
		function toggle() {
		user.showEntries = !user.showEntries;
	}
	
			function toggleCriteria2() {
		user.showCriterias2 = !user.showCriterias2;
	}

</script>

<h1>
	Advent of Code_Day4  
</h1>
<h2> Input</h2>
{#if user.showEntries}
<button on:click={toggle}>
		Hide ({arrOfArr.length}) {button.id1} 
	</button>
 <ol>
	{#each arrOfArr as item}
		<li><p>
			{item.join(', ')}
		</p></li>
	{/each}
</ol>
{:else}
<button on:click={toggle}>
		Show ({arrOfArr.length}) {button.id1}
	</button>
{/if}
<h2>
	Required Criteria: Part 1
</h2>
<h3>
	Each entry must have these keys:
</h3>
	{#each requiredKeys as item, i}
	<p class="requiredKeys">
			<b>{i + 1}:</b> {item} ,   
		</p>
	{/each}

<h2>
	Required Criteria: Part 2
</h2>
{#if user.showCriterias2}
<button on:click={toggleCriteria2}>
		Hide ({requiredKeysDescription.length}) {button.criteria}
	</button>
<h3>
	Each entry must satisfy these conditions:
</h3>
<ol>
	{#each requiredKeysDescription as item}
	<li><p>
			{item}
		</p></li>
	{/each}
</ol>
{:else}
<button on:click={toggleCriteria2}>
		Show ({requiredKeysDescription.length}) {button.criteria}
	</button>
{/if}
<h2>
	Part 1: Number of Valid Passports (Out of {arrOfArr.length})

</h2>
	{part1PassportCheck.length}


<h2>
	Part 2: Number of Valid Passports (Out of {arrOfArr.length})
</h2>
	{part2PassportCheck.length}

<style>
	.requiredKeys {
		 display: inline-block;
	}
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

