<!-- <template>
  <div class="container">
    <div class="title-bar">
      <div class="title prevent-select draggalbe">
        <button><img :src="Logo" alt="로고" id="LogoImg"></button>
      </div>
      <button id="Menubar">
        <i class="fas fa-align-justify"></i>
      </button>
      <div class="control prevent-select">
        <button id="min" :v-on:click="btnMin">
          <i class="fas fa-window-minimize"></i>
        </button>
        <button id="max" :v-on:click="btnMax">
          <i class="fas fa-window-maximize"></i>
        </button>
        <button id="close" :v-on:click="close">
          <i class="fa fa-window-close"></i>
        </button>
      </div>
    </div>
  </div>
  <hr>
</template>
<script>
export default {
  data: () => {
    return {
      Logo: require('@/assets/image/로고1(블랙).png'),
    }
  },
  methods: {
    btnMin:()=>{
      const {ipcRenderer} = require('electron');
      const ipc = ipcRenderer;q
      ipc.send('minimizeApp')
    },
    btnMax: ()=>{
      const {ipcRenderer} = require('electron');
      const ipc = ipcRenderer;
      ipc.send('maximizeApp');
    },
    close:()=>{
      const {ipcRenderer} = require('electron');
      const ipc = ipcRenderer;
      ipc.send('closeApp');
  },
  }
}
</script>
<style>
@media screen and (max-width:1920px) {

  .container {
    height: 100%;
    padding: 0;
    display: grid;
    grid-template-rows: auto 1fr;
  }

  .title {
    height: 1em;
    padding: 10px;
    display: inline-block;
  }

  .control {
    float: right;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    margin-top: 5px;
    margin-right: 5px;
    width: 100px;
  }

  .control button {
    padding: 5px;
    background: rgb(165, 0, 52);
    color: #ffffff;
    outline: 0;
    border: 0;
  }

  .title-bar {
    background: rgb(165, 0, 52);
    color: #ffffff;
    font-size: 20px;
    -webkit-app-region: drag;
  }

  .prevent-select {
    user-select: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
  }

  #Menubar {
    position: absolute;
    padding-top: 2px;
    width: 100px;
    font-size: xx-large;
    -webkit-app-region: no-drag;
  }

  #min,
  #max,
  #close {
    -webkit-app-region: no-drag;
  }

  #LogoImg {
    width: 50px;
    height: 32px;
    display: inline;
    -webkit-app-region: no-drag;
  }
}
</style> -->