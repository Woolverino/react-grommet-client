
class LSNHandler {

    handleResponse(res){
        var x2js = require('xml2js');
        x2js.parseString(res, (err,result) => {
            console.log(res);
            console.log(result);
        } );
    }

    handlePosts(posts){

        if(posts == null)
        {
            return null;
        }
        var to_return = []
        var numposts = posts.length
        
        
        var i;
        for(i=0;i<numposts;i++){
            var post = {
                title: "",
                data: "",
                date: "",
                id: ""
            };
    
            post.data = posts[i].data[0]
            post.title = posts[i].title[0]
            post.date = posts[i].date[0]
            post.id = posts[i].id[0]
            to_return.push(post)
        }

        return to_return;
    }

    formatDate(unix_timestamp){
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
}

export default LSNHandler;