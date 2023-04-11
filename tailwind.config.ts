import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        cyan: "#00f1d8",
      },
      fontFamily: {
        main: ["Major Mono Display", 'ui-sans-serif', 'system-ui'],
      },
    },
  },
};
