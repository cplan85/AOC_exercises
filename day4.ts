import { textInput } from "./day4Data";

const testData = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`;

const input = textInput;

let splitted = input.split("\n");

let newArr = [];
splitted.forEach((item) => {
  item === "" ? (item = "---") : (item = item);
  newArr.push(item);
});
let reformattedArr = newArr.join().split(",---,");
let finalArr = [];
var separators = [" ", ","];

reformattedArr.forEach((item) => {
  finalArr.push(item.split(new RegExp(separators.join("|"), "g")));
});

const finalObj = finalArr.map((item, index) => {
  let finalObj = {};
  item.map((entries) => {
    let splitEntry = entries.split(":");
    finalObj[splitEntry[0]] = splitEntry[1];
  });
  return finalObj;
});

const checkInRange = (numString, min: number, max: number) => {
  const num = parseInt(numString);
  return min <= num && num <= max;
};

const requiredKeys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

const completenessCheck = (obj: {}) => requiredKeys.every((key) => key in obj);

// byr (Birth Year) - four digits; at least 1920 and at most 2002.
// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
// hgt (Height) - a number followed by either cm or in:
// If cm, the number must be at least 150 and at most 193.
// If in, the number must be at least 59 and at most 76.
// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
// pid (Passport ID) - a nine-digit number, including leading zeroes.
// cid (Country ID) - ignored, missing or not.

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
const part1PassportCheck = finalObj.filter((obj: object) => {
  return completenessCheck(obj)
});

const part2PassportCheck = finalObj.filter((obj: object) => {
  return completenessCheck(obj) && validityCheck(obj);
});


console.log(`Part 1: Number of Valid Passports =>`, part1PassportCheck.length);

console.log(`Part 2: Number of Valid Passports =>`, part2PassportCheck.length);
