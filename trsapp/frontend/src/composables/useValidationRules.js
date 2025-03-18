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
        email: v => !v || /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v) || 'メールアドレスの形式が正しくありません',
        password: v => !v || /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v) || 'パスワードは8文字以上で、英字と数字を含む必要があります',
        url: v => !v || /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(v) || 'URLの形式が正しくありません',
        minLength: (min) => v => !v || v.length >= min || `${min}文字以上で入力してください`,
        maxLength: (max) => v => !v || v.length <= max || `${max}文字以下で入力してください`,
        numeric: v => !v || /^\d+$/.test(v) || '数字のみ入力可能です',
        phone: v => !v || /^0\d{1,4}-\d{1,4}-\d{4}$/.test(v) || '電話番号の形式が正しくありません',
        postcode: v => !v || /^\d{3}-\d{4}$/.test(v) || '郵便番号の形式が正しくありません',
        katakana: v => !v || /^[ァ-ヶー]*$/.test(v) || 'カタカナのみ入力可能です',
        match: (field, fieldName) => v => !v || v === field || `${fieldName}と一致しません`,
        date: v => !v || /^\d{4}-\d{2}-\d{2}$/.test(v) || '日付の形式が正しくありません（YYYY-MM-DD）',
        alphanumeric: v => !v || /^[A-Za-z0-9]+$/.test(v) || 'アルファベットと数字のみ入力可能です',
        alphabetOnly: v => !v || /^[A-Za-z]+$/.test(v) || 'アルファベットのみ入力可能です',
        numberOnly: v => !v || /^\d+$/.test(v) || '数字のみ入力可能です',
        alphanumericSymbol: v => !v || /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/.test(v) || '使用できない文字が含まれています'
    }

    return {
        emailRules,
        passwordRules,
        confirmPasswordRules,
        passwordRef,
        validateRules
    }
}