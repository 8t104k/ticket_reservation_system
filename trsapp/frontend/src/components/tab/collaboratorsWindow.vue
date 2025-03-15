<script setup>
import { useFormatters } from '../../composables/useFormatters';
const format = useFormatters();
</script>
<template>
<v-card flat>
    <v-card-title>
        <v-text-field
        v-model="collaboratorSearch"
        append-icon="mdi-magnify"
        label="検索"
        single-line
        hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn color="success">
        <v-icon left>mdi-account-plus</v-icon>
        共演者追加
        </v-btn>
    </v-card-title>

    <!-- 共演者データのローディング/エラー表示 -->
    <div v-if="loadingCollaborators" class="text-center pa-4">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
        <div class="mt-2">共演者データを読み込み中...</div>
    </div>

    <v-alert v-else-if="collaboratorsError" type="error" class="ma-4">
        {{ collaboratorsErrorMessage }}
        <v-btn text color="error" @click="fetchCollaborators(route.params.token, true)">再読み込み</v-btn>
    </v-alert>

    <v-list v-else two-line>
        <v-list-item
        v-for="(person, index) in filteredCollaborators"
        :key="index"
        >
        <v-list-item-avatar>
            <v-avatar color="primary">
            <span class="white--text">{{ person.name ? person.name.charAt(0) : '?' }}</span>
            </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title>{{ person.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ person.role || '役割なし' }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
            <v-btn icon>
            <v-icon color="grey lighten-1">mdi-information</v-icon>
            </v-btn>
        </v-list-item-action>
        </v-list-item>
    </v-list>
</v-card>
</template>