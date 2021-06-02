<script>
  import { textInput } from "./data.js";
  let user = { showEntries: false };
  const splitted = textInput.split("\n");
  const pattern = /(\d+)-(\d+) (\w): (\S+)/;

  const validPasswords = splitted.filter((entry) => {
    let parts = entry.match(pattern);
    let numOfInstances;
    const [_, min, max, char, password] = parts;
    const regexp = new RegExp(char, "gi");
    password.match(regexp)
      ? (numOfInstances = password.match(regexp).length)
      : (numOfInstances = 0);
    return min <= numOfInstances && numOfInstances <= max;
  });

  const validPasswords2 = splitted.filter((entry) => {
    let parts = entry.match(pattern);
    const [_, index1, index2, char, password] = parts;
    //!== indicates opposite of 1st expression
    return (password[index1 - 1] === char) !== (password[index2 - 1] === char);
  });

  function toggle() {
    user.showEntries = !user.showEntries;
  }
</script>

<h1>Advent of Code_Day2</h1>
<h2>Inputs</h2>

{#if user.showEntries}
  <button on:click={toggle}>
    Hide ({splitted.length}) Entries
  </button>
  <ul>
    {#each splitted as item}
      <li>
        <p>
          {item}
        </p>
      </li>
    {/each}
  </ul>
{:else}
  <button on:click={toggle}>
    Show ({splitted.length}) Entries
  </button>
{/if}
<h2>Number of Valid Passwords - Part 1</h2>
<p>{validPasswords.length}</p>

<h2>Number of Valid Passwords - Part 2</h2>
<p>{validPasswords2.length}</p>

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
