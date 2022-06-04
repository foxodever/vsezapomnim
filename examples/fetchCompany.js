const { fetchCompany } = require("../index")

fetchCompany(103).then(r => {
    console.log(r);
}).catch(err => {
    console.log(err);
})