<template>
  <div class="Main">
    <img :src="img1"> 
    <h1 id="Logofont">KEY득KEY득</h1>
  </div>
</template>
<script>
export default {
  data: ()=>{
    return{
      img : require('@/assets/image/Logo.png'),
      img1 : require('@/assets/image/로고1(블랙).png')
    }
  }
}
</script>
<style>
@media screen and (max-width:1920px) {
  .Main{width:1920px; height:1080px;background:rgba(165,0,52,1);text-align: center; }
  #Logofont{color:rgba(255,255,255,1)}
  }
</style>
