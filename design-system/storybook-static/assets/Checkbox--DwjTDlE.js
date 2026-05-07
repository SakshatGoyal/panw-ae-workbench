import{j as e,b as $,c as F,e as X}from"./index-CHjcGL7e.js";import{useMDXComponents as P}from"./index-DVRRELxc.js";import"./usePrefix-BO8COP8A.js";import{r as z}from"./index-CwcVQgaJ.js";import{a as R}from"./index-B-lxVbXh.js";import{C as U,a}from"./Checkbox-CrWvJG89.js";const W={title:"Components/Checkbox",component:a,argTypes:{status:{options:U,control:{type:"radio"}},disabled:{control:"boolean"},label:{control:"text"}},parameters:{docs:{page:E}},tags:["autodocs"]},n=t=>{const[s,L]=z.useState(t.status);return e.jsx(a,{...t,status:s,onChange:(h,V)=>{L(h),R("onChange")(h,V)}})};n.args={status:"unchecked",disabled:!1,label:"Checkbox Label"};const o=()=>e.jsx(a,{status:"unchecked",label:"Unchecked"}),r=()=>e.jsx(a,{status:"checked",label:"Checked"}),d=()=>e.jsx(a,{status:"indeterminate",label:"Indeterminate"}),i=()=>e.jsx(a,{status:"unchecked",disabled:!0,label:"Disabled"}),l=()=>e.jsx(a,{status:"checked",disabled:!0,label:"Disabled checked"}),c=()=>e.jsx("div",{style:{fontFamily:"Inter, sans-serif",padding:"24px",display:"grid",gap:"12px"},children:U.map(t=>e.jsxs("div",{style:{display:"flex",gap:"12px"},children:[e.jsx(a,{status:t,label:t}),e.jsx(a,{status:t,label:`${t} disabled`,disabled:!0})]},t))});c.storyName="All Variants";c.parameters={controls:{disable:!0}};n.__docgenInfo={description:"",methods:[],displayName:"Default"};o.__docgenInfo={description:"",methods:[],displayName:"Unchecked"};r.__docgenInfo={description:"",methods:[],displayName:"Checked"};d.__docgenInfo={description:"",methods:[],displayName:"Indeterminate"};i.__docgenInfo={description:"",methods:[],displayName:"Disabled"};l.__docgenInfo={description:"",methods:[],displayName:"DisabledChecked"};c.__docgenInfo={description:"",methods:[],displayName:"AllVariants"};var u,x,m;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
  const [status, setStatus] = useState(args.status);
  return <Checkbox {...args} status={status} onChange={(next, e) => {
    setStatus(next);
    action('onChange')(next, e);
  }} />;
}`,...(m=(x=n.parameters)==null?void 0:x.docs)==null?void 0:m.source}}};var b,k,j;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:'() => <Checkbox status="unchecked" label="Unchecked" />',...(j=(k=o.parameters)==null?void 0:k.docs)==null?void 0:j.source}}};var g,C,f;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:'() => <Checkbox status="checked" label="Checked" />',...(f=(C=r.parameters)==null?void 0:C.docs)==null?void 0:f.source}}};var y,_,S;d.parameters={...d.parameters,docs:{...(y=d.parameters)==null?void 0:y.docs,source:{originalSource:'() => <Checkbox status="indeterminate" label="Indeterminate" />',...(S=(_=d.parameters)==null?void 0:_.docs)==null?void 0:S.source}}};var v,D,I;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:'() => <Checkbox status="unchecked" disabled label="Disabled" />',...(I=(D=i.parameters)==null?void 0:D.docs)==null?void 0:I.source}}};var A,N,M;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:'() => <Checkbox status="checked" disabled label="Disabled checked" />',...(M=(N=l.parameters)==null?void 0:N.docs)==null?void 0:M.source}}};var T,O,w;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`() => <div style={{
  fontFamily: 'Inter, sans-serif',
  padding: '24px',
  display: 'grid',
  gap: '12px'
}}>
    {CheckboxStatuses.map(s => <div key={s} style={{
    display: 'flex',
    gap: '12px'
  }}>
        <Checkbox status={s} label={s} />
        <Checkbox status={s} label={\`\${s} disabled\`} disabled />
      </div>)}
  </div>`,...(w=(O=c.parameters)==null?void 0:O.docs)==null?void 0:w.source}}};const H=["Default","Unchecked","Checked","Indeterminate","Disabled","DisabledChecked","AllVariants"],Y=Object.freeze(Object.defineProperty({__proto__:null,AllVariants:c,Checked:r,Default:n,Disabled:i,DisabledChecked:l,Indeterminate:d,Unchecked:o,__namedExportsOrder:H,default:W},Symbol.toStringTag,{value:"Module"}));function p(t){const s={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...P(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx($,{isTemplate:!0}),`
`,e.jsx(s.h1,{id:"checkbox",children:"Checkbox"}),`
`,e.jsx(s.p,{children:e.jsx(s.a,{href:"packages/checkbox/src/Checkbox/Checkbox.tsx",children:"Source code"})}),`
`,e.jsx(s.h2,{id:"overview",children:"Overview"}),`
`,e.jsxs(s.p,{children:["A controlled checkbox with three statuses: ",e.jsx(s.code,{children:"checked"}),", ",e.jsx(s.code,{children:"unchecked"}),`, and
`,e.jsx(s.code,{children:"indeterminate"}),". Wraps a real ",e.jsx(s.code,{children:'<input type="checkbox">'}),`; the indeterminate
state is synced to the DOM via a ref-driven effect (it is not exposed as an
HTML attribute).`]}),`
`,`
`,e.jsx(s.h2,{id:"live-demo",children:"Live Demo"}),`
`,e.jsx(F,{of:n}),`
`,e.jsx(s.h2,{id:"code",children:"Code"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-jsx",children:`const [status, setStatus] = useState('unchecked');

<Checkbox status={status} onChange={(next) => setStatus(next)} label="Accept terms" />
<Checkbox status="indeterminate" label="Some selected" />
`})}),`
`,e.jsx(s.h2,{id:"component-api",children:"Component API"}),`
`,e.jsx(X,{}),`
`,e.jsx(s.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Real ",e.jsx(s.code,{children:'<input type="checkbox">'})," so native semantics apply."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"aria-checked"})," is set to ",e.jsx(s.code,{children:'"mixed"'})," for the indeterminate state."]}),`
`,e.jsxs(s.li,{children:["The ",e.jsx(s.code,{children:"<label>"})," wraps the input — clicking the icon or label toggles."]}),`
`,e.jsxs(s.li,{children:["Disabled uses the native ",e.jsx(s.code,{children:"disabled"})," attribute."]}),`
`,e.jsxs(s.li,{children:[`
`,`
`]}),`
`]}),`
`,e.jsx(s.h2,{id:"api-change",children:"API Change"}),`
`,e.jsxs(s.p,{children:["PANW emitted ",e.jsx(s.code,{children:"onChange(next: CheckboxStatus)"}),`. The port emits
`,e.jsx(s.code,{children:"onChange(next, event)"})," to expose the underlying ",e.jsx(s.code,{children:"ChangeEvent"}),"."]})]})}function E(t={}){const{wrapper:s}={...P(),...t.components};return s?e.jsx(s,{...t,children:e.jsx(p,{...t})}):p(t)}const Z=Object.freeze(Object.defineProperty({__proto__:null,default:E},Symbol.toStringTag,{value:"Module"}));export{Y as C,Z as a};
