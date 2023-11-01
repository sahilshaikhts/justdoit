const admin=require('firebase-admin');
const serviceAccount=require('./config/just-do-it-bc070-firebase-adminsdk-2tdlw-344b4a2a8f.json')

admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
        storageBucket:'just-do-it-bc070.appspot.com'

})

module.exports=admin;