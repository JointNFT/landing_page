<template>
<div>
  <v-container>
    <v-card class="mx-auto" max-width="600" min-height="400" color="blue">
        <v-card-text>
            Your position is {{this.$route.query.waitlist_spot}} and your referral code is {{this.$route.query.referral_code}}
        </v-card-text>
    </v-card>
  </v-container>
</div>
</template>

<script>
  export default {
    name: 'nextpage'
  }
</script>
