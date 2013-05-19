// JavaScript 
function func(){
	 
      YUI().use('yql','event','node' ,function(Y) {
      var city = "beijing";				
      var url="http://pm25.in/api/querys/pm2_5.json?city="+city+"&token=5j1znBVAsnSf5xQyNQyq";
      Y.YQL('SELECT * FROM html WHERE 						                                  url="http://pm25.in/api/querys/pm2_5.json?city=beijing&token=5j1znBVAsnSf5xQyNQyq"', function(r) {

           if (r.query && r.query.results)
           {
				 //alert("have result");
                   var rel = eval(r.query.results.body.p);
                                // globals.bl=globals.pm2_5_beijing.length;
                   var tmpPm2_5;
                                //alert(rel.length);
                   for(var index in rel)
                   {
                         tmpPm2_5=rel[index].pm2_5_24h;
                         globals.beijing_station[index]=tmpPm2_5;
                                    //alert(globals.beijing_station[index]);
                   }
            }
							
			var taxiData=[];
            for(var  inx in globals.beijing_pos )
            {
					taxiData[inx]={location: new google.maps.LatLng(globals.beijing_pos[inx][0], globals.beijing_pos[inx][1]), weight: globals.beijing_station[inx]};
					if(globals.beijing_station[inx]<50)
						var image = 'great.png';
					else if(globals.beijing_station[inx]<100)
						var image = 'ok.png';
					else if(globals.beijing_station[inx]<150)
						var image = 'soso.png';
					else
						var image = 'bad.png';
					
				    var latlon2=new google.maps.LatLng(globals.beijing_pos[inx][0], globals.beijing_pos[inx][1]);
			
				    var maker2=new google.maps.Marker({position:latlon2,map:map,icon:image});
				  
					/*var info="in";
					 var infowindow = new google.maps.InfoWindow({
   					 	content: info
					});
					
					google.maps.event.addListener1(marker2, 'click', function() {
  						infowindow.open(map,marker2);
					});*/
							
           };
		
			//插值处理
			var taxiData2 = insert(taxiData);
				
		   var pointArray = new google.maps.MVCArray(taxiData2);
           heatmap = new google.maps.visualization.HeatmapLayer({
                 data: pointArray
            });

           var red = [
                    'rgba(0, 255, 255, 0)',
                    'rgba(0, 255, 255, 1)',
                    'rgba(0, 191, 255, 1)',
                    'rgba(0, 127, 255, 1)',
                    'rgba(0, 63, 255, 1)',
                    'rgba(0, 0, 255, 1)',
                    'rgba(0, 0, 223, 1)',
                    'rgba(0, 0, 191, 1)',
                    'rgba(0, 0, 159, 1)',
                    'rgba(0, 0, 127, 1)',
                    'rgba(63, 0, 91, 1)',
                    'rgba(127, 0, 63, 1)',
                    'rgba(191, 0, 31, 1)',
                    'rgba(255, 0, 0, 1)',
                    'rgba(255, 0, 0, 1)',
                    'rgba(255, 0, 0, 1)',
                ]


                /*heatmap.setOptions({gradient: red});
                heatmap.setOptions({radius: 15});
                heatmap.setOptions({opacity: 0.4});
                heatmap.setMap(map);*/
				
				heatmap.setOptions({dissipating: true});
				heatmap.setOptions({maxIntensity: 150});
                heatmap.setOptions({gradient: red});
                //heatmap.setOptions({radius: 20});
				google.maps.event.addListener(map, 'zoom_changed', function() {
                    var zoomLevel = map.getZoom();
					zoomLevel = get_radius(zoomLevel);
                    heatmap.setOptions({radius: zoomLevel});
                    heatmap.setOptions({opacity: 0.4});
                    heatmap.setMap(map);
                });

                heatmap.setOptions({opacity: 0.5});
                heatmap.setMap(map);
                var marker=new google.maps.Marker({position:latlon,map:map,title:"You are here!"});

        });
    });
}

function get_radius(zoomLevel){
	var radius = 200;
	if(zoomLevel == 9)
		radius = 5;
	else if(zoomLevel == 10)
		radius = 8;
	else if(zoomLevel == 11)
		radius = 15;
	else if(zoomLevel == 12)
		radius = 30;
	else if(zoomLevel == 13)
		radius = 55;
	else if(zoomLevel == 14)
		radius = 100;
	else if(zoomLeve == 15)
		radius = 200;
	else 
		radius = 200;
	
	return radius;		
	
}
	function insert(origin_data){
		var ins_data;
		
		var lat_min=90, lat_max=0; //纬度
		var lng_min=180, lng_max=0; //经度
		var weight_min = origin_data[0].weight;
		
		var count = 150;
		var div_lat, div_lng;
	
		var i = 0;		
		for(i = 0; i < origin_data.length; i++)
		{
			if(origin_data[i].location.lat() < lat_min)
				lat_min = origin_data[i].location.lat();
			if(origin_data[i].location.lat() > lat_max)
				lat_max = origin_data[i].location.lat();
			
			if(origin_data[i].location.lng() < lng_min)
				lng_min = origin_data[i].location.lng();
			if(origin_data[i].location.lng() > lng_max)
				lng_max = origin_data[i].location.lng();
			
			if(origin_data[i].weight == 0)
			{
				if(i == 0)
					origin_data[0].weight = origin_data[1].weight;
				else
					origin_data[i].weight = origin_data[i - 1].weight;
			}
			if(origin_data[i].weight < weight_min)
				weight_min = origin_data[i].weight;
		}
		
		for(i = 0; i < origin_data.length; i++)
		{
			origin_data[i].weight = origin_data[i].weight - weight_min + 5;
		}
		
		div_lat = (lat_max - lat_min) / (count - 25);
		div_lng = (lng_max - lng_min) / (count - 25);
		
		var j;
		var new_data = [];
		for(i = 0; i < count; i++)
		{
			for(j = 0; j < count; j++)
			{
				var temp_lat = lat_min + i * div_lat - 0.03;
				var temp_lng = lng_min + j * div_lng - 0.03;
				var temp_location = new google.maps.LatLng(temp_lat, temp_lng);
				
				var temp_value = cal_value(temp_location, origin_data); 
				var mean_value;
				if(i == 0 && j == 0)
					mean_value = temp_value;
				else if(i != 0 && j == 0)
					mean_value = (temp_value + new_data[(i - 1) * count + j].weight) / 2;
				else if(i == 0 && j != 0)
					mean_value = (temp_value + new_data[count * i + j -1].weight) / 2;
				else
					mean_value = (temp_value + new_data[(i - 1) * count +j].weight + new_data[count * i + j - 1].weight) /3;
				
				new_data[count * i + j]={location: temp_location, weight: temp_value}; 
			}
		}	
		return new_data;		
	}
	
	function cal_value(temp_pos, all_pos)
	{
		var dist_array=[];
		var lat_diff, lng_diff;
		var i;
		for(i = 0; i < all_pos.length; i++)
		{
			lat_diff = temp_pos.lat() - all_pos[i].location.lat();
			lng_diff = temp_pos.lng() - all_pos[i].location.lng();
			dist_array[i] = lat_diff * lat_diff + lng_diff * lng_diff;
		}
		var dist1, dist2;
		var pos1, pos2;
		var weigh1, weigh2;
		
		//look for first
		var min_dist = dist_array[0];
		pos1 = 0;
		for(i = 0; i < dist_array.length; i++)
		{
			if(dist_array[i] < min_dist)
			{
				min_dist = dist_array[i];
				pos1 = i;
			}
		}
		dist1 = min_dist;weight1 = all_pos[pos1].weight;
		
		//look for second
		if(pos1 == 0)
			pos2 = 1;
		else
			pos2 = 0;
		
		min_dist = dist_array[pos2];
		
		for(i = 0; i < dist_array.length; i++)
		{
			if(dist_array[i] < min_dist && i != pos1)
			{
				min_dist = dist_array[i];
				pos2 = i;
			}
		}
		dist2 = min_dist;weight2 = all_pos[pos2].weight;
		var dist_sum = dist1 + dist2;
		var weight = weight1 * dist2 / dist_sum + weight2 * dist1 / dist_sum;
		
		return weight;
	}

