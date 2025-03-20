<script setup>
import { ref, reactive, computed } from 'vue';
import { useDialogActions } from '../../composables/useDialog';
import { params } from '../../composables/useParams.js';

const props = defineProps(['dialog','store','paramsName'])
const { dialogConfig, handleSubmit } = useDialogActions();
const onSubmit = (formData) => handleSubmit(props.dialog, formData);

const currentDialog = dialogConfig[props.dialog] || {};


//入力するパラメータ
const currentParams = Object.fromEntries(
  currentDialog.fields.map(value => [value, params[currentDialog.paramsKey][value]])
);

// フォームの値を管理するためのオブジェクト
const formValues = reactive({});
// 初期値の設定
for (const key in currentParams) {
    formValues[key] = props.store ? props.store[key] : "";
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
        >
    </v-text-field>
    </v-form>
    <v-btn
    color="primary"
    class="mb-8"
    size="large"
    block type="submit"
    @click="onSubmit(formValues)"
    >登録する</v-btn>
</v-card>

</template>