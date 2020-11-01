
 let request = require("request")
export async function response(url, method){
    return new Promise(resolve=>{      
        request({url : url,method : method}, (error, response, body) => {
            if(response && response.statusCode == 200){
                resolve(response)
            }            
        });
    });
}
export async function requestData(url, method, data){
    return new Promise(resolve=>{      
        request({url : url,method : method, json : {"data" : data}}, (error, response, body) => {
            if(response && response.statusCode == 200){
                resolve(response)
            }            
        });
        
    });
}


