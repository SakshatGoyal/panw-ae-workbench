import{j as e,b as J,c as K,e as Q}from"./index-CHjcGL7e.js";import{useMDXComponents as E}from"./index-DVRRELxc.js";import{c as Y,u as ee,P as i}from"./usePrefix-BO8COP8A.js";import{R as ae,r as P}from"./index-CwcVQgaJ.js";import{a as ne}from"./index-B-lxVbXh.js";const te="M16 2C13.2311 2 10.5243 2.82109 8.22202 4.35943C5.91973 5.89777 4.12532 8.08427 3.06569 10.6424C2.00607 13.2006 1.72882 16.0155 2.26901 18.7313C2.80921 21.447 4.14258 23.9416 6.10051 25.8995C8.05845 27.8574 10.553 29.1908 13.2687 29.731C15.9845 30.2712 18.7994 29.9939 21.3576 28.9343C23.9157 27.8747 26.1022 26.0803 27.6406 23.778C29.1789 21.4757 30 18.7689 30 16C30 12.287 28.525 8.72601 25.8995 6.1005C23.274 3.475 19.713 2 16 2ZM16 28C13.6266 28 11.3066 27.2962 9.33316 25.9776C7.35977 24.6591 5.8217 22.7849 4.91345 20.5922C4.0052 18.3995 3.76756 15.9867 4.23058 13.6589C4.69361 11.3311 5.83649 9.19295 7.51472 7.51472C9.19296 5.83649 11.3312 4.6936 13.6589 4.23058C15.9867 3.76755 18.3995 4.00519 20.5922 4.91345C22.7849 5.8217 24.6591 7.35977 25.9776 9.33316C27.2962 11.3065 28 13.6266 28 16C28 19.1826 26.7357 22.2348 24.4853 24.4853C22.2348 26.7357 19.1826 28 16 28Z",se="M16 10C14.8133 10 13.6533 10.3519 12.6666 11.0112C11.6799 11.6705 10.9109 12.6075 10.4567 13.7039C10.0026 14.8003 9.88378 16.0067 10.1153 17.1705C10.3468 18.3344 10.9182 19.4035 11.7574 20.2426C12.5965 21.0818 13.6656 21.6532 14.8295 21.8847C15.9933 22.1162 17.1997 21.9974 18.2961 21.5433C19.3925 21.0892 20.3295 20.3201 20.9888 19.3334C21.6481 18.3467 22 17.1867 22 16C22 14.4087 21.3679 12.8826 20.2426 11.7574C19.1174 10.6321 17.5913 10 16 10Z",n=ae.forwardRef(function({checked:a=!1,disabled:s=!1,label:m="Radio Button Label",onChange:b,name:U,value:q,className:G,...H},F){const o=ee(),W=z=>{s||!b||b(!a,z)},X=a||s,Z=Y(`${o}--radio-button`,{[`${o}--radio-button--disabled`]:s},G);return e.jsxs("label",{className:Z,"data-checked":a,children:[e.jsx("input",{ref:F,type:"radio",className:`${o}--radio-button__input`,checked:a,disabled:s,onChange:W,name:U,value:q,...H}),e.jsx("span",{className:`${o}--radio-button__icon-wrap`,children:e.jsxs("svg",{className:`${o}--rb-icon`,width:"16",height:"16",viewBox:"0 0 32 32",fill:"none","aria-hidden":"true",children:[e.jsx("path",{className:`${o}--rb-ring`,d:te}),X&&e.jsx("path",{className:`${o}--rb-dot`,d:se})]})}),m&&e.jsx("span",{className:`${o}--radio-button__label`,children:m})]})});n.displayName="RadioButton";n.propTypes={checked:i.bool,disabled:i.bool,label:i.string,name:i.string,value:i.string,onChange:i.func,className:i.string};n.__docgenInfo={description:"",methods:[],displayName:"RadioButton",props:{checked:{required:!1,tsType:{name:"boolean"},description:"Whether the radio is selected. Controlled.",defaultValue:{value:"false",computed:!1},type:{name:"bool"}},disabled:{required:!1,tsType:{name:"boolean"},description:"Disables interaction and applies muted colors.",defaultValue:{value:"false",computed:!1},type:{name:"bool"}},label:{required:!1,tsType:{name:"string"},description:"Label text rendered next to the radio.",defaultValue:{value:"'Radio Button Label'",computed:!1},type:{name:"string"}},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void",signature:{arguments:[{type:{name:"boolean"},name:"checked"},{type:{name:"ReactChangeEvent",raw:"React.ChangeEvent<HTMLInputElement>",elements:[{name:"HTMLInputElement"}]},name:"event"}],return:{name:"void"}}},description:"Fired when the user toggles the radio.",type:{name:"func"}},name:{required:!1,tsType:{name:"string"},description:"Optional name attribute for grouping radios into a single field.",type:{name:"string"}},value:{required:!1,tsType:{name:"string"},description:"Optional value attribute for the underlying input.",type:{name:"string"}},className:{description:"",type:{name:"string"},required:!1}},composes:["Omit"]};const oe={title:"Components/RadioButton",component:n,argTypes:{checked:{control:"boolean"},disabled:{control:"boolean"},label:{control:"text"}},parameters:{docs:{page:L}},tags:["autodocs"]},r=t=>{const[a,s]=P.useState(t.checked);return e.jsx(n,{...t,checked:a,onChange:(m,b)=>{s(m),ne("onChange")(m,b)}})};r.args={checked:!1,disabled:!1,label:"Radio Button Label"};const c=()=>e.jsx(n,{label:"Unchecked"}),l=()=>e.jsx(n,{label:"Checked",checked:!0}),u=()=>e.jsx(n,{label:"Disabled unchecked",disabled:!0}),p=()=>e.jsx(n,{label:"Disabled checked",disabled:!0,checked:!0}),h=()=>{const[t,a]=P.useState("a");return e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:["a","b","c"].map(s=>e.jsx(n,{name:"group",value:s,checked:t===s,onChange:()=>a(s),label:`Option ${s.toUpperCase()}`},s))})},d=()=>e.jsxs("div",{style:{fontFamily:"Inter, sans-serif",padding:"24px",display:"grid",gap:"12px"},children:[e.jsx(n,{label:"Default unchecked"}),e.jsx(n,{label:"Default checked",checked:!0}),e.jsx(n,{label:"Disabled unchecked",disabled:!0}),e.jsx(n,{label:"Disabled checked",disabled:!0,checked:!0})]});d.storyName="All Variants";d.parameters={controls:{disable:!0}};r.__docgenInfo={description:"",methods:[],displayName:"Default"};c.__docgenInfo={description:"",methods:[],displayName:"Unchecked"};l.__docgenInfo={description:"",methods:[],displayName:"Checked"};u.__docgenInfo={description:"",methods:[],displayName:"Disabled"};p.__docgenInfo={description:"",methods:[],displayName:"DisabledChecked"};h.__docgenInfo={description:"",methods:[],displayName:"Group"};d.__docgenInfo={description:"",methods:[],displayName:"AllVariants"};var x,f,C;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
  const [checked, setChecked] = useState(args.checked);
  return <RadioButton {...args} checked={checked} onChange={(next, e) => {
    setChecked(next);
    action('onChange')(next, e);
  }} />;
}`,...(C=(f=r.parameters)==null?void 0:f.docs)==null?void 0:C.source}}};var j,k,v;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:'() => <RadioButton label="Unchecked" />',...(v=(k=c.parameters)==null?void 0:k.docs)==null?void 0:v.source}}};var y,_,R;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:'() => <RadioButton label="Checked" checked />',...(R=(_=l.parameters)==null?void 0:_.docs)==null?void 0:R.source}}};var D,B,N;u.parameters={...u.parameters,docs:{...(D=u.parameters)==null?void 0:D.docs,source:{originalSource:'() => <RadioButton label="Disabled unchecked" disabled />',...(N=(B=u.parameters)==null?void 0:B.docs)==null?void 0:N.source}}};var T,S,w;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:'() => <RadioButton label="Disabled checked" disabled checked />',...(w=(S=p.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};var I,V,O;h.parameters={...h.parameters,docs:{...(I=h.parameters)==null?void 0:I.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('a');
  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  }}>
      {['a', 'b', 'c'].map(v => <RadioButton key={v} name="group" value={v} checked={value === v} onChange={() => setValue(v)} label={\`Option \${v.toUpperCase()}\`} />)}
    </div>;
}`,...(O=(V=h.parameters)==null?void 0:V.docs)==null?void 0:O.source}}};var A,M,$;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:`() => <div style={{
  fontFamily: 'Inter, sans-serif',
  padding: '24px',
  display: 'grid',
  gap: '12px'
}}>
    <RadioButton label="Default unchecked" />
    <RadioButton label="Default checked" checked />
    <RadioButton label="Disabled unchecked" disabled />
    <RadioButton label="Disabled checked" disabled checked />
  </div>`,...($=(M=d.parameters)==null?void 0:M.docs)==null?void 0:$.source}}};const re=["Default","Unchecked","Checked","Disabled","DisabledChecked","Group","AllVariants"],pe=Object.freeze(Object.defineProperty({__proto__:null,AllVariants:d,Checked:l,Default:r,Disabled:u,DisabledChecked:p,Group:h,Unchecked:c,__namedExportsOrder:re,default:oe},Symbol.toStringTag,{value:"Module"}));function g(t){const a={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...E(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(J,{isTemplate:!0}),`
`,e.jsx(a.h1,{id:"radiobutton",children:"RadioButton"}),`
`,e.jsx(a.p,{children:e.jsx(a.a,{href:"packages/radio-button/src/RadioButton/RadioButton.tsx",children:"Source code"})}),`
`,e.jsx(a.h2,{id:"overview",children:"Overview"}),`
`,e.jsxs(a.p,{children:[`A controlled radio input rendered with a custom 16×16 SVG ring + dot. Wraps a
visually-hidden native `,e.jsx(a.code,{children:'<input type="radio">'}),` so keyboard, screen reader, and
form-submission semantics behave like a standard radio.`]}),`
`,`
`,e.jsx(a.h2,{id:"live-demo",children:"Live Demo"}),`
`,e.jsx(K,{of:r}),`
`,e.jsx(a.h2,{id:"code",children:"Code"}),`
`,e.jsx(a.pre,{children:e.jsx(a.code,{className:"language-jsx",children:`const [value, setValue] = useState('a');

<RadioButton name="group" value="a" checked={value === 'a'} onChange={() => setValue('a')} label="Option A" />
<RadioButton name="group" value="b" checked={value === 'b'} onChange={() => setValue('b')} label="Option B" />
`})}),`
`,e.jsx(a.h2,{id:"component-api",children:"Component API"}),`
`,e.jsx(Q,{}),`
`,e.jsx(a.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(a.ul,{children:[`
`,e.jsxs(a.li,{children:["Uses a real ",e.jsx(a.code,{children:'<input type="radio">'}),` (visually hidden via clip rect) so native
keyboard activation, focus, and screen reader semantics all work.`]}),`
`,e.jsxs(a.li,{children:["The custom SVG icon is ",e.jsx(a.code,{children:'aria-hidden="true"'})," — assistive tech reads the input."]}),`
`,e.jsxs(a.li,{children:["The wrapping ",e.jsx(a.code,{children:"<label>"}),` makes the entire row clickable and associates the
label text with the input.`]}),`
`,e.jsxs(a.li,{children:[e.jsx(a.code,{children:"disabled"})," sets the native ",e.jsx(a.code,{children:"disabled"}),` attribute, which removes the input
from the tab order.`]}),`
`,e.jsxs(a.li,{children:[`
`,`
`]}),`
`]}),`
`,e.jsxs(a.h2,{id:"api-change-onchange-signature",children:["API Change: ",e.jsx(a.code,{children:"onChange"})," signature"]}),`
`,e.jsxs(a.p,{children:["PANW's source emitted ",e.jsx(a.code,{children:"onChange(checked: boolean)"}),` — a single boolean. The
port emits `,e.jsx(a.code,{children:"onChange(checked, event)"}),` so consumers have access to the native
`,e.jsx(a.code,{children:"ChangeEvent"})," (Carbon convention)."]})]})}function L(t={}){const{wrapper:a}={...E(),...t.components};return a?e.jsx(a,{...t,children:e.jsx(g,{...t})}):g(t)}const he=Object.freeze(Object.defineProperty({__proto__:null,default:L},Symbol.toStringTag,{value:"Module"}));export{pe as R,he as a};
