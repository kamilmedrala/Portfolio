<template>
 <div class="fixed w-full h-full -z-10">
    <canvas ref="canvasElement" class=" bg-blend-screen"></canvas>
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