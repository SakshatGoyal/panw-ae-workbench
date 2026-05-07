import{j as e,b as ve,c as xe,e as ye}from"./index-CHjcGL7e.js";import{useMDXComponents as Y}from"./index-DVRRELxc.js";import{c as je,u as Ce,P as n}from"./usePrefix-BO8COP8A.js";import{R as we}from"./index-CwcVQgaJ.js";import{a as w}from"./index-B-lxVbXh.js";import{c as ke}from"./createLucideIcon-J4rvsbg-.js";import{C as De}from"./circle-x-CPXp-pH8.js";import{C as _e}from"./chevron-up-B0ULYV-4.js";import{C as Te}from"./chevron-down-qKlFP2mb.js";/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Se=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],Ie=ke("check",Se),Z=["default","small"],ee=["light","dark"],ae=["down","up"],o=we.forwardRef(function({label:a="Chip",size:ne="default",theme:se="light",icon:x=!1,image:v=!1,imageSrc:te,imageAlt:le="",closeable:ie=!0,dropdown:y=!1,dropdownDirection:re="down",active:j=!1,disabled:l=!1,className:ce,onClick:g,onClose:C,renderLeadingIcon:de=Ie,renderCloseIcon:pe=De,...me},ue){const s=Ce(),he=je(`${s}--chip`,{[`${s}--chip--small`]:ne==="small",[`${s}--chip--dark`]:se==="dark",[`${s}--chip--active`]:j,[`${s}--chip--disabled`]:l,[`${s}--chip--has-leading-visual`]:x||v},ce),fe=c=>{c.stopPropagation(),!l&&C&&C(c)},be=c=>{!l&&(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),g==null||g(c))},ge=re==="up"?_e:Te;return e.jsxs("div",{ref:ue,className:he,role:"button",tabIndex:l?-1:0,"aria-disabled":l||void 0,"aria-pressed":j||void 0,onClick:l?void 0:g,onKeyDown:be,...me,children:[x&&!v&&e.jsx("span",{className:`${s}--chip__icon`,"aria-hidden":"true",children:e.jsx(de,{size:16})}),v&&e.jsx("img",{className:`${s}--chip__image`,src:te||"https://via.placeholder.com/16",alt:le}),e.jsx("span",{className:`${s}--chip__label`,children:a}),ie&&!y&&e.jsx("button",{className:`${s}--chip__close`,type:"button",tabIndex:l?-1:0,"aria-label":`Remove ${a}`,onClick:fe,disabled:l,children:e.jsx(pe,{size:16})}),y&&e.jsx("span",{className:`${s}--chip__dropdown-icon`,"aria-hidden":"true",children:e.jsx(ge,{size:16})})]})});o.displayName="Chip";o.propTypes={label:n.string,size:n.oneOf(Z),theme:n.oneOf(ee),icon:n.bool,image:n.bool,imageSrc:n.string,imageAlt:n.string,closeable:n.bool,dropdown:n.bool,dropdownDirection:n.oneOf(ae),active:n.bool,disabled:n.bool,className:n.string,onClick:n.func,onClose:n.func,renderLeadingIcon:n.oneOfType([n.func,n.object]),renderCloseIcon:n.oneOfType([n.func,n.object])};o.__docgenInfo={description:"",methods:[],displayName:"Chip",props:{label:{required:!1,tsType:{name:"string"},description:"Text label inside the chip.",defaultValue:{value:"'Chip'",computed:!1},type:{name:"string"}},size:{required:!1,tsType:{name:"unknown[number]",raw:"(typeof ChipSizes)[number]"},description:"Size variant.",defaultValue:{value:"'default'",computed:!1},type:{name:"enum",value:[{value:"'default'",computed:!1},{value:"'small'",computed:!1}]}},theme:{required:!1,tsType:{name:"unknown[number]",raw:"(typeof ChipThemes)[number]"},description:"Theme — `light` (default) or `dark` background context.",defaultValue:{value:"'light'",computed:!1},type:{name:"enum",value:[{value:"'light'",computed:!1},{value:"'dark'",computed:!1}]}},icon:{required:!1,tsType:{name:"boolean"},description:"Show leading checkmark icon.",defaultValue:{value:"false",computed:!1},type:{name:"bool"}},image:{required:!1,tsType:{name:"boolean"},description:"Show leading image avatar.",defaultValue:{value:"false",computed:!1},type:{name:"bool"}},imageSrc:{required:!1,tsType:{name:"string"},description:"Image src when `image=true`.",type:{name:"string"}},imageAlt:{required:!1,tsType:{name:"string"},description:"Image alt text.",defaultValue:{value:"''",computed:!1},type:{name:"string"}},closeable:{required:!1,tsType:{name:"boolean"},description:"Show trailing close/dismiss icon.",defaultValue:{value:"true",computed:!1},type:{name:"bool"}},dropdown:{required:!1,tsType:{name:"boolean"},description:"Show trailing dropdown chevron icon.",defaultValue:{value:"false",computed:!1},type:{name:"bool"}},dropdownDirection:{required:!1,tsType:{name:"unknown[number]",raw:"(typeof ChipDropdownDirections)[number]"},description:"Direction for the dropdown chevron.",defaultValue:{value:"'down'",computed:!1},type:{name:"enum",value:[{value:"'down'",computed:!1},{value:"'up'",computed:!1}]}},active:{required:!1,tsType:{name:"boolean"},description:"Active/selected state — filled background with inverted colors.",defaultValue:{value:"false",computed:!1},type:{name:"bool"}},disabled:{required:!1,tsType:{name:"boolean"},description:"Disabled state — muted colors and no interaction.",defaultValue:{value:"false",computed:!1},type:{name:"bool"}},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: React.MouseEvent | React.KeyboardEvent) => void",signature:{arguments:[{type:{name:"union",raw:"React.MouseEvent | React.KeyboardEvent",elements:[{name:"ReactMouseEvent",raw:"React.MouseEvent"},{name:"ReactKeyboardEvent",raw:"React.KeyboardEvent"}]},name:"event"}],return:{name:"void"}}},description:"Click handler for the chip body.",type:{name:"func"}},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: React.MouseEvent<HTMLButtonElement>) => void",signature:{arguments:[{type:{name:"ReactMouseEvent",raw:"React.MouseEvent<HTMLButtonElement>",elements:[{name:"HTMLButtonElement"}]},name:"event"}],return:{name:"void"}}},description:"Close icon click handler.",type:{name:"func"}},renderLeadingIcon:{required:!1,tsType:{name:"ReactElementType",raw:"React.ElementType"},description:"Override the leading icon component (defaults to lucide `Check`).",defaultValue:{value:"Check",computed:!0},type:{name:"union",value:[{name:"func"},{name:"object"}]}},renderCloseIcon:{required:!1,tsType:{name:"ReactElementType",raw:"React.ElementType"},description:"Override the close icon component (defaults to lucide `XCircle`).",defaultValue:{value:"XCircle",computed:!0},type:{name:"union",value:[{name:"func"},{name:"object"}]}},className:{description:"",type:{name:"string"},required:!1}},composes:["Omit"]};const Ae={title:"Components/Chip",component:o,argTypes:{label:{control:"text"},size:{options:Z,control:{type:"radio"}},theme:{options:ee,control:{type:"radio"}},icon:{control:"boolean"},image:{control:"boolean"},closeable:{control:"boolean"},dropdown:{control:"boolean"},dropdownDirection:{options:ae,control:{type:"radio"}},active:{control:"boolean"},disabled:{control:"boolean"}},parameters:{docs:{page:oe}},tags:["autodocs"]},i=t=>e.jsx(o,{...t,onClick:w("onClick"),onClose:w("onClose")});i.args={label:"Chip",size:"default",theme:"light",icon:!1,image:!1,closeable:!0,dropdown:!1,dropdownDirection:"down",active:!1,disabled:!1};const d=()=>e.jsx(o,{label:"Selected",icon:!0}),p=()=>e.jsx(o,{label:"Avatar",image:!0,imageAlt:"user"}),m=()=>e.jsx(o,{label:"Filters",dropdown:!0,closeable:!1}),u=()=>e.jsx(o,{label:"Active",active:!0}),h=()=>e.jsx(o,{label:"Disabled",disabled:!0}),f=()=>e.jsx(o,{label:"Small",size:"small"}),b=()=>e.jsx("div",{style:{background:"#0e1317",padding:"16px"},children:e.jsx(o,{label:"Dark",theme:"dark"})}),r=()=>e.jsxs("div",{style:{fontFamily:"Inter, sans-serif",padding:"24px",display:"grid",gap:"16px"},children:[e.jsx("h3",{style:{fontSize:13,fontWeight:600},children:"Light theme"}),e.jsxs("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"},children:[e.jsx(o,{label:"Default"}),e.jsx(o,{label:"With icon",icon:!0}),e.jsx(o,{label:"Avatar",image:!0,imageAlt:""}),e.jsx(o,{label:"Dropdown",dropdown:!0,closeable:!1}),e.jsx(o,{label:"Active",active:!0}),e.jsx(o,{label:"Disabled",disabled:!0}),e.jsx(o,{label:"Small",size:"small"})]}),e.jsx("h3",{style:{fontSize:13,fontWeight:600},children:"Dark theme"}),e.jsxs("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap",background:"#0e1317",padding:"16px"},children:[e.jsx(o,{label:"Default",theme:"dark"}),e.jsx(o,{label:"Active",theme:"dark",active:!0}),e.jsx(o,{label:"Disabled",theme:"dark",disabled:!0})]})]});r.storyName="All Variants";r.parameters={controls:{disable:!0}};i.__docgenInfo={description:"",methods:[],displayName:"Default"};d.__docgenInfo={description:"",methods:[],displayName:"WithIcon"};p.__docgenInfo={description:"",methods:[],displayName:"WithImage"};m.__docgenInfo={description:"",methods:[],displayName:"WithDropdown"};u.__docgenInfo={description:"",methods:[],displayName:"Active"};h.__docgenInfo={description:"",methods:[],displayName:"Disabled"};f.__docgenInfo={description:"",methods:[],displayName:"Small"};b.__docgenInfo={description:"",methods:[],displayName:"DarkTheme"};r.__docgenInfo={description:"",methods:[],displayName:"AllVariants"};var D,_,T;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:"args => <Chip {...args} onClick={action('onClick')} onClose={action('onClose')} />",...(T=(_=i.parameters)==null?void 0:_.docs)==null?void 0:T.source}}};var S,I,A;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:'() => <Chip label="Selected" icon />',...(A=(I=d.parameters)==null?void 0:I.docs)==null?void 0:A.source}}};var N,E,R;p.parameters={...p.parameters,docs:{...(N=p.parameters)==null?void 0:N.docs,source:{originalSource:'() => <Chip label="Avatar" image imageAlt="user" />',...(R=(E=p.parameters)==null?void 0:E.docs)==null?void 0:R.source}}};var z,W,M;m.parameters={...m.parameters,docs:{...(z=m.parameters)==null?void 0:z.docs,source:{originalSource:'() => <Chip label="Filters" dropdown closeable={false} />',...(M=(W=m.parameters)==null?void 0:W.docs)==null?void 0:M.source}}};var V,q,O;u.parameters={...u.parameters,docs:{...(V=u.parameters)==null?void 0:V.docs,source:{originalSource:'() => <Chip label="Active" active />',...(O=(q=u.parameters)==null?void 0:q.docs)==null?void 0:O.source}}};var L,$,P;h.parameters={...h.parameters,docs:{...(L=h.parameters)==null?void 0:L.docs,source:{originalSource:'() => <Chip label="Disabled" disabled />',...(P=($=h.parameters)==null?void 0:$.docs)==null?void 0:P.source}}};var X,F,K;f.parameters={...f.parameters,docs:{...(X=f.parameters)==null?void 0:X.docs,source:{originalSource:'() => <Chip label="Small" size="small" />',...(K=(F=f.parameters)==null?void 0:F.docs)==null?void 0:K.source}}};var B,H,G;b.parameters={...b.parameters,docs:{...(B=b.parameters)==null?void 0:B.docs,source:{originalSource:`() => <div style={{
  background: '#0e1317',
  padding: '16px'
}}>
    <Chip label="Dark" theme="dark" />
  </div>`,...(G=(H=b.parameters)==null?void 0:H.docs)==null?void 0:G.source}}};var U,J,Q;r.parameters={...r.parameters,docs:{...(U=r.parameters)==null?void 0:U.docs,source:{originalSource:`() => <div style={{
  fontFamily: 'Inter, sans-serif',
  padding: '24px',
  display: 'grid',
  gap: '16px'
}}>
    <h3 style={{
    fontSize: 13,
    fontWeight: 600
  }}>Light theme</h3>
    <div style={{
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  }}>
      <Chip label="Default" />
      <Chip label="With icon" icon />
      <Chip label="Avatar" image imageAlt="" />
      <Chip label="Dropdown" dropdown closeable={false} />
      <Chip label="Active" active />
      <Chip label="Disabled" disabled />
      <Chip label="Small" size="small" />
    </div>
    <h3 style={{
    fontSize: 13,
    fontWeight: 600
  }}>Dark theme</h3>
    <div style={{
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    background: '#0e1317',
    padding: '16px'
  }}>
      <Chip label="Default" theme="dark" />
      <Chip label="Active" theme="dark" active />
      <Chip label="Disabled" theme="dark" disabled />
    </div>
  </div>`,...(Q=(J=r.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};const Ne=["Default","WithIcon","WithImage","WithDropdown","Active","Disabled","Small","DarkTheme","AllVariants"],$e=Object.freeze(Object.defineProperty({__proto__:null,Active:u,AllVariants:r,DarkTheme:b,Default:i,Disabled:h,Small:f,WithDropdown:m,WithIcon:d,WithImage:p,__namedExportsOrder:Ne,default:Ae},Symbol.toStringTag,{value:"Module"}));function k(t){const a={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...Y(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(ve,{isTemplate:!0}),`
`,e.jsx(a.h1,{id:"chip",children:"Chip"}),`
`,e.jsx(a.p,{children:e.jsx(a.a,{href:"packages/chips/src/Chip/Chip.tsx",children:"Source code"})}),`
`,e.jsx(a.h2,{id:"overview",children:"Overview"}),`
`,e.jsxs(a.p,{children:[`A pill-shaped interactive element used for filters, selections, tokenized
inputs, and tags-with-actions. Supports a leading icon `,e.jsx(a.strong,{children:"or"}),` image (mutually
exclusive), an optional close button, an optional dropdown chevron, and an
active/selected state. Dark theme variants are included.`]}),`
`,`
`,e.jsx(a.h2,{id:"live-demo",children:"Live Demo"}),`
`,e.jsx(xe,{of:i}),`
`,e.jsx(a.h2,{id:"code",children:"Code"}),`
`,e.jsx(a.pre,{children:e.jsx(a.code,{className:"language-jsx",children:`<Chip label="Filter" icon onClick={() => apply()} />
<Chip label="Removable" closeable onClose={() => remove()} />
<Chip label="Open menu" dropdown closeable={false} onClick={() => openMenu()} />
<Chip label="Selected" active />
`})}),`
`,e.jsx(a.h2,{id:"component-api",children:"Component API"}),`
`,e.jsx(ye,{}),`
`,e.jsx(a.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(a.ul,{children:[`
`,e.jsxs(a.li,{children:["The chip body has ",e.jsx(a.code,{children:'role="button"'}),", ",e.jsx(a.code,{children:"tabIndex={0}"}),`, and supports Enter/Space
activation when `,e.jsx(a.code,{children:"onClick"})," is supplied."]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.code,{children:"active"})," is reflected as ",e.jsx(a.code,{children:'aria-pressed="true"'})," (toggle-button semantics)."]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.code,{children:"disabled"})," sets ",e.jsx(a.code,{children:"aria-disabled"})," and removes the chip from the tab order."]}),`
`,e.jsxs(a.li,{children:["The close button is a real ",e.jsx(a.code,{children:"<button>"})," with an ",e.jsx(a.code,{children:"aria-label"}),` describing the
removal target ("Remove {label}").`]}),`
`,e.jsxs(a.li,{children:["Leading icon and dropdown chevron are ",e.jsx(a.code,{children:'aria-hidden="true"'})," (decorative)."]}),`
`,e.jsxs(a.li,{children:[`
`,`
`]}),`
`]}),`
`,e.jsxs(a.h2,{id:"api-change-renderleadingicon--rendercloseicon",children:["API Change: ",e.jsx(a.code,{children:"renderLeadingIcon"})," / ",e.jsx(a.code,{children:"renderCloseIcon"})]}),`
`,e.jsxs(a.p,{children:[`PANW's source rendered fixed inline SVGs for the checkmark and close. The port
exposes `,e.jsx(a.code,{children:"renderLeadingIcon"})," / ",e.jsx(a.code,{children:"renderCloseIcon"})," as ",e.jsx(a.code,{children:"ElementType"}),` overrides
defaulting to lucide-react `,e.jsx(a.code,{children:"Check"})," / ",e.jsx(a.code,{children:"XCircle"}),"."]})]})}function oe(t={}){const{wrapper:a}={...Y(),...t.components};return a?e.jsx(a,{...t,children:e.jsx(k,{...t})}):k(t)}const Pe=Object.freeze(Object.defineProperty({__proto__:null,default:oe},Symbol.toStringTag,{value:"Module"}));export{$e as C,Pe as a};
