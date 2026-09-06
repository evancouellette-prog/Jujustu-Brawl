const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const {server,wss} = require('../server.js');

test('audio supports exact byte ranges, suffixes, HEAD and unsatisfiable seeks', async t => {
  await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
  t.after(() => new Promise(resolve => wss.close(() => server.close(resolve))));
  const data = fs.readFileSync(path.join(__dirname,'../assets/button-click.mp3'));
  const request = (range, method = 'GET') => new Promise((resolve,reject) => {
    const req = http.request({hostname:'127.0.0.1',port:server.address().port,path:'/assets/button-click.mp3?v=14',method,
      headers:range ? {Range:range} : {}}, res => {
      const chunks=[];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve({status:res.statusCode,headers:res.headers,body:Buffer.concat(chunks)}));
    });
    req.on('error',reject);req.end();
  });
  const full = await request();
  assert.equal(full.status,200);assert.equal(full.headers['accept-ranges'],'bytes');assert.deepEqual(full.body,data);
  for (const [range,start,end] of [['bytes=100-199',100,199],['bytes=100-',100,data.length-1],['bytes=-100',data.length-100,data.length-1],['bytes=0-999999',0,data.length-1]]) {
    const res=await request(range);
    assert.equal(res.status,206);
    assert.equal(res.headers['content-range'],`bytes ${start}-${end}/${data.length}`);
    assert.equal(Number(res.headers['content-length']),end-start+1);
    assert.deepEqual(res.body,data.subarray(start,end+1));
  }
  for (const range of [`bytes=${data.length}-`,'bytes=100-50','bytes=-0']) {
    const res=await request(range);
    assert.equal(res.status,416);assert.equal(res.headers['content-range'],`bytes */${data.length}`);assert.equal(res.body.length,0);
  }
  const head=await request(null,'HEAD');
  assert.equal(Number(head.headers['content-length']),data.length);assert.equal(head.body.length,0);
});
