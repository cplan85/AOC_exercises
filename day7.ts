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

let splitted = input.split("\n");

var keys = [];

let obj = {};

const newBrackets = splitted.map(str => {
  
  let splitVals = normalizeWS(str).split('s contain ')
  keys.push(splitVals[0])
  obj[splitVals[0]] = splitVals[1].replace(/[0-9]\s/g, '').replace(/s[\.]/g, '')
  //.split(',');
  return obj;
})
let matches = []
const replaceVals = newBrackets.map(entry => {
 
  keys.forEach(key => {
   
    //console.log(`Entry Values`, Object.values(entry)[0])
    let val: any = Object.values(entry)[0]
  
    if (val.includes(key)) {
      let ref: any = newBrackets[0];
      console.log(`val`,val)
      console.log(`match entry`,ref[key])
      console.log('key', key)
  
     // matches.push(val)
      val.replace(key, ref[key])
       console.log(`replaced values`, val)
    }
  })
  return entry
})

function normalizeWS(str) {
  str = str.match(/\S+/g);
  return str ? str.join(' ') : '';
}

//console.log(newBrackets)
console.log(replaceVals)

