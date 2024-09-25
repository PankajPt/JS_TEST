let createCounter = function (init) {
    let n = init;
    return {
      increment: function () {
        return ++n;
      },
      reset: function () {
        return (n = init);
      },
      decrement: function () {
        return --n;
      },
    };
  };
  let counter = createCounter(5);
  console.log(counter.increment());
  console.log(counter.reset());
  console.log(counter.decrement());
  