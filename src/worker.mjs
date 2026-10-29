import {createRemoteJWKSet,jwtVerify} from 'jose';
import videos from './video-manifest.json' with {type:'json'};
import {handleApi} from './certs/api.mjs';
const jwksCache=new Map();
const privateHeaders={'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff','Cross-Origin-Resource-Policy':'same-origin','Referrer-Policy':'same-origin'};
function reply(body,status=200,type='text/plain; charset=utf-8'){return new Response(body,{status,headers:{...privateHeaders,'Content-Type':type}});}
function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
export async function identity(request,env){
 const domain=env.ACCESS_TEAM_DOMAIN,audience=env.ACCESS_AUD;
 if(!domain||!audience||!/^https:\/\/[a-z0-9-]+\.cloudflareaccess\.com$/.test(domain))return null;
 const token=request.headers.get('Cf-Access-Jwt-Assertion');if(!token)return null;
 let keys=jwksCache.get(domain);if(!keys){keys=createRemoteJWKSet(new URL(domain+'/cdn-cgi/access/certs'));jwksCache.set(domain,keys);}
 try{const {payload}=await jwtVerify(token,keys,{issuer:domain,audience,algorithms:['RS256']});
  if(typeof payload.email!=='string'||!payload.email.includes('@'))return null;
  return {email:payload.email.toLowerCase(),admin:payload.email.toLowerCase()===env.HANDBOOK_OWNER_EMAIL?.toLowerCase()};
 }catch{return null;}
}
export function parseRange(range,size){
 if(!range)return {start:0,end:size-1,status:200};
 const m=/^bytes=(\d*)-(\d*)$/.exec(range);if(!m||(!m[1]&&!m[2]))return null;
 let start=m[1]?Number(m[1]):Math.max(0,size-Number(m[2]));
 let end=m[1]&&m[2]?Math.min(size-1,Number(m[2])):size-1;
 if(!Number.isSafeInteger(start)||!Number.isSafeInteger(end)||start<0||start>=size||end<start)return null;
 return {start,end,status:206};
}
export async function serveVideo(request,env,video){
 const range=parseRange(request.headers.get('Range'),video.size);if(!range)return new Response(null,{status:416,headers:{...privateHeaders,'Content-Range':`bytes */${video.size}`}});
 if(range.status===206)range.end=Math.min(range.end,range.start+1024*1024-1);
 const {start,end,status}=range,headers={...privateHeaders,'Content-Type':'video/mp4','Accept-Ranges':'bytes','Content-Length':String(end-start+1)};
 if(status===206)headers['Content-Range']=`bytes ${start}-${end}/${video.size}`;
 if(request.method==='HEAD')return new Response(null,{status,headers});
 const parts=video.parts.filter(p=>p.start<=end&&p.start+p.size>start);let index=0,reader,skip=0,remaining=0;
 const stream=new ReadableStream({
  async pull(controller){try{
   while(true){if(reader){const next=await reader.read();if(!next.done){let bytes=next.value;if(skip){const n=Math.min(skip,bytes.length);skip-=n;bytes=bytes.subarray(n);}if(bytes.length&&remaining){const selected=bytes.subarray(0,remaining);remaining-=selected.length;controller.enqueue(selected);if(!remaining){await reader.cancel();reader.releaseLock();reader=null;}return;}continue;}reader.releaseLock();reader=null;}
    if(index>=parts.length){controller.close();return;}
    const part=parts[index++],localStart=Math.max(0,start-part.start),localEnd=Math.min(part.size-1,end-part.start);
    const response=await env.ASSETS.fetch(new Request(new URL(part.key,request.url),{headers:{Range:`bytes=${localStart}-${localEnd}`}}));
    if(![200,206].includes(response.status)||!response.body)throw new Error('Video asset unavailable: '+response.status);skip=response.status===206?0:localStart;remaining=localEnd-localStart+1;reader=response.body.getReader();
   }
  }catch(error){controller.error(error);}},async cancel(){await reader?.cancel();}
 });
 return new Response(stream,{status,headers});
}
async function asset(request,env,key){
 const result=await env.ASSETS.fetch(new Request(new URL(key,request.url),{method:request.method}));
 if(!result.ok)return reply('Not found',404);
 const headers=new Headers(result.headers);for(const [k,v]of Object.entries(privateHeaders))headers.set(k,v);
 headers.set('Content-Security-Policy',"frame-ancestors 'self'");
 return new Response(result.body,{status:result.status,headers});
}
export async function handle(request,env,user){
 const url=new URL(request.url),pathname=url.pathname;
 if(!user)return reply('Private team handbook. Sign in with an approved email through Cloudflare Access.',403);
 if(pathname.startsWith('/api/')&&!pathname.startsWith('/api/facilitator/'))return handleApi(request,env,user);
 if(!['GET','HEAD'].includes(request.method))return reply('Method not allowed',405);
 if(/^\/quiz\/[A-Z0-9]{1,6}$/.test(pathname))return asset(request,env,'/quiz.html');
 if(/^\/practical\/[A-Z0-9]{1,6}$/.test(pathname))return asset(request,env,'/practical.html');
 if(/^\/review\/[A-Z0-9]{1,6}$/.test(pathname))return asset(request,env,'/review.html');
 if(/^\/roleplay\/[A-Z0-9]{1,6}$/.test(pathname))return asset(request,env,'/roleplay.html');
 if(/^\/roleplay-run\/[A-Z0-9]{1,6}$/.test(pathname))return asset(request,env,'/roleplay-run.html');
 if(/^\/written\/[A-Z0-9]{1,6}$/.test(pathname))return asset(request,env,'/written.html');
 if(/^\/training\/[A-Z0-9]{1,6}$/.test(pathname))return asset(request,env,'/training.html');
 if(/^\/written-review\/[A-Z0-9]{1,6}$/.test(pathname))return asset(request,env,'/written-review.html');
 if(pathname==='/content/certs.js'||pathname==='/content/certs.css')return asset(request,env,pathname);
 if(pathname==='/')return reply(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Momence SDR Handbook</title><link rel="stylesheet" href="/app.css"></head><body><header class="account-bar"><a class="header-brand" href="/" aria-label="Momence SDR Handbook"><img src="/momence-logo.svg" alt="Momence"><span class="header-divider"></span><span class="header-title">SDR Handbook</span></a><nav>${user.admin?'<a class="access-link" href="/admin">Manage Access</a>':''}<a class="access-link" href="/cdn-cgi/access/logout" title="${escapeHtml(user.email)}">Sign Out</a></nav></header><iframe class="handbook-frame" allowfullscreen src="/content/handbook" title="Momence SDR Handbook"></iframe><script>if(location.hash)document.querySelector('.handbook-frame').src='/content/handbook'+location.hash;</script></body></html>`,200,'text/html; charset=utf-8');
 if(pathname==='/admin'){
  if(!user.admin)return reply('Admin only',403);
  return reply('<!doctype html><html lang="en"><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>Manage Handbook Access</title><link rel="stylesheet" href="/app.css"></head><body><main class="admin"><a href="/">← Back to Handbook</a><h1>Manage Access</h1><p>You manage approved emails in Cloudflare Access. SDRs only need the email code to open this handbook.</p><ol><li>Open Zero Trust → Access → Applications and select the handbook.</li><li>Edit its Allow policy to add or remove an exact email address.</li><li>When removing someone, also revoke their active session from the application’s Users list.</li></ol><a class="access-link" href="https://one.dash.cloudflare.com/" target="_blank" rel="noopener noreferrer">Open Cloudflare Access</a></main></body></html>',200,'text/html; charset=utf-8');
 }
 const notes=/^\/api\/facilitator\/(10|[1-9])$/.exec(pathname);
 if(notes){if(!user.admin)return reply('Admin only',403);const response=await env.ASSETS.fetch(new URL('/facilitator-notes.json',url));if(!response.ok)return reply('Not found',404);const data=await response.json();return reply(JSON.stringify({notes:data[notes[1]]||[]}),200,'application/json');}
 if(pathname==='/momence-logo.svg'||pathname==='/app.css'||pathname==='/cert-pages.css')return asset(request,env,pathname);
 if(pathname==='/content/handbook'||pathname==='/content/handbook.html')return asset(request,env,'/content/handbook.html');
 if(pathname==='/content/earnings-calculator.html'||/^\/content\/slides\/day-\d{2}-slide-\d{2}(-thumb)?\.jpg$/.test(pathname)||/^\/content\/resources\/[a-z0-9-]+\.pdf$/.test(pathname))return asset(request,env,pathname);
 const video=/^\/content\/videos\/([a-z0-9-]+\.mp4)$/.exec(pathname);
 if(video&&videos[video[1]])return serveVideo(request,env,videos[video[1]]);
 return reply('Not found',404);
}
export default {async fetch(request,env){return handle(request,env,await identity(request,env));}};
