import { supabase } from "../lib/supabase";
import apiClient from "../api/client";

// APIリクエストを認証トークン付きで
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


export const apiService = {
  //認証情報取得
  async getAuthToken(){
    try{
      const {data} = await supabase.auth.getSession()
      if (!data.session){throw new Error("セッションがありません")}
      return data.session.access_token
    }catch(err){
      throw err
    }
  },
  //API呼び出し
  async call(endpoint,method = "get",params=null,store=null,fields=null,loading=true){
    //console.log(endpoint,method,params,store,fields)
    if (store&&loading){
      store.$patch({ loading: true, error: false})
    } if (store&&!loading) {
      store.$patch({ error: false})
    }
    try {
      const authToken = await this.getAuthToken();
      const client = apiClient(authToken);
      const apiMethods = {
        get: () => client.get(endpoint),
        post: () => client.post(endpoint, params),
        patch: () => client.patch(endpoint, params),
        put: () => client.put(endpoint, params),
        delete: () => client.delete(endpoint)
      }
      const response = await apiMethods[method]();

      if (store && fields){
        const fieldArray = Array.isArray(fields) ? fields : [fields];
        const updates = {};

        fieldArray.forEach(field => {
          updates[field] = response.data;
        });
        store.$patch(updates)
      };
      return response.data;

    } catch (error) {
      console.log("api callエラー",error)
      if (store){store.$patch({ error: true})}
      throw error
    }finally{
      if (store&&loading){store.$patch({ loading: false})}
    }
  }
}