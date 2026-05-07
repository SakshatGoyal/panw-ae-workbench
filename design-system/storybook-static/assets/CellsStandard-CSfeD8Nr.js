import{j as e,b as fe,c as he,e as be}from"./index-CHjcGL7e.js";import{useMDXComponents as H}from"./index-DVRRELxc.js";import{c as ge,u as Se,P as s}from"./usePrefix-BO8COP8A.js";import{R as ye,r as ve}from"./index-CwcVQgaJ.js";import{P as je}from"./plus-CjFCaarj.js";import{a as ke}from"./Checkbox-CrWvJG89.js";import{b as Ce}from"./CellContents-B_t29xBd.js";const g=["static","hover","onPress","active","locked"],y=["small","default","large"],a=ye.forwardRef(function({state:t="static",size:v="small",expandable:K=!1,checkbox:Q=!1,checkboxStatus:Y,onCheckboxChange:j,onClick:f,onExpandClick:S,forceState:Z,content:ee="text",contentState:te="none",text:ae,tags:se=!1,tagLabel:ne,trendValue:re,className:oe},le){const l=Se(),[ce,de]=ve.useState("unchecked"),h=Z??t,c=h==="locked",ie=Y??(h==="active"?"checked":ce),pe=b=>{c||(j?j(b):de(b))},ue=()=>{c||f==null||f()},me=b=>{b.stopPropagation(),!c&&(S==null||S())},xe=ge(`${l}--cells-std`,`${l}--cells-std--${v}`,`${l}--cells-std--${h}`,oe);return e.jsxs("div",{ref:le,className:xe,onClick:ue,role:f?"row":void 0,"aria-disabled":c||void 0,"data-state":h,"data-size":v,children:[K&&e.jsx("button",{type:"button",className:`${l}--cells-std__expand-icon`,onClick:me,disabled:c,"aria-label":"Expand row",children:e.jsx(je,{size:16,"aria-hidden":"true"})}),Q&&e.jsx("span",{className:`${l}--cells-std__checkbox`,children:e.jsx(ke,{status:ie,disabled:c,label:"",onChange:pe})}),e.jsx("div",{className:`${l}--cells-std__content`,children:e.jsx(Ce,{content:ee,state:te,text:ae,tags:se,tagLabel:ne,trendValue:re})})]})});a.displayName="CellsStandard";a.propTypes={state:s.oneOf(g),size:s.oneOf(y),expandable:s.bool,checkbox:s.bool,checkboxStatus:s.oneOf(["checked","unchecked","indeterminate"]),onCheckboxChange:s.func,onClick:s.func,onExpandClick:s.func,forceState:s.oneOf(g),content:s.string,contentState:s.string,text:s.string,tags:s.bool,tagLabel:s.string,trendValue:s.string,className:s.string};a.__docgenInfo={description:"",methods:[],displayName:"CellsStandard",props:{state:{required:!1,tsType:{name:"unknown[number]",raw:"(typeof CellInteractionStates)[number]"},description:"",defaultValue:{value:"'static'",computed:!1},type:{name:"enum",value:[{value:"'static'",computed:!1},{value:"'hover'",computed:!1},{value:"'onPress'",computed:!1},{value:"'active'",computed:!1},{value:"'locked'",computed:!1}]}},size:{required:!1,tsType:{name:"unknown[number]",raw:"(typeof CellSizes)[number]"},description:"",defaultValue:{value:"'small'",computed:!1},type:{name:"enum",value:[{value:"'small'",computed:!1},{value:"'default'",computed:!1},{value:"'large'",computed:!1}]}},expandable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1},type:{name:"bool"}},checkbox:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1},type:{name:"bool"}},checkboxStatus:{required:!1,tsType:{name:"unknown[number]",raw:"(typeof CheckboxStatuses)[number]"},description:"",type:{name:"enum",value:[{value:"'checked'",computed:!1},{value:"'unchecked'",computed:!1},{value:"'indeterminate'",computed:!1}]}},onCheckboxChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(next: CheckboxStatus) => void",signature:{arguments:[{type:{name:"unknown[number]",raw:"(typeof CheckboxStatuses)[number]"},name:"next"}],return:{name:"void"}}},description:"",type:{name:"func"}},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"",type:{name:"func"}},onExpandClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"",type:{name:"func"}},forceState:{required:!1,tsType:{name:"unknown[number]",raw:"(typeof CellInteractionStates)[number]"},description:"",type:{name:"enum",value:[{value:"'static'",computed:!1},{value:"'hover'",computed:!1},{value:"'onPress'",computed:!1},{value:"'active'",computed:!1},{value:"'locked'",computed:!1}]}},content:{required:!1,tsType:{name:"unknown[number]",raw:"(typeof CellContentTypes)[number]"},description:"",defaultValue:{value:"'text'",computed:!1},type:{name:"string"}},contentState:{required:!1,tsType:{name:"unknown[number]",raw:"(typeof CellStates)[number]"},description:"",defaultValue:{value:"'none'",computed:!1},type:{name:"string"}},text:{required:!1,tsType:{name:"string"},description:"",type:{name:"string"}},tags:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1},type:{name:"bool"}},tagLabel:{required:!1,tsType:{name:"string"},description:"",type:{name:"string"}},trendValue:{required:!1,tsType:{name:"string"},description:"",type:{name:"string"}},className:{required:!1,tsType:{name:"string"},description:"",type:{name:"string"}}}};const we={title:"Components/CellsStandard",component:a,argTypes:{state:{options:g,control:{type:"select"}},size:{options:y,control:{type:"radio"}},expandable:{control:"boolean"},checkbox:{control:"boolean"},tags:{control:"boolean"},text:{control:"text"},tagLabel:{control:"text"},trendValue:{control:"text"},content:{options:["text","numbers","numberUp","numberDown"],control:{type:"radio"}}},parameters:{docs:{page:J}},tags:["autodocs"]},r=n=>e.jsx(a,{...n});r.args={state:"static",size:"small",expandable:!1,checkbox:!1,text:"Cell content"};const d=()=>e.jsx(a,{checkbox:!0,text:"Selectable row"}),i=()=>e.jsx(a,{checkbox:!0,forceState:"active",text:"Selected row"}),p=()=>e.jsx(a,{expandable:!0,text:"Expandable row"}),u=()=>e.jsx(a,{checkbox:!0,forceState:"locked",text:"Locked row"}),m=()=>e.jsx(a,{content:"numberUp",text:"1,234,567.00",trendValue:"$123"}),x=()=>e.jsx(a,{text:"With tag",tags:!0,tagLabel:"New"}),o=()=>e.jsxs("div",{style:{padding:24,background:"#f9f9f9",display:"flex",flexDirection:"column",gap:24},children:[y.map(n=>e.jsxs("div",{children:[e.jsxs("h3",{style:{margin:"8px 0",fontSize:13,fontWeight:600},children:["Size: ",n]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:4,width:480,background:"#fff",border:"1px solid #e8eaed"},children:g.map(t=>e.jsx(a,{forceState:t,size:n,checkbox:!0,expandable:!0,text:`State: ${t}`},t))})]},n)),e.jsxs("div",{children:[e.jsx("h3",{style:{margin:"8px 0",fontSize:13,fontWeight:600},children:"Content variants"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4,width:480,background:"#fff",border:"1px solid #e8eaed"},children:[e.jsx(a,{content:"text",text:"Plain text"}),e.jsx(a,{content:"numbers",text:"1,234,567.00"}),e.jsx(a,{content:"numberUp",text:"1,234,567.00",trendValue:"$123"}),e.jsx(a,{content:"numberDown",text:"1,234,567.00",trendValue:"$123"}),e.jsx(a,{text:"With tag",tags:!0,tagLabel:"Beta"})]})]})]});o.storyName="All Variants";o.parameters={controls:{disable:!0}};r.__docgenInfo={description:"",methods:[],displayName:"Default"};d.__docgenInfo={description:"",methods:[],displayName:"WithCheckbox"};i.__docgenInfo={description:"",methods:[],displayName:"Selected"};p.__docgenInfo={description:"",methods:[],displayName:"Expandable"};u.__docgenInfo={description:"",methods:[],displayName:"Locked"};m.__docgenInfo={description:"",methods:[],displayName:"NumericTrendUp"};x.__docgenInfo={description:"",methods:[],displayName:"WithTag"};o.__docgenInfo={description:"",methods:[],displayName:"AllVariants"};var C,w,_;r.parameters={...r.parameters,docs:{...(C=r.parameters)==null?void 0:C.docs,source:{originalSource:"args => <CellsStandard {...args} />",...(_=(w=r.parameters)==null?void 0:w.docs)==null?void 0:_.source}}};var T,N,z;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:'() => <CellsStandard checkbox text="Selectable row" />',...(z=(N=d.parameters)==null?void 0:N.docs)==null?void 0:z.source}}};var V,$,D;i.parameters={...i.parameters,docs:{...(V=i.parameters)==null?void 0:V.docs,source:{originalSource:'() => <CellsStandard checkbox forceState="active" text="Selected row" />',...(D=($=i.parameters)==null?void 0:$.docs)==null?void 0:D.source}}};var L,q,I;p.parameters={...p.parameters,docs:{...(L=p.parameters)==null?void 0:L.docs,source:{originalSource:'() => <CellsStandard expandable text="Expandable row" />',...(I=(q=p.parameters)==null?void 0:q.docs)==null?void 0:I.source}}};var P,W,O;u.parameters={...u.parameters,docs:{...(P=u.parameters)==null?void 0:P.docs,source:{originalSource:'() => <CellsStandard checkbox forceState="locked" text="Locked row" />',...(O=(W=u.parameters)==null?void 0:W.docs)==null?void 0:O.source}}};var A,E,U;m.parameters={...m.parameters,docs:{...(A=m.parameters)==null?void 0:A.docs,source:{originalSource:'() => <CellsStandard content="numberUp" text="1,234,567.00" trendValue="$123" />',...(U=(E=m.parameters)==null?void 0:E.docs)==null?void 0:U.source}}};var M,R,X;x.parameters={...x.parameters,docs:{...(M=x.parameters)==null?void 0:M.docs,source:{originalSource:'() => <CellsStandard text="With tag" tags tagLabel="New" />',...(X=(R=x.parameters)==null?void 0:R.docs)==null?void 0:X.source}}};var B,F,G;o.parameters={...o.parameters,docs:{...(B=o.parameters)==null?void 0:B.docs,source:{originalSource:`() => <div style={{
  padding: 24,
  background: '#f9f9f9',
  display: 'flex',
  flexDirection: 'column',
  gap: 24
}}>
    {CellSizes.map(size => <div key={size}>
        <h3 style={{
      margin: '8px 0',
      fontSize: 13,
      fontWeight: 600
    }}>Size: {size}</h3>
        <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      width: 480,
      background: '#fff',
      border: '1px solid #e8eaed'
    }}>
          {CellInteractionStates.map(state => <CellsStandard key={state} forceState={state} size={size} checkbox expandable text={\`State: \${state}\`} />)}
        </div>
      </div>)}
    <div>
      <h3 style={{
      margin: '8px 0',
      fontSize: 13,
      fontWeight: 600
    }}>Content variants</h3>
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      width: 480,
      background: '#fff',
      border: '1px solid #e8eaed'
    }}>
        <CellsStandard content="text" text="Plain text" />
        <CellsStandard content="numbers" text="1,234,567.00" />
        <CellsStandard content="numberUp" text="1,234,567.00" trendValue="$123" />
        <CellsStandard content="numberDown" text="1,234,567.00" trendValue="$123" />
        <CellsStandard text="With tag" tags tagLabel="Beta" />
      </div>
    </div>
  </div>`,...(G=(F=o.parameters)==null?void 0:F.docs)==null?void 0:G.source}}};const _e=["Default","WithCheckbox","Selected","Expandable","Locked","NumericTrendUp","WithTag","AllVariants"],Ie=Object.freeze(Object.defineProperty({__proto__:null,AllVariants:o,Default:r,Expandable:p,Locked:u,NumericTrendUp:m,Selected:i,WithCheckbox:d,WithTag:x,__namedExportsOrder:_e,default:we},Symbol.toStringTag,{value:"Module"}));function k(n){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...H(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(fe,{isTemplate:!0}),`
`,e.jsx(t.h1,{id:"cellsstandard",children:"CellsStandard"}),`
`,e.jsx(t.p,{children:e.jsx(t.a,{href:"packages/cells-standard/src/CellsStandard/CellsStandard.tsx",children:"Source code"})}),`
`,e.jsx(t.h2,{id:"overview",children:"Overview"}),`
`,e.jsxs(t.p,{children:[`Standard table-row cell wrapper. Composes the optional row-level affordances
(expand toggle, selection checkbox) with `,e.jsx(t.code,{children:"@ds/cell-contents"}),` for the inline
text/number/tag/state content.`]}),`
`,e.jsxs(t.p,{children:["This component imports ",e.jsx(t.code,{children:"Checkbox"})," from ",e.jsx(t.code,{children:"@ds/checkbox"}),", ",e.jsx(t.code,{children:"CellContents"}),` from
`,e.jsx(t.code,{children:"@ds/cell-contents"}),", and ",e.jsx(t.code,{children:"Tags"})," (transitively, via CellContents) from ",e.jsx(t.code,{children:"@ds/tags"}),`.
Nothing is redefined locally.`]}),`
`,e.jsx(t.h2,{id:"live-demo",children:"Live Demo"}),`
`,e.jsx(he,{of:r}),`
`,e.jsx(t.h2,{id:"variants",children:"Variants"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-jsx",children:`<CellsStandard text="Plain row" />
<CellsStandard checkbox text="Row with checkbox" />
<CellsStandard expandable text="Row with expand toggle" />
<CellsStandard checkbox forceState="active" text="Selected row" />
<CellsStandard checkbox forceState="locked" text="Locked row" />
`})}),`
`,e.jsx(t.h2,{id:"sizes",children:"Sizes"}),`
`,e.jsxs(t.p,{children:[e.jsx(t.code,{children:"small"})," (32px), ",e.jsx(t.code,{children:"default"})," (40px), ",e.jsx(t.code,{children:"large"})," (48px)."]}),`
`,e.jsx(t.h2,{id:"interaction-states",children:"Interaction states"}),`
`,e.jsxs(t.p,{children:[e.jsx(t.code,{children:"static"})," · ",e.jsx(t.code,{children:"hover"})," · ",e.jsx(t.code,{children:"onPress"})," · ",e.jsx(t.code,{children:"active"})," · ",e.jsx(t.code,{children:"locked"}),". The ",e.jsx(t.code,{children:"forceState"}),`
prop pins a state for documentation purposes; otherwise the row reacts
to native `,e.jsx(t.code,{children:":hover"})," / ",e.jsx(t.code,{children:":active"})," and ",e.jsx(t.code,{children:"state"})," controls the visual."]}),`
`,e.jsx(t.h2,{id:"component-api",children:"Component API"}),`
`,e.jsx(be,{}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.p,{children:["Decorative icons use ",e.jsx(t.code,{children:"aria-hidden"}),". The expand affordance is a real ",e.jsx(t.code,{children:"<button>"}),`
with `,e.jsx(t.code,{children:'aria-label="Expand row"'}),". When ",e.jsx(t.code,{children:"onClick"}),` is supplied, the wrapper takes
`,e.jsx(t.code,{children:'role="row"'}),". Locked rows set ",e.jsx(t.code,{children:'aria-disabled="true"'})," and disable pointer events."]})]})}function J(n={}){const{wrapper:t}={...H(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(k,{...n})}):k(n)}const Pe=Object.freeze(Object.defineProperty({__proto__:null,default:J},Symbol.toStringTag,{value:"Module"}));export{Ie as C,Pe as a};
