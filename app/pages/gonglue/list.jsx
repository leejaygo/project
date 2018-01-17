class List extends React.Component {
	constructor(props) {
        super(props);
    }
	componentWillMount (){
		
	}
	componentDidMout (){
		
	}
	render (){
		var listdata = this.props.listdata;
		if(!listdata) listdata=[];
		return [
			<ul className="gongluelist" key="{new Date().getTime()}}">
			{	
				
				listdata.map(function (item, index){
					return [<li key="{index}">{item.title}</li>]
				})
			}
			</ul>
		]
	}
}

module.exports = List;