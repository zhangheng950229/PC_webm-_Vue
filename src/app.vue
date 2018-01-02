<template>
  <div id="misim-app">
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'misim-app',
}
</script>

<style>
body {
        /*background:#000;*/
        :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
          color: #999; opacity:1; 
        }

        ::-moz-placeholder { /* Mozilla Firefox 19+ */
            color: #999;opacity:1;
        }

        textarea:-ms-input-placeholder{
          color: #999;opacity:1;
          }

        textarea::-webkit-input-placeholder{
            color: #999;opacity:1;
        }
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Chrome/Safari/Opera */
        -khtml-user-select: none; /* Konqueror */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; 

}
#misim-app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
