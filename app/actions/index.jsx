module.exports = {
	getGonglueData: function (){
		return {
			type: 'FETCH_GONGLUELIST',
			data: {
				page: 1,
				size: 20
			}
		}
	}
}