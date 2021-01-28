var Usuarios = {
  template: `
  <div>
    <div v-if="!cargando" class="row" v-for="usuario in usuarios" :key="usuario.id">
      <div>{{usuario.id}}</div>
      <div>{{usuario.username}}</div>
      <div>{{usuario.score}}</div>
      <div>{{usuario.created}}</div>
    </div>
    <div v-if="cargando" class="cargando">Cargando usuarios.</div>
  </div>
  `,
  data () {
    return {
      usuarios: [],
      cargando: true
    }
  },
  created() {
    this.cargarUsuarios();
  },
  watch: {
    $route: "cargarUsuarios"
  },
  methods: {
    cargarUsuarios() {
      setTimeout(() => {
        fetch('http://localhost:3000/users')
          .then(response => response.json())
          .then(usuarios => {
            this.usuarios = usuarios;
            this.cargando = false;
          });
      }, 1000);
    }
  },
}

var Puntajes = {
  template: `
  <div>
    <div v-if="!cargando" class="row" v-for="(puntaje, index) in puntajes" :key="index">
      <div>{{puntaje.points}}</div>
      <div>{{puntaje.updated}}</div>
    </div>
    <div v-if="cargando" class="cargando">Cargando puntajes.</div>
  </div>
  `,
  data () {
    return {
      puntajes: [],
      cargando: true
    }
  },
  created() {
    this.cargarPuntajes();
  },
  watch: {
    $route: "cargarPuntajes"
  },
  methods: {
    cargarPuntajes() {
      setTimeout(() => {
        fetch('http://localhost:3000/scores')
          .then(response => response.json())
          .then(puntajes => {
            this.puntajes = puntajes;
            this.cargando = false;
          });
      }, 1000);
    }
  },
}

var routes = [
  { path: '/usuarios', component: Usuarios },
  { path: '/puntajes', component: Puntajes }
];

var router = new VueRouter({routes});

var app = new Vue({
  router,
  el: '#app',
  data: {
    appName: 'SPA Vue'
  }
});
