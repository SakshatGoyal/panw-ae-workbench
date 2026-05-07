import{j as e,b as K,c as Q,e as U}from"./index-CHjcGL7e.js";import{useMDXComponents as E}from"./index-DVRRELxc.js";import{c as P,u as k,P as t}from"./usePrefix-BO8COP8A.js";import{r as p,R as u}from"./index-CwcVQgaJ.js";import{a as Y}from"./index-B-lxVbXh.js";import{S as Z,T as ee}from"./Tags-CtFck095.js";import{S as M}from"./star-CChmsO4V.js";const B=p.createContext(null);function ae(){const n=p.useContext(B);if(!n)throw new Error("Tab must be rendered inside <Tabs>");return n}const se=["default","hover","pressed","disabled"],o=u.forwardRef(function({children:a,selectedIndex:d,onChange:f,container:T=!0,forceState:g,className:j},y){const m=k(),v=u.Children.toArray(a).filter(u.isValidElement);return e.jsx(B.Provider,{value:{selectedIndex:d,onChange:f,container:T,forceState:g},children:e.jsx("div",{ref:y,className:P(`${m}--tabs`,j),role:"tablist",children:v.map((I,r)=>u.cloneElement(I,{index:r}))})})});o.displayName="Tabs";o.propTypes={children:t.node.isRequired,selectedIndex:t.number.isRequired,onChange:t.func,container:t.bool,forceState:t.oneOf(se),className:t.string};o.__docgenInfo={description:"",methods:[],displayName:"Tabs",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"",type:{name:"node"}},selectedIndex:{required:!0,tsType:{name:"number"},description:"",type:{name:"number"}},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(index: number) => void",signature:{arguments:[{type:{name:"number"},name:"index"}],return:{name:"void"}}},description:"",type:{name:"func"}},container:{required:!1,tsType:{name:"boolean"},description:"When true, tabs render with filled background and top accent border.",defaultValue:{value:"true",computed:!1},type:{name:"bool"}},forceState:{required:!1,tsType:{name:"unknown[number]",raw:"(typeof TabStates)[number]"},description:"Force a visual state for unselected tabs.",type:{name:"enum",value:[{value:"'default'",computed:!1},{value:"'hover'",computed:!1},{value:"'pressed'",computed:!1},{value:"'disabled'",computed:!1}]}},className:{required:!1,tsType:{name:"string"},description:"",type:{name:"string"}}}};const s=u.forwardRef(function({label:a,showLabel:d=!0,showTag:f=!1,tagLabel:T="Tag",disabled:g=!1,renderIcon:j=Z,showIcon:y=!1,index:m=0,className:v},I){const r=k(),{selectedIndex:F,onChange:w,container:G,forceState:h}=ae(),x=m===F,H=!x&&h&&h!=="default"?`${r}--tabs__item--force-${h}`:"",J=P(`${r}--tabs__item`,G?`${r}--tabs__item--container`:`${r}--tabs__item--no-container`,x?`${r}--tabs__item--selected`:`${r}--tabs__item--unselected`,H,v),_=g||h==="disabled";return e.jsxs("button",{ref:I,type:"button",role:"tab","aria-selected":x,className:J,disabled:_,tabIndex:x?0:-1,onClick:()=>{_||w==null||w(m)},children:[d&&e.jsx("span",{className:`${r}--tabs__label`,children:a}),y&&e.jsx("span",{className:`${r}--tabs__icon`,"aria-hidden":"true",children:e.jsx(j,{size:16})}),f&&e.jsx("span",{className:`${r}--tabs__tag`,children:e.jsx(ee,{label:T,color:"orange",contrast:"low",size:"default"})})]})});s.displayName="Tab";s.propTypes={label:t.string.isRequired,showLabel:t.bool,showTag:t.bool,tagLabel:t.string,disabled:t.bool,renderIcon:t.oneOfType([t.func,t.object]),showIcon:t.bool,index:t.number,className:t.string};s.__docgenInfo={description:"",methods:[],displayName:"Tab",props:{label:{required:!0,tsType:{name:"string"},description:"",type:{name:"string"}},showLabel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1},type:{name:"bool"}},showTag:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1},type:{name:"bool"}},tagLabel:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Tag'",computed:!1},type:{name:"string"}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1},type:{name:"bool"}},renderIcon:{required:!1,tsType:{name:"ReactElementType",raw:"React.ElementType"},description:"lucide-style component for the leading icon.",defaultValue:{value:"Sun",computed:!0},type:{name:"union",value:[{name:"func"},{name:"object"}]}},showIcon:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1},type:{name:"bool"}},index:{required:!1,tsType:{name:"number"},description:"Internal: injected by `<Tabs>` — its position in the children list.",defaultValue:{value:"0",computed:!1},type:{name:"number"}},className:{required:!1,tsType:{name:"string"},description:"",type:{name:"string"}}}};const ne={title:"Components/Tabs",component:o,parameters:{docs:{page:X}},tags:["autodocs"]},i=()=>{const[n,a]=p.useState(0);return e.jsxs(o,{selectedIndex:n,onChange:d=>{a(d),Y("onChange")(d)},children:[e.jsx(s,{label:"Overview"}),e.jsx(s,{label:"Details"}),e.jsx(s,{label:"Activity"})]})},c=()=>{const[n,a]=p.useState(0);return e.jsxs(o,{selectedIndex:n,onChange:a,container:!1,children:[e.jsx(s,{label:"Overview"}),e.jsx(s,{label:"Details"}),e.jsx(s,{label:"Activity"})]})},b=()=>{const[n,a]=p.useState(0);return e.jsxs(o,{selectedIndex:n,onChange:a,children:[e.jsx(s,{label:"Overview",showIcon:!0,renderIcon:M}),e.jsx(s,{label:"New",showTag:!0,tagLabel:"Beta"}),e.jsx(s,{label:"Disabled",disabled:!0})]})},l=()=>e.jsxs("div",{style:{padding:24,background:"#f9f9f9",display:"flex",flexDirection:"column",gap:24},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{margin:"4px 0",fontSize:12,fontWeight:600},children:"container=true"}),e.jsxs(o,{selectedIndex:0,children:[e.jsx(s,{label:"One"}),e.jsx(s,{label:"Two"}),e.jsx(s,{label:"Three"})]})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{margin:"4px 0",fontSize:12,fontWeight:600},children:"container=false"}),e.jsxs(o,{selectedIndex:1,container:!1,children:[e.jsx(s,{label:"One"}),e.jsx(s,{label:"Two"}),e.jsx(s,{label:"Three"})]})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{margin:"4px 0",fontSize:12,fontWeight:600},children:"tags + icons + disabled"}),e.jsxs(o,{selectedIndex:0,children:[e.jsx(s,{label:"Overview",showIcon:!0,renderIcon:M}),e.jsx(s,{label:"Beta",showTag:!0,tagLabel:"New"}),e.jsx(s,{label:"Disabled",disabled:!0})]})]})]});l.storyName="All Variants";l.parameters={controls:{disable:!0}};i.__docgenInfo={description:"",methods:[],displayName:"Default"};c.__docgenInfo={description:"",methods:[],displayName:"NoContainer"};b.__docgenInfo={description:"",methods:[],displayName:"WithIconsAndTag"};l.__docgenInfo={description:"",methods:[],displayName:"AllVariants"};var N,C,O;i.parameters={...i.parameters,docs:{...(N=i.parameters)==null?void 0:N.docs,source:{originalSource:`() => {
  const [i, setI] = useState(0);
  return <Tabs selectedIndex={i} onChange={n => {
    setI(n);
    action('onChange')(n);
  }}>
      <Tab label="Overview" />
      <Tab label="Details" />
      <Tab label="Activity" />
    </Tabs>;
}`,...(O=(C=i.parameters)==null?void 0:C.docs)==null?void 0:O.source}}};var D,q,A;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`() => {
  const [i, setI] = useState(0);
  return <Tabs selectedIndex={i} onChange={setI} container={false}>
      <Tab label="Overview" />
      <Tab label="Details" />
      <Tab label="Activity" />
    </Tabs>;
}`,...(A=(q=c.parameters)==null?void 0:q.docs)==null?void 0:A.source}}};var R,V,$;b.parameters={...b.parameters,docs:{...(R=b.parameters)==null?void 0:R.docs,source:{originalSource:`() => {
  const [i, setI] = useState(0);
  return <Tabs selectedIndex={i} onChange={setI}>
      <Tab label="Overview" showIcon renderIcon={Star} />
      <Tab label="New" showTag tagLabel="Beta" />
      <Tab label="Disabled" disabled />
    </Tabs>;
}`,...($=(V=b.parameters)==null?void 0:V.docs)==null?void 0:$.source}}};var L,W,z;l.parameters={...l.parameters,docs:{...(L=l.parameters)==null?void 0:L.docs,source:{originalSource:`() => <div style={{
  padding: 24,
  background: '#f9f9f9',
  display: 'flex',
  flexDirection: 'column',
  gap: 24
}}>
    <div>
      <h3 style={{
      margin: '4px 0',
      fontSize: 12,
      fontWeight: 600
    }}>container=true</h3>
      <Tabs selectedIndex={0}>
        <Tab label="One" />
        <Tab label="Two" />
        <Tab label="Three" />
      </Tabs>
    </div>
    <div>
      <h3 style={{
      margin: '4px 0',
      fontSize: 12,
      fontWeight: 600
    }}>container=false</h3>
      <Tabs selectedIndex={1} container={false}>
        <Tab label="One" />
        <Tab label="Two" />
        <Tab label="Three" />
      </Tabs>
    </div>
    <div>
      <h3 style={{
      margin: '4px 0',
      fontSize: 12,
      fontWeight: 600
    }}>tags + icons + disabled</h3>
      <Tabs selectedIndex={0}>
        <Tab label="Overview" showIcon renderIcon={Star} />
        <Tab label="Beta" showTag tagLabel="New" />
        <Tab label="Disabled" disabled />
      </Tabs>
    </div>
  </div>`,...(z=(W=l.parameters)==null?void 0:W.docs)==null?void 0:z.source}}};const te=["Default","NoContainer","WithIconsAndTag","AllVariants"],ue=Object.freeze(Object.defineProperty({__proto__:null,AllVariants:l,Default:i,NoContainer:c,WithIconsAndTag:b,__namedExportsOrder:te,default:ne},Symbol.toStringTag,{value:"Module"}));function S(n){const a={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...E(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(K,{isTemplate:!0}),`
`,e.jsx(a.h1,{id:"tabs",children:"Tabs"}),`
`,e.jsx(a.p,{children:e.jsx(a.a,{href:"packages/tabs/src/Tabs/Tabs.tsx",children:"Source code"})}),`
`,e.jsx(a.h2,{id:"overview",children:"Overview"}),`
`,e.jsxs(a.p,{children:["Tabbed navigation. Two layouts: ",e.jsx(a.code,{children:"container"}),` (filled background with top
accent border) and non-container (transparent with bottom border).`]}),`
`,e.jsx(a.h2,{id:"api-change-items-array--compound-children",children:"API change: items array → compound children"}),`
`,e.jsxs(a.p,{children:["PANW originally accepted ",e.jsx(a.code,{children:"items: TabItem[]"})," and a ",e.jsx(a.code,{children:"selectedIndex"}),` prop.
This port uses Carbon's compound children pattern: render `,e.jsx(a.code,{children:"Tab"}),` children
inside `,e.jsx(a.code,{children:"Tabs"}),". The parent owns ",e.jsx(a.code,{children:"selectedIndex"})," / ",e.jsx(a.code,{children:"onChange"}),"."]}),`
`,e.jsx(a.pre,{children:e.jsx(a.code,{className:"language-jsx",children:`<Tabs selectedIndex={i} onChange={setI}>
  <Tab label="Overview" />
  <Tab label="Details" showTag tagLabel="New" />
  <Tab label="Activity" disabled />
</Tabs>
`})}),`
`,e.jsx(a.h2,{id:"composition",children:"Composition"}),`
`,e.jsxs(a.p,{children:["Tab tags use the ",e.jsx(a.code,{children:"@ds/tags"})," ",e.jsx(a.code,{children:"Tags"})," component (imported, not redefined)."]}),`
`,e.jsx(a.h2,{id:"live-demo",children:"Live Demo"}),`
`,e.jsx(Q,{of:i}),`
`,e.jsx(a.h2,{id:"component-api",children:"Component API"}),`
`,e.jsx(a.h3,{id:"tabs-1",children:e.jsx(a.code,{children:"Tabs"})}),`
`,e.jsx(U,{of:o}),`
`,e.jsx(a.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(a.ul,{children:[`
`,e.jsxs(a.li,{children:["Container has ",e.jsx(a.code,{children:'role="tablist"'}),". Each ",e.jsx(a.code,{children:"Tab"})," has ",e.jsx(a.code,{children:'role="tab"'}),"."]}),`
`,e.jsxs(a.li,{children:["Selected tab gets ",e.jsx(a.code,{children:'aria-selected="true"'})," and ",e.jsx(a.code,{children:"tabIndex=0"}),`; unselected
tabs get `,e.jsx(a.code,{children:"tabIndex=-1"}),"."]}),`
`]}),`
`]})}function X(n={}){const{wrapper:a}={...E(),...n.components};return a?e.jsx(a,{...n,children:e.jsx(S,{...n})}):S(n)}const pe=Object.freeze(Object.defineProperty({__proto__:null,default:X},Symbol.toStringTag,{value:"Module"}));export{ue as T,pe as a};
