<template>
  <section>
    <header>
      <h1>¡Bienvenido!</h1>
    </header>
    <div>
      <p>Esta es una aplicación simple para guardar los links a tus sitios favoritos.</p>
      <p>
        <router-link to="/registrate">Creando un usuario</router-link> o 
        <router-link to="/ingresar">ingresando a tu cuenta</router-link>, 
        vas a poder acceder a la sección de <router-link to="/favoritos">favoritos</router-link>,
        desde la cual vas a poder administrar los links que quieras guardar.
      </p>
    </div>
  </section>
</template>
