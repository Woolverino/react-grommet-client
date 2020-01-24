const tls = require('tls');

function format_date(unix_timestamp){
    var date = new Date(unix_timestamp*1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    var days_of_week = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var months_of_year = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    var day = days_of_week[date.getDay()];
    var month = months_of_year[date.getMonth()];
    var year = date.getYear() + 1900;
    var daynum = date.getDate();

    // Will display time in 10:30:23 format
    var formattedTime = day + " " + month + " " + daynum + " " + year + " " + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return formattedTime;
}



function lsn_get_request(query,port,hostname){
    var client;
    try{
        process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
        const options = {
            host: hostname,
            port: port,
       };
    
        client = tls.connect(options, () => {
            console.log("connected");
        
        });

        client.setEncoding('utf8');
    }
    catch(error){
        console.log("Connection error occured.");
        console.error(error);
        return new Promise(function(resolve,reject) {
            resolve("Could not connect");
        });
    }
    return new Promise(function(resolve,reject) {
        var result = "";

        client.write(query);

        client.on('data', (data) => {
            console.log("got data")
            result += data;
        });

        client.on('end', () => {
            console.log("End connection");
            console.log(result);
            if(result){
                resolve(result)
            }else{
                console.log("End. No data recieved");
		resolve(Promise.reject(new Error("No data recieved.")));
            }
        });
    } ).catch(function(error) {
	console.log("error occured");
	console.error(error);
        return new Promise(function(resolve,reject) {
            resolve("Could not connect");
        });
    });
    

    
};

module.exports = {
    format_date,
    lsn_get_request,
    tls
}
