import{j as e,b as be,c as Te,e as Ae}from"./index-CHjcGL7e.js";import{useMDXComponents as Z}from"./index-DVRRELxc.js";import{c as _e,u as we,P as a}from"./usePrefix-BO8COP8A.js";import{R as ee,r as Se}from"./index-CwcVQgaJ.js";import{a as c}from"./index-B-lxVbXh.js";import{C as Ie}from"./chevron-down-qKlFP2mb.js";import{S as T,T as ze,a as Ce,b as Ne,c as Oe}from"./Tags-CtFck095.js";import{B as De}from"./bell-46JlDp38.js";import{S as oe}from"./star-CChmsO4V.js";const A=["small","default","large"],ne=["left","right"],te=["gray00","gray10"],$e=["static","hover","pressing","disabled"],i=ee.forwardRef(function({size:o="default",open:x=!1,theme:j="gray00",orientation:ie="left",title:re="Accordion",description:_,showIcon:se=!1,renderIcon:ce=T,showTag:le=!1,tagLabel:de="Placeholder",tagColor:pe="orange",tagContrast:ue="low",tagSize:me="default",children:ge,onToggle:l,disabled:he=!1,forceState:v,className:fe},xe){const n=we(),y=he||v==="disabled",ye=_e(`${n}--accordion`,`${n}--accordion--size-${o}`,`${n}--accordion--orientation-${ie}`,x?`${n}--accordion--open`:`${n}--accordion--closed`,{[`${n}--accordion--theme-gray10`]:j==="gray10",[`${n}--accordion--disabled`]:y,[`${n}--accordion--force-hover`]:v==="hover",[`${n}--accordion--force-pressing`]:v==="pressing"},fe),je=()=>{y||l==null||l()},ve=b=>{y||(b.key==="Enter"||b.key===" ")&&(b.preventDefault(),l==null||l())};return e.jsxs("div",{ref:xe,className:ye,children:[e.jsxs("div",{className:`${n}--accordion__item`,role:"button",tabIndex:y?-1:0,"aria-expanded":x,"aria-disabled":y,onClick:je,onKeyDown:ve,children:[e.jsx("div",{className:`${n}--accordion__expansion`,children:e.jsx("span",{className:`${n}--accordion__expansion-icon`,"aria-hidden":"true",children:e.jsx(Ie,{size:16})})}),e.jsx("div",{className:`${n}--accordion__container`,children:e.jsxs("div",{className:`${n}--accordion__inner-container`,children:[se&&e.jsx("span",{className:`${n}--accordion__icon-container`,"aria-hidden":"true",children:e.jsx(ce,{size:16})}),e.jsxs("div",{className:`${n}--accordion__text-container`,children:[e.jsxs("div",{className:`${n}--accordion__title-row`,children:[e.jsx("span",{className:`${n}--accordion__title`,children:re}),le&&e.jsx(ze,{label:de,color:pe,contrast:ue,size:me})]}),_&&e.jsx("div",{className:`${n}--accordion__description`,children:_})]})]})})]}),e.jsx("div",{className:`${n}--accordion__content-area`,children:e.jsx("div",{className:`${n}--accordion__content-inner`,children:ge})})]})});i.displayName="Accordion";i.propTypes={size:a.oneOf(A),open:a.bool,theme:a.oneOf(te),orientation:a.oneOf(ne),title:a.string,description:a.string,showIcon:a.bool,renderIcon:a.oneOfType([a.func,a.object]),showTag:a.bool,tagLabel:a.string,tagColor:a.oneOf(Oe),tagContrast:a.oneOf(Ne),tagSize:a.oneOf(Ce),children:a.node,onToggle:a.func,disabled:a.bool,forceState:a.oneOf($e),className:a.string};i.__docgenInfo={description:"",methods:[],displayName:"Accordion",props:{size:{required:!1,tsType:{name:"unknown[number]",raw:"(typeof AccordionSizes)[number]"},description:"",defaultValue:{value:"'default'",computed:!1},type:{name:"enum",value:[{value:"'small'",computed:!1},{value:"'default'",computed:!1},{value:"'large'",computed:!1}]}},open:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1},type:{name:"bool"}},theme:{required:!1,tsType:{name:"unknown[number]",raw:"(typeof AccordionThemes)[number]"},description:"",defaultValue:{value:"'gray00'",computed:!1},type:{name:"enum",value:[{value:"'gray00'",computed:!1},{value:"'gray10'",computed:!1}]}},orientation:{required:!1,tsType:{name:"unknown[number]",raw:"(typeof AccordionOrientations)[number]"},description:"",defaultValue:{value:"'left'",computed:!1},type:{name:"enum",value:[{value:"'left'",computed:!1},{value:"'right'",computed:!1}]}},title:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Accordion'",computed:!1},type:{name:"string"}},description:{required:!1,tsType:{name:"string"},description:"",type:{name:"string"}},showIcon:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1},type:{name:"bool"}},renderIcon:{required:!1,tsType:{name:"ReactElementType",raw:"React.ElementType"},description:"lucide-style component for the leading icon. Defaults to `Sun`.",defaultValue:{value:"Sun",computed:!0},type:{name:"union",value:[{name:"func"},{name:"object"}]}},showTag:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1},type:{name:"bool"}},tagLabel:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Placeholder'",computed:!1},type:{name:"string"}},tagColor:{required:!1,tsType:{name:"unknown[number]",raw:"(typeof TagColors)[number]"},description:"",defaultValue:{value:"'orange'",computed:!1},type:{name:"enum",value:[{value:"'grey'",computed:!1},{value:"'accent'",computed:!1},{value:"'red'",computed:!1},{value:"'green'",computed:!1},{value:"'orange'",computed:!1},{value:"'slate'",computed:!1},{value:"'lavender'",computed:!1},{value:"'purple'",computed:!1},{value:"'pink'",computed:!1},{value:"'magenta'",computed:!1},{value:"'yellow'",computed:!1},{value:"'bronze'",computed:!1},{value:"'olive'",computed:!1},{value:"'lime'",computed:!1},{value:"'jade'",computed:!1},{value:"'teal'",computed:!1},{value:"'cobalt'",computed:!1}]}},tagContrast:{required:!1,tsType:{name:"unknown[number]",raw:"(typeof TagContrasts)[number]"},description:"",defaultValue:{value:"'low'",computed:!1},type:{name:"enum",value:[{value:"'low'",computed:!1},{value:"'high'",computed:!1}]}},tagSize:{required:!1,tsType:{name:"unknown[number]",raw:"(typeof TagSizes)[number]"},description:"",defaultValue:{value:"'default'",computed:!1},type:{name:"enum",value:[{value:"'default'",computed:!1},{value:"'large'",computed:!1}]}},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"",type:{name:"node"}},onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"",type:{name:"func"}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1},type:{name:"bool"}},forceState:{required:!1,tsType:{name:"unknown[number]",raw:"(typeof AccordionForceStates)[number]"},description:"",type:{name:"enum",value:[{value:"'static'",computed:!1},{value:"'hover'",computed:!1},{value:"'pressing'",computed:!1},{value:"'disabled'",computed:!1}]}},className:{required:!1,tsType:{name:"string"},description:"",type:{name:"string"}}}};const We={Sun:T,Star:oe,Bell:De},Ve={title:"Components/Accordion",component:i,argTypes:{size:{options:A,control:{type:"radio"}},theme:{options:te,control:{type:"radio"}},orientation:{options:ne,control:{type:"radio"}},open:{control:"boolean"},title:{control:"text"},description:{control:"text"},showIcon:{control:"boolean"},showTag:{control:"boolean"},tagLabel:{control:"text"},disabled:{control:"boolean"},renderIcon:{options:["Sun","Star","Bell"],control:{type:"select"}}},parameters:{docs:{page:ae}},tags:["autodocs"]},r=t=>{const[o,x]=Se.useState(t.open);return ee.useEffect(()=>x(t.open),[t.open]),e.jsx(i,{...t,open:o,renderIcon:We[t.renderIcon]||T,onToggle:()=>{c("onToggle")(),x(j=>!j)},children:e.jsx("p",{style:{margin:0},children:"Accordion content goes here."})})};r.args={size:"default",theme:"gray00",orientation:"left",open:!1,title:"Accordion title",description:"",showIcon:!1,showTag:!1,tagLabel:"New",disabled:!1,renderIcon:"Sun"};const d=()=>e.jsx(i,{title:"Open accordion",open:!0,onToggle:c("onToggle"),children:e.jsx("p",{style:{margin:0},children:"Visible content"})}),p=()=>e.jsx(i,{title:"With description",description:"Supplemental copy below the title.",open:!0,onToggle:c("onToggle"),children:"Content"}),u=()=>e.jsx(i,{title:"With icon",showIcon:!0,renderIcon:oe,onToggle:c("onToggle"),children:"Content"}),m=()=>e.jsx(i,{title:"With tag",showTag:!0,tagLabel:"Beta",tagColor:"green",onToggle:c("onToggle"),children:"Content"}),g=()=>e.jsx(i,{title:"Disabled",disabled:!0,onToggle:c("onToggle"),children:"Content"}),h=()=>e.jsx(i,{title:"Right orientation",orientation:"right",onToggle:c("onToggle"),children:"Content"}),f=()=>e.jsx(i,{title:"Gray 10",theme:"gray10",onToggle:c("onToggle"),children:"Content"}),s=()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,padding:24,background:"#f9f9f9"},children:[A.map(t=>e.jsxs("div",{children:[e.jsxs("h3",{style:{margin:"8px 0",fontSize:13,fontWeight:600},children:["Size: ",t]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[e.jsx(i,{size:t,title:`${t} closed`}),e.jsx(i,{size:t,title:`${t} open`,open:!0,description:"With description",showIcon:!0,showTag:!0,tagLabel:"Tag"})]})]},t)),e.jsxs("div",{children:[e.jsx("h3",{style:{margin:"8px 0",fontSize:13,fontWeight:600},children:"Theme: gray10"}),e.jsx(i,{theme:"gray10",title:"Gray 10 theme"})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{margin:"8px 0",fontSize:13,fontWeight:600},children:"Orientation: right"}),e.jsx(i,{orientation:"right",title:"Right orientation"})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{margin:"8px 0",fontSize:13,fontWeight:600},children:"Disabled"}),e.jsx(i,{title:"Disabled",disabled:!0})]})]});s.storyName="All Variants";s.parameters={controls:{disable:!0}};r.__docgenInfo={description:"",methods:[],displayName:"Default"};d.__docgenInfo={description:"",methods:[],displayName:"Open"};p.__docgenInfo={description:"",methods:[],displayName:"WithDescription"};u.__docgenInfo={description:"",methods:[],displayName:"WithIcon"};m.__docgenInfo={description:"",methods:[],displayName:"WithTag"};g.__docgenInfo={description:"",methods:[],displayName:"Disabled"};h.__docgenInfo={description:"",methods:[],displayName:"RightOrientation"};f.__docgenInfo={description:"",methods:[],displayName:"Gray10Theme"};s.__docgenInfo={description:"",methods:[],displayName:"AllVariants"};var S,I,z;r.parameters={...r.parameters,docs:{...(S=r.parameters)==null?void 0:S.docs,source:{originalSource:`args => {
  const [open, setOpen] = useState(args.open);
  React.useEffect(() => setOpen(args.open), [args.open]);
  return <Accordion {...args} open={open} renderIcon={iconMap[args.renderIcon] || Sun} onToggle={() => {
    action('onToggle')();
    setOpen(v => !v);
  }}>
      <p style={{
      margin: 0
    }}>Accordion content goes here.</p>
    </Accordion>;
}`,...(z=(I=r.parameters)==null?void 0:I.docs)==null?void 0:z.source}}};var C,N,O;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`() => <Accordion title="Open accordion" open onToggle={action('onToggle')}>
    <p style={{
    margin: 0
  }}>Visible content</p>
  </Accordion>`,...(O=(N=d.parameters)==null?void 0:N.docs)==null?void 0:O.source}}};var D,$,W;p.parameters={...p.parameters,docs:{...(D=p.parameters)==null?void 0:D.docs,source:{originalSource:`() => <Accordion title="With description" description="Supplemental copy below the title." open onToggle={action('onToggle')}>
    Content
  </Accordion>`,...(W=($=p.parameters)==null?void 0:$.docs)==null?void 0:W.source}}};var V,R,k;u.parameters={...u.parameters,docs:{...(V=u.parameters)==null?void 0:V.docs,source:{originalSource:`() => <Accordion title="With icon" showIcon renderIcon={Star} onToggle={action('onToggle')}>
    Content
  </Accordion>`,...(k=(R=u.parameters)==null?void 0:R.docs)==null?void 0:k.source}}};var q,L,E;m.parameters={...m.parameters,docs:{...(q=m.parameters)==null?void 0:q.docs,source:{originalSource:`() => <Accordion title="With tag" showTag tagLabel="Beta" tagColor="green" onToggle={action('onToggle')}>
    Content
  </Accordion>`,...(E=(L=m.parameters)==null?void 0:L.docs)==null?void 0:E.source}}};var P,M,G;g.parameters={...g.parameters,docs:{...(P=g.parameters)==null?void 0:P.docs,source:{originalSource:`() => <Accordion title="Disabled" disabled onToggle={action('onToggle')}>
    Content
  </Accordion>`,...(G=(M=g.parameters)==null?void 0:M.docs)==null?void 0:G.source}}};var B,F,X;h.parameters={...h.parameters,docs:{...(B=h.parameters)==null?void 0:B.docs,source:{originalSource:`() => <Accordion title="Right orientation" orientation="right" onToggle={action('onToggle')}>
    Content
  </Accordion>`,...(X=(F=h.parameters)==null?void 0:F.docs)==null?void 0:X.source}}};var K,H,J;f.parameters={...f.parameters,docs:{...(K=f.parameters)==null?void 0:K.docs,source:{originalSource:`() => <Accordion title="Gray 10" theme="gray10" onToggle={action('onToggle')}>
    Content
  </Accordion>`,...(J=(H=f.parameters)==null?void 0:H.docs)==null?void 0:J.source}}};var Q,U,Y;s.parameters={...s.parameters,docs:{...(Q=s.parameters)==null?void 0:Q.docs,source:{originalSource:`() => <div style={{
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  padding: 24,
  background: '#f9f9f9'
}}>
    {AccordionSizes.map(size => <div key={size}>
        <h3 style={{
      margin: '8px 0',
      fontSize: 13,
      fontWeight: 600
    }}>Size: {size}</h3>
        <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }}>
          <Accordion size={size} title={\`\${size} closed\`} />
          <Accordion size={size} title={\`\${size} open\`} open description="With description" showIcon showTag tagLabel="Tag" />
        </div>
      </div>)}
    <div>
      <h3 style={{
      margin: '8px 0',
      fontSize: 13,
      fontWeight: 600
    }}>Theme: gray10</h3>
      <Accordion theme="gray10" title="Gray 10 theme" />
    </div>
    <div>
      <h3 style={{
      margin: '8px 0',
      fontSize: 13,
      fontWeight: 600
    }}>Orientation: right</h3>
      <Accordion orientation="right" title="Right orientation" />
    </div>
    <div>
      <h3 style={{
      margin: '8px 0',
      fontSize: 13,
      fontWeight: 600
    }}>Disabled</h3>
      <Accordion title="Disabled" disabled />
    </div>
  </div>`,...(Y=(U=s.parameters)==null?void 0:U.docs)==null?void 0:Y.source}}};const Re=["Default","Open","WithDescription","WithIcon","WithTag","Disabled","RightOrientation","Gray10Theme","AllVariants"],Xe=Object.freeze(Object.defineProperty({__proto__:null,AllVariants:s,Default:r,Disabled:g,Gray10Theme:f,Open:d,RightOrientation:h,WithDescription:p,WithIcon:u,WithTag:m,__namedExportsOrder:Re,default:Ve},Symbol.toStringTag,{value:"Module"}));function w(t){const o={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...Z(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(be,{isTemplate:!0}),`
`,e.jsx(o.h1,{id:"accordion",children:"Accordion"}),`
`,e.jsx(o.p,{children:e.jsx(o.a,{href:"packages/accordion/src/Accordion/Accordion.tsx",children:"Source code"})}),`
`,e.jsx(o.h2,{id:"overview",children:"Overview"}),`
`,e.jsxs(o.p,{children:[`A single, expandable disclosure with optional leading icon, supplemental
description, and an inline tag. Three sizes (`,e.jsx(o.code,{children:"small"}),", ",e.jsx(o.code,{children:"default"}),", ",e.jsx(o.code,{children:"large"}),`),
two themes (`,e.jsx(o.code,{children:"gray00"}),", ",e.jsx(o.code,{children:"gray10"}),"), and a right-side orientation."]}),`
`,`
`,e.jsx(o.h2,{id:"live-demo",children:"Live Demo"}),`
`,e.jsx(Te,{of:r}),`
`,e.jsx(o.h2,{id:"variants",children:"Variants"}),`
`,e.jsx(o.h3,{id:"sizes",children:"Sizes"}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-jsx",children:`<Accordion size="small" title="Small" />
<Accordion size="default" title="Default" />
<Accordion size="large" title="Large" />
`})}),`
`,e.jsx(o.h3,{id:"theme",children:"Theme"}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-jsx",children:`<Accordion theme="gray10" title="Gray 10 background" />
`})}),`
`,e.jsx(o.h3,{id:"orientation",children:"Orientation"}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-jsx",children:`<Accordion orientation="right" title="Chevron right" />
`})}),`
`,e.jsx(o.h2,{id:"composition",children:"Composition"}),`
`,e.jsxs(o.p,{children:["The optional inline tag is rendered using the ",e.jsx(o.code,{children:"@ds/tags"}),` package — it is
imported, not redefined.`]}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-jsx",children:`<Accordion showTag tagLabel="Beta" tagColor="green" title="With tag" />
`})}),`
`,e.jsx(o.h2,{id:"component-api",children:"Component API"}),`
`,e.jsx(Ae,{}),`
`,e.jsx(o.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:["Header has ",e.jsx(o.code,{children:'role="button"'}),", ",e.jsx(o.code,{children:"aria-expanded"}),", ",e.jsx(o.code,{children:"aria-disabled"}),"."]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.code,{children:"Enter"})," and ",e.jsx(o.code,{children:"Space"})," toggle when focused."]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.code,{children:"tabIndex"})," is ",e.jsx(o.code,{children:"-1"})," when disabled."]}),`
`,e.jsxs(o.li,{children:["Icons are ",e.jsx(o.code,{children:'aria-hidden="true"'}),"."]}),`
`]}),`
`,`
`,e.jsxs(o.h2,{id:"api-change-customicon--rendericon",children:["API Change: ",e.jsx(o.code,{children:"customIcon"})," → ",e.jsx(o.code,{children:"renderIcon"})]}),`
`,e.jsxs(o.p,{children:["PANW originally accepted ",e.jsx(o.code,{children:"customIcon: ReactNode"}),`. This port follows the
Carbon convention: `,e.jsx(o.code,{children:"renderIcon: ElementType"}),` so the component controls
sizing and `,e.jsx(o.code,{children:"aria-hidden"}),"."]}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-jsx",children:`import { Star } from 'lucide-react';
<Accordion showIcon renderIcon={Star} title="With icon" />
`})})]})}function ae(t={}){const{wrapper:o}={...Z(),...t.components};return o?e.jsx(o,{...t,children:e.jsx(w,{...t})}):w(t)}const Ke=Object.freeze(Object.defineProperty({__proto__:null,default:ae},Symbol.toStringTag,{value:"Module"}));export{Xe as A,Ke as a};
