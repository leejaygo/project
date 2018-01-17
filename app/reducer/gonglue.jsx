var getGonglueData = function (state = {listdata: []}, action){
	switch	(action.type){
		case 'GONGLUE_LIST_FETCH_DONE':
		console.log(action)
		if(action.res === false|| action.res.code !== 0) return;
		return {
			listdata: action.res.data
		}
		break;
		default:
		return {
			listdata: []
		}
		break;
	}
}

module.exports = getGonglueData;