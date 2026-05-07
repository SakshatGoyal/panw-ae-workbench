import{j as e,b as Te,c as ye,e as je}from"./index-CHjcGL7e.js";import{useMDXComponents as le}from"./index-DVRRELxc.js";import{c as w,u as ve,P as a}from"./usePrefix-BO8COP8A.js";import{R as Se,r as Ie}from"./index-CwcVQgaJ.js";import{a as we}from"./index-B-lxVbXh.js";import{I as _e}from"./info-Cu4OX_2d.js";const _=["left","right","top"],N=["default","small"],t=Se.forwardRef(function({on:o=!0,label:l="Toggle Label",showInfo:h=!1,showStatus:b=!0,onStatusText:ie="Yes",offStatusText:ce="No",labelPosition:C="left",size:de="default",disabled:x=!1,onChange:O,renderInfoIcon:pe=_e,className:ue,...me},ge){const n=ve(),L=de==="small",k=C==="top",T=w(`${n}--toggle-root`,{[`${n}--toggle-root--top`]:k,[`${n}--toggle-root--disabled`]:x},ue),fe=w(`${n}--toggle-track`,{[`${n}--toggle-track--off`]:!o,[`${n}--toggle-track--small`]:L}),he=w(`${n}--toggle-knob`,{[`${n}--toggle-knob--small`]:L}),be=xe=>{x||!O||O(!o,xe)},y=l?e.jsx("span",{className:`${n}--toggle-label`,children:l}):null,j=h?e.jsx("span",{className:`${n}--toggle-info-icon`,"aria-hidden":"true",children:e.jsx(pe,{size:16})}):null,v=b?e.jsx("span",{className:`${n}--toggle-status`,children:o?ie:ce}):null,S=e.jsx("span",{className:fe,children:e.jsx("span",{className:he})}),I=e.jsx("input",{ref:ge,type:"checkbox",role:"switch",className:`${n}--toggle-input`,checked:o,disabled:x,onChange:be,...me});return k?e.jsxs("label",{className:T,children:[I,(l||h)&&e.jsxs("span",{className:`${n}--toggle-label-info-row`,children:[y,j]}),e.jsxs("span",{className:`${n}--toggle-track-status-row`,children:[S,v]})]}):C==="left"?e.jsxs("label",{className:T,children:[I,y,j,S,v]}):e.jsxs("label",{className:T,children:[I,v,S,y,j]})});t.displayName="Toggle";t.propTypes={on:a.bool,label:a.string,showInfo:a.bool,showStatus:a.bool,onStatusText:a.string,offStatusText:a.string,labelPosition:a.oneOf(_),size:a.oneOf(N),disabled:a.bool,onChange:a.func,renderInfoIcon:a.oneOfType([a.func,a.object]),className:a.string};t.__docgenInfo={description:"",methods:[],displayName:"Toggle",props:{on:{required:!1,tsType:{name:"boolean"},description:"Whether the toggle is on. Controlled.",defaultValue:{value:"true",computed:!1},type:{name:"bool"}},label:{required:!1,tsType:{name:"string"},description:"Label text. Pass empty string or omit to hide.",defaultValue:{value:"'Toggle Label'",computed:!1},type:{name:"string"}},showInfo:{required:!1,tsType:{name:"boolean"},description:"Show the info icon next to the label.",defaultValue:{value:"false",computed:!1},type:{name:"bool"}},showStatus:{required:!1,tsType:{name:"boolean"},description:"Show status text (Yes/No).",defaultValue:{value:"true",computed:!1},type:{name:"bool"}},onStatusText:{required:!1,tsType:{name:"string"},description:"Custom on-status text.",defaultValue:{value:"'Yes'",computed:!1},type:{name:"string"}},offStatusText:{required:!1,tsType:{name:"string"},description:"Custom off-status text.",defaultValue:{value:"'No'",computed:!1},type:{name:"string"}},labelPosition:{required:!1,tsType:{name:"unknown[number]",raw:"(typeof ToggleLabelPositions)[number]"},description:"Label position relative to the track.",defaultValue:{value:"'left'",computed:!1},type:{name:"enum",value:[{value:"'left'",computed:!1},{value:"'right'",computed:!1},{value:"'top'",computed:!1}]}},size:{required:!1,tsType:{name:"unknown[number]",raw:"(typeof ToggleSizes)[number]"},description:"Toggle size.",defaultValue:{value:"'default'",computed:!1},type:{name:"enum",value:[{value:"'default'",computed:!1},{value:"'small'",computed:!1}]}},disabled:{required:!1,tsType:{name:"boolean"},description:"Disabled state.",defaultValue:{value:"false",computed:!1},type:{name:"bool"}},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(on: boolean, event: React.ChangeEvent<HTMLInputElement>) => void",signature:{arguments:[{type:{name:"boolean"},name:"on"},{type:{name:"ReactChangeEvent",raw:"React.ChangeEvent<HTMLInputElement>",elements:[{name:"HTMLInputElement"}]},name:"event"}],return:{name:"void"}}},description:"Change callback.",type:{name:"func"}},renderInfoIcon:{required:!1,tsType:{name:"ReactElementType",raw:"React.ElementType"},description:"Override the info icon component (ElementType). Defaults to lucide `Info`.",defaultValue:{value:"Info",computed:!0},type:{name:"union",value:[{name:"func"},{name:"object"}]}},className:{description:"",type:{name:"string"},required:!1}},composes:["Omit"]};const Ne={title:"Components/Toggle",component:t,argTypes:{on:{control:"boolean"},label:{control:"text"},showInfo:{control:"boolean"},showStatus:{control:"boolean"},onStatusText:{control:"text"},offStatusText:{control:"text"},labelPosition:{options:_,control:{type:"radio"}},size:{options:N,control:{type:"radio"}},disabled:{control:"boolean"}},parameters:{docs:{page:re}},tags:["autodocs"]},r=s=>{const[o,l]=Ie.useState(s.on);return e.jsx(t,{...s,on:o,onChange:(h,b)=>{l(h),we("onChange")(h,b)}})};r.args={on:!0,label:"Toggle Label",showInfo:!1,showStatus:!0,labelPosition:"left",size:"default",disabled:!1};const c=()=>e.jsx(t,{on:!0,label:"On"}),d=()=>e.jsx(t,{on:!1,label:"Off"}),p=()=>e.jsx(t,{on:!0,size:"small",label:"Small"}),u=()=>e.jsx(t,{on:!0,labelPosition:"right",label:"Label Right"}),m=()=>e.jsx(t,{on:!0,labelPosition:"top",label:"Label Top"}),g=()=>e.jsx(t,{on:!0,showInfo:!0,label:"With info icon"}),f=()=>e.jsx(t,{on:!0,disabled:!0,label:"Disabled"}),i=()=>e.jsx("div",{style:{fontFamily:"Inter, sans-serif",padding:"24px",display:"grid",gap:"16px"},children:_.map(s=>N.map(o=>[!0,!1].map(l=>e.jsxs("div",{style:{display:"flex",gap:"12px",alignItems:"center"},children:[e.jsxs("span",{style:{width:200,fontSize:12},children:[s," / ",o," / ",l?"on":"off"]}),e.jsx(t,{on:l,size:o,labelPosition:s,label:"Label"})]},`${s}-${o}-${l}`))))});i.storyName="All Variants";i.parameters={controls:{disable:!0}};r.__docgenInfo={description:"",methods:[],displayName:"Default"};c.__docgenInfo={description:"",methods:[],displayName:"On"};d.__docgenInfo={description:"",methods:[],displayName:"Off"};p.__docgenInfo={description:"",methods:[],displayName:"Small"};u.__docgenInfo={description:"",methods:[],displayName:"LabelRight"};m.__docgenInfo={description:"",methods:[],displayName:"LabelTop"};g.__docgenInfo={description:"",methods:[],displayName:"WithInfo"};f.__docgenInfo={description:"",methods:[],displayName:"Disabled"};i.__docgenInfo={description:"",methods:[],displayName:"AllVariants"};var $,z,E;r.parameters={...r.parameters,docs:{...($=r.parameters)==null?void 0:$.docs,source:{originalSource:`args => {
  const [on, setOn] = useState(args.on);
  return <Toggle {...args} on={on} onChange={(next, e) => {
    setOn(next);
    action('onChange')(next, e);
  }} />;
}`,...(E=(z=r.parameters)==null?void 0:z.docs)==null?void 0:E.source}}};var D,R,V;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:'() => <Toggle on label="On" />',...(V=(R=c.parameters)==null?void 0:R.docs)==null?void 0:V.source}}};var q,A,M;d.parameters={...d.parameters,docs:{...(q=d.parameters)==null?void 0:q.docs,source:{originalSource:'() => <Toggle on={false} label="Off" />',...(M=(A=d.parameters)==null?void 0:A.docs)==null?void 0:M.source}}};var W,Y,F;p.parameters={...p.parameters,docs:{...(W=p.parameters)==null?void 0:W.docs,source:{originalSource:'() => <Toggle on size="small" label="Small" />',...(F=(Y=p.parameters)==null?void 0:Y.docs)==null?void 0:F.source}}};var H,X,B;u.parameters={...u.parameters,docs:{...(H=u.parameters)==null?void 0:H.docs,source:{originalSource:'() => <Toggle on labelPosition="right" label="Label Right" />',...(B=(X=u.parameters)==null?void 0:X.docs)==null?void 0:B.source}}};var G,J,K;m.parameters={...m.parameters,docs:{...(G=m.parameters)==null?void 0:G.docs,source:{originalSource:'() => <Toggle on labelPosition="top" label="Label Top" />',...(K=(J=m.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,U,Z;g.parameters={...g.parameters,docs:{...(Q=g.parameters)==null?void 0:Q.docs,source:{originalSource:'() => <Toggle on showInfo label="With info icon" />',...(Z=(U=g.parameters)==null?void 0:U.docs)==null?void 0:Z.source}}};var ee,oe,se;f.parameters={...f.parameters,docs:{...(ee=f.parameters)==null?void 0:ee.docs,source:{originalSource:'() => <Toggle on disabled label="Disabled" />',...(se=(oe=f.parameters)==null?void 0:oe.docs)==null?void 0:se.source}}};var ne,ae,te;i.parameters={...i.parameters,docs:{...(ne=i.parameters)==null?void 0:ne.docs,source:{originalSource:`() => <div style={{
  fontFamily: 'Inter, sans-serif',
  padding: '24px',
  display: 'grid',
  gap: '16px'
}}>
    {ToggleLabelPositions.map(labelPosition => ToggleSizes.map(size => [true, false].map(on => <div key={\`\${labelPosition}-\${size}-\${on}\`} style={{
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
  }}>
            <span style={{
      width: 200,
      fontSize: 12
    }}>
              {labelPosition} / {size} / {on ? 'on' : 'off'}
            </span>
            <Toggle on={on} size={size} labelPosition={labelPosition} label="Label" />
          </div>)))}
  </div>`,...(te=(ae=i.parameters)==null?void 0:ae.docs)==null?void 0:te.source}}};const Ce=["Default","On","Off","Small","LabelRight","LabelTop","WithInfo","Disabled","AllVariants"],Ee=Object.freeze(Object.defineProperty({__proto__:null,AllVariants:i,Default:r,Disabled:f,LabelRight:u,LabelTop:m,Off:d,On:c,Small:p,WithInfo:g,__namedExportsOrder:Ce,default:Ne},Symbol.toStringTag,{value:"Module"}));function P(s){const o={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...le(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(Te,{isTemplate:!0}),`
`,e.jsx(o.h1,{id:"toggle",children:"Toggle"}),`
`,e.jsx(o.p,{children:e.jsx(o.a,{href:"packages/toggle/src/Toggle/Toggle.tsx",children:"Source code"})}),`
`,e.jsx(o.h2,{id:"overview",children:"Overview"}),`
`,e.jsxs(o.p,{children:[`A switch with an optional label, info icon, and status text (Yes/No). The
underlying input is a real `,e.jsx(o.code,{children:'<input type="checkbox" role="switch">'}),` so keyboard
and screen reader behavior match a native switch.`]}),`
`,`
`,e.jsx(o.h2,{id:"live-demo",children:"Live Demo"}),`
`,e.jsx(ye,{of:r}),`
`,e.jsx(o.h2,{id:"code",children:"Code"}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-jsx",children:`const [on, setOn] = useState(true);

<Toggle on={on} onChange={(next) => setOn(next)} label="Notifications" />
<Toggle on={on} labelPosition="right" />
<Toggle on={on} labelPosition="top" />
<Toggle on={on} size="small" />
<Toggle on={on} showInfo />
`})}),`
`,e.jsx(o.h2,{id:"component-api",children:"Component API"}),`
`,e.jsx(je,{}),`
`,e.jsx(o.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:["Renders a real ",e.jsx(o.code,{children:'<input type="checkbox" role="switch">'}),` so AT announces it
as a switch and native keyboard activation works.`]}),`
`,e.jsxs(o.li,{children:["The ",e.jsx(o.code,{children:"<label>"})," wraps the input, making the entire row clickable."]}),`
`,e.jsxs(o.li,{children:["The info icon is ",e.jsx(o.code,{children:'aria-hidden="true"'}),` — provide additional context via the
label or a `,e.jsx(o.code,{children:"Tooltip"})," if you need it announced."]}),`
`,e.jsxs(o.li,{children:["Disabled uses the native ",e.jsx(o.code,{children:"disabled"})," attribute."]}),`
`,e.jsxs(o.li,{children:[`
`,`
`]}),`
`]}),`
`,e.jsx(o.h2,{id:"api-change",children:"API Change"}),`
`,e.jsxs(o.p,{children:["PANW's source emitted ",e.jsx(o.code,{children:"onChange(on: boolean)"}),`. The port emits
`,e.jsx(o.code,{children:"onChange(on, event)"})," so consumers can access the native event."]})]})}function re(s={}){const{wrapper:o}={...le(),...s.components};return o?e.jsx(o,{...s,children:e.jsx(P,{...s})}):P(s)}const De=Object.freeze(Object.defineProperty({__proto__:null,default:re},Symbol.toStringTag,{value:"Module"}));export{Ee as T,De as a};
