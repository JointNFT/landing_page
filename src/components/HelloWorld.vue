<template>
<div>
  <v-container>
    <v-card class="mx-auto" max-width="1100" min-height="600" color="#f0f8ff" style="border-radius:50px">
    <v-row class = "pl-12 ml-10 pt-10">
      <v-card-text style="font-size:2.2em; font-weight: bold;">
        Being early is rewarding
      </v-card-text>
    </v-row>
    <v-row class = "pl-10 ml-10 pt-6">
      <v-card-text style="font-size:5em; font-weight:bold;">
        Get early access
      </v-card-text>
    </v-row>
    <v-row class = "pl-16 ml-10">
      <v-form
        class="pa-0 pt-16"
      >
        <v-text-field
          v-model="email"
          style="width:400px; border-radius:10px;"
          outlined
          filled
          color="deep-purple"
          label="Email address"
          solo
          type="email"
        ></v-text-field>

        <v-text-field
          v-model="phone"
          style="width:400px; border-radius:10px;"
          outlined
          filled
          color="deep-purple"
          label="Phone number"
          solo
        >
          <template v-slot:prepend>
            <vue-country-code style="margin-top:-12px; height:56px; width:60px; background:white; border-radius:10px;"
              @onSelect="onSelect"
              :defaultCountry="'in'"
              :preferredCountries="['in', 'us', 'gb']">
            </vue-country-code>      
          </template>

        </v-text-field>
      </v-form>
      </v-row>
      <v-row class = "pl-14 ml-10">
      <v-card-actions>
        <v-btn
          @click = "submit"
          style="border-radius:10px; text-transform: none"
          x-large
          height="60px"
          width="400"
          class="white--text"
          color="black accent-4"
          depressed
        >
          Continue
        </v-btn>
      </v-card-actions>
      </v-row>
    </v-card>
  </v-container>
</div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data: () => ({
        phone: "",
        email: ""
    }),
    methods: {
    submit() {
      // console.log(this.email, this.phone);
      // alert("wait");
      this.$store
        .dispatch("postEntry", {
          phone: this.phone,
          email: this.email,
          referrer: this.$route.params.id
        })
        .then(() => {
          // console.log(this.$route.params.id)
          this.$router.push({ path: "/next" });
        });
      // alert("wait");
    },
    onSelect({name, iso2, dialCode}) {
      console.log(name, iso2, dialCode);
      },
    }
  }
</script>

<style>
  .v-text-field input {
    font-size: 1.45em;
  }
  .v-text-field label {
    font-size: 1.45em;
  }
</style>
