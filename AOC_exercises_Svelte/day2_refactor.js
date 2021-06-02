var list = 
 [ "1-3 a: abcde",
"1-3 b: cdefg",
"2-9 c: ccccccccc",]

const pattern = /(\d+)-(\d+) (\w): (\S+)/

const Validpasswords = list.filter((entry)=> {
  parts = entry.match(pattern);
  const [_, min, max, char, password] = parts;
  const regexp = new RegExp(char, "gi");
  password.match(regexp) ? numOfInstances = password.match(regexp).length : numOfInstances = 0;
  //return [min, max, char, password, numOfInstances]
  return min <= numOfInstances && numOfInstances <= max;
}).length

const validPasswords2 = splitted.filter((entry)=> {
  let parts = entry.match(pattern);
  const [_, index1, index2, char, password] = parts;
			//!== indicates opposite of 1st expression
 return (
    (password[index1 - 1] === char) !==
    (password[index2 - 1] === char)
  );
}).length