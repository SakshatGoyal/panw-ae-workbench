import{j as e,b as O,c as U,e as k}from"./index-CHjcGL7e.js";import{useMDXComponents as L}from"./index-DVRRELxc.js";import"./usePrefix-BO8COP8A.js";import"./index-CwcVQgaJ.js";import{C as $,a as M,b as s}from"./CellContents-B_t29xBd.js";const P={title:"Components/CellContents",component:s,argTypes:{content:{options:M,control:{type:"radio"}},state:{options:$,control:{type:"select"}},text:{control:"text"},tags:{control:"boolean"},tagLabel:{control:"text"},trendValue:{control:"text"}},parameters:{docs:{page:z}},tags:["autodocs"]},o=n=>e.jsx(s,{...n});o.args={content:"text",state:"none",tags:!1};const r=()=>e.jsx(s,{content:"numbers",text:"1,234,567.00"}),c=()=>e.jsx(s,{content:"numberUp",text:"1,234,567.00",trendValue:"$123"}),l=()=>e.jsx(s,{content:"numberDown",text:"1,234,567.00",trendValue:"$123"}),i=()=>e.jsx(s,{content:"text",tags:!0,tagLabel:"New"}),d=()=>e.jsx(s,{content:"text",state:"success"}),a=()=>e.jsxs("div",{style:{padding:24,background:"#f9f9f9",display:"flex",flexDirection:"column",gap:16},children:[M.map(n=>e.jsxs("div",{children:[e.jsxs("h3",{style:{margin:"8px 0",fontSize:13,fontWeight:600},children:["Content: ",n]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8,width:320},children:$.map(t=>e.jsx(s,{content:n,state:t},t))})]},n)),e.jsxs("div",{children:[e.jsx("h3",{style:{margin:"8px 0",fontSize:13,fontWeight:600},children:"With tag"}),e.jsx(s,{content:"text",tags:!0,tagLabel:"Beta"})]})]});a.storyName="All Variants";a.parameters={controls:{disable:!0}};o.__docgenInfo={description:"",methods:[],displayName:"Default"};r.__docgenInfo={description:"",methods:[],displayName:"Numbers"};c.__docgenInfo={description:"",methods:[],displayName:"NumberUp"};l.__docgenInfo={description:"",methods:[],displayName:"NumberDown"};i.__docgenInfo={description:"",methods:[],displayName:"WithTag"};d.__docgenInfo={description:"",methods:[],displayName:"WithStateIcon"};a.__docgenInfo={description:"",methods:[],displayName:"AllVariants"};var m,u,x;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:"args => <CellContents {...args} />",...(x=(u=o.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};var h,g,C;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:'() => <CellContents content="numbers" text="1,234,567.00" />',...(C=(g=r.parameters)==null?void 0:g.docs)==null?void 0:C.source}}};var j,f,b;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:'() => <CellContents content="numberUp" text="1,234,567.00" trendValue="$123" />',...(b=(f=c.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};var y,_,v;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:'() => <CellContents content="numberDown" text="1,234,567.00" trendValue="$123" />',...(v=(_=l.parameters)==null?void 0:_.docs)==null?void 0:v.source}}};var N,S,D;i.parameters={...i.parameters,docs:{...(N=i.parameters)==null?void 0:N.docs,source:{originalSource:'() => <CellContents content="text" tags tagLabel="New" />',...(D=(S=i.parameters)==null?void 0:S.docs)==null?void 0:D.source}}};var w,T,W;d.parameters={...d.parameters,docs:{...(w=d.parameters)==null?void 0:w.docs,source:{originalSource:'() => <CellContents content="text" state="success" />',...(W=(T=d.parameters)==null?void 0:T.docs)==null?void 0:W.source}}};var V,I,A;a.parameters={...a.parameters,docs:{...(V=a.parameters)==null?void 0:V.docs,source:{originalSource:`() => <div style={{
  padding: 24,
  background: '#f9f9f9',
  display: 'flex',
  flexDirection: 'column',
  gap: 16
}}>
    {CellContentTypes.map(content => <div key={content}>
        <h3 style={{
      margin: '8px 0',
      fontSize: 13,
      fontWeight: 600
    }}>Content: {content}</h3>
        <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      width: 320
    }}>
          {CellStates.map(state => <CellContents key={state} content={content} state={state} />)}
        </div>
      </div>)}
    <div>
      <h3 style={{
      margin: '8px 0',
      fontSize: 13,
      fontWeight: 600
    }}>With tag</h3>
      <CellContents content="text" tags tagLabel="Beta" />
    </div>
  </div>`,...(A=(I=a.parameters)==null?void 0:I.docs)==null?void 0:A.source}}};const X=["Default","Numbers","NumberUp","NumberDown","WithTag","WithStateIcon","AllVariants"],G=Object.freeze(Object.defineProperty({__proto__:null,AllVariants:a,Default:o,NumberDown:l,NumberUp:c,Numbers:r,WithStateIcon:d,WithTag:i,__namedExportsOrder:X,default:P},Symbol.toStringTag,{value:"Module"}));function p(n){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...L(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(O,{isTemplate:!0}),`
`,e.jsx(t.h1,{id:"cellcontents",children:"CellContents"}),`
`,e.jsx(t.p,{children:e.jsx(t.a,{href:"packages/cell-contents/src/CellContents/CellContents.tsx",children:"Source code"})}),`
`,e.jsx(t.h2,{id:"overview",children:"Overview"}),`
`,e.jsx(t.p,{children:`Atomic content for a single table cell. Supports text and numeric values
with optional trend indicators, an inline tag, and a trailing status icon.`}),`
`,`
`,e.jsx(t.h2,{id:"live-demo",children:"Live Demo"}),`
`,e.jsx(U,{of:o}),`
`,e.jsx(t.h2,{id:"variants",children:"Variants"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-jsx",children:`<CellContents content="text" />
<CellContents content="numbers" text="1,234,567.00" />
<CellContents content="numberUp" trendValue="$123" />
<CellContents content="numberDown" trendValue="$123" />
`})}),`
`,e.jsx(t.h2,{id:"with-tag",children:"With Tag"}),`
`,e.jsxs(t.p,{children:["The optional inline tag renders the ",e.jsx(t.code,{children:"@ds/tags"})," ",e.jsx(t.code,{children:"Tags"}),` component (imported,
not redefined).`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-jsx",children:`<CellContents content="text" tags tagLabel="New" />
`})}),`
`,e.jsx(t.h2,{id:"status-icon",children:"Status icon"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-jsx",children:`<CellContents state="success" />
<CellContents state="error" />
`})}),`
`,e.jsx(t.h2,{id:"component-api",children:"Component API"}),`
`,e.jsx(k,{}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.p,{children:["Decorative icons use ",e.jsx(t.code,{children:"aria-hidden"}),`. Cells are non-interactive — wrap in a
`,e.jsx(t.code,{children:"<td>"})," and rely on the table for semantics."]})]})}function z(n={}){const{wrapper:t}={...L(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(p,{...n})}):p(n)}const H=Object.freeze(Object.defineProperty({__proto__:null,default:z},Symbol.toStringTag,{value:"Module"}));export{G as C,H as a};
