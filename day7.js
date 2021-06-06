//import { textInput } from "./day6Data";
var testData = "light red bags contain 1 bright white bag, 2 muted yellow bags.\ndark orange bags contain 3 bright white bags, 4 muted yellow bags.\nbright white bags contain 1 shiny gold bag.\nmuted yellow bags contain 2 shiny gold bags, 9 faded blue bags.\nshiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.\ndark olive bags contain 3 faded blue bags, 4 dotted black bags.\nvibrant plum bags contain 5 faded blue bags, 6 dotted black bags.\nfaded blue bags contain no other bags.\ndotted black bags contain no other bags.";
var input = testData;
var splitted = input.split("\n");
var keys = [];
var obj = {};
var newBrackets = splitted.map(function (str) {
    var splitVals = normalizeWS(str).split('s contain ');
    keys.push(splitVals[0]);
    obj[splitVals[0]] = splitVals[1].replace(/[0-9]\s/g, '').replace(/s[\.]/g, '');
    //.split(',');
    return obj;
});
var matches = [];
var replaceVals = newBrackets.map(function (entry) {
    keys.forEach(function (key) {
        //console.log(`Entry Values`, Object.values(entry)[0])
        var val = Object.values(entry)[0];
        if (val.includes(key)) {
            var ref = newBrackets[0];
            console.log("val", val);
            console.log("match entry", ref[key]);
            console.log('key', key);
            // matches.push(val)
            val.replace(key, ref[key]);
            console.log("replaced values", val);
        }
    });
    return entry;
});
function normalizeWS(str) {
    str = str.match(/\S+/g);
    return str ? str.join(' ') : '';
}
//console.log(newBrackets)
console.log(replaceVals);
