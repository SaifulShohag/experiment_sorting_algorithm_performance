var worker = new Worker("/web-worker/bucketSort/bucketSortWorker.js");

let startMemory, start;

function onPressedExecute() {
  (async () => {
    if (!("gpu" in navigator) || typeof arrayData[dataType][0] == 'string') {
      console.log(
        "WebGPU is not supported. Enable chrome://flags/#enable-unsafe-webgpu flag."
      );

      startMemory = performance.memory.usedJSHeapSize;
      start = window.performance.now();
      worker.postMessage(arrayData[dataType]);
      return;
    }
  
    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) {
      console.log("Failed to get GPU adapter.");
      return;
    }
    const device = await adapter.requestDevice();
  
    const nArray = new Int32Array(arrayData[dataType]);
    
    const gpuBufferNArray = device.createBuffer({
      mappedAtCreation: true,
      size: nArray.byteLength,
      usage: GPUBufferUsage.MAP_WRITE | GPUBufferUsage.COPY_SRC,
    });
    const arrayBufferNArray = gpuBufferNArray.getMappedRange();
    new Int32Array(arrayBufferNArray).set(arrayData[dataType]);

    const processedArray = new Int32Array(arrayBufferNArray);
  
    startMemory = performance.memory.usedJSHeapSize;
    start = window.performance.now();
    worker.postMessage(processedArray);
  
  })();
}

// Listen for messages from the worker
worker.onmessage = function (e) {
  var sorted = e.data;

  let end = window.performance.now();
  const endMemory = performance.memory.usedJSHeapSize;
  
  const memoryUsed = Math.abs(endMemory - startMemory);
  let time = Math.floor(end - start);

  document.querySelector('.resultDiv').style.display = 'block';
  document.querySelector('.exTime').innerHTML = time;
  document.querySelector('.memoryUsages').innerHTML = memoryUsed / Math.pow(1000, 2);
  document.querySelector('.sortedArrayEl').innerHTML = typeof sorted[0] === 'object' ? 
      JSON.stringify(sorted.slice(0, 1000)).replace(/\[|]/g, '')+'....' 
          : sorted.slice(0, 1000).toString()+'....';
};