import{j as e,b as H,c as F,e as Y}from"./index-CHjcGL7e.js";import{useMDXComponents as k}from"./index-DVRRELxc.js";import{c as G,u as J,P as a}from"./usePrefix-BO8COP8A.js";import{R as K}from"./index-CwcVQgaJ.js";import{a as Q}from"./index-B-lxVbXh.js";import{C as U,T as W}from"./triangle-alert-BKsLTlCT.js";import{C as Z}from"./circle-x-CPXp-pH8.js";import{I as ee}from"./info-Cu4OX_2d.js";import{I as ne}from"./IconButton-C8BMBA2O.js";import{X as ie}from"./x-CCzcur3m.js";const f=["info","alert","error","success"],u=["page-level","product-level"],oe={info:ee,alert:W,error:Z,success:U},o=K.forwardRef(function({type:n="info",infoType:R="page-level",children:q,closeButton:B=!0,onClose:V,className:E,...M},z){const t=J(),L=oe[n],X=G(`${t}--inline-notification`,`${t}--inline-notification--${n}`,`${t}--inline-notification--${R}`,E);return e.jsxs("div",{ref:z,className:X,role:"status",...M,children:[e.jsx("div",{className:`${t}--inline-notification__icon-container`,children:e.jsx("span",{className:`${t}--inline-notification__icon`,"aria-hidden":"true",children:e.jsx(L,{size:16})})}),e.jsx("div",{className:`${t}--inline-notification__text-container`,children:e.jsx("span",{className:`${t}--inline-notification__text`,children:q})}),B&&e.jsx("div",{className:`${t}--inline-notification__close`,children:e.jsx(ne,{kind:"ghost",size:"sm",iconSize:16,shape:"square",renderIcon:ie,"aria-label":"Close notification",onClick:V})})]})});o.displayName="InlineNotification";o.propTypes={type:a.oneOf(f),infoType:a.oneOf(u),children:a.node.isRequired,closeButton:a.bool,onClose:a.func,className:a.string};o.__docgenInfo={description:"",methods:[],displayName:"InlineNotification",props:{type:{required:!1,tsType:{name:"unknown[number]",raw:"(typeof InlineNotificationTypes)[number]"},description:"",defaultValue:{value:"'info'",computed:!1},type:{name:"enum",value:[{value:"'info'",computed:!1},{value:"'alert'",computed:!1},{value:"'error'",computed:!1},{value:"'success'",computed:!1}]}},infoType:{required:!1,tsType:{name:"unknown[number]",raw:"(typeof InlineNotificationInfoTypes)[number]"},description:"",defaultValue:{value:"'page-level'",computed:!1},type:{name:"enum",value:[{value:"'page-level'",computed:!1},{value:"'product-level'",computed:!1}]}},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"",type:{name:"node"}},closeButton:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1},type:{name:"bool"}},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"",type:{name:"func"}},className:{description:"",type:{name:"string"},required:!1}},composes:["Omit"]};const te={title:"Components/InlineNotification",component:o,argTypes:{type:{options:f,control:{type:"select"}},infoType:{options:u,control:{type:"radio"}},closeButton:{control:"boolean"},children:{control:"text"}},parameters:{docs:{page:D}},tags:["autodocs"]},s=i=>e.jsx("div",{style:{width:480},children:e.jsx(o,{...i,onClose:Q("onClose")})});s.args={type:"info",infoType:"page-level",children:"Notification message goes here.",closeButton:!0};const c=()=>e.jsx("div",{style:{width:480},children:e.jsx(o,{type:"alert",children:"Something needs your attention."})}),l=()=>e.jsx("div",{style:{width:480},children:e.jsx(o,{type:"error",children:"An error occurred."})}),d=()=>e.jsx("div",{style:{width:480},children:e.jsx(o,{type:"success",children:"Operation completed."})}),p=()=>e.jsx("div",{style:{width:480},children:e.jsx(o,{type:"info",infoType:"product-level",children:"High contrast banner."})}),r=()=>e.jsx("div",{style:{padding:24,background:"#f9f9f9",display:"flex",flexDirection:"column",gap:12,width:520},children:f.map(i=>u.map(n=>e.jsx(o,{type:i,infoType:n,children:`${i} / ${n}`},`${i}-${n}`)))});r.storyName="All Variants";r.parameters={controls:{disable:!0}};s.__docgenInfo={description:"",methods:[],displayName:"Default"};c.__docgenInfo={description:"",methods:[],displayName:"Alert"};l.__docgenInfo={description:"",methods:[],displayName:"Error"};d.__docgenInfo={description:"",methods:[],displayName:"Success"};p.__docgenInfo={description:"",methods:[],displayName:"ProductLevel"};r.__docgenInfo={description:"",methods:[],displayName:"AllVariants"};var h,y,x;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`args => <div style={{
  width: 480
}}>
    <InlineNotification {...args} onClose={action('onClose')} />
  </div>`,...(x=(y=s.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};var v,N,I;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`() => <div style={{
  width: 480
}}>
    <InlineNotification type="alert">Something needs your attention.</InlineNotification>
  </div>`,...(I=(N=c.parameters)==null?void 0:N.docs)==null?void 0:I.source}}};var g,j,_;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`() => <div style={{
  width: 480
}}>
    <InlineNotification type="error">An error occurred.</InlineNotification>
  </div>`,...(_=(j=l.parameters)==null?void 0:j.docs)==null?void 0:_.source}}};var T,b,w;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`() => <div style={{
  width: 480
}}>
    <InlineNotification type="success">Operation completed.</InlineNotification>
  </div>`,...(w=(b=d.parameters)==null?void 0:b.docs)==null?void 0:w.source}}};var C,$,S;p.parameters={...p.parameters,docs:{...(C=p.parameters)==null?void 0:C.docs,source:{originalSource:`() => <div style={{
  width: 480
}}>
    <InlineNotification type="info" infoType="product-level">High contrast banner.</InlineNotification>
  </div>`,...(S=($=p.parameters)==null?void 0:$.docs)==null?void 0:S.source}}};var A,O,P;r.parameters={...r.parameters,docs:{...(A=r.parameters)==null?void 0:A.docs,source:{originalSource:`() => <div style={{
  padding: 24,
  background: '#f9f9f9',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  width: 520
}}>
    {InlineNotificationTypes.map(t => InlineNotificationInfoTypes.map(it => <InlineNotification key={\`\${t}-\${it}\`} type={t} infoType={it}>
          {\`\${t} / \${it}\`}
        </InlineNotification>))}
  </div>`,...(P=(O=r.parameters)==null?void 0:O.docs)==null?void 0:P.source}}};const se=["Default","Alert","Error","Success","ProductLevel","AllVariants"],ye=Object.freeze(Object.defineProperty({__proto__:null,Alert:c,AllVariants:r,Default:s,Error:l,ProductLevel:p,Success:d,__namedExportsOrder:se,default:te},Symbol.toStringTag,{value:"Module"}));function m(i){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...k(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(H,{isTemplate:!0}),`
`,e.jsx(n.h1,{id:"inlinenotification",children:"InlineNotification"}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{href:"packages/inline-notification/src/InlineNotification/InlineNotification.tsx",children:"Source code"})}),`
`,e.jsx(n.h2,{id:"overview",children:"Overview"}),`
`,e.jsx(n.p,{children:`A horizontal banner with severity icon, message, and optional close
button. Four severity types and two prominence levels.`}),`
`,e.jsx(n.h2,{id:"composition",children:"Composition"}),`
`,e.jsxs(n.p,{children:["Close button is the ",e.jsx(n.code,{children:"IconButton"})," from ",e.jsx(n.code,{children:"@ds/button"})," (imported, not redefined)."]}),`
`,e.jsx(n.h2,{id:"live-demo",children:"Live Demo"}),`
`,e.jsx(F,{of:s}),`
`,e.jsx(n.h2,{id:"variants",children:"Variants"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`<InlineNotification type="info">Info</InlineNotification>
<InlineNotification type="alert">Alert</InlineNotification>
<InlineNotification type="error">Error</InlineNotification>
<InlineNotification type="success">Success</InlineNotification>
<InlineNotification type="info" infoType="product-level">High contrast</InlineNotification>
`})}),`
`,e.jsx(n.h2,{id:"component-api",children:"Component API"}),`
`,e.jsx(Y,{}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The root has ",e.jsx(n.code,{children:'role="status"'})," for screen-reader announcements."]}),`
`,e.jsxs(n.li,{children:["The close button is a real ",e.jsx(n.code,{children:"IconButton"})," with ",e.jsx(n.code,{children:'aria-label="Close notification"'}),"."]}),`
`]}),`
`]})}function D(i={}){const{wrapper:n}={...k(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(m,{...i})}):m(i)}const xe=Object.freeze(Object.defineProperty({__proto__:null,default:D},Symbol.toStringTag,{value:"Module"}));export{ye as I,xe as a};
