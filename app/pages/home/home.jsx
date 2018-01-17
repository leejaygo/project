import config from '../../common/conf/config.jsx';
import util from '../../common/conf/util.jsx';
import Marker from './components/mark.jsx';

import './home.css';

class home extends React.Component{
	constructor (props){
		super(props);
		this.state = {
			bmap: null,
			maxZoom: 18,
			minZoom: 10,
			bpos: null	
		}
	}
	componentWillMount (){
		var self = this;
		this.getPosition();
		window.initialize = function (){
			self.bmap = new window.BMap.Map('map',{
				minZoom: self.state.minZoom,
				maxZoom: self.state.maxZoom
			});
			if(self.position){
				var pos = util.gps2bd(self.position.coords.latitude, self.position.coords.longitude);

				self.bmap.centerAndZoom(new window.BMap.Point(pos.lng, pos.lat), 14);
				self.setState({
					bmap: self.bmap,
					bpos: pos
				});
			}else{
				self.state.bmap.centerAndZoom('上海', 14);
			}
			self.state.bmap.addControl(new window.BMap.ScaleControl());
			self.bindEvents();
		}
	}
	componentDidMount (){
		//this.getscript();
	}
	componentWillUpdate (){
		console.log(this.state)
	}
	bindEvents (){
		var self = this;
		this.state.bmap.addEventListener('zoomend', function (){
			console.log(self.state.bmap.getZoom())
		});
	}
	render () {
		console.log(this.state.bpos)
        return [
            <div className="map" id="map" ref="map" key="{new Date().getTime()}">
            	<Marker pos={this.state.bpos} map={this.state.bmap} type='location'></Marker>
            </div>
        ]
    }
	getscript (){
		var self = this;
		var script = document.createElement('script');
		script.src = config.baiduApi;
		document.body.appendChild(script);
	}
    getPosition (){
    	var self=this;
    	if(navigator.geolocation){
    		navigator.geolocation.getCurrentPosition(function (pos){
    			self.position = pos;
    			self.getscript();
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