const mongoose = require('mongoose');
//mongodb://adminglobales:Globales2020@ds217310.mlab.com:17310/heroku_2w034x9q
mongoose.connect('mongodb://localhost/diario-db-app', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then( db => console.log('Connection succesful'))
.catch(err => console.log(err));