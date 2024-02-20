import axios from "axios";
import prismaClient from "../prisma";
import { sign } from "jsonwebtoken";

function getSecret(){
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    return JWT_SECRET;
}

interface IAccessTokenResponse {
    access_token: string
} 

interface IUserResponse {
    avatar_url: string,
    login: string,
    id: number,
    name: string
} 

class AuthenticateUserService {
    

    
    async execute(code: string) {
        const url = "https://github.com/login/oauth/access_token";

        const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
            params: {
                client_id: process.env.GIT_CLIENT_ID,
                client_secret: process.env.GIT_CLIENT_SECRET,
                code,                
            }, 
            headers: {
                "Accept": "application/json"
            }
        });

        const res = await axios.get<IUserResponse>("https://api.github.com/user", {
            headers: {
                authorization: `Bearer ${accessTokenResponse.access_token}`
            }
        });

        const { login, id, avatar_url, name } = res.data;

        let user = await prismaClient.user.findFirst({
            where: {
                github_id: id
            }
        })

        if(!user){
            user = await prismaClient.user.create({
                data: {
                    github_id: id,
                    login,
                    avatar_url,
                    name
                }
            })
        }

        const token = sign(
            {
                user: {
                    name: user.name,
                    avatar_url: user.avatar_url,
                    id: user.id
                }
            },
            getSecret(),
            {
                subject: user.id,
                expiresIn: "1d"
            }
        );

        return { token, user };
    }
}

export { AuthenticateUserService };