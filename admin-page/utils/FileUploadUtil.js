const app = require('../app');
const googleStorage = require('@google-cloud/storage');
const Multer = require('multer');

const storage = googleStorage({
  projectId: "dailyshop-4d39c",
  keyFilename: "../serviceAccount.json"
});

const bucket = storage.bucket("dailyshop-4d39c.appspot.com");

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // no larger than 5mb, you can change as needed.
  }
});

app.post('/upload', multer.single('productImage'), (req, res) => {
    
    console.log('test upload');
    let file = req.file;
    if (file) {     
        console.log('Upload file');
    }
    else 
    {
        console.log('file not found');
    }
  });