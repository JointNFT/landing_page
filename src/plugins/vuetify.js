import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#1A1C22',
          secondary: '#3D3A50',
          accent: '#580EF6',
          plain: '#F7F7F7',
          error: '#b71c1c',
        },
      },
    },
});
