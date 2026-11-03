import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';
const root = resolve(import.meta.dirname, process.env.SITE_ROOT || '.');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.ttf':'font/ttf','.png':'image/png','.jpg':'image/jpeg','.json':'application/json; charset=utf-8','.txt':'text/plain; charset=utf-8'};
http.createServer(async(req,res)=>{
  let path;
  try { path = decodeURIComponent(new URL(req.url,'http://localhost').pathname); }
  catch { res.writeHead(400);res.end('Bad request');return; }
  if (path === '/uhs') { res.writeHead(302,{Location:'/uhs/'});res.end();return; }
  if (path.startsWith('/uhs/')) path = path.slice(4);
  const file = resolve(root, '.' + (path === '/' ? '/index.html' : path));
  if (!file.startsWith(root + '/') || !types[extname(file)]) {res.writeHead(404);res.end('Not found');return;}
  try {const body=await readFile(file);res.writeHead(200,{'Content-Type':types[extname(file)],'X-Content-Type-Options':'nosniff'});res.end(body);} catch {res.writeHead(404);res.end('Not found');}
}).listen(Number(process.env.PORT || 3000),'0.0.0.0',()=>console.log('Union High project running on port '+(process.env.PORT || 3000)));
