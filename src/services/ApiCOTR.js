import { API_COTR_URL } from "../utils/Constants";
export class ApiCOTR{
    static async PostLogin(user) {
        try{
            const response = await fetch(`${API_COTR_URL}/user/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })

            if(response.ok) return await response.json()

            throw await response.json()
        }
        catch(error) {
            throw error
        }
    }

    static async PostSignup(signup) {
        try{
            const response = await fetch(`${API_COTR_URL}/user/signup`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signup)
            })

            if(response.ok) return await response.json()

            throw await response.json()
        }
        catch(error) {
            throw error
        }
    }

    static async GetAccessToken(refreshToken) {
        try{
            const response = await fetch(`${API_COTR_URL}/user/access-token`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${refreshToken}`
                }
            })

            if(response.ok) return await response.json()

            throw await response.json()
        }
        catch(error) {
            throw error
        }
    }
}
