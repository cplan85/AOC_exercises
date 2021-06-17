"use strict";
exports.__esModule = true;
var day7Data_1 = require("./day7Data");
var testData = "light red bags contain 1 bright white bag, 2 muted yellow bags.\ndark orange bags contain 3 bright white bags, 4 muted yellow bags.\nbright white bags contain 1 shiny gold bag.\nmuted yellow bags contain 2 shiny gold bags, 9 faded blue bags.\nshiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.\ndark olive bags contain 3 faded blue bags, 4 dotted black bags.\nvibrant plum bags contain 5 faded blue bags, 6 dotted black bags.\nfaded blue bags contain no other bags.\ndotted black bags contain no other bags.";
var input = day7Data_1.textInput;
var splitted = input.trim().split("\n");
var parseLine = function (line) {
    var _a = line.split("s contain "), destination = _a[0], rest = _a[1];
    var sourceSegments = rest.split(", ");
    var sources = {};
    sourceSegments.map(function (segment, i) {
        var amount = Number(segment[0]);
        isNaN(amount) ? amount = 0 : amount = amount;
        var source = amount === 1 ? segment.slice(2) : segment.slice(2, -1);
        if (i === sourceSegments.length - 1)
            source = source.slice(0, -1);
        sources[source] = amount;
        return source;
        //sources.push(source)
    });
    //console.log({destination, sources})
    return {
        destination: destination,
        sources: sources
    };
};
var traverse = function (graph, node, visited) {
    if (visited === void 0) { visited = new Set(); }
    if (visited.has(node))
        return 0;
    visited.add(node);
    var numBagColors = 1;
    for (var _i = 0, _a = graph[node]; _i < _a.length; _i++) {
        var neighbor = _a[_i];
        numBagColors += traverse(graph, neighbor, visited);
    }
    return numBagColors;
};
var traverse2 = function (graph, node) {
    var count = 1;
    for (var neighbor in graph[node]) {
        var qty = graph[node][neighbor];
        count += qty * traverse2(graph, neighbor);
    }
    return count;
};
var solve = function (input) {
    var graph = {};
    input.map(function (line) {
        var _a = parseLine(line), destination = _a.destination, sources = _a.sources;
        if (!(destination in graph))
            graph[destination] = [];
        for (var source in sources) {
            if (!(source in graph))
                graph[source] = [];
            graph[source].push(destination);
        }
    });
    //return graph
    return traverse(graph, "shiny gold bag") - 1;
};
var solve2 = function (input) {
    var graph = {};
    input.map(function (line) {
        var _a = parseLine(line), destination = _a.destination, sources = _a.sources;
        graph[destination] = sources;
        console.log(graph);
    });
    //return graph
    return traverse2(graph, "shiny gold bag") - 1;
};
// console.log("POINTING TO SOLVER", solve(splitted));
console.log(parseLine("shiny gold bags contain 2 dark red bags."));
console.log("POINTING TO SOLVER2", solve2(splitted));
