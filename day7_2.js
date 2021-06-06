//import { textInput } from "./day6Data";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var testData = "light red bags contain 1 bright white bag, 2 muted yellow bags.\ndark orange bags contain 3 bright white bags, 4 muted yellow bags.\nbright white bags contain 1 shiny gold bag.\nmuted yellow bags contain 2 shiny gold bags, 9 faded blue bags.\nshiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.\ndark olive bags contain 3 faded blue bags, 4 dotted black bags.\nvibrant plum bags contain 5 faded blue bags, 6 dotted black bags.\nfaded blue bags contain no other bags.\ndotted black bags contain no other bags.";
var input = testData;
var splitted = input.trim().split("\n");
var bagGraph = {};
for (var _i = 0, splitted_1 = splitted; _i < splitted_1.length; _i++) {
    var rule = splitted_1[_i];
    var _a = rule.match(/(.+) bags contain (.+)\./), _ = _a[0], parentBag = _a[1], innerBagList = _a[2];
    var innerBags = {};
    if (innerBagList !== 'no other bags') {
        for (var _b = 0, _c = innerBagList.split(','); _b < _c.length; _b++) {
            var innerBag = _c[_b];
            var _d = innerBag.match(/(\d+) (.+) bag/), _1 = _d[0], numString = _d[1], innerColor = _d[2];
            innerBags[innerColor] = parseInt(numString);
        }
    }
    bagGraph[parentBag] = innerBags;
}
//console.log(splitted)
// 1.represent the graph in the form of an object of objects
//2. find the transpose of graph (unweighted)
var transpose = {};
for (var _e = 0, _f = Object.keys(bagGraph); _e < _f.length; _e++) {
    var outerBag = _f[_e];
    var innerBags = bagGraph[outerBag];
    for (var innerBag in innerBags) {
        if (!(innerBag in transpose))
            transpose[innerBag] = [];
        transpose[innerBag].push(outerBag);
    }
}
var findAllParents = function (bag) {
    return (transpose[bag] || []).reduce(function (visited, nextBag) { return new Set(__spreadArray(__spreadArray([], visited), findAllParents(nextBag))); }, new Set([bag]));
};
console.log(transpose['shiny gold']);
console.log(findAllParents("shiny gold").size - 1);
