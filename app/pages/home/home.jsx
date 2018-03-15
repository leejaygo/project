import config from '../../common/conf/config.jsx';
import util from '../../common/conf/util.jsx';
import Marker from './components/mark.jsx';

import './home.css';

const mapConfig = {
	keywords: ['公共厕所'],
	radius: 3000,
	initZoom: 17,
	city: '蚌埠'
}

class home extends React.Component{
	constructor (props){
		super(props);
		this.state = {
			bmap: null,
			maxZoom: 18,
			minZoom: 10,
			bpos: null,
			searchRes: []
		}
	}
	componentWillMount (){
		var self = this;
		this.getPosition(this.getscript.bind(this));//获取定位信息&&加载百度地图
		window.initialize = function (){
			self.bmap = new window.BMap.Map('map',{
				minZoom: self.state.minZoom,
				maxZoom: self.state.maxZoom
			});
			let pint = mapConfig.city||'上海';
			if(self.position){
				var pos = util.gps2bd(self.position.coords.latitude, self.position.coords.longitude);
				pint = new window.BMap.Point(pos.lng, pos.lat);
			}
			
			self.bmap.centerAndZoom(pint, mapConfig.initZoom);
			self.setState({
				bmap: self.bmap,
				bpos: pos
			});
			self.bindEvents();

			self.state.bmap.addControl(new window.BMap.ScaleControl());
		}
	}
	componentDidMount (){
		//console.log('22',this.state)
	}
	componentWillUpdate (){
		//console.log('11',this.state)
	}
	componentDidUpdate (){
		//console.log('33',this.state)
	}
	bindEvents (){
		var self = this;
		self.state.bmap.addEventListener('zoomend', function (){
			//self.localSearch();
		});
		self.state.bmap.addEventListener('dragend', function (){
			//self.localSearch();
		});
		this.state.bmap.addEventListener('tilesloaded',this.tilesloaded.call(self))
	}
	tilesloaded () {
		var self = this;
		self.localsch = new window.BMap.LocalSearch(mapConfig.city||'上海',{
			onSearchComplete: function (res){
				console.log(res)
				self.setState({searchRes: res});
			}
		});
		self.localSearch();
		self.state.bmap.removeEventListener('tilesloaded', self.tilesloaded);
	}
	localSearch (){
		var self = this;
		self.localsch.searchNearby(mapConfig.keywords, self.state.bmap.getCenter(),mapConfig.radius);
	}
	location2myPoint (){
		this.getPosition();
	}
	render () {
		var self=this;
        return [
        	<div key="outwrap" className="outwtap">
	            <div className="map" id="map" ref="map" key="map">
	            	<Marker pos={this.state.bpos} map={this.state.bmap} type='location'></Marker>
	            	{
	                    this.state.searchRes.map(function(val,index){
	                        return [<Marker key={index.toString()} map={self.state.bmap} type="markwc" pos={val.center} />]
	                    })
	                }
	            </div>
	            <i className="locationpos" key="locationpos" onClick={this.location2myPoint.bind(this)}></i>
            </div>
        ]
    }
	getscript (){
		var self = this;
		var script = document.createElement('script');
		script.src = config.baiduApi;
		document.body.appendChild(script);
	}
    getPosition (cb){
    	var self=this;
    	if(navigator.geolocation){
    		navigator.geolocation.getCurrentPosition(function (pos){
    			self.position = pos;
    			if(cb){
    				self.getscript();
    			}else{
    				self.setState({bpos: pos});
    			}
    		},function (error){
    			switch(error.code)
			    {
			    case error.PERMISSION_DENIED:
			      console.log("User denied the request for Geolocation.");
			      break;
			    case error.POSITION_UNAVAILABLE:
			      console.log("Location information is unavailable.")
			      break;
			    case error.TIMEOUT:
			      console.log("The request to get user location timed out.")
			      break;
			    case error.UNKNOWN_ERROR:
			      console.log("An unknown error occurred.")
			      break;
			    }
			    return false;
    		});
    	}else{
    		return false;
    	}
    }
}

module.exports =  home