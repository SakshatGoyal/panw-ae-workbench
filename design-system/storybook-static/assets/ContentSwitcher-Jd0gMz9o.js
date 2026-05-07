import{j as e,b as re,c as oe,e as ie}from"./index-CHjcGL7e.js";import{useMDXComponents as H}from"./index-DVRRELxc.js";import{c as w,u as de,P as s}from"./usePrefix-BO8COP8A.js";import{R as ce,r as g}from"./index-CwcVQgaJ.js";import{a as le}from"./index-B-lxVbXh.js";import{c as I}from"./createLucideIcon-J4rvsbg-.js";/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const me=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],he=I("calendar",me);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pe=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M3 15h18",key:"5xshup"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"M15 3v18",key:"14nvp0"}]],ue=I("grid-3x3",pe);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xe=[["path",{d:"M3 5h.01",key:"18ugdj"}],["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M3 19h.01",key:"noohij"}],["path",{d:"M8 5h13",key:"1pao27"}],["path",{d:"M8 12h13",key:"1za7za"}],["path",{d:"M8 19h13",key:"m83p4d"}]],ge=I("list",xe),j=["small","default","large"],J=["gray10","gray00"],a=ce.forwardRef(function({items:n,selectedIndex:y,onChange:u,size:Q="small",background:U="gray10",disabled:S=!1,className:Y,...Z},ee){const i=de(),ne=w(`${i}--content-switcher`,{[`${i}--content-switcher--bg-gray00`]:U==="gray00"},Y);return e.jsx("div",{ref:ee,className:ne,role:"tablist",...Z,children:n.map((x,f)=>{const b=f===y,te=x.showLabel!==!1,se=x.showIcon!==!1&&x.renderIcon!=null,C=x.renderIcon,ae=w(`${i}--content-switcher__item`,`${i}--content-switcher__item--${Q}`,b?`${i}--content-switcher__item--selected`:`${i}--content-switcher__item--unselected`);return e.jsxs("button",{type:"button",className:ae,role:"tab","aria-selected":b,tabIndex:b?0:-1,disabled:S,onClick:()=>{!S&&!b&&u&&u(f)},children:[te&&e.jsx("span",{children:x.label}),se&&C&&e.jsx("span",{className:`${i}--content-switcher__icon`,"aria-hidden":"true",children:e.jsx(C,{size:16})})]},f)})})});a.displayName="ContentSwitcher";a.propTypes={items:s.arrayOf(s.shape({label:s.string.isRequired,renderIcon:s.oneOfType([s.func,s.object]),showIcon:s.bool,showLabel:s.bool})).isRequired,selectedIndex:s.number.isRequired,onChange:s.func,size:s.oneOf(j),background:s.oneOf(J),disabled:s.bool,className:s.string};a.__docgenInfo={description:"",methods:[],displayName:"ContentSwitcher",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"ContentSwitcherItem"}],raw:"ContentSwitcherItem[]"},description:"Items (segments) to render.",type:{name:"arrayOf",value:{name:"shape",value:{label:{name:"string",required:!0},renderIcon:{name:"union",value:[{name:"func"},{name:"object"}],required:!1},showIcon:{name:"bool",required:!1},showLabel:{name:"bool",required:!1}}}}},selectedIndex:{required:!0,tsType:{name:"number"},description:"Index of the currently selected segment. Controlled.",type:{name:"number"}},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(index: number) => void",signature:{arguments:[{type:{name:"number"},name:"index"}],return:{name:"void"}}},description:"Fired when a segment is clicked.",type:{name:"func"}},size:{required:!1,tsType:{name:"unknown[number]",raw:"(typeof ContentSwitcherSizes)[number]"},description:"Size variant — controls vertical padding.",defaultValue:{value:"'small'",computed:!1},type:{name:"enum",value:[{value:"'small'",computed:!1},{value:"'default'",computed:!1},{value:"'large'",computed:!1}]}},background:{required:!1,tsType:{name:"unknown[number]",raw:"(typeof ContentSwitcherBackgrounds)[number]"},description:"Background context — affects unselected hover/pressed colors.",defaultValue:{value:"'gray10'",computed:!1},type:{name:"enum",value:[{value:"'gray10'",computed:!1},{value:"'gray00'",computed:!1}]}},disabled:{required:!1,tsType:{name:"boolean"},description:"Disables all segments.",defaultValue:{value:"false",computed:!1},type:{name:"bool"}},className:{description:"",type:{name:"string"},required:!1}},composes:["Omit"]};const c=[{label:"First"},{label:"Second"},{label:"Third"}],be={title:"Components/ContentSwitcher",component:a,argTypes:{size:{options:j,control:{type:"radio"}},background:{options:J,control:{type:"radio"}},disabled:{control:"boolean"}},parameters:{docs:{page:K}},tags:["autodocs"]},r=t=>{const[n,y]=g.useState(0);return e.jsx(a,{...t,items:c,selectedIndex:n,onChange:u=>{y(u),le("onChange")(u)}})};r.args={size:"small",background:"gray10",disabled:!1};const l=()=>{const[t,n]=g.useState(0);return e.jsx(a,{size:"small",items:c,selectedIndex:t,onChange:n})},d=()=>{const[t,n]=g.useState(0);return e.jsx(a,{size:"default",items:c,selectedIndex:t,onChange:n})};d.storyName="Size: default";const m=()=>{const[t,n]=g.useState(0);return e.jsx(a,{size:"large",items:c,selectedIndex:t,onChange:n})},h=()=>{const[t,n]=g.useState(0);return e.jsx(a,{items:[{label:"List",renderIcon:ge},{label:"Grid",renderIcon:ue},{label:"Calendar",renderIcon:he}],selectedIndex:t,onChange:n})},p=()=>e.jsx(a,{disabled:!0,items:c,selectedIndex:0}),o=()=>e.jsxs("div",{style:{fontFamily:"Inter, sans-serif",padding:"24px",display:"grid",gap:"16px"},children:[j.map(t=>e.jsxs("div",{children:[e.jsxs("p",{style:{fontSize:12,marginBottom:4},children:["size: ",t]}),e.jsx(a,{items:c,selectedIndex:0,size:t})]},t)),e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:12,marginBottom:4},children:"disabled"}),e.jsx(a,{items:c,selectedIndex:1,disabled:!0})]})]});o.storyName="All Variants";o.parameters={controls:{disable:!0}};r.__docgenInfo={description:"",methods:[],displayName:"Default"};l.__docgenInfo={description:"",methods:[],displayName:"Small"};d.__docgenInfo={description:"",methods:[],displayName:"DefaultSize"};m.__docgenInfo={description:"",methods:[],displayName:"Large"};h.__docgenInfo={description:"",methods:[],displayName:"WithIcons"};p.__docgenInfo={description:"",methods:[],displayName:"Disabled"};o.__docgenInfo={description:"",methods:[],displayName:"AllVariants"};var _,z,k;r.parameters={...r.parameters,docs:{...(_=r.parameters)==null?void 0:_.docs,source:{originalSource:`args => {
  const [idx, setIdx] = useState(0);
  return <ContentSwitcher {...args} items={baseItems} selectedIndex={idx} onChange={i => {
    setIdx(i);
    action('onChange')(i);
  }} />;
}`,...(k=(z=r.parameters)==null?void 0:z.docs)==null?void 0:k.source}}};var N,M,L;l.parameters={...l.parameters,docs:{...(N=l.parameters)==null?void 0:N.docs,source:{originalSource:`() => {
  const [idx, setIdx] = useState(0);
  return <ContentSwitcher size="small" items={baseItems} selectedIndex={idx} onChange={setIdx} />;
}`,...(L=(M=l.parameters)==null?void 0:M.docs)==null?void 0:L.source}}};var T,q,D;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`() => {
  const [idx, setIdx] = useState(0);
  return <ContentSwitcher size="default" items={baseItems} selectedIndex={idx} onChange={setIdx} />;
}`,...(D=(q=d.parameters)==null?void 0:q.docs)==null?void 0:D.source}}};var O,$,A;m.parameters={...m.parameters,docs:{...(O=m.parameters)==null?void 0:O.docs,source:{originalSource:`() => {
  const [idx, setIdx] = useState(0);
  return <ContentSwitcher size="large" items={baseItems} selectedIndex={idx} onChange={setIdx} />;
}`,...(A=($=m.parameters)==null?void 0:$.docs)==null?void 0:A.source}}};var R,P,B;h.parameters={...h.parameters,docs:{...(R=h.parameters)==null?void 0:R.docs,source:{originalSource:`() => {
  const [idx, setIdx] = useState(0);
  return <ContentSwitcher items={[{
    label: 'List',
    renderIcon: List
  }, {
    label: 'Grid',
    renderIcon: Grid
  }, {
    label: 'Calendar',
    renderIcon: Calendar
  }]} selectedIndex={idx} onChange={setIdx} />;
}`,...(B=(P=h.parameters)==null?void 0:P.docs)==null?void 0:B.source}}};var E,V,F;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:"() => <ContentSwitcher disabled items={baseItems} selectedIndex={0} />",...(F=(V=p.parameters)==null?void 0:V.docs)==null?void 0:F.source}}};var G,W,X;o.parameters={...o.parameters,docs:{...(G=o.parameters)==null?void 0:G.docs,source:{originalSource:`() => <div style={{
  fontFamily: 'Inter, sans-serif',
  padding: '24px',
  display: 'grid',
  gap: '16px'
}}>
    {ContentSwitcherSizes.map(size => <div key={size}>
        <p style={{
      fontSize: 12,
      marginBottom: 4
    }}>size: {size}</p>
        <ContentSwitcher items={baseItems} selectedIndex={0} size={size} />
      </div>)}
    <div>
      <p style={{
      fontSize: 12,
      marginBottom: 4
    }}>disabled</p>
      <ContentSwitcher items={baseItems} selectedIndex={1} disabled />
    </div>
  </div>`,...(X=(W=o.parameters)==null?void 0:W.docs)==null?void 0:X.source}}};const ye=["Default","Small","DefaultSize","Large","WithIcons","Disabled","AllVariants"],ve=Object.freeze(Object.defineProperty({__proto__:null,AllVariants:o,Default:r,DefaultSize:d,Disabled:p,Large:m,Small:l,WithIcons:h,__namedExportsOrder:ye,default:be},Symbol.toStringTag,{value:"Module"}));function v(t){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...H(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(re,{isTemplate:!0}),`
`,e.jsx(n.h1,{id:"contentswitcher",children:"ContentSwitcher"}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{href:"packages/content-switcher/src/ContentSwitcher/ContentSwitcher.tsx",children:"Source code"})}),`
`,e.jsx(n.h2,{id:"overview",children:"Overview"}),`
`,e.jsxs(n.p,{children:[`A segmented control / tablist used to switch between two or more peer views.
Controlled by `,e.jsx(n.code,{children:"selectedIndex"})," and ",e.jsx(n.code,{children:"onChange"}),". Built on ",e.jsx(n.code,{children:'role="tablist"'}),` with
`,e.jsx(n.code,{children:'role="tab"'})," segments and roving tabindex."]}),`
`,`
`,e.jsx(n.h2,{id:"live-demo",children:"Live Demo"}),`
`,e.jsx(oe,{of:r}),`
`,e.jsx(n.h2,{id:"code",children:"Code"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`const [idx, setIdx] = useState(0);

<ContentSwitcher
  items={[{ label: 'List' }, { label: 'Grid' }, { label: 'Calendar' }]}
  selectedIndex={idx}
  onChange={setIdx}
/>
`})}),`
`,e.jsx(n.h2,{id:"component-api",children:"Component API"}),`
`,e.jsx(ie,{}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Container has ",e.jsx(n.code,{children:'role="tablist"'}),", segments have ",e.jsx(n.code,{children:'role="tab"'}),` and
`,e.jsx(n.code,{children:"aria-selected"})," reflecting state."]}),`
`,e.jsxs(n.li,{children:["Roving ",e.jsx(n.code,{children:"tabIndex"}),": only the selected segment has ",e.jsx(n.code,{children:"tabIndex={0}"}),"."]}),`
`,e.jsxs(n.li,{children:["Each segment is a real ",e.jsx(n.code,{children:'<button type="button">'})," so Enter/Space activate it."]}),`
`,e.jsxs(n.li,{children:["Disabled propagates to the native ",e.jsx(n.code,{children:"disabled"})," attribute on every segment."]}),`
`,e.jsxs(n.li,{children:[`
`,`
`]}),`
`]}),`
`,e.jsxs(n.h2,{id:"api-change-icon-reactnode--rendericon-elementtype",children:["API Change: ",e.jsx(n.code,{children:"icon"})," (ReactNode) → ",e.jsx(n.code,{children:"renderIcon"})," (ElementType)"]}),`
`,e.jsxs(n.p,{children:["PANW's ",e.jsx(n.code,{children:"ContentSwitcherItem.icon"})," accepted a ",e.jsx(n.code,{children:"ReactNode"}),`. The port renames it
to `,e.jsx(n.code,{children:"renderIcon: ElementType"}),` to match Carbon's icon convention. Pass the
component, not a rendered element:`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { List } from 'lucide-react';

<ContentSwitcher
  items={[{ label: 'List', renderIcon: List }]}
  selectedIndex={0}
/>
`})})]})}function K(t={}){const{wrapper:n}={...H(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(v,{...t})}):v(t)}const _e=Object.freeze(Object.defineProperty({__proto__:null,default:K},Symbol.toStringTag,{value:"Module"}));export{ve as C,_e as a};
