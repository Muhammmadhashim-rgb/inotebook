const connectToMongo = require('./db');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000; 



connectToMongo()
  .then(() => {

    app.listen(port, () => {
      console.log(`✅ Server started at http://localhost:${port}`);
    });
  })

  .catch((err) => {
    console.error('❌ MongoDB Connection Failed:', err);
  });

  app.use(express.json())

// Avalibal routes

app.use('/api/auth',require('./router/auth'))
app.use('/api/note',require('./router/note'))

