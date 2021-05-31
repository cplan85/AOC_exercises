import {textInput} from "./day4Data";

const testData = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`

const input = testData

let splitted = input.split("\n");

let newArr = [];
let lineBreak = splitted.forEach(item => {
item === '' ? item = '---' : item = item;
newArr.push(item)
})
let reformattedArr = newArr.join().split(',---,');
let finalArr = [];
var separators = [' ', ',']
const finalFormat = reformattedArr.forEach(item => {
    finalArr.push(item.split(new RegExp(separators.join('|'), 'g')) )
})

console.log(finalArr)


let count = 0;
 finalArr.forEach( (item, index) => {
     item.length === 8 ? count++ : item.length ===7 ? item.join().includes('cid:') ? null : count++ : null;
 })

console.log(count)