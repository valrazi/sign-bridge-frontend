const initialState = {
  count: 0,
};

export const useCounterStore = defineStore("counter", {
  state: () => initialState,
  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
    reset() {
      this.count = initialState.count;
    },
  },
});
