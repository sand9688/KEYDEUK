<template>
  <div id ='App'>
    <!-- <div id = 'start' v-if="displayState">
      <div class="front_logo">
        <div class="login-form">
          <button @click.="chanGe"><h1>Start</h1> </button>
        </div>
      </div>
    </div> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name:'App',
  data(){
    return{
    displayState : true,
  }
  },
  methods:{
    chanGe(){
      this.displayState= false
      this.$router.push('/')
    }
  }

}

</script>

<style>
@import './views/common/css/default.css';
@media screen and (max-width:1920px) {
:root {
  --primary: #4ade80;
  --primary-alt: #22c55e;
  --grey: #64748b;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #f1f5f9;
  --sidebar-width: 12vw;
}

* {
  box-sizing: border-box;
  font-family: "Fira sans", sans-serif;
}

body {
  background: var(--light); margin: 0 auto;
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

.app {
  display: flex;
}
.app main {
  flex: 1 1 0;
}

.login-form {
      position : relative;
      top : 8.5rem;
      left : 5.5rem;
      font-family: 'Kanit', sans-serif
    }

}

h1{
      position: relative;
      top : 1rem;
      left: 3.5rem;
      color : white;
      font-size: 35px;
      /* font-family: 'Kanit', sans-serif; */     /* 폰트 종류  */
      margin-bottom: 10%;
    }
</style>