let chunks = [];
let size = 0;
res.on('data', chunk => {
  chunks.push(chunk);
  size += chunk.length;
});
res.on('end', () => {
  let buf = ArrayBuffer.concat(chunks, size);
  let str = iconv.decode(buf, 'utf-8');
  console.log(str);
})