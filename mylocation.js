// JavaScript Document

YUI().use(
        'node', 'event-key',
        'gallery-google-maps-loader', 'button',
        'json', 'jsonp',
        'collection', function (Y) {
            var x=document.getElementById("sidebar");
            function getLocation()
            {
                if (navigator.geolocation)
                {
                    navigator.geolocation.getCurrentPosition(showPosition1,showError);
                }
                else
                    x.innerHTML="Geolocation is not supported by this browser.";
            }
            function showPosition1(position)
            {
                var lat=position.coords.latitude;
                var lon=position.coords.longitude
                /*else
                 {
                 lat=document.getElementById("la").value;
                 lon=document.getElementById("lo").value;
                 }*/
                var latlon=new google.maps.LatLng(lat, lon)
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
				var info="you are here";
				var infowindow = new google.maps.InfoWindow({
   					 content: info
				});
				google.maps.event.addListener(marker, 'click', function() {
  					infowindow.open(map,marker);
				});

				
            }
            
            function showError(error)
            {
                switch(error.code)
                {
                    case error.PERMISSION_DENIED:
                        x.innerHTML="User denied the request for Geolocation."
                        break;
                    case error.POSITION_UNAVAILABLE:
                        x.innerHTML="Location information is unavailable."
                        break;
                    case error.TIMEOUT:
                        x.innerHTML="The request to get user location timed out."
                        break;
                    case error.UNKNOWN_ERROR:
                        x.innerHTML="An unknown error occurred."
                        break;
                }
            }
            getLocation();
        });


