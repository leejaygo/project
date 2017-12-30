var config = require('../../common/conf/config.jsx');
require('./home.css') 

class home extends React.Component{
	constructor (props){
		super(props);
		this.state = {
			bmap: null,
			maxZoom: 18,
			minZoom: 10
		}
	}
	componentWillMount (){
		var self = this;
		window.initialize = function (){
			self.state.bmap = new window.BMap.Map('map',{
				minZoom: self.state.minZoom,
				maxZoom: self.state.maxZoom
			});
			self.state.bmap.centerAndZoom('上海', 14);
			self.state.bmap.addControl(new window.BMap.ScaleControl());
			self.bindEvents();
		}
	}
	componentDidMount (){
		this.getscript();
	}
	bindEvents (){
		var self = this;
		this.state.bmap.addEventListener('zoomend', function (){
			console.log(self.state.bmap.getZoom())
		})
	}
	getscript (){
		var self = this;
		var script = document.createElement('script');
		script.src = config.baiduApi;
		document.body.appendChild(script);
	}
    render () {
        return [
            <div className="map" id="map" ref="map" key="{new Date().getTime()}"></div>
        ]
    }
}

module.exports =  home