var User = {
    isLogin: function () {
        return !!sessionStorage.getItem('secret')
    },

    setInfo: function (secret, publicKey, address) {
        sessionStorage.setItem('secret', secret)
        sessionStorage.setItem('publicKey', publicKey)
        sessionStorage.setItem('address', address)
    },
	getSecret: function () {        
		return sessionStorage.getItem('secret');    
	},
    getPublicKey: function () {        
		return sessionStorage.getItem('publicKey')    
	},
    getAddress: function () {        
		return sessionStorage.getItem('address');
	}
	
}