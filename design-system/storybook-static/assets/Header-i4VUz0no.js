import{j as e,b as Q,c as Z,e as ee}from"./index-CHjcGL7e.js";import{useMDXComponents as q}from"./index-DVRRELxc.js";import{c as ne,u as re,P as t}from"./usePrefix-BO8COP8A.js";import{R as se}from"./index-CwcVQgaJ.js";import{a as h}from"./index-B-lxVbXh.js";import{a as ie,A as te}from"./arrow-up-CHGC8arN.js";import{M as ae}from"./minus-1LOLdMTb.js";import{P as oe}from"./plus-CjFCaarj.js";import{c as M}from"./createLucideIcon-J4rvsbg-.js";import{I as de}from"./IconButton-C8BMBA2O.js";/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const le=[["path",{d:"m21 16-4 4-4-4",key:"f6ql7i"}],["path",{d:"M17 20V4",key:"1ejh1v"}],["path",{d:"m3 8 4-4 4 4",key:"11wl7u"}],["path",{d:"M7 4v16",key:"1glfcx"}]],ce=M("arrow-up-down",le);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pe=[["path",{d:"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",key:"sc7q7i"}]],me=M("funnel",pe),O=["left","right"],f=["sm","md","lg"],g=["basic","condensed","lengthened","ascending","descending"],ue=["hover","onclick"],he={condensed:oe,lengthened:ae,ascending:te,descending:ie},i=se.forwardRef(function({children:n,alignment:B="left",size:L="sm",type:m="basic",filter:y=!1,forceState:x=null,onHeaderClick:E,onFilterClick:u,className:X,...U},G){const s=re(),j=m!=="basic"?he[m]:null,Y=m==="basic",J=ne(`${s}--header`,`${s}--header--${B}`,`${s}--header--${L}`,{[`${s}--header--force-hover`]:x==="hover",[`${s}--header--force-onclick`]:x==="onclick",[`${s}--header--filter-visible`]:y},X);return e.jsxs("div",{ref:G,className:J,role:"columnheader",onClick:E,...U,children:[e.jsxs("div",{className:`${s}--header__container`,children:[j&&e.jsx("span",{className:`${s}--header__type-icon ${s}--header__type-icon--${m}`,"aria-hidden":"true",children:e.jsx(j,{size:16})}),e.jsx("span",{className:`${s}--header__text`,children:n}),Y&&e.jsx("span",{className:`${s}--header__sort-indicator`,"aria-hidden":"true",children:e.jsx(ce,{size:16})})]}),y&&e.jsx("span",{className:`${s}--header__filter`,children:e.jsx(de,{kind:"ghost",size:"sm",iconSize:16,shape:"square",renderIcon:me,"aria-label":"Filter column",onClick:K=>{K.stopPropagation(),u==null||u()}})})]})});i.displayName="Header";i.propTypes={children:t.node.isRequired,alignment:t.oneOf(O),size:t.oneOf(f),type:t.oneOf(g),filter:t.bool,forceState:t.oneOf([...ue,null]),onHeaderClick:t.func,onFilterClick:t.func,className:t.string};i.__docgenInfo={description:"",methods:[],displayName:"Header",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"",type:{name:"node"}},alignment:{required:!1,tsType:{name:"unknown[number]",raw:"(typeof HeaderAlignments)[number]"},description:"",defaultValue:{value:"'left'",computed:!1},type:{name:"enum",value:[{value:"'left'",computed:!1},{value:"'right'",computed:!1}]}},size:{required:!1,tsType:{name:"unknown[number]",raw:"(typeof HeaderSizes)[number]"},description:"",defaultValue:{value:"'sm'",computed:!1},type:{name:"enum",value:[{value:"'sm'",computed:!1},{value:"'md'",computed:!1},{value:"'lg'",computed:!1}]}},type:{required:!1,tsType:{name:"unknown[number]",raw:"(typeof HeaderTypes)[number]"},description:"Column type. PANW extension — `condensed`/`lengthened` are PANW-specific\n(not in Carbon). They render an Add / Subtract icon next to the title.",defaultValue:{value:"'basic'",computed:!1},type:{name:"enum",value:[{value:"'basic'",computed:!1},{value:"'condensed'",computed:!1},{value:"'lengthened'",computed:!1},{value:"'ascending'",computed:!1},{value:"'descending'",computed:!1}]}},filter:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1},type:{name:"bool"}},forceState:{required:!1,tsType:{name:"union",raw:"HeaderForceState | null",elements:[{name:"unknown[number]",raw:"(typeof HeaderForceStates)[number]"},{name:"null"}]},description:"",defaultValue:{value:"null",computed:!1},type:{name:"enum",value:[{value:"'hover'",computed:!1},{value:"'onclick'",computed:!1},{value:"null",computed:!1}]}},onHeaderClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"",type:{name:"func"}},onFilterClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"",type:{name:"func"}},className:{description:"",type:{name:"string"},required:!1}},composes:["Omit"]};const fe={title:"Components/Header",component:i,argTypes:{alignment:{options:O,control:{type:"radio"}},size:{options:f,control:{type:"radio"}},type:{options:g,control:{type:"select"}},filter:{control:"boolean"},children:{control:"text"}},parameters:{docs:{page:V}},tags:["autodocs"]},a=r=>e.jsx("div",{style:{width:240},children:e.jsx(i,{...r,onHeaderClick:h("onHeaderClick"),onFilterClick:h("onFilterClick")})});a.args={children:"Column",alignment:"left",size:"sm",type:"basic",filter:!1};const d=()=>e.jsx("div",{style:{width:240},children:e.jsx(i,{filter:!0,onFilterClick:h("onFilterClick"),children:"Filterable"})}),l=()=>e.jsx("div",{style:{width:240},children:e.jsx(i,{type:"ascending",children:"Ascending"})}),c=()=>e.jsx("div",{style:{width:240},children:e.jsx(i,{type:"descending",children:"Descending"})}),p=()=>e.jsx("div",{style:{width:240},children:e.jsx(i,{alignment:"right",children:"Right-aligned"})}),o=()=>e.jsxs("div",{style:{padding:24,background:"#f9f9f9",display:"flex",flexDirection:"column",gap:16,width:320},children:[g.map(r=>e.jsxs("div",{children:[e.jsxs("h3",{style:{margin:"4px 0",fontSize:12,fontWeight:600},children:["type: ",r]}),f.map(n=>e.jsx(i,{type:r,size:n,children:`${r} / ${n}`},n))]},r)),e.jsxs("div",{children:[e.jsx("h3",{style:{margin:"4px 0",fontSize:12,fontWeight:600},children:"filter visible"}),e.jsx(i,{filter:!0,children:"Filterable"})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{margin:"4px 0",fontSize:12,fontWeight:600},children:"right aligned"}),e.jsx(i,{alignment:"right",children:"Right"})]})]});o.storyName="All Variants";o.parameters={controls:{disable:!0}};a.__docgenInfo={description:"",methods:[],displayName:"Default"};d.__docgenInfo={description:"",methods:[],displayName:"WithFilter"};l.__docgenInfo={description:"",methods:[],displayName:"Ascending"};c.__docgenInfo={description:"",methods:[],displayName:"Descending"};p.__docgenInfo={description:"",methods:[],displayName:"RightAligned"};o.__docgenInfo={description:"",methods:[],displayName:"AllVariants"};var b,H,_;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`args => <div style={{
  width: 240
}}>
    <Header {...args} onHeaderClick={action('onHeaderClick')} onFilterClick={action('onFilterClick')} />
  </div>`,...(_=(H=a.parameters)==null?void 0:H.docs)==null?void 0:_.source}}};var w,k,A;d.parameters={...d.parameters,docs:{...(w=d.parameters)==null?void 0:w.docs,source:{originalSource:`() => <div style={{
  width: 240
}}>
    <Header filter onFilterClick={action('onFilterClick')}>
      Filterable
    </Header>
  </div>`,...(A=(k=d.parameters)==null?void 0:k.docs)==null?void 0:A.source}}};var C,N,S;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`() => <div style={{
  width: 240
}}>
    <Header type="ascending">Ascending</Header>
  </div>`,...(S=(N=l.parameters)==null?void 0:N.docs)==null?void 0:S.source}}};var T,z,$;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`() => <div style={{
  width: 240
}}>
    <Header type="descending">Descending</Header>
  </div>`,...($=(z=c.parameters)==null?void 0:z.docs)==null?void 0:$.source}}};var F,I,D;p.parameters={...p.parameters,docs:{...(F=p.parameters)==null?void 0:F.docs,source:{originalSource:`() => <div style={{
  width: 240
}}>
    <Header alignment="right">Right-aligned</Header>
  </div>`,...(D=(I=p.parameters)==null?void 0:I.docs)==null?void 0:D.source}}};var P,R,W;o.parameters={...o.parameters,docs:{...(P=o.parameters)==null?void 0:P.docs,source:{originalSource:`() => <div style={{
  padding: 24,
  background: '#f9f9f9',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  width: 320
}}>
    {HeaderTypes.map(t => <div key={t}>
        <h3 style={{
      margin: '4px 0',
      fontSize: 12,
      fontWeight: 600
    }}>type: {t}</h3>
        {HeaderSizes.map(s => <Header key={s} type={t} size={s}>{\`\${t} / \${s}\`}</Header>)}
      </div>)}
    <div>
      <h3 style={{
      margin: '4px 0',
      fontSize: 12,
      fontWeight: 600
    }}>filter visible</h3>
      <Header filter>Filterable</Header>
    </div>
    <div>
      <h3 style={{
      margin: '4px 0',
      fontSize: 12,
      fontWeight: 600
    }}>right aligned</h3>
      <Header alignment="right">Right</Header>
    </div>
  </div>`,...(W=(R=o.parameters)==null?void 0:R.docs)==null?void 0:W.source}}};const ge=["Default","WithFilter","Ascending","Descending","RightAligned","AllVariants"],Ce=Object.freeze(Object.defineProperty({__proto__:null,AllVariants:o,Ascending:l,Default:a,Descending:c,RightAligned:p,WithFilter:d,__namedExportsOrder:ge,default:fe},Symbol.toStringTag,{value:"Module"}));function v(r){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...q(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(Q,{isTemplate:!0}),`
`,e.jsx(n.h1,{id:"header",children:"Header"}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{href:"packages/header/src/Header/Header.tsx",children:"Source code"})}),`
`,e.jsx(n.h2,{id:"overview",children:"Overview"}),`
`,e.jsxs(n.p,{children:[`Column header for tables and lists. Three sizes, two alignments, five
column types (basic + four PANW extensions), and an optional filter
button rendered with the `,e.jsx(n.code,{children:"@ds/button"})," ",e.jsx(n.code,{children:"IconButton"}),"."]}),`
`,e.jsx(n.h2,{id:"composition",children:"Composition"}),`
`,e.jsxs(n.p,{children:["The optional filter button is the ",e.jsx(n.code,{children:"IconButton"})," from ",e.jsx(n.code,{children:"@ds/button"}),`
(imported, not redefined).`]}),`
`,e.jsx(n.h2,{id:"live-demo",children:"Live Demo"}),`
`,e.jsx(Z,{of:a}),`
`,e.jsx(n.h2,{id:"panw-extensions",children:"PANW extensions"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"condensed"})," and ",e.jsx(n.code,{children:"lengthened"}),` are PANW-specific column types not present in
Carbon. They render a `,e.jsx(n.code,{children:"+"})," / ",e.jsx(n.code,{children:"−"}),` glyph beside the title to denote a
collapsible group column. `,e.jsx(n.code,{children:"ascending"})," / ",e.jsx(n.code,{children:"descending"})," render an arrow."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`<Header type="condensed">Group</Header>
<Header type="ascending">Sorted asc</Header>
`})}),`
`,e.jsx(n.h2,{id:"component-api",children:"Component API"}),`
`,e.jsx(ee,{}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The root has ",e.jsx(n.code,{children:'role="columnheader"'}),"."]}),`
`,e.jsxs(n.li,{children:["The filter button is a real ",e.jsx(n.code,{children:"IconButton"})," with ",e.jsx(n.code,{children:'aria-label="Filter column"'}),"."]}),`
`,e.jsxs(n.li,{children:["The filter button uses ",e.jsx(n.code,{children:"event.stopPropagation()"}),` so it does not also
trigger `,e.jsx(n.code,{children:"onHeaderClick"}),"."]}),`
`]}),`
`]})}function V(r={}){const{wrapper:n}={...q(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(v,{...r})}):v(r)}const Ne=Object.freeze(Object.defineProperty({__proto__:null,default:V},Symbol.toStringTag,{value:"Module"}));export{Ce as H,Ne as a};
