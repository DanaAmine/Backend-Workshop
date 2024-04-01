const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(express.json());

const secretKey = 'amine';

const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' }
];

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if username and password are correct
    const user = users.find(user => user.username === username && user.password === password);
    
    if(!user){
        return res.status(401).json({ error: 'Invalid username or password' });
    }
    
    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, secretKey);
    
    res.json({token})
})


const authenticateToken = (req,res,next)=>{
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
}

// Middleware to authorize requests based on role
const authorizeRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        next();
    };
};


app.get('/showPaymentDetails',authorizeRole('normal'),authenticateToken,(req,res)=>{
    // traitement 
    res.send("Welcome ");
})

app.post('/addUser',authorizeRole('admin'),authenticateToken,(req,res)=>{
   //traitement    
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
