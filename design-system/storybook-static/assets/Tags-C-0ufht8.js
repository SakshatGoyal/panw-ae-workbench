import{j as e,b as B,c as p,e as X}from"./index-CHjcGL7e.js";import{useMDXComponents as V}from"./index-DVRRELxc.js";import"./usePrefix-BO8COP8A.js";import{R as q}from"./index-CwcVQgaJ.js";import{a as x}from"./index-B-lxVbXh.js";import{a as G,b as H,c as O,T as o,S as J}from"./Tags-CtFck095.js";import{c as K}from"./createLucideIcon-J4rvsbg-.js";import{S as Q}from"./star-CChmsO4V.js";/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]],Y=K("tag",U),Z={None:void 0,Sun:J,Star:Q,Tag:Y},ee={label:{control:"text"},color:{options:O,control:{type:"select"},table:{defaultValue:{summary:'"grey"'}}},contrast:{options:H,control:{type:"radio"},table:{defaultValue:{summary:'"low"'}}},size:{options:G,control:{type:"radio"},table:{defaultValue:{summary:'"default"'}}},icon:{control:"boolean"},close:{control:"boolean"},renderIcon:{options:["None","Sun","Star","Tag"],control:{type:"select"},description:"Leading icon. Defaults to lucide-react `Sun`."}},se={title:"Components/Tags",component:o,argTypes:ee,parameters:{docs:{page:$}},tags:["autodocs"]},r=n=>{const{renderIcon:s,...E}=n;return e.jsx(o,{...E,renderIcon:Z[s],onClose:x("onClose")})};r.args={label:"Placeholder",color:"grey",contrast:"low",size:"default",icon:!1,close:!1,renderIcon:"None"};const i=()=>e.jsx(o,{label:"Low contrast",color:"accent",contrast:"low"}),l=()=>e.jsx(o,{label:"High contrast",color:"accent",contrast:"high"}),d=()=>e.jsx(o,{label:"Large",color:"green",size:"large"}),c=()=>e.jsx(o,{label:"With icon",color:"purple",icon:!0}),t=()=>e.jsx(o,{label:"Dismissable",color:"red",close:!0,onClose:x("onClose")}),h=()=>e.jsx(o,{label:"Everything",color:"cobalt",contrast:"high",size:"large",icon:!0,close:!0,onClose:x("onClose")}),a=()=>e.jsxs("div",{style:{fontFamily:"Inter, sans-serif",padding:"24px",background:"#f9f9f9"},children:[H.map(n=>e.jsxs(q.Fragment,{children:[e.jsxs("h3",{style:{margin:"16px 0 8px",fontSize:"13px",fontWeight:600},children:["Contrast: ",n]}),e.jsx("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap",marginBottom:"16px"},children:O.map(s=>e.jsx(o,{label:s,color:s,contrast:n},`${n}-${s}`))})]},n)),e.jsx("h3",{style:{margin:"16px 0 8px",fontSize:"13px",fontWeight:600},children:"Sizes"}),e.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center",marginBottom:"16px"},children:[e.jsx(o,{label:"default",size:"default",color:"accent"}),e.jsx(o,{label:"large",size:"large",color:"accent"})]}),e.jsx("h3",{style:{margin:"16px 0 8px",fontSize:"13px",fontWeight:600},children:"With icon / close"}),e.jsxs("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"},children:[e.jsx(o,{label:"icon",color:"green",icon:!0}),e.jsx(o,{label:"close",color:"red",close:!0}),e.jsx(o,{label:"both",color:"purple",icon:!0,close:!0}),e.jsx(o,{label:"large both",color:"cobalt",contrast:"high",size:"large",icon:!0,close:!0})]})]});a.storyName="All Variants";a.parameters={controls:{disable:!0}};r.__docgenInfo={description:"",methods:[],displayName:"Default"};i.__docgenInfo={description:"",methods:[],displayName:"LowContrast"};l.__docgenInfo={description:"",methods:[],displayName:"HighContrast"};d.__docgenInfo={description:"",methods:[],displayName:"Large"};c.__docgenInfo={description:"",methods:[],displayName:"WithIcon"};t.__docgenInfo={description:"",methods:[],displayName:"Dismissable"};h.__docgenInfo={description:"",methods:[],displayName:"FullyLoaded"};a.__docgenInfo={description:"",methods:[],displayName:"AllVariants"};var m,j,u;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
  const {
    renderIcon,
    ...rest
  } = args;
  return <Tags {...rest} renderIcon={iconMap[renderIcon]} onClose={action('onClose')} />;
}`,...(u=(j=r.parameters)==null?void 0:j.docs)==null?void 0:u.source}}};var b,f,y;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:'() => <Tags label="Low contrast" color="accent" contrast="low" />',...(y=(f=i.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var T,v,C;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:'() => <Tags label="High contrast" color="accent" contrast="high" />',...(C=(v=l.parameters)==null?void 0:v.docs)==null?void 0:C.source}}};var I,S,z;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{originalSource:'() => <Tags label="Large" color="green" size="large" />',...(z=(S=d.parameters)==null?void 0:S.docs)==null?void 0:z.source}}};var _,w,N;c.parameters={...c.parameters,docs:{...(_=c.parameters)==null?void 0:_.docs,source:{originalSource:'() => <Tags label="With icon" color="purple" icon />',...(N=(w=c.parameters)==null?void 0:w.docs)==null?void 0:N.source}}};var W,A,D;t.parameters={...t.parameters,docs:{...(W=t.parameters)==null?void 0:W.docs,source:{originalSource:`() => <Tags label="Dismissable" color="red" close onClose={action('onClose')} />`,...(D=(A=t.parameters)==null?void 0:A.docs)==null?void 0:D.source}}};var L,k,P;h.parameters={...h.parameters,docs:{...(L=h.parameters)==null?void 0:L.docs,source:{originalSource:`() => <Tags label="Everything" color="cobalt" contrast="high" size="large" icon close onClose={action('onClose')} />`,...(P=(k=h.parameters)==null?void 0:k.docs)==null?void 0:P.source}}};var F,M,R;a.parameters={...a.parameters,docs:{...(F=a.parameters)==null?void 0:F.docs,source:{originalSource:`() => <div style={{
  fontFamily: 'Inter, sans-serif',
  padding: '24px',
  background: '#f9f9f9'
}}>
    {TagContrasts.map(contrast => <React.Fragment key={contrast}>
        <h3 style={{
      margin: '16px 0 8px',
      fontSize: '13px',
      fontWeight: 600
    }}>
          Contrast: {contrast}
        </h3>
        <div style={{
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
      marginBottom: '16px'
    }}>
          {TagColors.map(color => <Tags key={\`\${contrast}-\${color}\`} label={color} color={color} contrast={contrast} />)}
        </div>
      </React.Fragment>)}

    <h3 style={{
    margin: '16px 0 8px',
    fontSize: '13px',
    fontWeight: 600
  }}>Sizes</h3>
    <div style={{
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    marginBottom: '16px'
  }}>
      <Tags label="default" size="default" color="accent" />
      <Tags label="large" size="large" color="accent" />
    </div>

    <h3 style={{
    margin: '16px 0 8px',
    fontSize: '13px',
    fontWeight: 600
  }}>With icon / close</h3>
    <div style={{
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  }}>
      <Tags label="icon" color="green" icon />
      <Tags label="close" color="red" close />
      <Tags label="both" color="purple" icon close />
      <Tags label="large both" color="cobalt" contrast="high" size="large" icon close />
    </div>
  </div>`,...(R=(M=a.parameters)==null?void 0:M.docs)==null?void 0:R.source}}};const oe=["Default","LowContrast","HighContrast","Large","WithIcon","Dismissable","FullyLoaded","AllVariants"],he=Object.freeze(Object.defineProperty({__proto__:null,AllVariants:a,Default:r,Dismissable:t,FullyLoaded:h,HighContrast:l,Large:d,LowContrast:i,WithIcon:c,__namedExportsOrder:oe,default:se},Symbol.toStringTag,{value:"Module"}));function g(n){const s={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...V(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(B,{isTemplate:!0}),`
`,e.jsx(s.h1,{id:"tags",children:"Tags"}),`
`,e.jsx(s.p,{children:e.jsx(s.a,{href:"packages/tags/src/Tags/Tags.tsx",children:"Source code"})}),`
`,e.jsx(s.h2,{id:"table-of-contents",children:"Table of Contents"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"#overview",children:"Overview"})}),`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"#live-demo",children:"Live Demo"})}),`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"#colors",children:"Colors"})}),`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"#contrast",children:"Contrast"})}),`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"#sizes",children:"Sizes"})}),`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"#with-icon",children:"With Icon"})}),`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"#dismissable",children:"Dismissable"})}),`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"#component-api",children:"Component API"})}),`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"#accessibility",children:"Accessibility"})}),`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"#api-change-rendericon",children:"API Change: renderIcon"})}),`
`]}),`
`,e.jsx(s.h2,{id:"overview",children:"Overview"}),`
`,e.jsx(s.p,{children:`Tags are pill-shaped labels used to categorize, filter, or mark content. The
PANW Tags component supports 17 colors across two contrast levels, two sizes,
an optional leading icon, and an optional close (dismiss) button.`}),`
`,`
`,e.jsx(s.h2,{id:"live-demo",children:"Live Demo"}),`
`,e.jsx(p,{of:r}),`
`,e.jsx(s.h2,{id:"colors",children:"Colors"}),`
`,e.jsxs(s.p,{children:["17 colors are available: ",e.jsx(s.code,{children:"grey"}),", ",e.jsx(s.code,{children:"accent"}),", ",e.jsx(s.code,{children:"red"}),", ",e.jsx(s.code,{children:"green"}),", ",e.jsx(s.code,{children:"orange"}),", ",e.jsx(s.code,{children:"slate"}),`,
`,e.jsx(s.code,{children:"lavender"}),", ",e.jsx(s.code,{children:"purple"}),", ",e.jsx(s.code,{children:"pink"}),", ",e.jsx(s.code,{children:"magenta"}),", ",e.jsx(s.code,{children:"yellow"}),", ",e.jsx(s.code,{children:"bronze"}),", ",e.jsx(s.code,{children:"olive"}),", ",e.jsx(s.code,{children:"lime"}),`,
`,e.jsx(s.code,{children:"jade"}),", ",e.jsx(s.code,{children:"teal"}),", ",e.jsx(s.code,{children:"cobalt"}),". See the AllVariants story for a visual matrix."]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-jsx",children:`<Tags label="Accent" color="accent" />
<Tags label="Red" color="red" />
<Tags label="Cobalt" color="cobalt" />
`})}),`
`,e.jsx(s.h2,{id:"contrast",children:"Contrast"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.code,{children:"low"})," (default) uses a pastel background with dark text. ",e.jsx(s.code,{children:"high"}),` uses a
saturated background with light text.`]}),`
`,e.jsx(p,{of:l}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-jsx",children:`<Tags label="Low" color="accent" contrast="low" />
<Tags label="High" color="accent" contrast="high" />
`})}),`
`,e.jsx(s.h2,{id:"sizes",children:"Sizes"}),`
`,e.jsxs(s.p,{children:["Two sizes: ",e.jsx(s.code,{children:"default"})," (12px text, 4×8 padding) and ",e.jsx(s.code,{children:"large"}),` (14px text, 8×12
padding).`]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-jsx",children:`<Tags label="Default" size="default" />
<Tags label="Large" size="large" />
`})}),`
`,e.jsx(s.h2,{id:"with-icon",children:"With Icon"}),`
`,e.jsxs(s.p,{children:["Pass a lucide-react (or any React) component to ",e.jsx(s.code,{children:"renderIcon"}),` and set
`,e.jsx(s.code,{children:"icon=\\{true\\}"}),". Defaults to ",e.jsx(s.code,{children:"Sun"}),` (matches PANW's default "light" SVG).`]}),`
`,e.jsx(p,{of:c}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-jsx",children:`import { Star } from 'lucide-react';

<Tags label="Featured" icon renderIcon={Star} />
`})}),`
`,e.jsx(s.h2,{id:"dismissable",children:"Dismissable"}),`
`,e.jsxs(s.p,{children:["Set ",e.jsx(s.code,{children:"close=\\{true\\}"})," and pass an ",e.jsx(s.code,{children:"onClose"}),` handler. The close button receives an
auto-generated `,e.jsx(s.code,{children:"aria-label"})," of ",e.jsx(s.code,{children:"Remove \\{label\\}"}),"."]}),`
`,e.jsx(p,{of:t}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-jsx",children:`<Tags label="Dismissable" close onClose={() => removeTag()} />
`})}),`
`,e.jsx(s.h2,{id:"component-api",children:"Component API"}),`
`,e.jsx(X,{}),`
`,e.jsx(s.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["The leading icon is ",e.jsx(s.code,{children:'aria-hidden="true"'})," — it is decorative."]}),`
`,e.jsxs(s.li,{children:["The close button is a real ",e.jsx(s.code,{children:"<button>"})," with an ",e.jsx(s.code,{children:"aria-label"}),` describing the
removal action ("Remove {label}").`]}),`
`,e.jsxs(s.li,{children:["The close button has a visible ",e.jsx(s.code,{children:":focus-visible"})," outline."]}),`
`,e.jsxs(s.li,{children:["Tags are non-interactive by default (",e.jsx(s.code,{children:"cursor: default"}),", ",e.jsx(s.code,{children:"user-select: none"}),")."]}),`
`,e.jsxs(s.li,{children:[`
`,`
`]}),`
`]}),`
`,e.jsxs(s.h2,{id:"api-change-rendericon",children:["API Change: ",e.jsx(s.code,{children:"renderIcon"})]}),`
`,e.jsx(s.p,{children:e.jsxs(s.strong,{children:["Deliberate change from PANW ",e.jsx(s.code,{children:"Tags"}),":"]})}),`
`,e.jsxs(s.p,{children:["PANW's source accepted ",e.jsx(s.code,{children:"customIcon"})," and ",e.jsx(s.code,{children:"customCloseIcon"})," as ",e.jsx(s.code,{children:"ReactNode"}),` — you
passed already-rendered elements:`]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-jsx",children:`// PANW (old)
<Tags label="Foo" icon customIcon={<MyIcon />} />
`})}),`
`,e.jsxs(s.p,{children:["The ported ",e.jsx(s.code,{children:"Tags"})," uses Carbon's ",e.jsx(s.code,{children:"renderIcon: ElementType"}),` convention — pass the
component, not a rendered element:`]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-jsx",children:`// Ported (Carbon convention)
import { Star } from 'lucide-react';

<Tags label="Foo" icon renderIcon={Star} />
`})}),`
`,e.jsxs(s.p,{children:["This lets the component control sizing (12px / 16px depending on ",e.jsx(s.code,{children:"size"}),`) and
inject `,e.jsx(s.code,{children:"aria-hidden"})," correctly."]})]})}function $(n={}){const{wrapper:s}={...V(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(g,{...n})}):g(n)}const pe=Object.freeze(Object.defineProperty({__proto__:null,default:$},Symbol.toStringTag,{value:"Module"}));export{he as T,pe as a};
