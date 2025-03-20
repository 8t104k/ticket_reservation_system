<script setup>
import { ref, reactive, computed } from 'vue';
import { dialogTypes } from '../../composables/useDialog';
import { eventParams } from '../../composables/useParams';

const props = defineProps(['dialog','store'])
const currentDialog = dialogTypes[props.dialog] || {};

//入力するパラメータ
const currentParams = Object.fromEntries(
  currentDialog.params.map(value => [value, eventParams[value]])
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
    @click="currentDialog.submit(formValues)"
    >登録する</v-btn>
</v-card>

</template>