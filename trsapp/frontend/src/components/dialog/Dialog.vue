<script setup>
import { ref, reactive, computed } from 'vue';
import { dialogTypes } from '../../composables/useDialog';
import { useValidationRules } from '../../composables/useValidationRules';

const props = defineProps(['dialog'])
const currentDialog = dialogTypes[props.dialog] || {};
const currentParams = currentDialog.params || {};
const {validateRules} = useValidationRules();

// フォームの値を管理するためのオブジェクト
const formValues = reactive({});
// 初期値の設定
for (const key in currentParams) {
  formValues[key] = '';
}

//バリデーション確認のオブジェクト
const formValidates = reactive({});
// 初期値の設定
for (const key in currentParams) {
    formValidates[key] = computed(() => {
        const results = currentParams[key].validators.map(func => func(formValues[key]))
        return results.every((r) => r == true || false)
        //return currentParams[key].validators.map(func => func(formValues[key]))
    })
}


</script>
<template>
<v-card
    class="ma-4 pa-4"
    :title="currentDialog.title">
    <v-form
    class="mx-4"
    v-for="(config, param) in currentParams"
    :key="param"
    >
        <v-text-field
        :label="config.label"
        v-model="formValues[param]"
        :type="config.type"
        :rules="config.validators"
        ></v-text-field>
    </v-form>
    <div>{{ formValidates }}</div>
    <v-btn
    color="primary"
    class="mb-8"
    size="large"
    block type="submit"
    @click="currentDialog.submit(formValues)"
    >登録する</v-btn>
</v-card>

</template>