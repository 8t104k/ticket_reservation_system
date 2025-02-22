<template>
  <v-app>
    <v-app-bar app>
      <v-container>
        <router-link to="/" class="text-decoration-none">
          <v-btn variant="text">Home</v-btn>
        </router-link>
        <router-link to="/events" class="text-decoration-none">
          <v-btn variant="text">Events</v-btn>
        </router-link>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>