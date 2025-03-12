import { defineStore } from 'pinia'
import { ref, computed, inject } from 'vue'
import { supabase } from '../lib/supabase'
import router from '../router';

export const useAuthStore = defineStore('auth',{
    state:() =>({
        //
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
                //成功したら自動的にセッションが保存される
                if(error) throw error;
                //新規登録成功
                //リダイレクト
                router.push(this.returnUrl || '/confirmation')
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
                //セッションは自動的に保存
                if(error) throw error;
                //redirect
                //router.push(this.returnUrl || '/userprofile')
            } catch(err) {
                //エラー処理
                console.log('ログイン:', err.message)
                throw err
            }
        },
        logout(){
            this.user = null;
            router.push('login')
        }
    }
});