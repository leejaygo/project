import { Router, browserHistory } from 'react-router';

import { connect, Provider } from "react-redux";
import { createStore, applyMiddleware, bindActionCreators } from "redux";
import reducer from './reducer/index.jsx';
import action from './actions/index.jsx';
import createSagaMiddleware from 'redux-saga';
import mySaga from './saga.jsx';
import PropTypes from 'prop-types';

import './common/css/reset.css';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    getChildContext() {
        return {store: this.props};
    }
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

App.childContextTypes = {
    store: PropTypes.object
};



function mapStateToProps(state) {
    return {
        listdata: state.getGonglueData.listdata
    }
}

function mapDispatchToProps(dispatch){
    return{
        actions : bindActionCreators({getGonglueData: action.getGonglueData},dispatch)
    }
}

var sagaMiddleware = createSagaMiddleware();

var store = createStore(reducer,applyMiddleware(sagaMiddleware));

App = connect(mapStateToProps,mapDispatchToProps)(App)

sagaMiddleware.run(mySaga)

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
    <Provider store={store}>
    <Router routes={routeConfig} history={browserHistory}/>
    </Provider>
    ),
    document.getElementById('container')
);


