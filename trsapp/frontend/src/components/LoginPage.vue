<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../lib/supabase'

const route = useRoute()

const email = ref()
const password = ref()
const visible = ref(false)
const loading = ref(false)
const isLogin = ref(true)

const handleSubmit = async()=> {
    loading.value = true
    try {
        if(isLogin.value) {
        //ログイン処理
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value
        })
        if (error) throw error
        route.push('/UserProfile')
    }
    } catch(error) {
        alert(error.message)
    } finally {
        loading.value = false
    }
}

</script>

<template>
<v-card
class="mx-auto pa-12 pb-8"
    elevation="2"
    max-width="448"
    rounded="lg"
>
    <v-form @submit.prevent="handleSubmit">
        <!--メールアドレス入力欄-->
        <v-text-field
            v-model="email"
            density="compact"
            label="メールアドレス"
            placeholder="~~~@gmail.com"
            prepend-inner-icon="mdi-email-outline"
            variant="underlined"
        ></v-text-field>
        <!--パスワード入力欄-->
        <v-text-field
            v-model="password"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye' "
            :type="visible ? 'text' : 'password' "
            density="compact"
            label="パスワード"
            prepend-inner-icon="mdi-lock-outline"
            variant="underlined"
            @click:append-inner="visible =!visible"
        ></v-text-field>
        <v-btn
            color="primary"
            class="mb-8"
            size="large"
            variant="outlined"
            block type="submit"
            :loading="loading">
            ログイン
        </v-btn>
    </v-form>
    <v-card-text class="text-center">
        <router-link to="/signup">新規登録はこちら</router-link>
    </v-card-text>
</v-card>
</template>