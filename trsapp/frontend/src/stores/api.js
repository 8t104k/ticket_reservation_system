import { supabase } from "../lib/supabase";

export const useApi = async(apiFunction, options = {}) => {
    const { store = null,field = "", params = {} } = options;
    
    let authToken;
    //認証情報取得
    try{
        const {data} = await supabase.auth.getSession()
        if (!data.session){throw new Error("セッションがありません")}
        authToken = data.session.access_token
    }catch(err){
        throw err
    }
    //データを取得
    try{
        const response = await apiFunction(authToken, params);
        if (store){store.$patch({ [field]: response.data})}
        return response.data
    }catch(err){
        throw err
    }
}