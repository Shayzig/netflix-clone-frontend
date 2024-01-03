import{r as p,t as h,u as o,v as g,w as d,h as P,j as n,l as c,D as j}from"./index-6a53f99a.js";import{H as f}from"./vidstack-HAbxB-FO-e85bc408.js";import"./vidstack-UK1DzmJ--acb29b7a.js";class k{constructor(t,e){this.Ca=t,this.kg=e,t.textTracks.onaddtrack=this.Ia.bind(this),d(this.sj.bind(this))}Ia(t){const e=t.track;if(!e||C(this.Ca,e))return;const i=new P({id:e.id,kind:e.kind,label:e.label,language:e.language,type:"vtt"});i[n._a]={track:e},i[n.Sa]=2,i[n.Ma]=!0;let s=0;const u=l=>{if(e.cues)for(let a=s;a<e.cues.length;a++)i.addCue(e.cues[a],l),s++};u(t),e.oncuechange=u,this.kg.textTracks.add(i,t),i.setMode(e.mode,t)}sj(){var t;this.Ca.textTracks.onaddtrack=null;for(const e of this.kg.textTracks){const i=(t=e[n._a])==null?void 0:t.track;i!=null&&i.oncuechange&&(i.oncuechange=null)}}}function C(r,t){return Array.from(r.children).find(e=>e.track===t)}class b{constructor(t,e){this.Ca=t,this.Ga=e,this.ra=(i,s)=>{this.Ga.delegate.Pb("picture-in-picture-change",i,s)},c(this.Ca,"enterpictureinpicture",this.qj.bind(this)),c(this.Ca,"leavepictureinpicture",this.rj.bind(this))}get active(){return document.pictureInPictureElement===this.Ca}get supported(){return o(this.Ca)}async enter(){return this.Ca.requestPictureInPicture()}exit(){return document.exitPictureInPicture()}qj(t){this.ra(!0,t)}rj(t){this.ra(!1,t)}}class v{constructor(t,e){this.Ca=t,this.Ga=e,this.Wa="inline",c(this.Ca,"webkitpresentationmodechanged",this.eb.bind(this))}get vj(){return h(this.Ca)}async uj(t){this.Wa!==t&&this.Ca.webkitSetPresentationMode(t)}eb(t){var i;const e=this.Wa;this.Wa=this.Ca.webkitPresentationMode,(i=this.Ga.player)==null||i.dispatch(new j("video-presentation-change",{detail:this.Wa,trigger:t})),["fullscreen","picture-in-picture"].forEach(s=>{(this.Wa===s||e===s)&&this.Ga.delegate.Pb(`${s}-change`,this.Wa===s,t)})}}class T{constructor(t){this.tj=t}get active(){return this.tj.Wa==="fullscreen"}get supported(){return this.tj.vj}async enter(){this.tj.uj("fullscreen")}async exit(){this.tj.uj("inline")}}class I{constructor(t){this.tj=t}get active(){return this.tj.Wa==="picture-in-picture"}get supported(){return this.tj.vj}async enter(){this.tj.uj("picture-in-picture")}async exit(){this.tj.uj("inline")}}class y extends f{constructor(t,e){super(t),this.$$PROVIDER_TYPE="VIDEO",p(()=>{if(h(t)){const i=new v(t,e);this.fullscreen=new T(i),this.pictureInPicture=new I(i)}else o(t)&&(this.pictureInPicture=new b(t,e))},this.scope)}get type(){return"video"}setup(t){super.setup(t),g(this.video)&&new k(this.video,t),t.textRenderers.La(this.video),d(()=>{t.textRenderers.La(null)}),this.type==="video"&&t.delegate.Pb("provider-setup",this)}get video(){return this.Ga}}export{y as VideoProvider};
