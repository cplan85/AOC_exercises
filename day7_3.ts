import { textInput } from "./day7Data";

const testData = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

const input = textInput;

let splitted = input.trim().split("\n");

const parseLine = (line) => {
  const [destination, rest] = line.split("s contain ");
  const sourceSegments = rest.split(", ");
  const sources = {};
  sourceSegments.map((segment, i) => {
    let amount = Number(segment[0]);
    isNaN(amount) ? amount = 0 : amount = amount;
    let source = amount === 1 ? segment.slice(2) : segment.slice(2, -1);

    if (i === sourceSegments.length - 1) 
    source = source.slice(0, -1);

    sources[source] = amount;
    return source;
    //sources.push(source)
  });
  //console.log({destination, sources})
  return {
    destination,
    sources,
  };
};

const traverse = (graph, node, visited = new Set()) => {
  if (visited.has(node)) return 0;
  visited.add(node);

  let numBagColors = 1;
  for (let neighbor of graph[node]) {
    numBagColors += traverse(graph, neighbor, visited);
  }
  return numBagColors;
};

const traverse2 = (graph, node) => {

  let count = 1;
  for (let neighbor in graph[node]) {
   const qty = graph[node][neighbor];
   count += qty * traverse2(graph, neighbor)
  }
  return count;
};

const solve = (input) => {
  const graph = {};
  input.map((line) => {
    const { destination, sources } = parseLine(line);
    if (!(destination in graph)) graph[destination] = [];

    for (let source in sources) {
      if (!(source in graph)) graph[source] = [];
      graph[source].push(destination);
    }
  });
  //return graph
  return traverse(graph, "shiny gold bag") - 1;
};

const solve2 = (input) => {
  const graph = {};
  input.map((line) => {
    const { destination, sources } = parseLine(line);
    graph[destination] = sources;

   console.log(graph);
  });
  //return graph
  return traverse2(graph, "shiny gold bag") - 1;
};

// console.log("POINTING TO SOLVER", solve(splitted));

 console.log(parseLine("shiny gold bags contain 2 dark red bags."));

 console.log("POINTING TO SOLVER2", solve2(splitted));
