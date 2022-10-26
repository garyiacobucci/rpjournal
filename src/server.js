import express from 'express';
 
const app = express();
 
app.use(express.json());
 
 
app.get('/health', (req, res) => {
    return res.status(200).send({message: "Health is good"});
});
 
app.listen(5555, () => {
    console.log("App is listening for requests on port 5555");
});