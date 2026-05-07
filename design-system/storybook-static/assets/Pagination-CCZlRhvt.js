import{j as e,b as Z,c as ee,e as ne}from"./index-CHjcGL7e.js";import{useMDXComponents as G}from"./index-DVRRELxc.js";import{c as ae,u as se,P as i}from"./usePrefix-BO8COP8A.js";import{R as re,r as p}from"./index-CwcVQgaJ.js";import{a as S}from"./index-B-lxVbXh.js";import{I}from"./IconButton-C8BMBA2O.js";import{c as H}from"./createLucideIcon-J4rvsbg-.js";import{C as te}from"./chevron-left-BBQcUyWS.js";import{B as oe}from"./Button-D4eivoW6.js";import{C as ie}from"./chevron-right-CV6jF4o6.js";import{b as ce}from"./Dropdown-RDN5s2J4.js";/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const le=[["path",{d:"m6 17 5-5-5-5",key:"xnjwq"}],["path",{d:"m13 17 5-5-5-5",key:"17xmmf"}]],de=H("chevrons-right",le);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pe=[["path",{d:"m11 17-5-5 5-5",key:"13zhaf"}],["path",{d:"m18 17-5-5 5-5",key:"h8a8et"}]],ue=H("chevrons-left",pe);function me(a,n,c){if(n<=c)return Array.from({length:n},(l,f)=>f+1);const o=[],P=Math.floor((c-2)/2);let s=a-P,u=a+P;s<2&&(s=2,u=s+c-3),u>n-1&&(u=n-1,s=u-c+3),s<2&&(s=2),o.push(1),s>2&&o.push(null);for(let l=s;l<=u;l++)o.push(l);return u<n-1&&o.push(null),n>1&&o.push(n),o}const t=re.forwardRef(function({totalItems:n,currentPage:c=1,rowsPerPage:o=10,rowsPerPageOptions:P=[10,25,50,100],showItemsPerPage:s=!0,background:u="grey00",onPageChange:l,onRowsPerPageChange:f,maxVisiblePages:_=10,className:K},Q){const x=se(),h=Math.max(1,Math.ceil(n/o)),d=Math.min(Math.max(1,c),h),U=p.useMemo(()=>me(d,h,_),[d,h,_]),C=d===1,N=d===h,w=p.useCallback(r=>{r>=1&&r<=h&&r!==d&&(l==null||l(r))},[h,d,l]),W=p.useMemo(()=>P.map(r=>({label:String(r),value:String(r)})),[P]),Y=p.useCallback(r=>{const v=parseInt(r,10);isNaN(v)||f==null||f(v)},[f]);return e.jsxs("div",{ref:Q,className:ae(`${x}--pagination`,K),children:[e.jsxs("div",{className:`${x}--pagination__page-numbers`,children:[e.jsx(I,{kind:"ghost",size:"sm",iconSize:16,shape:"square",renderIcon:ue,"aria-label":"First page",disabled:C,onClick:()=>w(1)}),e.jsx(I,{kind:"ghost",size:"sm",iconSize:16,shape:"square",renderIcon:te,"aria-label":"Previous page",disabled:C,onClick:()=>w(d-1)}),U.map((r,v)=>r===null?e.jsx("span",{className:`${x}--pagination__ellipsis`,children:"…"},`ellipsis-${v}`):e.jsx(oe,{kind:"ghost-accent",size:"small",shape:"pill","aria-current":r===d?"page":void 0,"aria-label":`Page ${r}`,onClick:()=>w(r),children:String(r).padStart(2,"0")},r)),e.jsx(I,{kind:"ghost",size:"sm",iconSize:16,shape:"square",renderIcon:ie,"aria-label":"Next page",disabled:N,onClick:()=>w(d+1)}),e.jsx(I,{kind:"ghost",size:"sm",iconSize:16,shape:"square",renderIcon:de,"aria-label":"Last page",disabled:N,onClick:()=>w(h)})]}),s&&e.jsxs("div",{className:`${x}--pagination__items-per-page`,children:[e.jsx("span",{className:`${x}--pagination__items-per-page-label`,children:"Items per page"}),e.jsx("div",{className:`${x}--pagination__dropdown-wrapper`,children:e.jsx(ce,{background:u,size:"default",showTitle:!1,showDescription:!1,placeholder:"###",options:W,selectedValue:String(o),onChange:Y})})]})]})});t.displayName="Pagination";t.propTypes={totalItems:i.number.isRequired,currentPage:i.number,rowsPerPage:i.number,rowsPerPageOptions:i.arrayOf(i.number),showItemsPerPage:i.bool,background:i.oneOf(["grey10","grey00"]),onPageChange:i.func,onRowsPerPageChange:i.func,maxVisiblePages:i.number,className:i.string};t.__docgenInfo={description:"",methods:[],displayName:"Pagination",props:{totalItems:{required:!0,tsType:{name:"number"},description:"",type:{name:"number"}},currentPage:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1},type:{name:"number"}},rowsPerPage:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"10",computed:!1},type:{name:"number"}},rowsPerPageOptions:{required:!1,tsType:{name:"Array",elements:[{name:"number"}],raw:"number[]"},description:"",defaultValue:{value:"[10, 25, 50, 100]",computed:!1},type:{name:"arrayOf",value:{name:"number"}}},showItemsPerPage:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1},type:{name:"bool"}},background:{required:!1,tsType:{name:"union",raw:"'grey10' | 'grey00'",elements:[{name:"literal",value:"'grey10'"},{name:"literal",value:"'grey00'"}]},description:"",defaultValue:{value:"'grey00'",computed:!1},type:{name:"enum",value:[{value:"'grey10'",computed:!1},{value:"'grey00'",computed:!1}]}},onPageChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(page: number) => void",signature:{arguments:[{type:{name:"number"},name:"page"}],return:{name:"void"}}},description:"",type:{name:"func"}},onRowsPerPageChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(rowsPerPage: number) => void",signature:{arguments:[{type:{name:"number"},name:"rowsPerPage"}],return:{name:"void"}}},description:"",type:{name:"func"}},maxVisiblePages:{required:!1,tsType:{name:"number"},description:"Maximum number of visible page buttons (excluding ellipsis).",defaultValue:{value:"10",computed:!1},type:{name:"number"}},className:{required:!1,tsType:{name:"string"},description:"",type:{name:"string"}}}};const ge={title:"Components/Pagination",component:t,argTypes:{totalItems:{control:"number"},rowsPerPage:{control:"number"},showItemsPerPage:{control:"boolean"},background:{options:["grey00","grey10"],control:"radio"},maxVisiblePages:{control:"number"}},parameters:{docs:{page:J}},tags:["autodocs"]},m=a=>{const[n,c]=p.useState(1),[o,P]=p.useState(a.rowsPerPage??10);return e.jsx(t,{...a,currentPage:n,rowsPerPage:o,onPageChange:s=>{c(s),S("onPageChange")(s)},onRowsPerPageChange:s=>{P(s),c(1),S("onRowsPerPageChange")(s)}})};m.args={totalItems:247,rowsPerPage:10,showItemsPerPage:!0,background:"grey00"};const j=()=>{const[a,n]=p.useState(2);return e.jsx(t,{totalItems:30,rowsPerPage:10,currentPage:a,onPageChange:n})},b=()=>{const[a,n]=p.useState(7);return e.jsx(t,{totalItems:500,rowsPerPage:10,currentPage:a,onPageChange:n})},y=()=>{const[a,n]=p.useState(1);return e.jsx(t,{totalItems:120,rowsPerPage:10,currentPage:a,onPageChange:n,showItemsPerPage:!1})},g=()=>e.jsxs("div",{style:{padding:24,background:"#f9f9f9",display:"flex",flexDirection:"column",gap:16},children:[e.jsx(t,{totalItems:30,rowsPerPage:10,currentPage:1}),e.jsx(t,{totalItems:120,rowsPerPage:10,currentPage:5}),e.jsx(t,{totalItems:500,rowsPerPage:10,currentPage:20}),e.jsx(t,{totalItems:120,rowsPerPage:10,currentPage:5,showItemsPerPage:!1})]});g.storyName="All Variants";g.parameters={controls:{disable:!0}};m.__docgenInfo={description:"",methods:[],displayName:"Default"};j.__docgenInfo={description:"",methods:[],displayName:"FewPages"};b.__docgenInfo={description:"",methods:[],displayName:"ManyPages"};y.__docgenInfo={description:"",methods:[],displayName:"NoItemsPerPage"};g.__docgenInfo={description:"",methods:[],displayName:"AllVariants"};var T,M,q;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`args => {
  const [page, setPage] = useState(1);
  const [rpp, setRpp] = useState(args.rowsPerPage ?? 10);
  return <Pagination {...args} currentPage={page} rowsPerPage={rpp} onPageChange={p => {
    setPage(p);
    action('onPageChange')(p);
  }} onRowsPerPageChange={n => {
    setRpp(n);
    setPage(1);
    action('onRowsPerPageChange')(n);
  }} />;
}`,...(q=(M=m.parameters)==null?void 0:M.docs)==null?void 0:q.source}}};var z,R,D;j.parameters={...j.parameters,docs:{...(z=j.parameters)==null?void 0:z.docs,source:{originalSource:`() => {
  const [p, setP] = useState(2);
  return <Pagination totalItems={30} rowsPerPage={10} currentPage={p} onPageChange={setP} />;
}`,...(D=(R=j.parameters)==null?void 0:R.docs)==null?void 0:D.source}}};var O,$,V;b.parameters={...b.parameters,docs:{...(O=b.parameters)==null?void 0:O.docs,source:{originalSource:`() => {
  const [p, setP] = useState(7);
  return <Pagination totalItems={500} rowsPerPage={10} currentPage={p} onPageChange={setP} />;
}`,...(V=($=b.parameters)==null?void 0:$.docs)==null?void 0:V.source}}};var A,L,F;y.parameters={...y.parameters,docs:{...(A=y.parameters)==null?void 0:A.docs,source:{originalSource:`() => {
  const [p, setP] = useState(1);
  return <Pagination totalItems={120} rowsPerPage={10} currentPage={p} onPageChange={setP} showItemsPerPage={false} />;
}`,...(F=(L=y.parameters)==null?void 0:L.docs)==null?void 0:F.source}}};var B,E,X;g.parameters={...g.parameters,docs:{...(B=g.parameters)==null?void 0:B.docs,source:{originalSource:`() => <div style={{
  padding: 24,
  background: '#f9f9f9',
  display: 'flex',
  flexDirection: 'column',
  gap: 16
}}>
    <Pagination totalItems={30} rowsPerPage={10} currentPage={1} />
    <Pagination totalItems={120} rowsPerPage={10} currentPage={5} />
    <Pagination totalItems={500} rowsPerPage={10} currentPage={20} />
    <Pagination totalItems={120} rowsPerPage={10} currentPage={5} showItemsPerPage={false} />
  </div>`,...(X=(E=g.parameters)==null?void 0:E.docs)==null?void 0:X.source}}};const Pe=["Default","FewPages","ManyPages","NoItemsPerPage","AllVariants"],Ne=Object.freeze(Object.defineProperty({__proto__:null,AllVariants:g,Default:m,FewPages:j,ManyPages:b,NoItemsPerPage:y,__namedExportsOrder:Pe,default:ge},Symbol.toStringTag,{value:"Module"}));function k(a){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...G(),...a.components};return e.jsxs(e.Fragment,{children:[e.jsx(Z,{isTemplate:!0}),`
`,e.jsx(n.h1,{id:"pagination",children:"Pagination"}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{href:"packages/pagination/src/Pagination/Pagination.tsx",children:"Source code"})}),`
`,e.jsx(n.h2,{id:"overview",children:"Overview"}),`
`,e.jsx(n.p,{children:`Page navigation with First / Previous / page number buttons / ellipsis /
Next / Last, plus an optional "Items per page" dropdown.`}),`
`,e.jsx(n.h2,{id:"composition",children:"Composition"}),`
`,e.jsx(n.p,{children:`This component composes three tier-0/tier-1 components — all imported,
none redefined:`}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Page number buttons"})," — ",e.jsx(n.code,{children:"Button"})," from ",e.jsx(n.code,{children:"@ds/button"})," (kind=",e.jsx(n.code,{children:"ghost-accent"}),`,
shape=`,e.jsx(n.code,{children:"pill"}),", size=",e.jsx(n.code,{children:"small"}),")."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Navigation buttons"})," (first/prev/next/last) — ",e.jsx(n.code,{children:"IconButton"}),` from
`,e.jsx(n.code,{children:"@ds/button"})," (kind=",e.jsx(n.code,{children:"ghost"}),", shape=",e.jsx(n.code,{children:"square"}),")."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Items-per-page selector"})," — ",e.jsx(n.code,{children:"Dropdown"})," from ",e.jsx(n.code,{children:"@ds/dropdown"}),`
(single-select, NOT MultiSelect).`]}),`
`]}),`
`,e.jsx(n.h2,{id:"live-demo",children:"Live Demo"}),`
`,e.jsx(ee,{of:m}),`
`,e.jsx(n.h2,{id:"component-api",children:"Component API"}),`
`,e.jsx(ne,{}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The active page button gets ",e.jsx(n.code,{children:'aria-current="page"'}),"."]}),`
`,e.jsxs(n.li,{children:["Each navigation ",e.jsx(n.code,{children:"IconButton"})," has an explicit ",e.jsx(n.code,{children:"aria-label"}),`
(`,e.jsx(n.code,{children:"First page"}),", ",e.jsx(n.code,{children:"Previous page"}),", ",e.jsx(n.code,{children:"Next page"}),", ",e.jsx(n.code,{children:"Last page"}),")."]}),`
`,e.jsxs(n.li,{children:["Page number buttons get ",e.jsx(n.code,{children:'aria-label="Page N"'}),"."]}),`
`]}),`
`]})}function J(a={}){const{wrapper:n}={...G(),...a.components};return n?e.jsx(n,{...a,children:e.jsx(k,{...a})}):k(a)}const Se=Object.freeze(Object.defineProperty({__proto__:null,default:J},Symbol.toStringTag,{value:"Module"}));export{Ne as P,Se as a};
