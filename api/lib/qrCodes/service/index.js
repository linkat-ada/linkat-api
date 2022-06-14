const qr = require("qrcode")
const { v4: uuidv4 } = require('uuid');

const generateQr = async (text) => {
    try {
        const rq = await qr.toDataURL(text)
        if(rq) return rq
        return null
    }catch(err){
        console.log('Error-->', err)
        throw new Error(err)
    }
}


const generateUUID = async () =>{
    try{
        return await uuidv4();
    }catch(err){
        console.log('Error-->', err)
        throw new Error()
    }
}







module.exports = {
    generateQr,
    generateUUID
}