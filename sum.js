console.log("Hello,World!!!😍");


//const sum=(a,b) => a+b;
// function sum (a,b) {
// return a+b;
// }

// console.log(sum(4,5));

//Process global variable key called .argv

console.log(process.argv);
// const num1=process.argv[2];
// const num2=process.argv[3];

//const [, ,num1,num2]=process.argv;

//console.log(sum(+num1,+num2));
// console.log(document)
// console.log(window)
//console.log(global)

const [, , nums]=process.argv;
console.log(nums);

const arr=JSON.parse(nums);
console.log(Math.max(...arr));
