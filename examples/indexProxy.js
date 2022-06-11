const { vsezapomnim } = require("../index")

vsezapomnim({
    host: "1.1.1.",
    port: 8080,
    type: "https"
}).then(r => {
    console.log(r)
}).catch(err => {
    console.log(err)
})