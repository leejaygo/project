//import { Router, history, browserHistory } from 'react-router'
var Router = require('react-router').Router;
//var Route = require('react-router').Route;
//var history = require('react-router').history;
var browserHistory = require('react-router').browserHistory;

class App extends React.Component {
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

window.onload = function (){
    ReactDom.render((
        <Router routes={routeConfig} history={browserHistory}/>),
        document.getElementById('container')
    );
}

