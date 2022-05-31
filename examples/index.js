const vsezapomnim = require("../index")

vsezapomnim().then(r => {
    console.log(r);
}).catch(err => {
    console.log(err);
})