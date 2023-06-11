const express= require('express')
const router = express.Router()
const path= require("path")
const app = express()
const dotenv=require('dotenv')
const User = require('./models/User')
const mongoose=require('mongoose')
dotenv.config({ path: path.resolve(__dirname, 'config', '.env') });

const port = process.env.PORT 

app.use(express.json())

mongoose.connect(process.env.MONGO_URI).then(()=> console.log('database connected'))




//@ POST METHOD


router.post ('/users' , async (req,res) =>{
    try {
        const newUser = new User(req.body)
        await newUser.save()
        res.status(200).json({msg:"success", newUser})
    } catch (err) {res.status(500).json({msg: err.message})}
})


// @ GET METHOD


router.get ('/users' , async (req,res) =>{
    try {
        const newUser = await User.find()
        res.status(200).json({msg:newUser})
    } catch (err) {res.status(500).json({msg: err.message})}
})


// UPDATE USER METHOD

router.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, age, email } = req.body;
  
    try {
      const user = await User.findByIdAndUpdate(
        id,
        { name, age, email },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      res.status(200).json({ msg: 'User updated successfully', user });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  });



// @ DELETE USER METHOD


router.delete('/users/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const removedUser = await User.findByIdAndRemove(userId);
      
      if (!removedUser) {
        return res.status(404).json({ msg: 'Person not found' });
      }
      
      res.status(200).json({ msg: 'User deleted successfully', User: removedUser });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
});





app.listen(port , ()=> console.log('listening on port:',port))

app.use('/', router);

module.exports = router

