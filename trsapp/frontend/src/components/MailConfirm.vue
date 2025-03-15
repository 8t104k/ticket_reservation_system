<script setup>

</script>
<template>
    <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12">
          <v-card-title class="text-center">
            メール確認のお願い
          </v-card-title>
          <v-card-text class="text-center">
            <v-icon size="64" color="primary" class="mb-4">mdi-email-check</v-icon>
            <p>登録いただいたメールアドレスに確認メールを送信しました！</p>
            <p>メール内のリンクをクリックして、登録を完了させてください。</p>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="primary" to="/login">
              ログイン画面に戻る
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>