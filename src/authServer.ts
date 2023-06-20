import express from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config();
const app = express();
const port = process.env.AUTH_PORT || 4000;

let refreshTokens: string[] = [] ;

app.use(express.json());


app.post('/login', (req, res) => {
    const email = req.body.email;
    const user = {email: email};
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET as string)

    if(email == null || !email.match(emailFormat)) return res.sendStatus(401)

    refreshTokens.push(refreshToken)
    res.json({accessToken: accessToken, refreshToken});
})

function generateAccessToken(user: string) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: '30m'})
}



app.post('/token', (req, res) => {
    const refreshToken = req.body.token;

    if(refreshToken == null) return res.sendStatus(401)
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err, user) => {
        if(err) return res.sendStatus(403)
        const accessToken = generateAccessToken({email: user.email})

        res.json({accessToken: accessToken})
    })
})


app.listen(port, () => {
    console.log(`👾 Auth Server is running on port ${port} 👾`);
})