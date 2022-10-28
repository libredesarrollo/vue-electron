const fs = require('fs')

module.exports.setAuth = (token) => {
    fs.writeFile('rest/token.auth', token, function(err){
        if(err) throw err;
    })
}

module.exports.getAuth = () =>{
    let token = null
    
    try {
        token = fs.readFileSync('rest/token.auth')
        token = token.toString() 
    } catch (error) {
        console.log(error)
    }

    return token ?? ''
}