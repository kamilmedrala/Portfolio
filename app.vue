<template>
  <div class="h-[300vh] relative ">
    <div class="fixed w-20 left-0 top-2/3 flex flex-col justify-end items-center">
      <div class="h-40 border-r border-white flex items-center">
        <span class=" block transform -rotate-90 uppercase text-white"> Scroll </span>      
      </div>
    </div>
    <div>
      
    </div>
    <ClientOnly>
      <AnimationBg />
    </ClientOnly>
    <CommonSectionWrapper class="relative py-40 md:py-80 h-screen min-h-min flex items-center">
      <CommonTextAnimated>
        <h1>Kamil Mędrala</h1>
      </CommonTextAnimated>
      <span class="absolute z-0 w-3/4 bottom-1/4 right-10 h-40 blur-[150px] opacity-20 bg-[#006cf1] rounded-[50%] rotate-6"></span>
      <span class="absolute z-0 w-20 bottom-0 top-0 right-1/4 blur-[100px] opacity-20 bg-[#00F1D8] rounded-[50%] -rotate-45"></span>
    </CommonSectionWrapper>
    <CommonSectionWrapper class="relative py-40 md:py-80 h-screen min-h-min flex items-center justify-end">
      <div class="md:w-1/2">
      <CommonTextAnimated>
        <h1>Tech stack</h1>
      </CommonTextAnimated>
      <span class="absolute z-0 w-2/3 bottom-0 h-40 left-20 blur-[150px] opacity-20 bg-[#006cf1] rounded-[50%] -rotate-6"></span>
      </div>
    </CommonSectionWrapper>

  </div>
</template>

<script setup lang="ts">

</script>
