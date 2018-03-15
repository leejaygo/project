import locUrl from '../../../img/placeholder.png';
import markUrl from '../../../img/pos.png';

var offset = {
	'location': {w: 32, h: 32},
	'markwc': {w: 24, h:24}
}
class Marker extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			bmark: null
		}
	}
	componentWillMount (){
		
	}
	componentDidMount (){
		this.initMarker();
	}
	componentDidUpdate (){
		this.initMarker();
	}
	initMarker (){
		if(!window.BMap) return;
		var icons = {
			'location': new BMap.Icon(locUrl , new BMap.Size(32, 32), {
		        imageOffset: new BMap.Size(0, 0),
		        anchor: new BMap.Size(0, 0),
		        imageSize: new BMap.Size(32, 32)
		    }),
		    'markwc': new BMap.Icon(markUrl , new BMap.Size(16, 16), {
		        imageOffset: new BMap.Size(0, 0),
		        anchor: new BMap.Size(0, 0),
		        imageSize: new BMap.Size(16, 16)
		    })
		}
		var point = new BMap.Point(this.props.pos.lng, this.props.pos.lat);
		var tp = this.props.type;
		var bmark = new BMap.Marker(point, {
			offset: new BMap.Size(offset[tp].w/2, offset[tp].h/2),
			icon: icons[this.props.type]
		});
		//console.log('bmark', bmark)
		this.props.map.addOverlay(bmark);
	}
	render (){
		return []
	}
}

module.exports =  Marker;