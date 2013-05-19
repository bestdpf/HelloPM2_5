  YUI().use('yql','event','node' ,function(Y) {

        var button = Y.one("#readygo");
      var now_woeid;
        button.on("click", function (e) {
            l=document.getElementById("in").value;
            //' select * from geo.placefinder where text="sfo" '
            Y.YQL(' select * from geo.placefinder where text=" '+l+' " ', function(rsp) {
                var la = rsp.query.results.Result.latitude;
                var lo = rsp.query.results.Result.longitude;
                now_woeid=rsp.query.results.Result.woeid;
                Y.YQL('select * from weather.forecast where woeid='+now_woeid,function(rsp){
                    //alert(rsp.query.results.channel.item.condition.temp);
                    now_temp=rsp.query.results.channel.item.condition.temp;
                    var dg=document.getElementById("sidebar");
                    dg.innerHTML="<p>temp</p>"+now_temp+" "+rsp.query.results.channel.units.temperature
                        +"<p>wind</p>"+rsp.query.results.channel.wind.speed +" "+rsp.query.results.channel.units.speed
                        +"<p>humidity</p>" +rsp.query.results.channel.atmosphere.humidity
                        +"<p>pressure</p>" +rsp.query.results.channel.atmosphere.pressure+" "+ rsp.query.results.channel.units.pressure;
                });
                //Y.one("#q1").setHTML(la);
                //Y.one("#q2").setHTML(lo);
                var latlon=new google.maps.LatLng(la, lo);
                mapholder=document.getElementById('mapholder')
                // mapholder.style.height='250px';
                // mapholder.style.width='500px';

                var myOptions=
                {
                    center:latlon,zoom:11,
                    mapTypeId:google.maps.MapTypeId.ROADMAP,
                    mapTypeControl:false,
                    navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
                };
                map=new google.maps.Map(document.getElementById("mapholder"),myOptions);
                var marker=new google.maps.Marker({position:latlon,map:map,title:"You are here!"});
            });
        });

    });