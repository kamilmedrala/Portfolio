<template>
  <div v-show="isMounted" ref="textContainer" :class="{ prose: defaultStyles }">
    <slot> </slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  defaultStyles: { type: Boolean, default: true },
});

const isMounted: Ref<Boolean> = ref(false);
const textContainer: Ref = ref(null);

function switchingLetters(letterEl: HTMLSpanElement, finalLetter: string) {
  if (finalLetter == " ") {
    letterEl.innerText = " ";
    return;
  }
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      let letter = i != 9 ? String.fromCharCode(0 | (Math.random() * 26 + 97)) : finalLetter;
      letterEl.innerText = letter;
    }, 20 * i);
  }
}

function writeLetters() {
  const textEl: HTMLElement = textContainer.value?.children[0];

  if (textEl) {
    const fullString = textEl.innerText;

    textEl.innerHTML = "";

    let delay = 0;
    for (let i = 0; i < fullString.length; i++) {
      if (fullString[i] !== " ") {
        delay = delay + 100;
      }
      let letterEl = document.createElement("span");
      textEl.appendChild(letterEl);
      letterEl.addEventListener('mouseover',() => switchingLetters(letterEl, fullString[i]))
      setTimeout(() => {
        switchingLetters(letterEl, fullString[i]);
      }, delay);
    }
  }
}

onMounted(() => {
  isMounted.value = true;
  writeLetters();
});
</script>

<style scoped>
.prose:deep(h1, h2, h3, h4, h5, h6) {
  @apply font-main text-white;
}

.prose:deep(h1) {
  @apply text-5xl md:text-6xl;
}
</style>
