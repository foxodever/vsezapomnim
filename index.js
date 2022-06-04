const axios = require("axios");

async function vsezapomnim() {
    return new Promise(async(resolve, reject) => {
        let finalObject = [];
        load(0);
        async function load(currentOffset) {
            axios.post("https://xn--80adjigxbghjs.xn--p1ai/?page_load=ajax&url=/ajax/get.ajax", "list_curr="+(30 * currentOffset)+"&catid=0&sortid=0&key=" + Math.round(Date.now()), {
                headers: {
                    "User-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36 Edg/101.0.1210.53"
                }
            }).then(r => {
                if(r.data.data) {
                    if(r.data.data.length != 0) {
                        for(let i in r.data.data) {
                            finalObject.push(r.data.data[i]);
                        }
                        load(currentOffset + 1);
                    } else {
                        if(finalObject.length > 0) resolve(finalObject);
                        else reject("Failed to parse")
                    }
                } else {
                    if(finalObject.length > 0) resolve(finalObject);
                    else reject("Failed to parse")
                }
            }).catch(err => {
                if(finalObject.length > 0) resolve(finalObject);
                else reject("Failed to parse")
            })
        }
    })
}
async function fetchCompany(id) {
    return new Promise(async(resolve, reject) => {
        axios.post("https://xn--80adjigxbghjs.xn--p1ai/?page_load=ajax&url=/ajax/get-company.ajax", "company=" + id + "&key=" + Math.round(Date.now()), {
            headers: {
                "User-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36 Edg/101.0.1210.53"
            }
        }).then(r => {
            resolve(r.data)
        }).catch(err => {
            reject(err)
        })
    })
}

module.exports = { vsezapomnim, fetchCompany };