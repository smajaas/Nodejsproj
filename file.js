const fs = require('fs'); //inbuilt package - filesystem read,edit and delete file

fs.readFile("./welcome.txt","utf8",(err,data)=> {
    console.log(data)
});

const quote = "Node JS is doing Awesome ❤❤❤👍👍❤😊😊😊";

// fs.writeFile("./awesome.txt",quote,(err)=>{
//     console.log("Completed writing!!!");
// });

const quote2 = "Live more,worry less 😍😊❤";

for(let i=1;i<=10;i++) {

fs.writeFile(`./backup/text-${i}.txt`,quote2,(err)=> {

    console.log("Completed writing",i);
});
}


function createQuotes(noOfFiles,quote) {
    for (let i=1;i<=noOfFiles;i++) {
fs.writeFile(`./backup/text-${i}.txt`,quote,(err)=> {
    console.log("Completed writing!!!",i);
    });
}
}

//
//const niceQuote = npm init