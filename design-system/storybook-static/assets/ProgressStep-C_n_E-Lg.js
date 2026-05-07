import{j as e,b as Q,c as Y,e as _}from"./index-CHjcGL7e.js";import{useMDXComponents as K}from"./index-DVRRELxc.js";import{c as X,u as H,P as r}from"./usePrefix-BO8COP8A.js";import{R as b}from"./index-CwcVQgaJ.js";import{a as I}from"./index-B-lxVbXh.js";import{C as Z}from"./circle-x-CPXp-pH8.js";import{c as L}from"./createLucideIcon-J4rvsbg-.js";/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],se=L("circle-alert",ee);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const te=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],re=L("circle-check",te),ae=["success","warning","error","active","inactive"],w=["default","compact"],ne={success:re,warning:se,error:Z},t=b.forwardRef(function({label:s,description:h,status:i,onClick:p,index:j=0,size:S="default",showDescription:f=!0,forceHover:y=!1,className:x},v){const a=H(),B=S==="compact"?16:24,G=X(`${a}--ps-step`,`${a}--ps-step--${i}`,`${a}--ps-step--${S}`,{[`${a}--ps-step--hover`]:y},x);let P;if(i==="active"||i==="inactive")P=e.jsx("span",{className:`${a}--ps-step__number ${a}--ps-step__number--${i}`,children:j+1});else{const d=ne[i];P=e.jsx("span",{className:`${a}--ps-step__icon ${a}--ps-step__icon--${i}`,children:e.jsx(d,{size:B})})}const J=p?d=>{(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),p(d))}:void 0;return e.jsxs("div",{ref:v,className:G,onClick:p,onKeyDown:J,role:p?"button":void 0,tabIndex:p?0:void 0,children:[e.jsx("div",{className:`${a}--ps-step__indicator-container`,children:P}),e.jsxs("div",{className:`${a}--ps-step__text-container`,children:[e.jsx("span",{className:`${a}--ps-step__title`,children:s}),f&&h&&e.jsx("span",{className:`${a}--ps-step__description`,children:h})]})]})});t.displayName="ProgressStepItem";t.propTypes={label:r.string.isRequired,description:r.string,status:r.oneOf(ae).isRequired,onClick:r.func,index:r.number,size:r.oneOf(w),showDescription:r.bool,forceHover:r.bool,className:r.string};t.__docgenInfo={description:"",methods:[],displayName:"ProgressStepItem",props:{label:{required:!0,tsType:{name:"string"},description:"Title text.",type:{name:"string"}},description:{required:!1,tsType:{name:"string"},description:"Optional description.",type:{name:"string"}},status:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof ProgressStatuses)[number]"},description:"Step status.",type:{name:"enum",value:[{value:"'success'",computed:!1},{value:"'warning'",computed:!1},{value:"'error'",computed:!1},{value:"'active'",computed:!1},{value:"'inactive'",computed:!1}]}},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: React.MouseEvent | React.KeyboardEvent) => void",signature:{arguments:[{type:{name:"union",raw:"React.MouseEvent | React.KeyboardEvent",elements:[{name:"ReactMouseEvent",raw:"React.MouseEvent"},{name:"ReactKeyboardEvent",raw:"React.KeyboardEvent"}]},name:"event"}],return:{name:"void"}}},description:"Click handler — when set, the step is keyboard-activatable.",type:{name:"func"}},index:{required:!1,tsType:{name:"number"},description:"Internal (set by `<ProgressStep>`): zero-based index used for the active /\ninactive number indicator.",defaultValue:{value:"0",computed:!1},type:{name:"number"}},size:{required:!1,tsType:{name:"unknown[number]",raw:"(typeof ProgressSizes)[number]"},description:"Internal (set by `<ProgressStep>`): size variant.",defaultValue:{value:"'default'",computed:!1},type:{name:"enum",value:[{value:"'default'",computed:!1},{value:"'compact'",computed:!1}]}},showDescription:{required:!1,tsType:{name:"boolean"},description:"Internal (set by `<ProgressStep>`): show description text.",defaultValue:{value:"true",computed:!1},type:{name:"bool"}},forceHover:{required:!1,tsType:{name:"boolean"},description:"Force hover appearance for documentation/snapshot scenarios.",defaultValue:{value:"false",computed:!1},type:{name:"bool"}},className:{required:!1,tsType:{name:"string"},description:"Additional class.",type:{name:"string"}}}};const n=b.forwardRef(function({children:s,size:h="default",showDescription:i=!0,className:p,...j},S){const f=H(),y=b.Children.toArray(s).filter(Boolean);return e.jsx("div",{ref:S,className:X(`${f}--ps-stepper`,`${f}--ps-stepper--${h}`,p),...j,children:y.map((x,v)=>b.isValidElement(x)?b.cloneElement(x,{index:v,size:h,showDescription:i,key:v}):x)})});n.displayName="ProgressStep";n.propTypes={children:r.node,size:r.oneOf(w),showDescription:r.bool,className:r.string};n.__docgenInfo={description:"",methods:[],displayName:"ProgressStep",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"ProgressStepItem children.",type:{name:"node"}},size:{required:!1,tsType:{name:"unknown[number]",raw:"(typeof ProgressSizes)[number]"},description:"Size variant — passed to each child.",defaultValue:{value:"'default'",computed:!1},type:{name:"enum",value:[{value:"'default'",computed:!1},{value:"'compact'",computed:!1}]}},showDescription:{required:!1,tsType:{name:"boolean"},description:"Show description text below each step title.",defaultValue:{value:"true",computed:!1},type:{name:"bool"}},className:{description:"",type:{name:"string"},required:!1}},composes:["Omit"]};const oe={title:"Components/ProgressStep",component:n,subcomponents:{ProgressStepItem:t},argTypes:{size:{options:w,control:{type:"radio"}},showDescription:{control:"boolean"}},parameters:{docs:{page:U}},tags:["autodocs"]},c=o=>e.jsxs(n,{...o,children:[e.jsx(t,{label:"Setup",description:"Configure account",status:"success"}),e.jsx(t,{label:"Details",description:"Add details",status:"active"}),e.jsx(t,{label:"Review",description:"Confirm setup",status:"inactive"})]});c.args={size:"default",showDescription:!0};const u=()=>e.jsxs(n,{size:"compact",children:[e.jsx(t,{label:"Step 1",status:"success"}),e.jsx(t,{label:"Step 2",status:"active"}),e.jsx(t,{label:"Step 3",status:"inactive"})]}),m=()=>e.jsxs(n,{children:[e.jsx(t,{label:"Done",description:"Completed",status:"success"}),e.jsx(t,{label:"Heads up",description:"Warning state",status:"warning"}),e.jsx(t,{label:"Failed",description:"Error state",status:"error"}),e.jsx(t,{label:"Current",description:"Active step",status:"active"}),e.jsx(t,{label:"Upcoming",description:"Inactive step",status:"inactive"})]}),g=()=>e.jsxs(n,{children:[e.jsx(t,{label:"One",status:"success",onClick:I("click 1")}),e.jsx(t,{label:"Two",status:"active",onClick:I("click 2")}),e.jsx(t,{label:"Three",status:"inactive",onClick:I("click 3")})]}),l=()=>e.jsxs("div",{style:{fontFamily:"Inter, sans-serif",padding:"24px",display:"grid",gap:"16px",minWidth:800},children:[e.jsx("p",{style:{fontSize:12},children:"Default size"}),e.jsxs(n,{children:[e.jsx(t,{label:"Success",description:"ok",status:"success"}),e.jsx(t,{label:"Warning",description:"warn",status:"warning"}),e.jsx(t,{label:"Error",description:"err",status:"error"}),e.jsx(t,{label:"Active",description:"now",status:"active"}),e.jsx(t,{label:"Inactive",description:"next",status:"inactive"})]}),e.jsx("p",{style:{fontSize:12},children:"Compact size"}),e.jsxs(n,{size:"compact",children:[e.jsx(t,{label:"Success",status:"success"}),e.jsx(t,{label:"Warning",status:"warning"}),e.jsx(t,{label:"Error",status:"error"}),e.jsx(t,{label:"Active",status:"active"}),e.jsx(t,{label:"Inactive",status:"inactive"})]})]});l.storyName="All Variants";l.parameters={controls:{disable:!0}};c.__docgenInfo={description:"",methods:[],displayName:"Default"};u.__docgenInfo={description:"",methods:[],displayName:"Compact"};m.__docgenInfo={description:"",methods:[],displayName:"WithStatuses"};g.__docgenInfo={description:"",methods:[],displayName:"Clickable"};l.__docgenInfo={description:"",methods:[],displayName:"AllVariants"};var k,N,z;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`args => <ProgressStep {...args}>
    <ProgressStepItem label="Setup" description="Configure account" status="success" />
    <ProgressStepItem label="Details" description="Add details" status="active" />
    <ProgressStepItem label="Review" description="Confirm setup" status="inactive" />
  </ProgressStep>`,...(z=(N=c.parameters)==null?void 0:N.docs)==null?void 0:z.source}}};var T,D,A;u.parameters={...u.parameters,docs:{...(T=u.parameters)==null?void 0:T.docs,source:{originalSource:`() => <ProgressStep size="compact">
    <ProgressStepItem label="Step 1" status="success" />
    <ProgressStepItem label="Step 2" status="active" />
    <ProgressStepItem label="Step 3" status="inactive" />
  </ProgressStep>`,...(A=(D=u.parameters)==null?void 0:D.docs)==null?void 0:A.source}}};var R,E,$;m.parameters={...m.parameters,docs:{...(R=m.parameters)==null?void 0:R.docs,source:{originalSource:`() => <ProgressStep>
    <ProgressStepItem label="Done" description="Completed" status="success" />
    <ProgressStepItem label="Heads up" description="Warning state" status="warning" />
    <ProgressStepItem label="Failed" description="Error state" status="error" />
    <ProgressStepItem label="Current" description="Active step" status="active" />
    <ProgressStepItem label="Upcoming" description="Inactive step" status="inactive" />
  </ProgressStep>`,...($=(E=m.parameters)==null?void 0:E.docs)==null?void 0:$.source}}};var q,W,O;g.parameters={...g.parameters,docs:{...(q=g.parameters)==null?void 0:q.docs,source:{originalSource:`() => <ProgressStep>
    <ProgressStepItem label="One" status="success" onClick={action('click 1')} />
    <ProgressStepItem label="Two" status="active" onClick={action('click 2')} />
    <ProgressStepItem label="Three" status="inactive" onClick={action('click 3')} />
  </ProgressStep>`,...(O=(W=g.parameters)==null?void 0:W.docs)==null?void 0:O.source}}};var V,M,F;l.parameters={...l.parameters,docs:{...(V=l.parameters)==null?void 0:V.docs,source:{originalSource:`() => <div style={{
  fontFamily: 'Inter, sans-serif',
  padding: '24px',
  display: 'grid',
  gap: '16px',
  minWidth: 800
}}>
    <p style={{
    fontSize: 12
  }}>Default size</p>
    <ProgressStep>
      <ProgressStepItem label="Success" description="ok" status="success" />
      <ProgressStepItem label="Warning" description="warn" status="warning" />
      <ProgressStepItem label="Error" description="err" status="error" />
      <ProgressStepItem label="Active" description="now" status="active" />
      <ProgressStepItem label="Inactive" description="next" status="inactive" />
    </ProgressStep>
    <p style={{
    fontSize: 12
  }}>Compact size</p>
    <ProgressStep size="compact">
      <ProgressStepItem label="Success" status="success" />
      <ProgressStepItem label="Warning" status="warning" />
      <ProgressStepItem label="Error" status="error" />
      <ProgressStepItem label="Active" status="active" />
      <ProgressStepItem label="Inactive" status="inactive" />
    </ProgressStep>
  </div>`,...(F=(M=l.parameters)==null?void 0:M.docs)==null?void 0:F.source}}};const ie=["Default","Compact","WithStatuses","Clickable","AllVariants"],he=Object.freeze(Object.defineProperty({__proto__:null,AllVariants:l,Clickable:g,Compact:u,Default:c,WithStatuses:m,__namedExportsOrder:ie,default:oe},Symbol.toStringTag,{value:"Module"}));function C(o){const s={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...K(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(Q,{isTemplate:!0}),`
`,e.jsx(s.h1,{id:"progressstep",children:"ProgressStep"}),`
`,e.jsx(s.p,{children:e.jsx(s.a,{href:"packages/progress-step/src/ProgressStep/ProgressStep.tsx",children:"Source code"})}),`
`,e.jsx(s.h2,{id:"overview",children:"Overview"}),`
`,e.jsxs(s.p,{children:[`A horizontal stepper. Each step has a colored top border and an indicator
(numbered circle for `,e.jsx(s.code,{children:"active"})," / ",e.jsx(s.code,{children:"inactive"}),", status icon for ",e.jsx(s.code,{children:"success"}),` /
`,e.jsx(s.code,{children:"warning"})," / ",e.jsx(s.code,{children:"error"}),`). Steps can optionally render a description and be made
clickable.`]}),`
`,`
`,e.jsx(s.h2,{id:"live-demo",children:"Live Demo"}),`
`,e.jsx(Y,{of:c}),`
`,e.jsx(s.h2,{id:"code",children:"Code"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-jsx",children:`<ProgressStep>
  <ProgressStepItem label="Setup" status="success" />
  <ProgressStepItem label="Details" status="active" description="Now" />
  <ProgressStepItem label="Review" status="inactive" />
</ProgressStep>
`})}),`
`,e.jsxs(s.h2,{id:"api-change-steps-array--compound-children",children:["API Change: ",e.jsx(s.code,{children:"steps"})," array → compound children"]}),`
`,e.jsxs(s.p,{children:["PANW's source accepted a ",e.jsx(s.code,{children:"steps: StepData[]"}),` array and rendered each step
internally. `,e.jsx(s.strong,{children:"The port adopts Carbon's compound-children pattern"}),` — pass
`,e.jsx(s.code,{children:"<ProgressStepItem>"})," children directly. ",e.jsx(s.code,{children:"<ProgressStep>"}),` automatically forwards
`,e.jsx(s.code,{children:"size"}),", ",e.jsx(s.code,{children:"showDescription"}),", and the zero-based ",e.jsx(s.code,{children:"index"}),` to each child via
`,e.jsx(s.code,{children:"React.cloneElement"}),"."]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-jsx",children:`// PANW (old)
<ProgressStep steps={[
  { label: 'Setup', status: 'success' },
  { label: 'Details', status: 'active' },
]} />

// Ported (Carbon convention)
<ProgressStep>
  <ProgressStepItem label="Setup" status="success" />
  <ProgressStepItem label="Details" status="active" />
</ProgressStep>
`})}),`
`,e.jsx(s.h2,{id:"component-api",children:"Component API"}),`
`,e.jsx(s.h3,{id:"progressstep-1",children:e.jsx(s.code,{children:"ProgressStep"})}),`
`,e.jsx(_,{of:n}),`
`,e.jsx(s.h3,{id:"progressstepitem",children:e.jsx(s.code,{children:"ProgressStepItem"})}),`
`,e.jsx(_,{of:t}),`
`,e.jsx(s.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["When ",e.jsx(s.code,{children:"onClick"})," is set on a ",e.jsx(s.code,{children:"ProgressStepItem"}),", it gains ",e.jsx(s.code,{children:'role="button"'}),`,
`,e.jsx(s.code,{children:"tabIndex={0}"}),", and Enter/Space activation."]}),`
`,e.jsxs(s.li,{children:["Status icons are ",e.jsx(s.code,{children:"aria-hidden"}),` (decorative); status meaning is conveyed by
the visible label.`]}),`
`,e.jsxs(s.li,{children:[`
`,`
`]}),`
`]}),`
`,e.jsx(s.h2,{id:"api-change-status-icons",children:"API Change: status icons"}),`
`,e.jsxs(s.p,{children:[`PANW's source rendered hand-coded SVG paths. The port uses lucide-react icons
(`,e.jsx(s.code,{children:"CheckCircle2"}),", ",e.jsx(s.code,{children:"AlertCircle"}),", ",e.jsx(s.code,{children:"XCircle"}),`) sized to match the original (24px
default / 16px compact).`]})]})}function U(o={}){const{wrapper:s}={...K(),...o.components};return s?e.jsx(s,{...o,children:e.jsx(C,{...o})}):C(o)}const xe=Object.freeze(Object.defineProperty({__proto__:null,default:U},Symbol.toStringTag,{value:"Module"}));export{he as P,xe as a};
