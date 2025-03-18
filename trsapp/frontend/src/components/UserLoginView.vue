<script setup>
import { ref, computed, onMounted, watch, inject } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useUiStore } from '../stores/uiSetting'
import router from '../router'
const route = useRoute()
const ui = useUiStore()

const email = ref()
const password = ref()
const visible = ref(false)
const loading = ref(false)
const isLogin = ref(true)

const authStore = useAuthStore();
const handleSubmit = async()=> {
    loading.value = true
    try {
        //ログイン処理
        await authStore.login(email.value,password.value)
        console.log('login success')
        ui.showMessage('ログインしました！','success')
        await router.push({name: 'events'})
    } catch(error) {
        console.log('login false')
        ui.showMessage('ログインに失敗しました','error')
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
    <v-btn
        color="primary"
        class="mb-8"
        size="large"
        @click="authStore.logout()"
        :loading="loading">
        ログアウト
    </v-btn>
</v-card>
</template>