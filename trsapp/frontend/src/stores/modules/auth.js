import { defineStore } from 'pinia'
import { supabase } from '../../lib/supabase';
import router from '../../router';
import { useUiStore } from './uiSetting';



export const useAuthStore = defineStore('auth',{
    
    state:() =>({
        //
        session: null
    }),
    actions: {

        async signUp(email,password,username){
            try{

                // supabaseの認証APIになげる
                const request_data = {
                    email: email,
                    password: password
                    ,options: {
                        data: {
                            username
                            }
                        }
                    
                }
                console.log("サインアップ実行", request_data)
                const {data, error} = await supabase.auth.signUp(request_data);
                //this.session = data.session
                this.session = {
                  id: data.user.id,
                  email: data.user.email,
                  is_anonymous: data.user.is_anonymous,
                  username: data.user.user_metadata.username
                }
                if(error) throw error;
                //新規登録成功
                //リダイレクト
                router.push({name: "confirmation"})
            } catch(err) {
                //エラー処理
                console.error('新規登録エラー:', err.message)
                throw err
            }
        },
        async login(email,password){
            try{
                // supabaseの認証APIになげる
                const request_data = {
                    email: email,
                    password: password
                }
                const {data, error} = await supabase.auth.signInWithPassword(request_data);
                if(error) throw error;
                
                //セッションに追加
                //this.session = data.session;
                this.session = {
                  id: data.user.id,
                  email: data.user.email,
                  is_anonymous: data.user.is_anonymous,
                  username: data.user.user_metadata.username
                }
                //イベントページに遷移
                router.replace({name: "events"});

            } catch(err) {
                //エラー処理
                console.log('ログインエラー', err.message)
                throw err
            }
        },
        async logout(){
            try{
                const { error } = await supabase.auth.signOut();
                this.session = null;
                console.log("成功",error)
                useUiStore().showMessage("ログアウトしました","success")
                router.replace({name: "login"});
            }catch(error){
                console.log("失敗",error);
                useUiStore().showMessage("ログアウトに失敗しました","error")
                throw error
            }
        },
        async getSession(){
          try {
            const {data, error} = await supabase.auth.getUser();
            if(error) throw error;
            this.session = {
              id: data.user.id,
              email: data.user.email,
              is_anonymous: data.user.is_anonymous,
              username: data.user.user_metadata.username
            }
          }catch(error){
            console.log(error)
            throw error
          }
        }
    }
});