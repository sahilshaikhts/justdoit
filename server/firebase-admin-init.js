//if deployed use env from host settings
if (process.env.NODE_ENV == 'production') {
    require('dotenv').config({path:'/etc/secrets/.env'});
} else {
    require('dotenv').config({ path: './server/config/.env' });
}
const admin=require('firebase-admin');
admin.initializeApp({
    credential:admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN_KEY)),
        storageBucket:'just-do-it-bc070.appspot.com'

})

module.exports=admin;