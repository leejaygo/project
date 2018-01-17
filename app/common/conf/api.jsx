module.exports = {
	fetchGonglue: function (data){
		return new Promise(function func(resolve, reject){
		    $.ajax({
		    	url: "/api/gonglue",
		    	type: 'get',
		    	data: data,
		    	success: function (res){
		    		if(res.code == 0){
		    			return resolve(res);
		    		}else{
		    			return resolve(false);
		    		}
		    	},
		    	error: function (){
		    		return resolve(false);
		    	}
		    });
		});
	}
}