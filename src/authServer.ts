import express from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import cors from 'cors'

dotenv.config();
const auth = express();
const port = process.env.AUTH_PORT || 4000;

let refreshTokens: string[] = [] ;

auth.use(express.json());
auth.use(cors())


auth.post('/login', (req, res) => {
    const email = req.body.email;
    const user = {email: email};
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET as string)

    if(email == null || !email.match(emailFormat)) return res.sendStatus(401)

    refreshTokens.push(refreshToken)
    res.json({accessToken: accessToken, refreshToken});
})

function generateAccessToken(user: any) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: '1m'})
}



auth.post('/token', (req, res) => {
    const refreshToken = req.body.token;

    if(refreshToken == null) return res.sendStatus(401)
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err:any, user:any) => {
        if(err) return res.sendStatus(403)
        const accessToken = generateAccessToken({email: user.email})
        

        res.json({accessToken: accessToken})
    })
})


auth.listen(port, () => {
    console.log(`👾 Auth Server is running on port ${port} 👾`);
})

module.exports = auth