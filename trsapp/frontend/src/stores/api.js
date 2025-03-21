import { supabase } from "../lib/supabase";

export const useApi = async(apiFunction,store = null,storefield = "", params = {}) => {

    try{
        //認証情報取得
        const {data} = await supabase.auth.getSession()
        //セッションの存在確認
        if (!data.session){
            throw new error("セッションがありません")
        }
        const authToken = data.session.access_token
        //データを取得
        const response = await apiFunction(authToken, params);

        if (store){
            store.$patch({ [storefield]: response.data})
        }
        return true
    }catch(err){
        console.log("API呼び出しエラー")
        throw err
    }
}