<template>
    <v-container>
        <v-card class="mx-auto, info"   style="border-radius:50px; margin-top:5%"  >
            <v-row class = "pl-12 ml-10 pt-10">
                <v-card-text style="font-size:2.2em; font-weight: bold;">
                   FAQs
                </v-card-text>
            </v-row>
            <v-card-text>
            <v-row justify="center">
                <v-card-text style="font-size:1.2em; font-weight: bold;">
                   <v-expansion-panels  style="border-radius:25px" >
                       <v-expansion-panel
                          v-for="(item,i) in 5" :key="i">
                           <v-expansion-panel-header class="secondary">Question</v-expansion-panel-header>
                           <v-expansion-panel-content class="secondary">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                           </v-expansion-panel-content>
                       </v-expansion-panel>
                   </v-expansion-panels>
                   
                </v-card-text>
            </v-row>
            </v-card-text>
        </v-card>
    </v-container>
</template><!--
<template>
  <v-row justify="center">
    <v-expansion-panels accordion>
      <v-expansion-panel
        v-for="(item,i) in 5"
        :key="i"
      >
        <v-expansion-panel-header>Item</v-expansion-panel-header>
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>-->
<script>
export default {
    data:()=>({
        isOpen:false,
    }),
}
</script>