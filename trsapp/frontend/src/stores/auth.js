import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '../lib/supabase'
import router from '../router';

export const useAuthStore = defineStore('auth',{
    state:() =>({
        //
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        async testSupabaseConnection() {
            try {
              // 単純なテスト - 例えばバージョン情報の取得など
              const { data, error } = await supabase.from('_supabase_version')
                .select('*').limit(1);
              
              if (error) {
                console.error('Supabase接続テストエラー:', error);
                return { success: false, error };
              }
              
              console.log('Supabase接続テスト成功:', data);
              return { success: true, data };
            } catch (err) {
              console.error('Supabase接続例外:', err);
              return { success: false, error: err };
            }
          },
        
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

                if(error) throw error;
                //新規登録成功
                this.user = data.user;
                localStorage.setItem('user',JSON.stringify(data.user))
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
                const user = await supabase.auth.signInWithPassword(email,password);
                //更新
                this.user = user;
                //
                localStorage.setItem('user',JSON.stringify(user));
                //redirect
                router.push(this.returnUrl || '/')
            } catch(err) {
                //エラー処理
                console.error('ログイン:', err.message)
                throw err
            }
        },
        logout(){
            this.user = null;
            router.push('login')
        }
    }
});