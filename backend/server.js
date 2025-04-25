const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
const cors = require('cors');
const bookModel = require('./models/book-model');


const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err)=> console.log(err));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname , 'public')));

app.use("/", (req,res)=>{
    res.send("hello world");
})


app.get('/read',async (req,res)=>{
    let book = await bookModel.find(); 
    res.json(book);
})

app.post('/create',async (req,res)=>{
    const book =  req.body;

    const createdBook = await userModel.create({
        title : book.title,
        author: book.email,
        rating: book.rating,
        content: book.content,
    });
    
    
    // console.log(createdUser.name);
    console.log("Book Created Successfully");
    res.json(book);
});

app.get('/delete/:id', async(req,res)=>{
    let deletedBook = await bookModel.findByIdAndDelete(req.params.id);
    res.json();
})

app.get('/edit/:id', async (req,res)=>{
    let book =  await bookModel.findById(req.params.id);
    res.json(book);
})
app.post('/update/:id',async (req,res)=>{
    let  = await bookModel.findById(req.params.id);
    let title = req.body.newBookName;
    if(title !== ''){
        user.title = title;
    }
    let author = req.body.newAuthorName;
    if(author !== ''){
        book.author = author.toLowerCase();
    }
    let rating = req.body.newRating;
    if(rating !== ''){
        book.rating = rating;
    }
    await book.save();
    res.json();
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));



