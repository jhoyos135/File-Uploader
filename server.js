const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')

const app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(fileUpload());

// React Front-End 
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  };

app.post('/api/images', function(req, res) {
    let sampleFile;
    let uploadPath;
  
    if (Object.keys(req.files).length == 0) {
      res.status(400).send('No files were uploaded.');
      return;
    }
  
    console.log('req.files >>>', req.files.myImage); // eslint-disable-line
    let file = req.files.myImage;
  
    sampleFile = req.files.myImage.name;
    console.log(sampleFile)
  
    uploadPath = `./public/uploads/${sampleFile}`
    console.log(uploadPath)
  
    file.mv(uploadPath, function(err) {
        if(err){
            console.log(err);
        }
        else{
            console.log("File uploaded");
        }
    });
  });


const PORT = process.env.NODE_ENV || 4000;
app.listen(PORT, () => {
    console.log(`listening to port`)
})