<script setup>
import { ref } from 'vue'
import EventList from '../components/dashboard/EventList.vue';
import EventDetail from '../components/dashboard/EventDetail.vue';

const childComponent = ref('list')

function switchView(){
  if (childComponent.value == 'list'){
    childComponent.value = 'detail'
    console.log(childComponent.value)
  } else {
    childComponent.value = 'list'
    console.log(childComponent.value)
  }
}

//子コンポーネントからのイベントをハンドリングする
const changeComp = (compName) => {
  childComponent.value = compName;
};

</script>

<template>
  <v-btn @click="switchView">テスト</v-btn>
  <div>{{ childComponent == 'list' }}</div>
  <div >{{ childComponent }}</div>
  <EventList v-if="childComponent=='list'" @toDashboard="changeComp"></EventList>
  <EventDetail v-else-if="childComponent=='detail'"></EventDetail>
</template>