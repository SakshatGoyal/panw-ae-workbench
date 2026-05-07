import{j as e,b as P,c as V,e as R}from"./index-CHjcGL7e.js";import{useMDXComponents as z}from"./index-DVRRELxc.js";import"./usePrefix-BO8COP8A.js";import"./index-CwcVQgaJ.js";import{a as A}from"./index-B-lxVbXh.js";import{D as N,a as M,b as s}from"./Dropdown-RDN5s2J4.js";const n=[{label:"Option 1",value:"option-1"},{label:"Option 2",value:"option-2"},{label:"Option 3",value:"option-3"}],I={title:"Components/Dropdown",component:s,argTypes:{background:{options:M,control:{type:"radio"}},size:{options:N,control:{type:"radio"}},title:{control:"text"},placeholder:{control:"text"},description:{control:"text"},showTitle:{control:"boolean"},showDescription:{control:"boolean"},disabled:{control:"boolean"},readOnly:{control:"boolean"}},parameters:{docs:{page:L}},tags:["autodocs"]},r=t=>e.jsx(s,{...t,options:n,onChange:A("onChange")});r.args={title:"Title",placeholder:"Placeholder",description:"Optional Description",showTitle:!0,showDescription:!0,background:"grey10",size:"default",disabled:!1,readOnly:!1};const a=()=>e.jsx(s,{title:"Large",size:"large",options:n}),l=()=>e.jsx(s,{title:"Disabled",disabled:!0,options:n}),d=()=>e.jsx(s,{title:"Read only",readOnly:!0,selectedValue:"option-1",options:n}),c=()=>e.jsx(s,{title:"Pre-selected",selectedValue:"option-2",options:n}),i=()=>e.jsxs("div",{style:{padding:24,background:"#f9f9f9",display:"grid",gridTemplateColumns:"repeat(2, 320px)",gap:24},children:[e.jsx(s,{title:"Default / grey10",options:n}),e.jsx(s,{title:"Default / grey00",background:"grey00",options:n}),e.jsx(s,{title:"Large / grey10",size:"large",options:n}),e.jsx(s,{title:"Large / grey00",size:"large",background:"grey00",options:n}),e.jsx(s,{title:"Disabled",disabled:!0,options:n}),e.jsx(s,{title:"Read only",readOnly:!0,selectedValue:"option-1",options:n})]});i.storyName="All Variants";i.parameters={controls:{disable:!0}};r.__docgenInfo={description:"",methods:[],displayName:"Default"};a.__docgenInfo={description:"",methods:[],displayName:"Large"};l.__docgenInfo={description:"",methods:[],displayName:"Disabled"};d.__docgenInfo={description:"",methods:[],displayName:"ReadOnly"};c.__docgenInfo={description:"",methods:[],displayName:"PreSelected"};i.__docgenInfo={description:"",methods:[],displayName:"AllVariants"};var u,g,m;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:"args => <Dropdown {...args} options={sampleOptions} onChange={action('onChange')} />",...(m=(g=r.parameters)==null?void 0:g.docs)==null?void 0:m.source}}};var h,x,j;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:'() => <Dropdown title="Large" size="large" options={sampleOptions} />',...(j=(x=a.parameters)==null?void 0:x.docs)==null?void 0:j.source}}};var D,y,w;l.parameters={...l.parameters,docs:{...(D=l.parameters)==null?void 0:D.docs,source:{originalSource:'() => <Dropdown title="Disabled" disabled options={sampleOptions} />',...(w=(y=l.parameters)==null?void 0:y.docs)==null?void 0:w.source}}};var b,f,O;d.parameters={...d.parameters,docs:{...(b=d.parameters)==null?void 0:b.docs,source:{originalSource:'() => <Dropdown title="Read only" readOnly selectedValue="option-1" options={sampleOptions} />',...(O=(f=d.parameters)==null?void 0:f.docs)==null?void 0:O.source}}};var _,v,S;c.parameters={...c.parameters,docs:{...(_=c.parameters)==null?void 0:_.docs,source:{originalSource:'() => <Dropdown title="Pre-selected" selectedValue="option-2" options={sampleOptions} />',...(S=(v=c.parameters)==null?void 0:v.docs)==null?void 0:S.source}}};var k,C,T;i.parameters={...i.parameters,docs:{...(k=i.parameters)==null?void 0:k.docs,source:{originalSource:`() => <div style={{
  padding: 24,
  background: '#f9f9f9',
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 320px)',
  gap: 24
}}>
    <Dropdown title="Default / grey10" options={sampleOptions} />
    <Dropdown title="Default / grey00" background="grey00" options={sampleOptions} />
    <Dropdown title="Large / grey10" size="large" options={sampleOptions} />
    <Dropdown title="Large / grey00" size="large" background="grey00" options={sampleOptions} />
    <Dropdown title="Disabled" disabled options={sampleOptions} />
    <Dropdown title="Read only" readOnly selectedValue="option-1" options={sampleOptions} />
  </div>`,...(T=(C=i.parameters)==null?void 0:C.docs)==null?void 0:T.source}}};const E=["Default","Large","Disabled","ReadOnly","PreSelected","AllVariants"],U=Object.freeze(Object.defineProperty({__proto__:null,AllVariants:i,Default:r,Disabled:l,Large:a,PreSelected:c,ReadOnly:d,__namedExportsOrder:E,default:I},Symbol.toStringTag,{value:"Module"}));function p(t){const o={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...z(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(P,{isTemplate:!0}),`
`,e.jsx(o.h1,{id:"dropdown",children:"Dropdown"}),`
`,e.jsx(o.p,{children:e.jsx(o.a,{href:"packages/dropdown/src/Dropdown/Dropdown.tsx",children:"Source code"})}),`
`,e.jsx(o.h2,{id:"overview",children:"Overview"}),`
`,e.jsx(o.p,{children:`Single-select rounded dropdown. Two background tones, two heights, with
title and description slots.`}),`
`,e.jsxs(o.h2,{id:"api-change-split-from-panw-dropdownrounded",children:["API change: split from PANW ",e.jsx(o.code,{children:"DropdownRounded"})]}),`
`,e.jsxs(o.p,{children:["PANW's ",e.jsx(o.code,{children:"DropdownRounded"})," accepted a ",e.jsx(o.code,{children:"multiselect"}),` flag and rendered chips
inline when multiple values were selected. This port splits that surface
into two components, matching Carbon:`]}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:[e.jsx(o.code,{children:"@ds/dropdown"})," (",e.jsx(o.code,{children:"Dropdown"}),") — single-select (this package)"]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.code,{children:"@ds/multi-select"})," (",e.jsx(o.code,{children:"MultiSelect"}),") — multi-select with chips"]}),`
`]}),`
`,e.jsxs(o.p,{children:["Use ",e.jsx(o.code,{children:"Dropdown"})," when only one value can be chosen."]}),`
`,e.jsx(o.h2,{id:"live-demo",children:"Live Demo"}),`
`,e.jsx(V,{of:r}),`
`,e.jsx(o.h2,{id:"variants",children:"Variants"}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-jsx",children:`<Dropdown title="Default" />
<Dropdown title="Large" size="large" />
<Dropdown title="Grey 00" background="grey00" />
<Dropdown title="Disabled" disabled />
<Dropdown title="Read only" readOnly selectedValue="option-1" />
`})}),`
`,e.jsx(o.h2,{id:"component-api",children:"Component API"}),`
`,e.jsx(R,{}),`
`,e.jsx(o.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:["The trigger has ",e.jsx(o.code,{children:'role="combobox"'}),", ",e.jsx(o.code,{children:"aria-expanded"}),", ",e.jsx(o.code,{children:'aria-haspopup="listbox"'}),"."]}),`
`,e.jsxs(o.li,{children:["Menu uses ",e.jsx(o.code,{children:'role="listbox"'}),", items ",e.jsx(o.code,{children:'role="option"'})," with ",e.jsx(o.code,{children:"aria-selected"}),"."]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.code,{children:"Enter"})," / ",e.jsx(o.code,{children:"Space"})," toggles open/close from the trigger."]}),`
`,e.jsx(o.li,{children:"Click outside closes the menu."}),`
`]}),`
`]})}function L(t={}){const{wrapper:o}={...z(),...t.components};return o?e.jsx(o,{...t,children:e.jsx(p,{...t})}):p(t)}const q=Object.freeze(Object.defineProperty({__proto__:null,default:L},Symbol.toStringTag,{value:"Module"}));export{U as D,q as a};
