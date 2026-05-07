import{j as e,b as K,c as Q,e as C}from"./index-CHjcGL7e.js";import{useMDXComponents as V}from"./index-DVRRELxc.js";import{c as x,u as F,P as d}from"./usePrefix-BO8COP8A.js";import{R as h}from"./index-CwcVQgaJ.js";import{a as z}from"./index-B-lxVbXh.js";import{C as N}from"./chevron-right-CV6jF4o6.js";const s=h.forwardRef(function({children:r,collapsed:f=!1,onExpand:j,className:I,"aria-label":g="Breadcrumb",...u},b){const n=F(),p=h.Children.toArray(r).filter(Boolean),v=f&&p.length>2,_=v?[p[0],p[p.length-1]]:p,G=_.map((y,B)=>{const J=B===_.length-1;return e.jsxs("li",{className:`${n}--breadcrumbs__item`,children:[B>0&&e.jsx("span",{className:`${n}--breadcrumbs__separator`,"aria-hidden":"true",children:e.jsx(N,{size:16})}),h.isValidElement(y)?h.cloneElement(y,{isCurrent:J}):y,v&&B===0&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:`${n}--breadcrumbs__separator`,"aria-hidden":"true",children:e.jsx(N,{size:16})}),e.jsx("button",{type:"button",className:`${n}--breadcrumbs__continuation`,onClick:j,"aria-label":"Show hidden breadcrumbs",children:". . ."})]})]},`li-${B}`)});return e.jsx("nav",{ref:b,"aria-label":g,className:x(`${n}--breadcrumbs`,I),...u,children:e.jsx("ol",{className:`${n}--breadcrumbs__list`,children:G})})});s.displayName="Breadcrumb";s.propTypes={children:d.node,collapsed:d.bool,onExpand:d.func,className:d.string};s.__docgenInfo={description:"",methods:[],displayName:"Breadcrumb",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"BreadcrumbItem children.",type:{name:"node"}},collapsed:{required:!1,tsType:{name:"boolean"},description:"When true, collapses middle items into a `…` button between first and last.",defaultValue:{value:"false",computed:!1},type:{name:"bool"}},onExpand:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: React.MouseEvent<HTMLButtonElement>) => void",signature:{arguments:[{type:{name:"ReactMouseEvent",raw:"React.MouseEvent<HTMLButtonElement>",elements:[{name:"HTMLButtonElement"}]},name:"event"}],return:{name:"void"}}},description:"Fired when the collapsed `…` button is clicked.",type:{name:"func"}},"aria-label":{required:!1,tsType:{name:"string"},description:"ARIA label for the wrapping `<nav>`.",defaultValue:{value:"'Breadcrumb'",computed:!1}},className:{description:"",type:{name:"string"},required:!1}},composes:["Omit"]};const a=h.forwardRef(function({children:r,href:f,disabled:j,isCurrent:I,onClick:g,className:u},b){const n=F();return I?e.jsx("span",{ref:b,className:x(`${n}--breadcrumbs__current`,u),"aria-current":"page",children:r}):j?e.jsx("a",{ref:b,className:x(`${n}--breadcrumbs__link`,`${n}--breadcrumbs__link--disabled`,u),"aria-disabled":"true",role:"link",children:r}):e.jsx("a",{ref:b,href:f??"#",className:x(`${n}--breadcrumbs__link`,u),onClick:g,children:r})});a.displayName="BreadcrumbItem";a.propTypes={children:d.node,href:d.string,disabled:d.bool,isCurrent:d.bool,onClick:d.func,className:d.string};a.__docgenInfo={description:"",methods:[],displayName:"BreadcrumbItem",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Display label.",type:{name:"node"}},href:{required:!1,tsType:{name:"string"},description:"Navigation target — omit for the current page.",type:{name:"string"}},disabled:{required:!1,tsType:{name:"boolean"},description:"Disables the link visually and removes from interaction.",type:{name:"bool"}},isCurrent:{required:!1,tsType:{name:"boolean"},description:"Internal: marks this item as the current page. Set automatically by\n`<Breadcrumb>` for the last visible item.",type:{name:"bool"}},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: React.MouseEvent) => void",signature:{arguments:[{type:{name:"ReactMouseEvent",raw:"React.MouseEvent"},name:"event"}],return:{name:"void"}}},description:"Click handler.",type:{name:"func"}},className:{required:!1,tsType:{name:"string"},description:"Additional class.",type:{name:"string"}}}};const U={title:"Components/Breadcrumb",component:s,subcomponents:{BreadcrumbItem:a},argTypes:{collapsed:{control:"boolean"}},parameters:{docs:{page:X}},tags:["autodocs"]},c=t=>e.jsxs(s,{...t,onExpand:z("onExpand"),children:[e.jsx(a,{href:"/",children:"Home"}),e.jsx(a,{href:"/products",children:"Products"}),e.jsx(a,{href:"/products/laptops",children:"Laptops"}),e.jsx(a,{children:"MacBook Pro"})]});c.args={collapsed:!1};const i=()=>e.jsxs(s,{children:[e.jsx(a,{href:"/",children:"Home"}),e.jsx(a,{children:"Settings"})]}),m=()=>e.jsxs(s,{children:[e.jsx(a,{href:"/",children:"Home"}),e.jsx(a,{disabled:!0,children:"Restricted"}),e.jsx(a,{children:"Current"})]}),l=()=>e.jsxs(s,{collapsed:!0,onExpand:z("onExpand"),children:[e.jsx(a,{href:"/a",children:"Level 1"}),e.jsx(a,{href:"/b",children:"Level 2"}),e.jsx(a,{href:"/c",children:"Level 3"}),e.jsx(a,{href:"/d",children:"Level 4"}),e.jsx(a,{children:"Current"})]}),o=()=>e.jsxs("div",{style:{fontFamily:"Inter, sans-serif",padding:"24px",display:"grid",gap:"16px"},children:[e.jsxs(s,{children:[e.jsx(a,{href:"/",children:"Home"}),e.jsx(a,{href:"/p",children:"Products"}),e.jsx(a,{children:"Current"})]}),e.jsxs(s,{children:[e.jsx(a,{href:"/",children:"Home"}),e.jsx(a,{disabled:!0,children:"Restricted"}),e.jsx(a,{children:"Current"})]}),e.jsxs(s,{collapsed:!0,children:[e.jsx(a,{href:"/",children:"Home"}),e.jsx(a,{href:"/a",children:"A"}),e.jsx(a,{href:"/b",children:"B"}),e.jsx(a,{children:"Current"})]})]});o.storyName="All Variants";o.parameters={controls:{disable:!0}};c.__docgenInfo={description:"",methods:[],displayName:"Default"};i.__docgenInfo={description:"",methods:[],displayName:"Two"};m.__docgenInfo={description:"",methods:[],displayName:"WithDisabled"};l.__docgenInfo={description:"",methods:[],displayName:"Collapsed"};o.__docgenInfo={description:"",methods:[],displayName:"AllVariants"};var R,E,w;c.parameters={...c.parameters,docs:{...(R=c.parameters)==null?void 0:R.docs,source:{originalSource:`args => <Breadcrumb {...args} onExpand={action('onExpand')}>
    <BreadcrumbItem href="/">Home</BreadcrumbItem>
    <BreadcrumbItem href="/products">Products</BreadcrumbItem>
    <BreadcrumbItem href="/products/laptops">Laptops</BreadcrumbItem>
    <BreadcrumbItem>MacBook Pro</BreadcrumbItem>
  </Breadcrumb>`,...(w=(E=c.parameters)==null?void 0:E.docs)==null?void 0:w.source}}};var k,H,M;i.parameters={...i.parameters,docs:{...(k=i.parameters)==null?void 0:k.docs,source:{originalSource:`() => <Breadcrumb>
    <BreadcrumbItem href="/">Home</BreadcrumbItem>
    <BreadcrumbItem>Settings</BreadcrumbItem>
  </Breadcrumb>`,...(M=(H=i.parameters)==null?void 0:H.docs)==null?void 0:M.source}}};var P,A,L;m.parameters={...m.parameters,docs:{...(P=m.parameters)==null?void 0:P.docs,source:{originalSource:`() => <Breadcrumb>
    <BreadcrumbItem href="/">Home</BreadcrumbItem>
    <BreadcrumbItem disabled>Restricted</BreadcrumbItem>
    <BreadcrumbItem>Current</BreadcrumbItem>
  </Breadcrumb>`,...(L=(A=m.parameters)==null?void 0:A.docs)==null?void 0:L.source}}};var S,D,$;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`() => <Breadcrumb collapsed onExpand={action('onExpand')}>
    <BreadcrumbItem href="/a">Level 1</BreadcrumbItem>
    <BreadcrumbItem href="/b">Level 2</BreadcrumbItem>
    <BreadcrumbItem href="/c">Level 3</BreadcrumbItem>
    <BreadcrumbItem href="/d">Level 4</BreadcrumbItem>
    <BreadcrumbItem>Current</BreadcrumbItem>
  </Breadcrumb>`,...($=(D=l.parameters)==null?void 0:D.docs)==null?void 0:$.source}}};var q,W,O;o.parameters={...o.parameters,docs:{...(q=o.parameters)==null?void 0:q.docs,source:{originalSource:`() => <div style={{
  fontFamily: 'Inter, sans-serif',
  padding: '24px',
  display: 'grid',
  gap: '16px'
}}>
    <Breadcrumb>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/p">Products</BreadcrumbItem>
      <BreadcrumbItem>Current</BreadcrumbItem>
    </Breadcrumb>
    <Breadcrumb>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem disabled>Restricted</BreadcrumbItem>
      <BreadcrumbItem>Current</BreadcrumbItem>
    </Breadcrumb>
    <Breadcrumb collapsed>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/a">A</BreadcrumbItem>
      <BreadcrumbItem href="/b">B</BreadcrumbItem>
      <BreadcrumbItem>Current</BreadcrumbItem>
    </Breadcrumb>
  </div>`,...(O=(W=o.parameters)==null?void 0:W.docs)==null?void 0:O.source}}};const Y=["Default","Two","WithDisabled","Collapsed","AllVariants"],te=Object.freeze(Object.defineProperty({__proto__:null,AllVariants:o,Collapsed:l,Default:c,Two:i,WithDisabled:m,__namedExportsOrder:Y,default:U},Symbol.toStringTag,{value:"Module"}));function T(t){const r={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...V(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(K,{isTemplate:!0}),`
`,e.jsx(r.h1,{id:"breadcrumb",children:"Breadcrumb"}),`
`,e.jsx(r.p,{children:e.jsx(r.a,{href:"packages/breadcrumbs/src/Breadcrumb/Breadcrumb.tsx",children:"Source code"})}),`
`,e.jsx(r.h2,{id:"overview",children:"Overview"}),`
`,e.jsxs(r.p,{children:["A chevron-separated navigation trail. Renders as ",e.jsx(r.code,{children:'<nav aria-label="Breadcrumb"> <ol>…</ol></nav>'}),". Last visible ",e.jsx(r.code,{children:"<BreadcrumbItem>"}),` is automatically marked with
`,e.jsx(r.code,{children:'aria-current="page"'}),". When ",e.jsx(r.code,{children:"collapsed"}),` is set on a list of more than two
items, middle items are hidden behind a `,e.jsx(r.code,{children:"…"})," button that fires ",e.jsx(r.code,{children:"onExpand"}),"."]}),`
`,`
`,e.jsx(r.h2,{id:"live-demo",children:"Live Demo"}),`
`,e.jsx(Q,{of:c}),`
`,e.jsx(r.h2,{id:"code",children:"Code"}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-jsx",children:`<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
  <BreadcrumbItem>MacBook Pro</BreadcrumbItem>
</Breadcrumb>

<Breadcrumb collapsed onExpand={() => expand()}>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/a">Level 1</BreadcrumbItem>
  <BreadcrumbItem href="/b">Level 2</BreadcrumbItem>
  <BreadcrumbItem>Current</BreadcrumbItem>
</Breadcrumb>
`})}),`
`,e.jsxs(r.h2,{id:"api-change-items-array--compound-children",children:["API Change: ",e.jsx(r.code,{children:"items"})," array → compound children"]}),`
`,e.jsxs(r.p,{children:["PANW's source accepted an ",e.jsx(r.code,{children:"items: BreadcrumbItem[]"})," array prop. ",e.jsx(r.strong,{children:`The port
adopts Carbon's compound-children pattern`})," — pass ",e.jsx(r.code,{children:"<BreadcrumbItem>"}),` children
directly. This matches Carbon's API and gives consumers full control over the
content of each item (icons, custom links, etc.).`]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-jsx",children:`// PANW (old)
<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Settings' }]} />

// Ported (Carbon convention)
<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem>Settings</BreadcrumbItem>
</Breadcrumb>
`})}),`
`,e.jsx(r.h2,{id:"component-api",children:"Component API"}),`
`,e.jsx(r.h3,{id:"breadcrumb-1",children:e.jsx(r.code,{children:"Breadcrumb"})}),`
`,e.jsx(C,{of:s}),`
`,e.jsx(r.h3,{id:"breadcrumbitem",children:e.jsx(r.code,{children:"BreadcrumbItem"})}),`
`,e.jsx(C,{of:a}),`
`,e.jsx(r.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:["Wrapping element is ",e.jsx(r.code,{children:'<nav aria-label="Breadcrumb">'}),` (override via
`,e.jsx(r.code,{children:"aria-label"}),")."]}),`
`,e.jsxs(r.li,{children:["Items live inside an ",e.jsx(r.code,{children:"<ol>"})," so the order is conveyed to assistive tech."]}),`
`,e.jsxs(r.li,{children:["The last visible item is rendered as ",e.jsx(r.code,{children:'<span aria-current="page">'}),` — not a
link.`]}),`
`,e.jsxs(r.li,{children:["Disabled items render as anchors with ",e.jsx(r.code,{children:'aria-disabled="true"'}),` and
`,e.jsx(r.code,{children:"pointer-events: none"}),"."]}),`
`,e.jsxs(r.li,{children:["The collapsed ",e.jsx(r.code,{children:"…"})," button has ",e.jsx(r.code,{children:'aria-label="Show hidden breadcrumbs"'}),"."]}),`
`,e.jsxs(r.li,{children:[`
`,`
`]}),`
`]})]})}function X(t={}){const{wrapper:r}={...V(),...t.components};return r?e.jsx(r,{...t,children:e.jsx(T,{...t})}):T(t)}const de=Object.freeze(Object.defineProperty({__proto__:null,default:X},Symbol.toStringTag,{value:"Module"}));export{te as B,de as a};
