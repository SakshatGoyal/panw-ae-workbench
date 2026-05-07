import{j as e,b as xe,c as h,U as me,e as ue}from"./index-CHjcGL7e.js";import{useMDXComponents as te}from"./index-DVRRELxc.js";import"./usePrefix-BO8COP8A.js";import{I as o}from"./IconButton-C8BMBA2O.js";import"./index-CwcVQgaJ.js";import{a as r}from"./index-B-lxVbXh.js";import{P as i}from"./plus-CjFCaarj.js";import{c as de}from"./createLucideIcon-J4rvsbg-.js";import{B as y}from"./bell-46JlDp38.js";import{X as le}from"./x-CCzcur3m.js";import{T as ce}from"./trash-2-C2T0KwfR.js";import{S as pe}from"./search-Cm71VxzZ.js";import{C as je}from"./chevron-right-CV6jF4o6.js";/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ge=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],be=de("download",ge);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ie=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],I=de("settings",Ie),S={Plus:s=>e.jsx(i,{size:16,...s}),Search:s=>e.jsx(pe,{size:16,...s}),Trash:s=>e.jsx(ce,{size:16,...s}),Settings:s=>e.jsx(I,{size:16,...s}),Bell:s=>e.jsx(y,{size:16,...s}),Close:s=>e.jsx(le,{size:16,...s})},ye={kind:{options:["ghost","primary","secondary"],control:{type:"select"},table:{defaultValue:{summary:'"ghost"'}}},size:{options:["sm","md","lg"],control:{type:"select"},description:"sm=32px, md=40px, lg=48px (padding-based)",table:{defaultValue:{summary:'"sm"'}}},shape:{options:["square","rounded","pill"],control:{type:"select"},description:"Corner shape. PANW extension.",table:{defaultValue:{summary:'"square"'}}},iconSize:{options:[16,20],control:{type:"radio"},description:"Icon pixel dimensions. PANW extension.",table:{defaultValue:{summary:16}}},disabled:{control:"boolean",table:{defaultValue:{summary:!1}}},"aria-label":{control:"text",description:"Required accessible label for screen readers."},isSelected:{control:"boolean",description:"Selected state — only applies to ghost kind.",table:{defaultValue:{summary:!1}}},renderIcon:{options:Object.keys(S),control:{type:"select"},description:"Icon component to render (ElementType)."}},fe={title:"Components/IconButton",component:o,argTypes:ye,parameters:{docs:{page:he}},tags:["autodocs"]},a=s=>{const{renderIcon:n,...f}=s;return e.jsx(o,{...f,renderIcon:S[n]??S.Plus,onClick:r("onClick")})};a.args={"aria-label":"Add item",kind:"ghost",size:"sm",shape:"square",iconSize:16,disabled:!1,isSelected:!1,renderIcon:"Plus"};const j=()=>e.jsx(o,{kind:"ghost",renderIcon:s=>e.jsx(i,{size:16,...s}),"aria-label":"Add",onClick:r("onClick")}),g=()=>e.jsx(o,{kind:"primary",renderIcon:s=>e.jsx(i,{size:16,...s}),"aria-label":"Add",onClick:r("onClick")}),b=()=>e.jsx(o,{kind:"secondary",renderIcon:s=>e.jsx(i,{size:16,...s}),"aria-label":"Add",onClick:r("onClick")}),x=()=>e.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[e.jsx(o,{size:"sm",renderIcon:s=>e.jsx(i,{size:16,...s}),"aria-label":"Add (small)",onClick:r("onClick")}),e.jsx(o,{size:"md",renderIcon:s=>e.jsx(i,{size:16,...s}),"aria-label":"Add (medium)",onClick:r("onClick")}),e.jsx(o,{size:"lg",renderIcon:s=>e.jsx(i,{size:16,...s}),"aria-label":"Add (large)",onClick:r("onClick")})]}),t=()=>e.jsx(o,{shape:"square",renderIcon:s=>e.jsx(I,{size:16,...s}),"aria-label":"Settings",onClick:r("onClick")});t.storyName="Shape: Square";const d=()=>e.jsx(o,{shape:"rounded",renderIcon:s=>e.jsx(I,{size:16,...s}),"aria-label":"Settings",onClick:r("onClick")});d.storyName="Shape: Rounded";const l=()=>e.jsx(o,{shape:"pill",renderIcon:s=>e.jsx(I,{size:16,...s}),"aria-label":"Settings",onClick:r("onClick")});l.storyName="Shape: Pill";const ke=[{icon:s=>e.jsx(i,{size:16,...s}),label:"Add"},{icon:s=>e.jsx(pe,{size:16,...s}),label:"Search"},{icon:s=>e.jsx(ce,{size:16,...s}),label:"Delete"},{icon:s=>e.jsx(I,{size:16,...s}),label:"Settings"},{icon:s=>e.jsx(y,{size:16,...s}),label:"Notifications"},{icon:s=>e.jsx(le,{size:16,...s}),label:"Close"},{icon:s=>e.jsx(je,{size:16,...s}),label:"Next"},{icon:s=>e.jsx(be,{size:16,...s}),label:"Download"}],m=()=>e.jsx("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"},children:ke.map(({icon:s,label:n})=>e.jsx(o,{renderIcon:s,"aria-label":n,onClick:r(`onClick:${n}`)},n))});m.storyName="With Different Icons";const c=()=>e.jsxs("div",{style:{display:"flex",gap:"8px"},children:[e.jsx(o,{kind:"ghost",isSelected:!1,renderIcon:s=>e.jsx(y,{size:16,...s}),"aria-label":"Notifications (unselected)",onClick:r("onClick")}),e.jsx(o,{kind:"ghost",isSelected:!0,renderIcon:s=>e.jsx(y,{size:16,...s}),"aria-label":"Notifications (selected)",onClick:r("onClick")})]});c.storyName="Selected State (ghost only)";const u=()=>e.jsxs("div",{style:{display:"flex",gap:"8px"},children:[e.jsx(o,{kind:"ghost",disabled:!0,renderIcon:s=>e.jsx(i,{size:16,...s}),"aria-label":"Add (disabled ghost)"}),e.jsx(o,{kind:"primary",disabled:!0,renderIcon:s=>e.jsx(i,{size:16,...s}),"aria-label":"Add (disabled primary)"}),e.jsx(o,{kind:"secondary",disabled:!0,renderIcon:s=>e.jsx(i,{size:16,...s}),"aria-label":"Add (disabled secondary)"})]}),k=["ghost","primary","secondary"],Se=["sm","md","lg"],ze=["square","rounded","pill"],p=()=>e.jsxs("div",{style:{fontFamily:"Inter, sans-serif",padding:"24px",background:"#f9f9f9"},children:[e.jsx("h3",{style:{marginBottom:"16px",fontSize:"14px",fontWeight:600},children:"All Kinds × Sizes (shape: square)"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:`repeat(${k.length}, auto)`,gap:"8px",justifyContent:"start",marginBottom:"32px"},children:Se.map(s=>k.map(n=>e.jsx(o,{kind:n,size:s,shape:"square",renderIcon:f=>e.jsx(i,{size:16,...f}),"aria-label":`${n} ${s}`,onClick:r("onClick")},`${n}-${s}`)))}),e.jsx("h3",{style:{marginBottom:"16px",fontSize:"14px",fontWeight:600},children:"All Shapes (kind: ghost, size: md)"}),e.jsx("div",{style:{display:"flex",gap:"8px",marginBottom:"32px"},children:ze.map(s=>e.jsx(o,{kind:"ghost",size:"md",shape:s,renderIcon:n=>e.jsx(I,{size:16,...n}),"aria-label":`Settings (${s})`,onClick:r("onClick")},s))}),e.jsx("h3",{style:{marginBottom:"16px",fontSize:"14px",fontWeight:600},children:"Disabled States"}),e.jsx("div",{style:{display:"flex",gap:"8px"},children:k.map(s=>e.jsx(o,{kind:s,disabled:!0,renderIcon:n=>e.jsx(i,{size:16,...n}),"aria-label":`${s} disabled`},s))})]});p.storyName="All Variants";p.parameters={controls:{disable:!0}};a.__docgenInfo={description:"",methods:[],displayName:"Default"};j.__docgenInfo={description:"",methods:[],displayName:"Ghost"};g.__docgenInfo={description:"",methods:[],displayName:"Primary"};b.__docgenInfo={description:"",methods:[],displayName:"Secondary"};x.__docgenInfo={description:"",methods:[],displayName:"Sizes"};t.__docgenInfo={description:"",methods:[],displayName:"ShapeSquare"};d.__docgenInfo={description:"",methods:[],displayName:"ShapeRounded"};l.__docgenInfo={description:"",methods:[],displayName:"ShapePill"};m.__docgenInfo={description:"",methods:[],displayName:"WithDifferentIcons"};c.__docgenInfo={description:"",methods:[],displayName:"Selected"};u.__docgenInfo={description:"",methods:[],displayName:"Disabled"};p.__docgenInfo={description:"",methods:[],displayName:"AllVariants"};var C,B,v;a.parameters={...a.parameters,docs:{...(C=a.parameters)==null?void 0:C.docs,source:{originalSource:`args => {
  const {
    renderIcon,
    ...rest
  } = args;
  return <IconButton {...rest} renderIcon={iconMap[renderIcon] ?? iconMap.Plus} onClick={action('onClick')} />;
}`,...(v=(B=a.parameters)==null?void 0:B.docs)==null?void 0:v.source}}};var A,_,P;j.parameters={...j.parameters,docs:{...(A=j.parameters)==null?void 0:A.docs,source:{originalSource:`() => <IconButton kind="ghost" renderIcon={props => <Plus size={16} {...props} />} aria-label="Add" onClick={action('onClick')} />`,...(P=(_=j.parameters)==null?void 0:_.docs)==null?void 0:P.source}}};var N,D,T;g.parameters={...g.parameters,docs:{...(N=g.parameters)==null?void 0:N.docs,source:{originalSource:`() => <IconButton kind="primary" renderIcon={props => <Plus size={16} {...props} />} aria-label="Add" onClick={action('onClick')} />`,...(T=(D=g.parameters)==null?void 0:D.docs)==null?void 0:T.source}}};var w,W,q;b.parameters={...b.parameters,docs:{...(w=b.parameters)==null?void 0:w.docs,source:{originalSource:`() => <IconButton kind="secondary" renderIcon={props => <Plus size={16} {...props} />} aria-label="Add" onClick={action('onClick')} />`,...(q=(W=b.parameters)==null?void 0:W.docs)==null?void 0:q.source}}};var $,M,E;x.parameters={...x.parameters,docs:{...($=x.parameters)==null?void 0:$.docs,source:{originalSource:`() => <div style={{
  display: 'flex',
  gap: '8px',
  alignItems: 'center'
}}>
    <IconButton size="sm" renderIcon={props => <Plus size={16} {...props} />} aria-label="Add (small)" onClick={action('onClick')} />
    <IconButton size="md" renderIcon={props => <Plus size={16} {...props} />} aria-label="Add (medium)" onClick={action('onClick')} />
    <IconButton size="lg" renderIcon={props => <Plus size={16} {...props} />} aria-label="Add (large)" onClick={action('onClick')} />
  </div>`,...(E=(M=x.parameters)==null?void 0:M.docs)==null?void 0:E.source}}};var O,V,K;t.parameters={...t.parameters,docs:{...(O=t.parameters)==null?void 0:O.docs,source:{originalSource:`() => <IconButton shape="square" renderIcon={props => <Settings size={16} {...props} />} aria-label="Settings" onClick={action('onClick')} />`,...(K=(V=t.parameters)==null?void 0:V.docs)==null?void 0:K.source}}};var R,F,G;d.parameters={...d.parameters,docs:{...(R=d.parameters)==null?void 0:R.docs,source:{originalSource:`() => <IconButton shape="rounded" renderIcon={props => <Settings size={16} {...props} />} aria-label="Settings" onClick={action('onClick')} />`,...(G=(F=d.parameters)==null?void 0:F.docs)==null?void 0:G.source}}};var H,X,L;l.parameters={...l.parameters,docs:{...(H=l.parameters)==null?void 0:H.docs,source:{originalSource:`() => <IconButton shape="pill" renderIcon={props => <Settings size={16} {...props} />} aria-label="Settings" onClick={action('onClick')} />`,...(L=(X=l.parameters)==null?void 0:X.docs)==null?void 0:L.source}}};var U,Z,J;m.parameters={...m.parameters,docs:{...(U=m.parameters)==null?void 0:U.docs,source:{originalSource:`() => <div style={{
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap'
}}>
    {DEMO_ICONS.map(({
    icon,
    label
  }) => <IconButton key={label} renderIcon={icon} aria-label={label} onClick={action(\`onClick:\${label}\`)} />)}
  </div>`,...(J=(Z=m.parameters)==null?void 0:Z.docs)==null?void 0:J.source}}};var Q,Y,ee;c.parameters={...c.parameters,docs:{...(Q=c.parameters)==null?void 0:Q.docs,source:{originalSource:`() => <div style={{
  display: 'flex',
  gap: '8px'
}}>
    <IconButton kind="ghost" isSelected={false} renderIcon={props => <Bell size={16} {...props} />} aria-label="Notifications (unselected)" onClick={action('onClick')} />
    <IconButton kind="ghost" isSelected={true} renderIcon={props => <Bell size={16} {...props} />} aria-label="Notifications (selected)" onClick={action('onClick')} />
  </div>`,...(ee=(Y=c.parameters)==null?void 0:Y.docs)==null?void 0:ee.source}}};var ne,se,oe;u.parameters={...u.parameters,docs:{...(ne=u.parameters)==null?void 0:ne.docs,source:{originalSource:`() => <div style={{
  display: 'flex',
  gap: '8px'
}}>
    <IconButton kind="ghost" disabled renderIcon={props => <Plus size={16} {...props} />} aria-label="Add (disabled ghost)" />
    <IconButton kind="primary" disabled renderIcon={props => <Plus size={16} {...props} />} aria-label="Add (disabled primary)" />
    <IconButton kind="secondary" disabled renderIcon={props => <Plus size={16} {...props} />} aria-label="Add (disabled secondary)" />
  </div>`,...(oe=(se=u.parameters)==null?void 0:se.docs)==null?void 0:oe.source}}};var ie,re,ae;p.parameters={...p.parameters,docs:{...(ie=p.parameters)==null?void 0:ie.docs,source:{originalSource:`() => <div style={{
  fontFamily: 'Inter, sans-serif',
  padding: '24px',
  background: '#f9f9f9'
}}>
    <h3 style={{
    marginBottom: '16px',
    fontSize: '14px',
    fontWeight: 600
  }}>
      All Kinds × Sizes (shape: square)
    </h3>
    <div style={{
    display: 'grid',
    gridTemplateColumns: \`repeat(\${IB_KINDS.length}, auto)\`,
    gap: '8px',
    justifyContent: 'start',
    marginBottom: '32px'
  }}>
      {IB_SIZES.map(size => IB_KINDS.map(kind => <IconButton key={\`\${kind}-\${size}\`} kind={kind} size={size} shape="square" renderIcon={props => <Plus size={16} {...props} />} aria-label={\`\${kind} \${size}\`} onClick={action('onClick')} />))}
    </div>

    <h3 style={{
    marginBottom: '16px',
    fontSize: '14px',
    fontWeight: 600
  }}>
      All Shapes (kind: ghost, size: md)
    </h3>
    <div style={{
    display: 'flex',
    gap: '8px',
    marginBottom: '32px'
  }}>
      {IB_SHAPES.map(shape => <IconButton key={shape} kind="ghost" size="md" shape={shape} renderIcon={props => <Settings size={16} {...props} />} aria-label={\`Settings (\${shape})\`} onClick={action('onClick')} />)}
    </div>

    <h3 style={{
    marginBottom: '16px',
    fontSize: '14px',
    fontWeight: 600
  }}>
      Disabled States
    </h3>
    <div style={{
    display: 'flex',
    gap: '8px'
  }}>
      {IB_KINDS.map(kind => <IconButton key={kind} kind={kind} disabled renderIcon={props => <Plus size={16} {...props} />} aria-label={\`\${kind} disabled\`} />)}
    </div>
  </div>`,...(ae=(re=p.parameters)==null?void 0:re.docs)==null?void 0:ae.source}}};const Ce=["Default","Ghost","Primary","Secondary","Sizes","ShapeSquare","ShapeRounded","ShapePill","WithDifferentIcons","Selected","Disabled","AllVariants"],Ee=Object.freeze(Object.defineProperty({__proto__:null,AllVariants:p,Default:a,Disabled:u,Ghost:j,Primary:g,Secondary:b,Selected:c,ShapePill:l,ShapeRounded:d,ShapeSquare:t,Sizes:x,WithDifferentIcons:m,__namedExportsOrder:Ce,default:fe},Symbol.toStringTag,{value:"Module"}));function z(s){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...te(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(xe,{isTemplate:!0}),`
`,e.jsx(n.h1,{id:"iconbutton",children:"IconButton"}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{href:"packages/button/src/IconButton/IconButton.tsx",children:"Source code"})}),`
`,e.jsx(n.h2,{id:"table-of-contents",children:"Table of Contents"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#overview",children:"Overview"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#kinds",children:"Kinds"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#sizes",children:"Sizes"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#shapes",children:"Shapes"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#selected-state",children:"Selected State"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#disabled",children:"Disabled"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#panw-extensions",children:"PANW Extensions"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#component-api",children:"Component API"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#accessibility",children:"Accessibility"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#api-change-rendericon",children:"API Change: renderIcon"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#tooltip-coming-soon",children:"Tooltip (Coming Soon)"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#feedback",children:"Feedback"})}),`
`]}),`
`,e.jsx(n.h2,{id:"overview",children:"Overview"}),`
`,e.jsxs(n.p,{children:[`IconButton is an icon-only button — no visible label text. It is used when
space is constrained and the icon is universally understood, or when the action
is supplementary to nearby context. Every `,e.jsx(n.code,{children:"IconButton"})," requires an ",e.jsx(n.code,{children:"aria-label"}),`
for screen reader accessibility.`]}),`
`,`
`,e.jsx(h,{of:a}),`
`,e.jsx(n.h2,{id:"kinds",children:"Kinds"}),`
`,e.jsxs(n.p,{children:["Three kinds: ",e.jsx(n.code,{children:"ghost"})," (default), ",e.jsx(n.code,{children:"primary"}),", and ",e.jsx(n.code,{children:"secondary"}),"."]}),`
`,e.jsx(me,{children:e.jsxs("div",{style:{display:"flex",gap:"8px",padding:"16px"},children:[e.jsx(o,{kind:"ghost",renderIcon:()=>e.jsx(i,{size:16}),"aria-label":"Ghost"}),e.jsx(o,{kind:"primary",renderIcon:()=>e.jsx(i,{size:16}),"aria-label":"Primary"}),e.jsx(o,{kind:"secondary",renderIcon:()=>e.jsx(i,{size:16}),"aria-label":"Secondary"})]})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { Plus } from 'lucide-react';

<IconButton kind="ghost" renderIcon={() => <Plus size={16} />} aria-label="Add" />
<IconButton kind="primary" renderIcon={() => <Plus size={16} />} aria-label="Add" />
<IconButton kind="secondary" renderIcon={() => <Plus size={16} />} aria-label="Add" />
`})}),`
`,e.jsx(n.h2,{id:"sizes",children:"Sizes"}),`
`,e.jsxs(n.p,{children:["Three sizes: ",e.jsx(n.code,{children:"sm"})," (32px), ",e.jsx(n.code,{children:"md"})," (40px), ",e.jsx(n.code,{children:"lg"}),` (48px). Heights are padding-based;
the icon pixel size is controlled separately via `,e.jsx(n.code,{children:"iconSize"}),"."]}),`
`,e.jsx(h,{of:x}),`
`,e.jsx(n.h2,{id:"shapes",children:"Shapes"}),`
`,e.jsxs(n.p,{children:["Three corner shapes: ",e.jsx(n.code,{children:"square"})," (no radius), ",e.jsx(n.code,{children:"rounded"})," (4px), ",e.jsx(n.code,{children:"pill"}),` (full
circle). PANW extension — Carbon does not have this axis on IconButton.`]}),`
`,e.jsx(h,{of:t}),`
`,e.jsx(h,{of:d}),`
`,e.jsx(h,{of:l}),`
`,e.jsx(n.h2,{id:"selected-state",children:"Selected State"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"isSelected"}),` prop applies a visual selected state. Only meaningful for the
`,e.jsx(n.code,{children:"ghost"})," kind — use this for toggle-like actions such as active filter buttons."]}),`
`,e.jsx(h,{of:c}),`
`,e.jsx(n.h2,{id:"disabled",children:"Disabled"}),`
`,e.jsx(h,{of:u}),`
`,e.jsx(n.h2,{id:"panw-extensions",children:"PANW Extensions"}),`
`,e.jsxs(n.p,{children:[`| Prop | Values | Notes |
|------|--------|-------|
| `,e.jsx(n.code,{children:"shape"})," | ",e.jsx(n.code,{children:"square"})," | ",e.jsx(n.code,{children:"rounded"})," | ",e.jsx(n.code,{children:"pill"}),` | Corner radius axis |
| `,e.jsx(n.code,{children:"iconSize"})," | ",e.jsx(n.code,{children:"16"})," | ",e.jsx(n.code,{children:"20"})," | Icon pixel dimensions |"]}),`
`,`
`,e.jsx(n.h2,{id:"component-api",children:"Component API"}),`
`,e.jsx(ue,{}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"aria-label"})," is ",e.jsx(n.strong,{children:"required"}),` — there is no visible text to announce.
Provide a concise, action-oriented label (e.g. `,e.jsx(n.code,{children:'"Close dialog"'}),", ",e.jsx(n.code,{children:'"Add item"'}),")."]}),`
`,e.jsxs(n.li,{children:["The icon is wrapped in ",e.jsx(n.code,{children:'aria-hidden="true"'})," so screen readers skip it."]}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"disabled"})," attribute removes the button from the tab order. "]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"isSelected"})," on ghost buttons sets ",e.jsx(n.code,{children:"aria-pressed"}),` to expose the toggle
state to assistive technology.`]}),`
`]}),`
`,e.jsxs(n.h2,{id:"api-change-rendericon",children:["API Change: ",e.jsx(n.code,{children:"renderIcon"})]}),`
`,e.jsx(n.p,{children:e.jsxs(n.strong,{children:["Deliberate change from PANW ",e.jsx(n.code,{children:"ButtonIcon"}),":"]})}),`
`,e.jsxs(n.p,{children:["PANW's ",e.jsx(n.code,{children:"ButtonIcon"})," accepted ",e.jsx(n.code,{children:"icon: ReactNode"})," — a pre-rendered element:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`// PANW (old)
<ButtonIcon icon={<MyIcon />} aria-label="Add" />
`})}),`
`,e.jsxs(n.p,{children:["The ported ",e.jsx(n.code,{children:"IconButton"})," uses Carbon's ",e.jsx(n.code,{children:"renderIcon: ElementType"})," convention:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`// Ported (Carbon convention)
import { Plus } from 'lucide-react';

<IconButton renderIcon={(props) => <Plus size={16} {...props} />} aria-label="Add" />
`})}),`
`,e.jsxs(n.p,{children:["This aligns with the ",e.jsx(n.code,{children:"Button"})," component's ",e.jsx(n.code,{children:"renderIcon"}),` API and enables
consistent icon handling across the system.`]}),`
`,e.jsx(n.h2,{id:"tooltip-coming-soon",children:"Tooltip (Coming Soon)"}),`
`,`
`,e.jsxs(n.p,{children:["Carbon's ",e.jsx(n.code,{children:"IconButton"})," wraps a tooltip component to show the ",e.jsx(n.code,{children:"aria-label"}),` as a
visible tooltip on hover. This integration is deferred until the `,e.jsx(n.code,{children:"Tooltip"}),`
component is ported. The `,e.jsx(n.code,{children:"aria-label"}),` serves as the accessible name in the
interim — full tooltip behavior will be added in a future iteration.`]}),`
`,e.jsx(n.h2,{id:"feedback",children:"Feedback"}),`
`]})}function he(s={}){const{wrapper:n}={...te(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(z,{...s})}):z(s)}const Oe=Object.freeze(Object.defineProperty({__proto__:null,default:he},Symbol.toStringTag,{value:"Module"}));export{Ee as I,Oe as a};
