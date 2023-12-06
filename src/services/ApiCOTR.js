import { API_COTR_URL } from "../utils/Constants";

export class ApiCOTR{
    static async PostLoginAsync(user) {
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

    static async PostSignupAsync(signup) {
        try{
            const response = await fetch(`${API_COTR_URL}/user/signup`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signup)
            })

            if(response.ok) return true;

            throw await response.json()
        }
        catch(error) {
            throw error
        }
    }

    static async GetAccessTokenAsync(refreshToken) {
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

    static async PostPasswordChangeAsync(changeRequest){
        try{
            const response = await fetch(`${API_COTR_URL}/user/change-password`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(changeRequest)
            })

            if(response.ok) return true;

            throw await response.json()
        }
        catch(error) {
            throw error
        }
    }

    static async PostPasswordChangeRequestAsync(changeRequest){
        try{
            const response = await fetch(`${API_COTR_URL}/user/change-password`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(changeRequest)
            })

            if(response.ok) return true;

            throw await response.json()
        }
        catch(error) {
            throw error
        }
    }

    static async GetExercisesAsync(accessToken){
        try{
            const response = await fetch(`${API_COTR_URL}/exercise`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })

            if(response.ok) return await response.json()

            throw await response.json()
        }
        catch(error) {
            throw error
        }
    }

    static async GetExerciseByExerciseIdAsync(accessToken, exerciseId){
        try{
            const response = await fetch(`${API_COTR_URL}/exercise/${exerciseId}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })

            if(response.ok) return await response.json()

            throw await response.json()
        }
        catch(error) {
            throw error
        }
    }

    static async GetExercisesByCreatorIdAsync(accessToken, creatorId){
        try{
            const response = await fetch(`${API_COTR_URL}/exercise?creatorId=${creatorId}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })

            if(response.ok) return await response.json()

            throw await response.json()
        }
        catch(error) {
            throw error
        }
    }

    static async GetExercisesByLanguajeIdAsync(accessToken, languajeId){
        try{
            const response = await fetch(`${API_COTR_URL}/exercise?languajeId=${languajeId}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })

            if(response.ok) return await response.json()

            throw await response.json()
        }
        catch(error) {
            throw error
        }
    }

    static async GetUserInfoByIdAsync(accessToken, userId){
        try{
            const response = await fetch(`${API_COTR_URL}/user/profile/${userId}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })

            if(response.ok) return await response.json()

            throw await response.json()
        }
        catch(error) {
            throw error
        }
    }

    static async GetLanguajeInfoByIdAsync(accessToken, languajeId){
        try{
            const response = await fetch(`${API_COTR_URL}/languajes/${languajeId}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })

            if(response.ok) return await response.json()

            throw await response.json()
        }
        catch(error) {
            throw error
        }
    }

    static async GetLanguajesAsync(accessToken){
        try{
            const response = await fetch(`${API_COTR_URL}/languajes`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })

            if(response.ok) return await response.json()

            throw await response.json()
        }
        catch(error) {
            throw error
        }
    }

    static async TryExerciseAsync(accessToken, exerciseId, code){
        try{
            const response = await fetch(`${API_COTR_URL}/exercise/${exerciseId}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify(code)
            })

            if(response.ok) return true;

            throw await response.json()
        }
        catch(error) {
            throw error
        }
    }

    static async CreateExerciseAsync(accessToken, test){
        try{
            const response = await fetch(`${API_COTR_URL}/exercise`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify(test)
            })

            if(response.ok) return await response.json();

            throw await response.json()
        }
        catch(error) {
            throw error
        }
    }

    static async GetExerciseTestByExerciseIdAsync(accessToken, exerciseId){
        try{
            const response = await fetch(`${API_COTR_URL}/exercise/${exerciseId}/test`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })

            if(response.ok) return await response.json()

            throw await response.json()
        }
        catch(error) {
            throw error
        }
    }

    static async EditExerciseAsync(accessToken, test, exerciseId){
        try{
            const response = await fetch(`${API_COTR_URL}/exercise/${exerciseId}/test`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify(test)
            })

            if(response.ok) return true;

            throw await response.json()
        }
        catch(error) {
            throw error
        }
    }

    static async VerifyEmailAsync(verifyRequest){
        try{
            const response = await fetch(`${API_COTR_URL}/user/verify`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(verifyRequest)
            })

            if(response.ok) return true;

            throw await response.json()
        }
        catch(error) {
            throw error
        }
    }
}
