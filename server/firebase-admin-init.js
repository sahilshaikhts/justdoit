//if deployed use env from host settings
const admin=require('firebase-admin');
admin.initializeApp({
    credential:admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN_KEY)),
        storageBucket:'just-do-it-bc070.appspot.com'

})

module.exports=admin;