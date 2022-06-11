const axios = require("axios");
const { SocksProxyAgent } = require('socks-proxy-agent');

/**
 * Get all companies
 * @param {Object} proxy Russian proxy to access всезапомним.рф
 * @param {String} proxy.host Proxy host
 * @param {Number} [proxy.port] Proxy port
 * @param {String} [proxy.username=null]
 * @param {String} [proxy.password=null]
 * @param {String} [proxy.type]
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

async function vsezapomnim(proxy = null) {
    return new Promise(async(resolve, reject) => {
        let finalObject = [];
        let client;
        if(proxy) {
            if(!proxy.type) proxy.type = "https";
            if(proxy.type == "http" || proxy.type == "https") {
                client = axios;
                proxy = {
                    host: proxy.host,
                    port: proxy.port,
                }
                if(proxy.username && proxy.password) {
                    proxy.auth = {
                        username: proxy.username, password: proxy.password
                    }
                }
            } else if(proxy.type == "socks" || proxy.type == "socks4" || proxy.type == "socks5") {
                let temp = proxy; proxy = null;
                let auth = "";
                if(temp.username && temp.password) auth = `${temp.username}@${temp.password}`;
                const httpsAgent = new SocksProxyAgent(`${temp.type}://${temp.host}:${temp.port}${auth}`);
                client = await axios.create({httpsAgent, httpAgent: httpsAgent});
            } else {
                reject("Invalid proxy body");
                return;
            }
        } else {
            client = axios;
        }
        load(0);
        async function load(currentOffset) {
            client.post("https://xn--80adjigxbghjs.xn--p1ai/?page_load=ajax&url=/ajax/get.ajax", "list_curr="+(30 * currentOffset)+"&catid=0&sortid=0&key=" + Math.round(Date.now()), {
                headers: {
                    "User-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36 Edg/101.0.1210.53"
                },
                proxy
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
                else reject(err)
            })
        }
    })
}

/**
 * Get company info by id
 * @param {Number} id - ID of the company on всезапомним.рф
 * @param {Object} proxy Russian proxy to access всезапомним.рф
 * @param {String} proxy.host Proxy host
 * @param {Number} [proxy.port] Proxy port
 * @param {String} [proxy.username=null]
 * @param {String} [proxy.password=null]
 * @param {String} [proxy.type]
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

async function fetchCompany(id, proxy = null) {
    return new Promise(async(resolve, reject) => {
        let client;
        if(proxy) {
            if(!proxy.type) proxy.type = "https";
            if(proxy.type == "http" || proxy.type == "https") {
                client = axios;
                proxy = {
                    host: proxy.host,
                    port: proxy.port,
                }
                if(proxy.username && proxy.password) {
                    proxy.auth = {
                        username: proxy.username, password: proxy.password
                    }
                }
            } else if(proxy.type == "socks" || proxy.type == "socks4" || proxy.type == "socks5") {
                let temp = proxy; proxy = null;
                let auth = "";
                if(temp.username && temp.password) auth = `${temp.username}@${temp.password}`;
                const httpsAgent = new SocksProxyAgent(`${temp.type}://${temp.host}:${temp.port}${auth}`);
                client = await axios.create({httpsAgent, httpAgent: httpsAgent});
            } else {
                reject("Invalid proxy body");
                return;
            }
        } else {
            client = axios;
        }
        client.post("https://xn--80adjigxbghjs.xn--p1ai/?page_load=ajax&url=/ajax/get-company.ajax", "company=" + id + "&key=" + Math.round(Date.now()), {
            headers: {
                "User-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36 Edg/101.0.1210.53"
            },
            proxy
        }).then(r => {
            resolve(r.data)
        }).catch(err => {
            reject(err)
        })
    })
}

module.exports = { vsezapomnim, fetchCompany };