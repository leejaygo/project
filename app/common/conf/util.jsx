const pi = 3.14159265358979324;  
//  
// Krasovsky 1940  
//   
// a = 6378245.0, 1/f = 298.3   
// b = a * (1 - f)  
// ee = (a^2 - b^2) / a^2;   
const a = 6378245.0;  
const ee = 0.00669342162296594323;  
function outOfChina(lat, lon){   
	if (lon < 72.004 || lon > 137.8347)  
	return true;   
	if (lat < 0.8293 || lat > 55.8271)  
	return true;   
	return false;  
}   
function transformLat(x, y){   
	var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));  
	ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;   
	ret += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;   
	ret += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;   
	return ret;
}   
function transformLon(x, y){   
	var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));   
	ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;   
	ret += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;  
	ret += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0 * pi)) * 2.0 / 3.0;   
	return ret;  
}   
/* 
参数 
wgLat:WGS-84纬度wgLon:WGS-84经度 
返回值： 
mgLat：GCJ-02纬度mgLon：GCJ-02经度 
*/  
function gps_transform( wgLat, wgLon){   
	if (outOfChina(wgLat, wgLon)) {   
		var mgLat = wgLat;  
		var mgLon = wgLon;  
		return false;   
	}   
	var dLat = transformLat(wgLon - 105.0, wgLat - 35.0);   
	var dLon = transformLon(wgLon - 105.0, wgLat - 35.0);   
	var radLat = wgLat / 180.0 * pi; 
	var magic = Math.sin(radLat);  
	magic = 1 - ee * magic * magic; 
	var sqrtMagic = Math.sqrt(magic);  
	dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);  
	dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);  
	var mgLat = wgLat + dLat; 
	var mgLon = wgLon + dLon;
	return {
		mgLat: mgLat,
		mgLon: mgLon
	}
}
     
const x_pi = 3.14159265358979324 * 3000.0 / 180.0;    
//将 GCJ-02 坐标转换成 BD-09 坐标  
function bd_encrypt(gg_lat, gg_lon){    
    var x = gg_lon, y = gg_lat;    
    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);    
    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi); 
    var bd_lon = z * Math.cos(theta) + 0.0065;
    var bd_lat = z * Math.sin(theta) + 0.006;
    return {
    	lat: bd_lat,
    	lng: bd_lon
    }
}    
    
function bd_decrypt( bd_lat,  bd_lon){    
    var x = bd_lon - 0.0065, y = bd_lat - 0.006;    
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);    
    var theta = atan2(y, x) - 0.000003 * Math.cos(x * x_pi);    
    var gg_lon = z * Math.cos(theta);    
    var gg_lat = z * Math.sin(theta);    
} 

function gps2bd(lat,lng){
	var pos = gps_transform(lat, lng);
	return bd_encrypt(pos.mgLat, pos.mgLon);
}

module.exports = {
	gps2bd: gps2bd
}

