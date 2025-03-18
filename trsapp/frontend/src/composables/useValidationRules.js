import { ref, computed, onMounted, watch } from 'vue'

export function useValidationRules(){
    const passwordRef = ref('')
    const emailRules = [
        v => !!v || 'メールアドレスは必須です',
        v => /.+@.+\..+/.test(v) || '有効なメールアドレスを入力してください',
        ]
    
    const passwordRules = [
        v => !!v || 'パスワードは必須です',
        v => v.length >= 8 || 'パスワードは8文字以上で入力してください',
        ]
    
    const confirmPasswordRules = computed(() =>[
            v => !!v || 'パスワード（確認）は必須です',
            v => v === passwordRef.value || 'パスワードが一致しません',
            ]
    )

    const validateRules = {
        required: v => !!v || '必須項目です',
    }

    return {
        emailRules,
        passwordRules,
        confirmPasswordRules,
        passwordRef,
        validateRules
    }
}