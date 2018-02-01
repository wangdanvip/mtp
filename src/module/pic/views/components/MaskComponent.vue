<template>
	<div class="mask"></div>
</template>

<script>
</script>

<style>
	.mask {
        position: fixed;
        height: 100vh;
        width: 100vw;
        left: 0;
        top: 0;
        background-color: rgb(128, 128, 128);
        filter:alpha(opacity=70);
        -moz-opacity:0.7;
        opacity:0.7;
        z-index: 99;
    }
</style>