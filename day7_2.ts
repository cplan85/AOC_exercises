//import { textInput } from "./day6Data";

const testData = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

const input = testData;

let splitted = input.trim().split("\n");


const bagGraph = {}

for (const rule of splitted ) {
  const [_, parentBag, innerBagList] = rule.match(/(.+) bags contain (.+)\./)
  const innerBags = {};
  if(innerBagList !== 'no other bags') {
    for(const innerBag of innerBagList.split(',')) {
      const [_,numString, innerColor] = innerBag.match(/(\d+) (.+) bag/);
      innerBags[innerColor] = parseInt(numString)
    }
  }
  bagGraph[parentBag] = innerBags;
}
//console.log(splitted)
// 1.represent the graph in the form of an object of objects
//2. find the transpose of graph (unweighted)
const transpose = {}

for (const outerBag of Object.keys(bagGraph)) {
  const innerBags = bagGraph[outerBag];

  for (const innerBag in innerBags) {
    if(!(innerBag in transpose)) transpose[innerBag] = [];
    transpose[innerBag].push(outerBag);
}
}

const findAllParents = (bag) =>
  (transpose[bag] || []).reduce(
 
    (visited, nextBag) => new Set([...visited, ...findAllParents(nextBag)]),
    new Set([bag])
  );
console.log(transpose['shiny gold'])
console.log(findAllParents("shiny gold").size - 1)