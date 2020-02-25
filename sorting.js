const ARRAY_SIZE = 200;
let COMPARISIONS = 0;
let SWAPS = 0;

async function bubbleSort(array) {
  for (let i = 0; i < ARRAY_SIZE; i++) {
    for (let j = 1; j < ARRAY_SIZE - i; j++) {
      if (array[j - 1].value > array[j].value) {
        const [temp1, temp2] = swapValue(array, j - 1, j);
        await swapBar(temp1, temp2, j - 1, j);
      }
      updateComparisions();
    }
  }
  await runThorough();
}

async function quickSort(array, low, high) {
  if (low >= high) return;

  const pivotIndex = await partition(array, low, high);
  await Promise.all([
    quickSort(array, low, pivotIndex),
    quickSort(array, pivotIndex + 1, high)
  ]);
}

async function partition(array, low, high) {
  const pivotIndex = array[low].value;
  let i = low - 1;
  let j = high + 1;
  while (true) {
    do {
      i++;
      updateComparisions();
    } while (array[i].value < pivotIndex);
    do {
      j--;
      updateComparisions();
    } while (array[j].value > pivotIndex);
    if (i >= j) {
      return j;
    }
    const [temp1, temp2] = swapValue(array, i, j);
    await swapBar(temp1, temp2, i, j);
  }
}

async function selectionSort(array) {
  for (let i = 0; i < ARRAY_SIZE; i++) {
    let maxIndex = i;
    for (let j = i; j < ARRAY_SIZE; j++) {
      if (array[j].value < array[maxIndex].value) {
        maxIndex = j;
      }
      updateComparisions();
    }
    const [temp1, temp2] = swapValue(array, i, maxIndex);
    await swapBar(temp1, temp2, i, maxIndex);
  }
  await runThorough();
}

async function insertionSort(array) {
  let i = 1;
  while (i < array.length) {
    let j = i;
    while (j > 0 && array[j - 1].value > array[j].value) {
      updateComparisions();
      const [temp1, temp2] = swapValue(array, j - 1, j);
      await swapBar(temp1, temp2, j - 1, j);
      j--;
    }
    i++;
  }
  await runThorough();
}

// async function heapSort(array, n) {
//   for (let i = n; i >= 0; i--) heapify(array, n, i);
//   for (let i = n - 1; i > 0; i--) {
//     const [temp1, temp2] = swapValue(array, 0, i);
//     await swapBar(temp1, temp2, 0, i);
//     heapify(array, i, 0);
//   }
//   await runThorough();
// }

// async function heapify(array, n, i) {
//   let largest = i;
//   let l = 2 * i + 1;
//   let r = 2 * i + 2;
//   if (l < n && array[i].value < array[largest].value) largest = l;
//   if (r < n && array[largest].value < array[r].value) largest = r;
//   if (largest !== i) {
//     const [temp1, temp2] = swapValue(array, i, largest);
//     await swapBar(temp1, temp2, i, largest);
//     heapify(array, n, largest);
//   }
// }

async function heapSort(array, n) {
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) await heapify(array, n, i);
  for (let i = n - 1; i >= 0; i--) {
    const [temp1, temp2] = swapValue(array, 0, i);
    await swapBar(temp1, temp2, 0, i);
    await heapify(array, i, 0);
  }
  await runThorough();
}

async function heapify(array, n, i) {
  let largest = i;
  let l = 2 * i + 1;
  let r = 2 * i + 2;
  if (l < n && array[l].value > array[largest].value) {
    largest = l;
    updateComparisions();
  }
  if (r < n && array[largest].value < array[r].value) {
    largest = r;
    updateComparisions();
  }
  if (largest !== i) {
    const [temp1, temp2] = swapValue(array, i, largest);
    await swapBar(temp1, temp2, i, largest);
    await heapify(array, n, largest);
  }
}

async function mergeSort(array, l, r) {
  if (l < r) {
    let m = Math.floor((l + r) / 2);
    await mergeSort(array, l, m);
    await mergeSort(array, m + 1, r);
    await merge(array, l, m, r);
  }
}

async function merge(array, l, m, r) {
  // create a temp array
  let temp = [];
  // crawlers for both intervals and for temp
  let i = l,
    j = m + 1,
    k = 0;

  // traverse both arrays and in each iteration add smaller of both elements in temp
  while (i <= m && j <= r) {
    if (array[i].value <= array[j].value) {
      temp.push(array[i]);
      i += 1;
    } else {
      temp.push(array[j]);
      j += 1;
    }
    k += 1;
  }

  while (i <= m) {
    temp.push(array[i]);
    i += 1;
    k += 1;
  }

  while (j <= r) {
    temp.push(array[j]);
    j += 1;
    k += 1;
  }

  for (i = l; i <= r; i++) {
    temp1 = array[i].value;
    array[i] = temp[i - l];
    temp2 = array[i].value;
    await swapBar(temp1, temp2, i, i - l);
  }
}

async function bogoSort(array) {
  while (true) await shuffle(array);
}

async function shuffle(array) {
  const i = Math.floor(Math.random() * ARRAY_SIZE);
  const j = Math.floor(Math.random() * ARRAY_SIZE);
  const [temp1, temp2] = swapValue(array, i, j);
  await swapBar(temp1, temp2, i, j);
}

async function swapBar(temp1, temp2, i, j) {
  let bar1 = document.querySelector(`#_${i}`);
  let bar2 = document.querySelector(`#_${j}`);
  bar1.style.background = "red";
  bar2.style.background = "green";
  await sleep(10);
  bar1.style.height = `${temp2}px`;
  bar2.style.height = `${temp1}px`;
  bar1.style.background = "pink";
  bar2.style.background = "pink";
  await sleep(10);
}

function swapValue(array, i, j) {
  const temp1 = { ...array[i] };
  const temp2 = { ...array[j] };
  array[i] = temp2;
  array[j] = temp1;
  let swaps = document.querySelector("#swaps");
  swaps.innerHTML = `Swaps: ${++SWAPS}`;
  return [temp1.value, temp2.value];
}

function updateComparisions() {
  let comp = document.querySelector("#comparisions");
  comp.innerHTML = `Comparisions: ${++COMPARISIONS}`;
}

async function runThorough() {
  for (let i = 0; i < ARRAY_SIZE; i++) {
    let bar = document.querySelector(`#_${i}`);
    bar.style.background = "red";
    await sleep(1);
    bar.style.background = "green";
  }
}

function getArray() {
  let random = [];
  for (let i = 0; i < ARRAY_SIZE; i++) {
    random.push({ index: i, value: Math.round(Math.random() * 500 + 100) });
  }
  return random;
}

function displayBars(array) {
  content = document.querySelector("#content");
  content.innerHTML = "";
  for (let i = 0; i < ARRAY_SIZE; i++) {
    bar = document.createElement("div");
    bar.id = `_${i}`;
    bar.style.height = array[i].value + "px";
    bar.classList.add("bar");
    content.appendChild(bar);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

$("#generate").click(() => {
  location.reload();
});

$("#quicksort").click(async () => {
  await quickSort(array, 0, array.length - 1);
  runThorough();
});

$("#bubblesort").click(() => {
  bubbleSort(array);
});

$("#selectionsort").click(() => {
  selectionSort(array);
});

$("#insertionsort").click(() => {
  insertionSort(array);
});

$("#heapsort").click(() => {
  heapSort(array, array.length);
});

$("#mergesort").click(() => {
  mergeSort(array, 0, array.length - 1);
  // mergeSort(array, 0, array.length - 1);
});
$("#bogosort").click(() => {
  bogoSort(array);
});

let array = getArray();
displayBars(array);
