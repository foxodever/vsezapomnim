const axios = require("axios");

/**
 * Get all companies
 * @returns {Promise<[{
 *  id: Number,
 *  name: String,
 *  clink: String,
 *  logo: String,
 *  date_exit: String,
 *  rate_0: Number,
 *  rate_1: Number,
 *  rate_2: Number,
 *  status: Number,
 *  label_screw: Number,
 *  label_fuck: Number,
 *  label_respect: Number,
 *  label_return: Number,
 *  label_aggression: Number,
 *  analogs: Number,
 *  country: String,
 *  country_name: String,
 *  description: String,
 *  updated: Number
 * }]>} Promise object with info about companies
 */

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

/**
 * Get company info by id
 * @param {Number} id - ID of the company on всезапомним.рф
 * @returns {Promise<{
 *  id: number,
 *  data: {
 *      id: number,
 *      link: String,
 *      altname: String,
 *      name: String,
 *      logo: String,
 *      comment: String,
 *      abuse: String,
 *      description: String,
 *      date_exit: String,
 *      date_create: String,
 *      date_update: String,
 *      rate_0: Number,
 *      rate_1: Number,
 *      rate_2: Number,
 *      status: Number,
 *      views: String,
 *      label_screw: Number,
 *      label_fuck: Number,
 *      label_respect: Number,
 *      label_aggression: Number,
 *      label_return: Number,
 *      label_analogs: Number,
 *      country: String,
 *      country_flag: String,
 *      proofs: String[],
 *      login: String,
 *      firstname: String,
 *      lastname: String,
 *      clink: String
 *  }
 * }>} Promise object with info about company
 */

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