import{j as e,b as ke,c as xe,e as ge}from"./index-CHjcGL7e.js";import{useMDXComponents as Q}from"./index-DVRRELxc.js";import{c as Le,u as ye,P as o}from"./usePrefix-BO8COP8A.js";import{R as c}from"./index-CwcVQgaJ.js";import{a as Y}from"./index-B-lxVbXh.js";import{c as Z}from"./createLucideIcon-J4rvsbg-.js";/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const je=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],be=Z("arrow-left",je);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ie=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],ve=Z("arrow-right",Ie),L=["14px","18px"],y=["blue","black"],ee=["hover","pressed"],i=c.forwardRef(function({size:n="14px",color:x="blue",disabled:k=!1,leftIcon:re=!1,rightIcon:oe=!1,children:ie="Link text",href:g,onClick:se,forceState:j,renderLeftIcon:ae=be,renderRightIcon:te=ve,className:ce,rel:le,target:de,...pe},he){const t=ye(),b=n==="18px"?24:16,ue=Le(`${t}--link`,`${t}--link--${n.replace("px","")}px`,`${t}--link--${x}`,{[`${t}--link--disabled`]:k,[`${t}--link--${j}`]:j},ce),fe=g?"a":"span",me=g?{href:k?void 0:g,rel:le,target:de}:{role:"link"};return c.createElement(fe,{...pe,...me,className:ue,onClick:k?void 0:se,"aria-disabled":k?!0:void 0,tabIndex:k?-1:0,ref:he},re&&c.createElement("span",{className:`${t}--link__icon-wrap`,"aria-hidden":!0,key:"left"},c.createElement(ae,{size:b})),ie,oe&&c.createElement("span",{className:`${t}--link__icon-wrap`,"aria-hidden":!0,key:"right"},c.createElement(te,{size:b})))});i.displayName="Link";i.propTypes={size:o.oneOf(L),color:o.oneOf(y),disabled:o.bool,leftIcon:o.bool,rightIcon:o.bool,href:o.string,rel:o.string,target:o.string,forceState:o.oneOf(ee),renderLeftIcon:o.oneOfType([o.func,o.object]),renderRightIcon:o.oneOfType([o.func,o.object]),className:o.string,children:o.node,onClick:o.func};i.__docgenInfo={description:"",methods:[],displayName:"Link",props:{size:{required:!1,tsType:{name:"unknown[number]",raw:"(typeof LinkSizes)[number]"},description:"Font size variant.",defaultValue:{value:"'14px'",computed:!1},type:{name:"enum",value:[{value:"'14px'",computed:!1},{value:"'18px'",computed:!1}]}},color:{required:!1,tsType:{name:"unknown[number]",raw:"(typeof LinkColors)[number]"},description:"Color palette — `blue` for primary actions, `black` for neutral.",defaultValue:{value:"'blue'",computed:!1},type:{name:"enum",value:[{value:"'blue'",computed:!1},{value:"'black'",computed:!1}]}},disabled:{required:!1,tsType:{name:"boolean"},description:"Disables interaction and applies muted color.",defaultValue:{value:"false",computed:!1},type:{name:"bool"}},leftIcon:{required:!1,tsType:{name:"boolean"},description:"Show a leading left-arrow icon.",defaultValue:{value:"false",computed:!1},type:{name:"bool"}},rightIcon:{required:!1,tsType:{name:"boolean"},description:"Show a trailing right-arrow icon.",defaultValue:{value:"false",computed:!1},type:{name:"bool"}},href:{required:!1,tsType:{name:"string"},description:"Navigation href — when set, renders as `<a>`; otherwise renders as `<span>`.",type:{name:"string"}},rel:{required:!1,tsType:{name:"string"},description:"Optional rel attribute when rendered as `<a>`.",type:{name:"string"}},target:{required:!1,tsType:{name:"string"},description:"Optional target attribute when rendered as `<a>`.",type:{name:"string"}},forceState:{required:!1,tsType:{name:"unknown[number]",raw:"(typeof LinkForceStates)[number]"},description:"Forces a visual state for documentation/snapshot scenarios.\nMirrors PANW's `forceState` prop.",type:{name:"enum",value:[{value:"'hover'",computed:!1},{value:"'pressed'",computed:!1}]}},renderLeftIcon:{required:!1,tsType:{name:"ReactElementType",raw:"React.ElementType"},description:"Override the leading icon component. Defaults to lucide `ArrowLeft`.\nPass an ElementType (Carbon convention).",defaultValue:{value:"ArrowLeft",computed:!0},type:{name:"union",value:[{name:"func"},{name:"object"}]}},renderRightIcon:{required:!1,tsType:{name:"ReactElementType",raw:"React.ElementType"},description:"Override the trailing icon component. Defaults to lucide `ArrowRight`.",defaultValue:{value:"ArrowRight",computed:!0},type:{name:"union",value:[{name:"func"},{name:"object"}]}},children:{defaultValue:{value:"'Link text'",computed:!1},description:"",type:{name:"node"},required:!1},className:{description:"",type:{name:"string"},required:!1},onClick:{description:"",type:{name:"func"},required:!1}},composes:["Omit"]};const we={size:{options:L,control:{type:"radio"}},color:{options:y,control:{type:"radio"}},disabled:{control:"boolean"},leftIcon:{control:"boolean"},rightIcon:{control:"boolean"},href:{control:"text"},forceState:{options:["none",...ee],control:{type:"select"}}},_e={title:"Components/Link",component:i,argTypes:we,parameters:{docs:{page:ne}},tags:["autodocs"]},s=r=>{const{forceState:n,...x}=r;return e.jsx(i,{...x,forceState:n==="none"?void 0:n,onClick:Y("onClick"),children:"Link text"})};s.args={size:"14px",color:"blue",disabled:!1,leftIcon:!1,rightIcon:!1,href:"#",forceState:"none"};const l=()=>e.jsx(i,{href:"#",color:"blue",children:"Blue link"}),d=()=>e.jsx(i,{href:"#",color:"black",children:"Black link"}),p=()=>e.jsx(i,{href:"#",size:"18px",children:"Large link"}),h=()=>e.jsx(i,{href:"#",leftIcon:!0,children:"Back"}),u=()=>e.jsx(i,{href:"#",rightIcon:!0,children:"Continue"}),f=()=>e.jsx(i,{href:"#",disabled:!0,children:"Disabled link"}),m=()=>e.jsx(i,{onClick:Y("onClick"),children:"No href, renders as span"}),a=()=>e.jsx("div",{style:{fontFamily:"Inter, sans-serif",padding:"24px",display:"grid",gap:"12px"},children:y.map(r=>L.map(n=>e.jsxs("div",{style:{display:"flex",gap:"24px",alignItems:"center"},children:[e.jsxs("span",{style:{width:90,fontSize:12},children:[r," / ",n]}),e.jsx(i,{href:"#",color:r,size:n,children:"Default"}),e.jsx(i,{href:"#",color:r,size:n,forceState:"hover",children:"Hover"}),e.jsx(i,{href:"#",color:r,size:n,forceState:"pressed",children:"Pressed"}),e.jsx(i,{href:"#",color:r,size:n,disabled:!0,children:"Disabled"}),e.jsx(i,{href:"#",color:r,size:n,leftIcon:!0,children:"With Left"}),e.jsx(i,{href:"#",color:r,size:n,rightIcon:!0,children:"With Right"})]},`${r}-${n}`)))});a.storyName="All Variants";a.parameters={controls:{disable:!0}};s.__docgenInfo={description:"",methods:[],displayName:"Default"};l.__docgenInfo={description:"",methods:[],displayName:"Blue"};d.__docgenInfo={description:"",methods:[],displayName:"Black"};p.__docgenInfo={description:"",methods:[],displayName:"Large"};h.__docgenInfo={description:"",methods:[],displayName:"WithLeftIcon"};u.__docgenInfo={description:"",methods:[],displayName:"WithRightIcon"};f.__docgenInfo={description:"",methods:[],displayName:"Disabled"};m.__docgenInfo={description:"",methods:[],displayName:"SpanLink"};a.__docgenInfo={description:"",methods:[],displayName:"AllVariants"};var v,w,_;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`args => {
  const {
    forceState,
    ...rest
  } = args;
  return <Link {...rest} forceState={forceState === 'none' ? undefined : forceState} onClick={action('onClick')}>
      Link text
    </Link>;
}`,...(_=(w=s.parameters)==null?void 0:w.docs)==null?void 0:_.source}}};var S,C,N;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:'() => <Link href="#" color="blue">Blue link</Link>',...(N=(C=l.parameters)==null?void 0:C.docs)==null?void 0:N.source}}};var T,z,R;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:'() => <Link href="#" color="black">Black link</Link>',...(R=(z=d.parameters)==null?void 0:z.docs)==null?void 0:R.source}}};var D,A,O;p.parameters={...p.parameters,docs:{...(D=p.parameters)==null?void 0:D.docs,source:{originalSource:'() => <Link href="#" size="18px">Large link</Link>',...(O=(A=p.parameters)==null?void 0:A.docs)==null?void 0:O.source}}};var $,q,P;h.parameters={...h.parameters,docs:{...($=h.parameters)==null?void 0:$.docs,source:{originalSource:'() => <Link href="#" leftIcon>Back</Link>',...(P=(q=h.parameters)==null?void 0:q.docs)==null?void 0:P.source}}};var W,B,E;u.parameters={...u.parameters,docs:{...(W=u.parameters)==null?void 0:W.docs,source:{originalSource:'() => <Link href="#" rightIcon>Continue</Link>',...(E=(B=u.parameters)==null?void 0:B.docs)==null?void 0:E.source}}};var V,M,F;f.parameters={...f.parameters,docs:{...(V=f.parameters)==null?void 0:V.docs,source:{originalSource:'() => <Link href="#" disabled>Disabled link</Link>',...(F=(M=f.parameters)==null?void 0:M.docs)==null?void 0:F.source}}};var H,X,G;m.parameters={...m.parameters,docs:{...(H=m.parameters)==null?void 0:H.docs,source:{originalSource:"() => <Link onClick={action('onClick')}>No href, renders as span</Link>",...(G=(X=m.parameters)==null?void 0:X.docs)==null?void 0:G.source}}};var U,J,K;a.parameters={...a.parameters,docs:{...(U=a.parameters)==null?void 0:U.docs,source:{originalSource:`() => <div style={{
  fontFamily: 'Inter, sans-serif',
  padding: '24px',
  display: 'grid',
  gap: '12px'
}}>
    {LinkColors.map(color => LinkSizes.map(size => <div key={\`\${color}-\${size}\`} style={{
    display: 'flex',
    gap: '24px',
    alignItems: 'center'
  }}>
          <span style={{
      width: 90,
      fontSize: 12
    }}>{color} / {size}</span>
          <Link href="#" color={color} size={size}>Default</Link>
          <Link href="#" color={color} size={size} forceState="hover">Hover</Link>
          <Link href="#" color={color} size={size} forceState="pressed">Pressed</Link>
          <Link href="#" color={color} size={size} disabled>Disabled</Link>
          <Link href="#" color={color} size={size} leftIcon>With Left</Link>
          <Link href="#" color={color} size={size} rightIcon>With Right</Link>
        </div>))}
  </div>`,...(K=(J=a.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};const Se=["Default","Blue","Black","Large","WithLeftIcon","WithRightIcon","Disabled","SpanLink","AllVariants"],Ae=Object.freeze(Object.defineProperty({__proto__:null,AllVariants:a,Black:d,Blue:l,Default:s,Disabled:f,Large:p,SpanLink:m,WithLeftIcon:h,WithRightIcon:u,__namedExportsOrder:Se,default:_e},Symbol.toStringTag,{value:"Module"}));function I(r){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...Q(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(ke,{isTemplate:!0}),`
`,e.jsx(n.h1,{id:"link",children:"Link"}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{href:"packages/link/src/Link/Link.tsx",children:"Source code"})}),`
`,e.jsx(n.h2,{id:"overview",children:"Overview"}),`
`,e.jsxs(n.p,{children:["Inline text link with two color palettes (",e.jsx(n.code,{children:"blue"}),", ",e.jsx(n.code,{children:"black"}),"), two sizes (",e.jsx(n.code,{children:"14px"}),`,
`,e.jsx(n.code,{children:"18px"}),`), optional leading/trailing arrow icons, and a disabled state. Renders
as `,e.jsx(n.code,{children:"<a>"})," when ",e.jsx(n.code,{children:"href"})," is provided, otherwise as a ",e.jsx(n.code,{children:'<span role="link">'}),"."]}),`
`,`
`,e.jsx(n.h2,{id:"live-demo",children:"Live Demo"}),`
`,e.jsx(xe,{of:s}),`
`,e.jsx(n.h2,{id:"code",children:"Code"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`<Link href="/path">Inline link</Link>
<Link href="/back" leftIcon>Back</Link>
<Link href="/next" rightIcon size="18px">Continue</Link>
<Link disabled>Unavailable</Link>
`})}),`
`,e.jsx(n.h2,{id:"component-api",children:"Component API"}),`
`,e.jsx(ge,{}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Renders as ",e.jsx(n.code,{children:"<a>"})," when ",e.jsx(n.code,{children:"href"}),` is provided — native focus, activation, and
screen reader announcement work out of the box.`]}),`
`,e.jsxs(n.li,{children:["Without ",e.jsx(n.code,{children:"href"}),", renders as ",e.jsx(n.code,{children:'<span role="link">'})," for click-only handlers."]}),`
`,e.jsxs(n.li,{children:["Disabled links use ",e.jsx(n.code,{children:'aria-disabled="true"'})," and ",e.jsx(n.code,{children:"tabIndex={-1}"}),` so they remain
in the DOM but are not focusable or interactive.`]}),`
`,e.jsxs(n.li,{children:["Icons (",e.jsx(n.code,{children:"leftIcon"}),", ",e.jsx(n.code,{children:"rightIcon"}),") are wrapped in a span with ",e.jsx(n.code,{children:'aria-hidden="true"'}),"."]}),`
`,e.jsxs(n.li,{children:[`
`,`
`]}),`
`]}),`
`,e.jsxs(n.h2,{id:"api-change-renderlefticon--renderrighticon",children:["API Change: ",e.jsx(n.code,{children:"renderLeftIcon"})," / ",e.jsx(n.code,{children:"renderRightIcon"})]}),`
`,e.jsxs(n.p,{children:["PANW's source rendered fixed inline arrow SVGs. The port keeps ",e.jsx(n.code,{children:"leftIcon"}),` /
`,e.jsx(n.code,{children:"rightIcon"}),` as the boolean toggle (matches PANW behavior) but exposes
`,e.jsx(n.code,{children:"renderLeftIcon"})," / ",e.jsx(n.code,{children:"renderRightIcon"})," as ",e.jsx(n.code,{children:"ElementType"}),` overrides, defaulting to
lucide-react `,e.jsx(n.code,{children:"ArrowLeft"})," / ",e.jsx(n.code,{children:"ArrowRight"}),"."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { ChevronRight } from 'lucide-react';

<Link href="#" rightIcon renderRightIcon={ChevronRight}>Continue</Link>
`})})]})}function ne(r={}){const{wrapper:n}={...Q(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(I,{...r})}):I(r)}const Oe=Object.freeze(Object.defineProperty({__proto__:null,default:ne},Symbol.toStringTag,{value:"Module"}));export{Ae as L,Oe as a};
