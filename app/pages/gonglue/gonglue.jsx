import PropTypes from 'prop-types';
var List = require('./list.jsx');

class Gonglue extends React.Component {
	constructor(props) {
        super(props);
    }
	componentWillMount (){
		
	}
	componentDidMount (){
		this.context.store.actions.getGonglueData();
	}
	render (){
		var listdata = this.context.store.listdata;
		return [
			<List actions={this.props.actions} key="{new Date().getTime()}" listdata={listdata}></List>
		]
	}
}

Gonglue.contextTypes = {
	store: PropTypes.object
}

module.exports = Gonglue;