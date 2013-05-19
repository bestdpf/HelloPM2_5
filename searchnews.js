// JavaScript Document

 globals.aroundnews[0]="联想立“军令状”：两年内在华打败三星";
 globals.aroundnews[1]="国办紧急通知 清理检查各地政府性楼堂馆所修建情况";
 globals.aroundnews[2]="央视主持人张羽否认卷入刘铁男贪腐案";
 globals.aroundnews[3]="雅虎北研黑客日今日在同方大厦举行";
 YUI().use('yql','event','node' ,function(Y) {

        var button = Y.one("#searchNews");
        button.on("click", function (e) {
			
			var lat1=39.997777
			var lon1=116.3332083
			var latlon1=new google.maps.LatLng(lat1, lon1)
			var marker1=new google.maps.Marker({position:latlon1,map:map,title:"You are here!"});
			var info1=globals.aroundnews[3];
			globals.infowindow[3] = new google.maps.InfoWindow({
   					 content: info1
			});
			google.maps.event.addListener(marker1, 'click', function() {
  				globals.infowindow[3].open(map,marker1);
			});
			
			var lat2=39.987777
			var lon2=116.3432083
			var latlon2=new google.maps.LatLng(lat2, lon2)
			var marker2=new google.maps.Marker({position:latlon2,map:map,title:"You are here!"});
			var info2=globals.aroundnews[0];
			globals.infowindow[0] = new google.maps.InfoWindow({
   					 content: info2
			});
			google.maps.event.addListener(marker2, 'click', function() {
  				globals.infowindow[0].open(map,marker2);
			});
			
			var lat3=39.997677
			var lon3=116.342083
			var latlon3=new google.maps.LatLng(lat3, lon3)
			var marker3=new google.maps.Marker({position:latlon3,map:map,title:"You are here!"});
			var info3=globals.aroundnews[2];
			globals.infowindow[2] = new google.maps.InfoWindow({
   					 content: info3
			});
			google.maps.event.addListener(marker3, 'click', function() {
  				globals.infowindow[2].open(map,marker3);
			});
			
			var lat4=39.5649445
			var lon4=116.3332683
			var latlon4=new google.maps.LatLng(lat4, lon4)
			var marker4=new google.maps.Marker({position:latlon4,map:map,title:"You are here!"});
			var info4=globals.aroundnews[1];
			globals.infowindow[1] = new google.maps.InfoWindow({
   					 content: info4
			});
			google.maps.event.addListener(marker4, 'click', function() {
  				globals.infowindow[1].open(map,marker4);
			});
		})
 })