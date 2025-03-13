<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useValidationRules } from '../composables/useValidationRules'
import { useAuthStore } from '../stores/auth'
const route = useRoute()
const {emailRules,passwordRules,confirmPasswordRules,passwordRef} = useValidationRules()

const email = ref('')
const username = ref('')
const confirmPassword = ref('')
const visible = ref(false)
const loading = ref(false)

//サインアップ
const authStore = useAuthStore()
const handleSignUp = async() =>{
    try{
        loading.true
        await authStore.signUp(email.value,passwordRef.value,username.value)
    } catch(error){
        console.error(error)
    } finally {
        loading.value = false
    }
}

//メールアドレスをUsernameにしてくれる
watch(email,newEmail => {
    if(newEmail){
        username.value = newEmail.split('@')[0]
    }
})
</script>

<template>

<v-card
class="mx-auto"
    elevation="2"
    max-width="448"
    rounded="lg"
>
    <v-toolbar color="primary" dark flat>
        <v-toolbar-title>新規ユーザー登録</v-toolbar-title>
    </v-toolbar>
    <v-container class=" pa-12 pb-8">
        <v-form>
        <!--メールアドレス入力欄-->
        <v-text-field
            v-model="email"
            :rules="emailRules"
            density="compact"
            label="メールアドレス"
            placeholder="~~~@gmail.com"
            prepend-inner-icon="mdi-email-outline"
            variant="underlined"
            required
        ></v-text-field>
        <!--ユーザー名入力欄-->
        <v-text-field
            v-model="username"
            density="compact"
            label="ユーザー名"
            placeholder="username1111"
            prepend-inner-icon="mdi-account-outline"
            variant="underlined"
            required
        ></v-text-field>
        <!--パスワード入力欄-->
        <v-text-field
            v-model="passwordRef"
            :rules="passwordRules"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye' "
            :type="visible ? 'text' : 'password' "
            density="compact"
            label="パスワード"
            prepend-inner-icon="mdi-lock-outline"
            variant="underlined"
            @click:append-inner="visible =!visible"
            hint="8文字以上の英数字を入力してください"
            required
        ></v-text-field>
        <!--パスワード確認用-->
        <v-text-field
            v-model="confirmPassword"
            :rules="confirmPasswordRules"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye' "
            :type="visible ? 'text' : 'password' "
            density="compact"
            label="パスワード"
            prepend-inner-icon="mdi-lock-outline"
            variant="underlined"
            @click:append-inner="visible =!visible"
            required
        ></v-text-field>
        <v-btn
            color="primary"
            class="mb-8"
            size="large"
            variant="outlined"
            block type="submit"
            :loading="loading"
            @click.prevent="handleSignUp">
            登録する
        </v-btn>
    </v-form>
    <v-card-text class="text-center">
        <router-link to="/login">既にアカウントをお持ちの方はこちら</router-link>
    </v-card-text>

    </v-container>

</v-card>
</template>