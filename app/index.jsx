var Router = require('react-router').Router;
var browserHistory = require('react-router').browserHistory;


require('./common/css/reset.css');

class App extends React.Component {
    componentWillMount (){

    }
    componentWillUnmount (){

    }
    render (){
        return [
            <div className="page" key="{new Date().getTime()}">{this.props.children}</div>
        ]
    }
}

var subChildren = [
	{
		path:'gonglue',
		getComponent: function(location, callback) {
		    require.ensure([], function (require) {
		      callback(null, require('./pages/gonglue/gonglue.jsx'))
		    })
		}
	},
    {
        path:'home',
        getComponent: function(location, callback) {
            require.ensure([], function (require) {
              callback(null, require('./pages/home/home.jsx'))
            })
        }
    }
]

var routeConfig = {
    path: '/',
    component: App,
    indexRoute: {
        getComponent: function (location, callback) {
            require.ensure([], function (require) {
                callback(null, require('./pages/home/home.jsx'))
            })
        }
    },
    childRoutes: subChildren
}

ReactDom.render((
    <Router routes={routeConfig} history={browserHistory}/>),
    document.getElementById('container')
);


