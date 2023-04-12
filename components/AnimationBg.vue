<template>
 <div class="fixed w-full h-full -z-10">
    <canvas ref="canvasElement" class=" bg-blend-screen"></canvas>
    <span class="absolute z-0 w-2/3 bottom-1/3 right-0 h-40 blur-[100px] opacity-20 bg-[#00F1D8] rounded-[50%]"></span>
    <span class="absolute z-0 w-20 bottom-1/4 top-0 right-1/4 blur-[100px] opacity-20 bg-[#0099f1] rounded-[50%] -rotate-45"></span>
 </div>
</template>

<script setup lang="ts">

const canvasElement: Ref<HTMLCanvasElement | null> = ref(null)

onMounted(()=>{
    if (canvasElement.value) {
        initAnimation(canvasElement.value)
    }
})
</script>

<style>

</style>