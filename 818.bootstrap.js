"use strict";(self.webpackChunknama_document_sim=self.webpackChunknama_document_sim||[]).push([[818],{4818:(e,t,a)=>{a.r(t),a.d(t,{nama_graph_viz:()=>h});var s=a(729),r=a(7549);const h=class{constructor(e){(0,s.r)(this,e),this.graph=null,this.peer=void 0}handleOnChange(e){const t=e.detail.operations;if(e.detail.peer===this.peer){for(const e of t)this.addNode(e.authorName(),e.hash(),e.seqNum());for(const e of t)this.addEdge(e.hash(),e.previous());this.prune(e.detail.pruned),this.layout()}}addNode(e,t,a){0===this.graph.$(`#${t}`).length&&this.graph.add({group:"nodes",grabbable:!1,data:{label:`${e}_${a}`,id:t,isNew:!0},style:{"background-color":r.g[a%r.g.length]}})}addEdge(e,t){const a=this.graph.$(`#${e}`);for(const s of t){const t=this.graph.$(`#${s}`);if(0===t.length)return;if(0!==a.edgesWith(t).length)return;this.graph.add({group:"edges",data:{source:s,target:e}})}}prune(e){for(const t of e){if(0===this.graph.$(`#${t}`).length)continue;const e=this.graph.$(`#${t}`);this.graph.remove(e)}}layout(){this.graph.layout({name:"dagre",animate:!0,fit:!0,nodeDimensionsIncludeLabels:!0,animateFilter:function(e,t){return!e.data().isNew||(e.data("isNew",!1),!1)}}).run()}componentDidLoad(){let e=this.el.shadowRoot.querySelector("#document");this.graph=(0,r.i)(e)}render(){return(0,s.h)(s.H,{key:"b6f47e48887040484cfcd1f39c7b518a0b06fbee"},(0,s.h)("div",{key:"9a4e06f46578f83c3599798510e6d1d2884f7ea8",id:"document"}))}get el(){return(0,s.g)(this)}};h.style=":host{display:block}#document{height:100%;width:100%}"}}]);