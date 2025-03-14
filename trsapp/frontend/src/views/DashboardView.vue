<script setup>
import { ref } from 'vue'
import EventList from '../components/dashboard/EventList.vue';
import EventDetail from '../components/dashboard/EventDetail.vue';
import { useEventStore } from '../stores/event';

const childComponent = ref({
  'component': 'list' ,
  'transition': 'slide'
}
)

function switchView(){
  if (childComponent.value.component == 'list'){
    childComponent.value.component = 'detail'
    childComponent.value.transition = 'r-slide'
    console.log(childComponent.value.component)
  } else {
    childComponent.value.component = 'list'
    childComponent.value.transition = 'slide'
    console.log(childComponent.value.component)
  }
}

//子コンポーネントからのイベントをハンドリングする
const changeComp = (compName) => {
  childComponent.value.component = compName;
  childComponent.value.transition = childComponent.value.component == 'list' ? 'slide' : 'r-slide';
};

//paniaを利用
const eventStore = useEventStore();
</script>

<template>
  <!-- デバッグよう -->
  <v-btn @click="switchView">テスト</v-btn>
  <div>{{ childComponent == 'list' }}</div>
  <div >子コンポーネント：{{ childComponent }}</div>
  <div> event store: {{ eventStore.event_details }}</div>

  <Transition :name="childComponent.transition" mode="out-in">
    <EventList v-if="childComponent.component=='list'" @toDashboard="changeComp"></EventList>
    <EventDetail v-else-if="childComponent.component=='detail'"></EventDetail>
  </Transition>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
}

.slide-enter-from {
  transform: translateX(-100%); /* 右から入ってくる */
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(100%); /* 左に消えていく */
  opacity: 0;
}

.r-slide-enter-active,
.r-slide-leave-active {
  transition: all 0.2s ease;
}

.r-slide-enter-from {
  transform: translateX(100%); /* 左から入ってくる */
  opacity: 0;
}

.r-slide-leave-to {
  transform: translateX(-100%); /* 右に消えていく */
  opacity: 0;
}
</style>