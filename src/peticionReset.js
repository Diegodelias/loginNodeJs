const  reset  = require('./modelos/ResetPassword');

async function  getResetRequest(id) {
    // const thisRequest = requests.find(req => req.id === id);
    const thisRequest = await reset.find({id: id}, (error,data) =>{
        if(error){
            console.log(error)
        } else {
            console.log(data)

        }
    
    })
    
    return thisRequest;


}

function createResetRequest(resetRequest) {
    requests.push(resetRequest);
}



module.exports = {

    getResetRequest
}