import{j as e,b as Ge,c as v,U as b,e as Te}from"./index-CHjcGL7e.js";import{useMDXComponents as ve}from"./index-DVRRELxc.js";import{c as Re,u as Le}from"./usePrefix-BO8COP8A.js";import{B as o}from"./Button-D4eivoW6.js";import{R as z}from"./index-CwcVQgaJ.js";import{a as t}from"./index-B-lxVbXh.js";import{P as C}from"./plus-CjFCaarj.js";import{C as N}from"./chevron-right-CV6jF4o6.js";import{T as Ee}from"./trash-2-C2T0KwfR.js";const I=z.forwardRef(function({className:n,href:y,size:_e="default"},De){const P=Le(),We=Re(`${P}--btn`,`${P}--btn--${_e}`,`${P}--skeleton`,n),we=y?"a":"button";return z.createElement(we,{className:We,href:y,ref:De})});I.displayName="ButtonSkeleton";I.__docgenInfo={description:"",methods:[],displayName:"ButtonSkeleton",props:{className:{required:!1,tsType:{name:"string"},description:""},size:{required:!1,tsType:{name:"unknown[number]",raw:"(typeof ButtonSizes)[number]"},description:"",defaultValue:{value:"'default'",computed:!1}},href:{required:!1,tsType:{name:"string"},description:""}}};const Ve={None:void 0,Plus:s=>e.jsx(C,{size:16,...s}),ChevronRight:s=>e.jsx(N,{size:16,...s}),Trash:s=>e.jsx(Ee,{size:16,...s})},$e={kind:{options:["primary","danger","secondary-accent","secondary-gray","ghost-accent","ghost-gray"],control:{type:"select"},description:"Visual style variant. `primary` and `danger` map to Carbon kinds. `secondary-accent`, `secondary-gray`, `ghost-accent`, `ghost-gray` are PANW extensions.",table:{defaultValue:{summary:'"primary"'}}},size:{options:["small","default","large"],control:{type:"select"},description:"Button height: small=32px, default=40px, large=48px",table:{defaultValue:{summary:'"default"'}}},shape:{options:["pill","standard","rounded"],control:{type:"select"},description:"Corner shape. PANW extension — Carbon does not have this axis.",table:{defaultValue:{summary:'"pill"'}}},disabled:{control:"boolean",table:{defaultValue:{summary:!1}}},renderIcon:{options:["None","Plus","ChevronRight","Trash"],control:{type:"select"},description:"Icon component to render. Accepts an ElementType (lucide-react component)."},iconPosition:{options:["left","right"],control:{type:"radio"},description:"Position of the icon relative to the label.",table:{defaultValue:{summary:'"left"'}}},iconDescription:{control:"text",description:"Accessible description for the icon (aria-label on icon span)."},href:{control:"text",description:"When set, renders the button as an <a> element."},type:{options:["button","submit","reset"],control:{type:"select"},table:{defaultValue:{summary:'"button"'}}}},Me={title:"Components/Button",component:o,subcomponents:{ButtonSkeleton:I},argTypes:$e,parameters:{docs:{page:ze}},tags:["autodocs"]},r=s=>{const{renderIcon:n,...y}=s;return e.jsx(o,{...y,renderIcon:Ve[n],onClick:t("onClick"),children:"Button"})};r.args={kind:"primary",size:"default",shape:"pill",disabled:!1,renderIcon:"None",iconPosition:"left"};r.parameters={controls:{include:["kind","size","shape","disabled","renderIcon","iconPosition","iconDescription","href","type"]}};const j=()=>e.jsx(o,{kind:"primary",onClick:t("onClick"),children:"Primary"}),f=()=>e.jsx(o,{kind:"danger",onClick:t("onClick"),children:"Danger"}),a=()=>e.jsx(o,{kind:"secondary-accent",onClick:t("onClick"),children:"Secondary Accent"});a.storyName="Secondary Accent (PANW)";const c=()=>e.jsx(o,{kind:"secondary-gray",onClick:t("onClick"),children:"Secondary Gray"});c.storyName="Secondary Gray (PANW)";const d=()=>e.jsx(o,{kind:"ghost-accent",onClick:t("onClick"),children:"Ghost Accent"});d.storyName="Ghost Accent (PANW)";const l=()=>e.jsx(o,{kind:"ghost-gray",onClick:t("onClick"),children:"Ghost Gray"});l.storyName="Ghost Gray (PANW)";const k=()=>e.jsx(o,{size:"small",onClick:t("onClick"),children:"Small Button"}),S=()=>e.jsx(o,{size:"large",onClick:t("onClick"),children:"Large Button"}),p=()=>e.jsx(o,{shape:"pill",onClick:t("onClick"),children:"Pill Shape"});p.storyName="Shape: Pill";const h=()=>e.jsx(o,{shape:"standard",onClick:t("onClick"),children:"Standard Shape"});h.storyName="Shape: Standard";const u=()=>e.jsx(o,{shape:"rounded",onClick:t("onClick"),children:"Rounded Shape"});u.storyName="Shape: Rounded";const m=()=>e.jsx(o,{renderIcon:s=>e.jsx(C,{size:16,...s}),iconPosition:"left",iconDescription:"Add",onClick:t("onClick"),children:"Add Item"});m.storyName="With Left Icon";const x=()=>e.jsx(o,{kind:"ghost-accent",renderIcon:s=>e.jsx(N,{size:16,...s}),iconPosition:"right",iconDescription:"Navigate",onClick:t("onClick"),children:"Continue"});x.storyName="With Right Icon";const g=()=>e.jsxs("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"},children:[e.jsx(o,{disabled:!0,kind:"primary",children:"Primary Disabled"}),e.jsx(o,{disabled:!0,kind:"danger",children:"Danger Disabled"}),e.jsx(o,{disabled:!0,kind:"secondary-accent",children:"Secondary Accent Disabled"}),e.jsx(o,{disabled:!0,kind:"ghost-accent",children:"Ghost Accent Disabled"})]}),B=()=>e.jsx(I,{}),A=["primary","danger","secondary-accent","secondary-gray","ghost-accent","ghost-gray"],Ke=["small","default","large"],Oe=["pill","standard","rounded"],i=()=>e.jsxs("div",{style:{fontFamily:"Inter, sans-serif",padding:"24px",background:"#f9f9f9"},children:[e.jsx("h3",{style:{marginBottom:"16px",fontSize:"14px",fontWeight:600},children:"All Kinds × Sizes (shape: pill)"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:`repeat(${A.length}, auto)`,gap:"8px",marginBottom:"32px"},children:Ke.map(s=>A.map(n=>e.jsx(o,{kind:n,size:s,shape:"pill",children:n},`${n}-${s}`)))}),e.jsx("h3",{style:{marginBottom:"16px",fontSize:"14px",fontWeight:600},children:"All Shapes (kind: primary, size: default)"}),e.jsx("div",{style:{display:"flex",gap:"8px",marginBottom:"32px"},children:Oe.map(s=>e.jsx(o,{shape:s,kind:"primary",children:s},s))}),e.jsx("h3",{style:{marginBottom:"16px",fontSize:"14px",fontWeight:600},children:"With Icons"}),e.jsxs("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap",marginBottom:"32px"},children:[e.jsx(o,{renderIcon:s=>e.jsx(C,{size:16,...s}),iconPosition:"left",kind:"primary",children:"Add Left"}),e.jsx(o,{renderIcon:s=>e.jsx(N,{size:16,...s}),iconPosition:"right",kind:"ghost-accent",children:"Continue Right"})]}),e.jsx("h3",{style:{marginBottom:"16px",fontSize:"14px",fontWeight:600},children:"Disabled States"}),e.jsx("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"},children:A.map(s=>e.jsx(o,{kind:s,disabled:!0,children:s},s))})]});i.storyName="All Variants";i.parameters={controls:{disable:!0}};r.__docgenInfo={description:"",methods:[],displayName:"Default"};j.__docgenInfo={description:"",methods:[],displayName:"Primary"};f.__docgenInfo={description:"",methods:[],displayName:"Danger"};a.__docgenInfo={description:"",methods:[],displayName:"SecondaryAccent"};c.__docgenInfo={description:"",methods:[],displayName:"SecondaryGray"};d.__docgenInfo={description:"",methods:[],displayName:"GhostAccent"};l.__docgenInfo={description:"",methods:[],displayName:"GhostGray"};k.__docgenInfo={description:"",methods:[],displayName:"Small"};S.__docgenInfo={description:"",methods:[],displayName:"Large"};p.__docgenInfo={description:"",methods:[],displayName:"ShapePill"};h.__docgenInfo={description:"",methods:[],displayName:"ShapeStandard"};u.__docgenInfo={description:"",methods:[],displayName:"ShapeRounded"};m.__docgenInfo={description:"",methods:[],displayName:"WithLeftIcon"};x.__docgenInfo={description:"",methods:[],displayName:"WithRightIcon"};g.__docgenInfo={description:"",methods:[],displayName:"Disabled"};B.__docgenInfo={description:"",methods:[],displayName:"Skeleton"};i.__docgenInfo={description:"",methods:[],displayName:"AllVariants"};var D,W,w;r.parameters={...r.parameters,docs:{...(D=r.parameters)==null?void 0:D.docs,source:{originalSource:`args => {
  const {
    renderIcon,
    ...rest
  } = args;
  return <Button {...rest} renderIcon={iconMap[renderIcon]} onClick={action('onClick')}>
      Button
    </Button>;
}`,...(w=(W=r.parameters)==null?void 0:W.docs)==null?void 0:w.source}}};var G,T,R;j.parameters={...j.parameters,docs:{...(G=j.parameters)==null?void 0:G.docs,source:{originalSource:`() => <Button kind="primary" onClick={action('onClick')}>
    Primary
  </Button>`,...(R=(T=j.parameters)==null?void 0:T.docs)==null?void 0:R.source}}};var L,E,V;f.parameters={...f.parameters,docs:{...(L=f.parameters)==null?void 0:L.docs,source:{originalSource:`() => <Button kind="danger" onClick={action('onClick')}>
    Danger
  </Button>`,...(V=(E=f.parameters)==null?void 0:E.docs)==null?void 0:V.source}}};var $,M,K;a.parameters={...a.parameters,docs:{...($=a.parameters)==null?void 0:$.docs,source:{originalSource:`() => <Button kind="secondary-accent" onClick={action('onClick')}>
    Secondary Accent
  </Button>`,...(K=(M=a.parameters)==null?void 0:M.docs)==null?void 0:K.source}}};var O,q,F;c.parameters={...c.parameters,docs:{...(O=c.parameters)==null?void 0:O.docs,source:{originalSource:`() => <Button kind="secondary-gray" onClick={action('onClick')}>
    Secondary Gray
  </Button>`,...(F=(q=c.parameters)==null?void 0:q.docs)==null?void 0:F.source}}};var H,X,U;d.parameters={...d.parameters,docs:{...(H=d.parameters)==null?void 0:H.docs,source:{originalSource:`() => <Button kind="ghost-accent" onClick={action('onClick')}>
    Ghost Accent
  </Button>`,...(U=(X=d.parameters)==null?void 0:X.docs)==null?void 0:U.source}}};var Z,J,Q;l.parameters={...l.parameters,docs:{...(Z=l.parameters)==null?void 0:Z.docs,source:{originalSource:`() => <Button kind="ghost-gray" onClick={action('onClick')}>
    Ghost Gray
  </Button>`,...(Q=(J=l.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var Y,ee,ne;k.parameters={...k.parameters,docs:{...(Y=k.parameters)==null?void 0:Y.docs,source:{originalSource:`() => <Button size="small" onClick={action('onClick')}>
    Small Button
  </Button>`,...(ne=(ee=k.parameters)==null?void 0:ee.docs)==null?void 0:ne.source}}};var oe,se,te;S.parameters={...S.parameters,docs:{...(oe=S.parameters)==null?void 0:oe.docs,source:{originalSource:`() => <Button size="large" onClick={action('onClick')}>
    Large Button
  </Button>`,...(te=(se=S.parameters)==null?void 0:se.docs)==null?void 0:te.source}}};var re,ie,ae;p.parameters={...p.parameters,docs:{...(re=p.parameters)==null?void 0:re.docs,source:{originalSource:`() => <Button shape="pill" onClick={action('onClick')}>
    Pill Shape
  </Button>`,...(ae=(ie=p.parameters)==null?void 0:ie.docs)==null?void 0:ae.source}}};var ce,de,le;h.parameters={...h.parameters,docs:{...(ce=h.parameters)==null?void 0:ce.docs,source:{originalSource:`() => <Button shape="standard" onClick={action('onClick')}>
    Standard Shape
  </Button>`,...(le=(de=h.parameters)==null?void 0:de.docs)==null?void 0:le.source}}};var pe,he,ue;u.parameters={...u.parameters,docs:{...(pe=u.parameters)==null?void 0:pe.docs,source:{originalSource:`() => <Button shape="rounded" onClick={action('onClick')}>
    Rounded Shape
  </Button>`,...(ue=(he=u.parameters)==null?void 0:he.docs)==null?void 0:ue.source}}};var me,xe,ge;m.parameters={...m.parameters,docs:{...(me=m.parameters)==null?void 0:me.docs,source:{originalSource:`() => <Button renderIcon={props => <Plus size={16} {...props} />} iconPosition="left" iconDescription="Add" onClick={action('onClick')}>
    Add Item
  </Button>`,...(ge=(xe=m.parameters)==null?void 0:xe.docs)==null?void 0:ge.source}}};var ye,je,fe;x.parameters={...x.parameters,docs:{...(ye=x.parameters)==null?void 0:ye.docs,source:{originalSource:`() => <Button kind="ghost-accent" renderIcon={props => <ChevronRight size={16} {...props} />} iconPosition="right" iconDescription="Navigate" onClick={action('onClick')}>
    Continue
  </Button>`,...(fe=(je=x.parameters)==null?void 0:je.docs)==null?void 0:fe.source}}};var ke,Se,Be;g.parameters={...g.parameters,docs:{...(ke=g.parameters)==null?void 0:ke.docs,source:{originalSource:`() => <div style={{
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap'
}}>
    <Button disabled kind="primary">Primary Disabled</Button>
    <Button disabled kind="danger">Danger Disabled</Button>
    <Button disabled kind="secondary-accent">Secondary Accent Disabled</Button>
    <Button disabled kind="ghost-accent">Ghost Accent Disabled</Button>
  </div>`,...(Be=(Se=g.parameters)==null?void 0:Se.docs)==null?void 0:Be.source}}};var be,Ce,Ie;B.parameters={...B.parameters,docs:{...(be=B.parameters)==null?void 0:be.docs,source:{originalSource:"() => <ButtonSkeleton />",...(Ie=(Ce=B.parameters)==null?void 0:Ce.docs)==null?void 0:Ie.source}}};var Pe,Ae,Ne;i.parameters={...i.parameters,docs:{...(Pe=i.parameters)==null?void 0:Pe.docs,source:{originalSource:`() => <div style={{
  fontFamily: 'Inter, sans-serif',
  padding: '24px',
  background: '#f9f9f9'
}}>
    <h3 style={{
    marginBottom: '16px',
    fontSize: '14px',
    fontWeight: 600
  }}>
      All Kinds × Sizes (shape: pill)
    </h3>
    <div style={{
    display: 'grid',
    gridTemplateColumns: \`repeat(\${KINDS.length}, auto)\`,
    gap: '8px',
    marginBottom: '32px'
  }}>
      {SIZES.map(size => KINDS.map(kind => <Button key={\`\${kind}-\${size}\`} kind={kind} size={size} shape="pill">
            {kind}
          </Button>))}
    </div>

    <h3 style={{
    marginBottom: '16px',
    fontSize: '14px',
    fontWeight: 600
  }}>
      All Shapes (kind: primary, size: default)
    </h3>
    <div style={{
    display: 'flex',
    gap: '8px',
    marginBottom: '32px'
  }}>
      {SHAPES.map(shape => <Button key={shape} shape={shape} kind="primary">
          {shape}
        </Button>)}
    </div>

    <h3 style={{
    marginBottom: '16px',
    fontSize: '14px',
    fontWeight: 600
  }}>
      With Icons
    </h3>
    <div style={{
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    marginBottom: '32px'
  }}>
      <Button renderIcon={props => <Plus size={16} {...props} />} iconPosition="left" kind="primary">
        Add Left
      </Button>
      <Button renderIcon={props => <ChevronRight size={16} {...props} />} iconPosition="right" kind="ghost-accent">
        Continue Right
      </Button>
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
    gap: '8px',
    flexWrap: 'wrap'
  }}>
      {KINDS.map(kind => <Button key={kind} kind={kind} disabled>
          {kind}
        </Button>)}
    </div>
  </div>`,...(Ne=(Ae=i.parameters)==null?void 0:Ae.docs)==null?void 0:Ne.source}}};const qe=["Default","Primary","Danger","SecondaryAccent","SecondaryGray","GhostAccent","GhostGray","Small","Large","ShapePill","ShapeStandard","ShapeRounded","WithLeftIcon","WithRightIcon","Disabled","Skeleton","AllVariants"],nn=Object.freeze(Object.defineProperty({__proto__:null,AllVariants:i,Danger:f,Default:r,Disabled:g,GhostAccent:d,GhostGray:l,Large:S,Primary:j,SecondaryAccent:a,SecondaryGray:c,ShapePill:p,ShapeRounded:u,ShapeStandard:h,Skeleton:B,Small:k,WithLeftIcon:m,WithRightIcon:x,__namedExportsOrder:qe,default:Me},Symbol.toStringTag,{value:"Module"}));function _(s){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...ve(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(Ge,{isTemplate:!0}),`
`,e.jsx(n.h1,{id:"button",children:"Button"}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{href:"packages/button/src/Button/Button.tsx",children:"Source code"})}),`
`,e.jsx(n.h2,{id:"table-of-contents",children:"Table of Contents"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#overview",children:"Overview"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#kinds",children:"Kinds"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#sizes",children:"Sizes"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#shapes",children:"Shapes"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#with-icons",children:"With Icons"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#disabled",children:"Disabled"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#panw-extensions",children:"PANW Extensions"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#component-api",children:"Component API"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#accessibility",children:"Accessibility"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#api-change-rendericon",children:"API Change: renderIcon"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#feedback",children:"Feedback"})}),`
`]}),`
`,e.jsx(n.h2,{id:"overview",children:"Overview"}),`
`,e.jsx(n.p,{children:`Buttons are clickable elements used to trigger actions. They communicate calls
to action and allow users to interact with pages in a variety of ways. Button
labels express what action will occur when the user interacts with it.`}),`
`,`
`,e.jsx(v,{of:r}),`
`,e.jsx(n.h2,{id:"kinds",children:"Kinds"}),`
`,e.jsxs(n.p,{children:["PANW Button has six kinds. ",e.jsx(n.code,{children:"primary"})," and ",e.jsx(n.code,{children:"danger"}),` map directly to Carbon's
equivalent kinds. The remaining four (`,e.jsx(n.code,{children:"secondary-accent"}),", ",e.jsx(n.code,{children:"secondary-gray"}),`,
`,e.jsx(n.code,{children:"ghost-accent"}),", ",e.jsx(n.code,{children:"ghost-gray"}),`) are PANW-specific extensions with no direct
Carbon equivalent — see `,e.jsx(n.a,{href:"#panw-extensions",children:"PANW Extensions"})," below."]}),`
`,e.jsx(b,{children:e.jsxs("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap",padding:"16px"},children:[e.jsx(o,{kind:"primary",children:"Primary"}),e.jsx(o,{kind:"danger",children:"Danger"}),e.jsx(o,{kind:"secondary-accent",children:"Secondary Accent"}),e.jsx(o,{kind:"secondary-gray",children:"Secondary Gray"}),e.jsx(o,{kind:"ghost-accent",children:"Ghost Accent"}),e.jsx(o,{kind:"ghost-gray",children:"Ghost Gray"})]})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`<Button kind="primary">Primary</Button>
<Button kind="danger">Danger</Button>
<Button kind="secondary-accent">Secondary Accent</Button>
<Button kind="secondary-gray">Secondary Gray</Button>
<Button kind="ghost-accent">Ghost Accent</Button>
<Button kind="ghost-gray">Ghost Gray</Button>
`})}),`
`,e.jsx(n.h2,{id:"sizes",children:"Sizes"}),`
`,e.jsxs(n.p,{children:["Three sizes are available: ",e.jsx(n.code,{children:"small"})," (32px), ",e.jsx(n.code,{children:"default"})," (40px), and ",e.jsx(n.code,{children:"large"})," (48px)."]}),`
`,e.jsx(b,{children:e.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center",padding:"16px"},children:[e.jsx(o,{size:"small",children:"Small"}),e.jsx(o,{size:"default",children:"Default"}),e.jsx(o,{size:"large",children:"Large"})]})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`<Button size="small">Small</Button>
<Button size="default">Default</Button>
<Button size="large">Large</Button>
`})}),`
`,e.jsx(n.h2,{id:"shapes",children:"Shapes"}),`
`,e.jsxs(n.p,{children:["Three corner shapes are available: ",e.jsx(n.code,{children:"pill"})," (50px radius), ",e.jsx(n.code,{children:"standard"}),` (no
radius), and `,e.jsx(n.code,{children:"rounded"})," (4px radius)."]}),`
`,`
`,e.jsx(b,{children:e.jsxs("div",{style:{display:"flex",gap:"8px",padding:"16px"},children:[e.jsx(o,{shape:"pill",children:"Pill"}),e.jsx(o,{shape:"standard",children:"Standard"}),e.jsx(o,{shape:"rounded",children:"Rounded"})]})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`<Button shape="pill">Pill</Button>
<Button shape="standard">Standard</Button>
<Button shape="rounded">Rounded</Button>
`})}),`
`,e.jsx(n.h2,{id:"with-icons",children:"With Icons"}),`
`,e.jsxs(n.p,{children:["Pass a lucide-react (or any React) component to ",e.jsx(n.code,{children:"renderIcon"}),`. The icon renders
in the `,e.jsx(n.code,{children:"left"})," or ",e.jsx(n.code,{children:"right"}),` position relative to the label, controlled by
`,e.jsx(n.code,{children:"iconPosition"}),"."]}),`
`,e.jsx(b,{children:e.jsx("div",{style:{display:"flex",gap:"8px",padding:"16px"},children:e.jsx(o,{renderIcon:y=>e.jsx(C,{size:16,...y}),iconPosition:"left",iconDescription:"Add",children:e.jsx(n.p,{children:"Add Item"})})})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { Plus } from 'lucide-react';

<Button
  renderIcon={(props) => <Plus size={16} {...props} />}
  iconPosition="left"
  iconDescription="Add"
>
  Add Item
</Button>
`})}),`
`,e.jsx(n.h2,{id:"disabled",children:"Disabled"}),`
`,e.jsx(v,{of:g}),`
`,e.jsx(n.h2,{id:"panw-extensions",children:"PANW Extensions"}),`
`,e.jsx(n.p,{children:"The following props have no Carbon equivalent and are PANW-specific:"}),`
`,e.jsxs(n.p,{children:[`| Prop | Values | Notes |
|------|--------|-------|
| `,e.jsx(n.code,{children:"shape"})," | ",e.jsx(n.code,{children:"pill"})," | ",e.jsx(n.code,{children:"standard"})," | ",e.jsx(n.code,{children:"rounded"}),` | Corner radius axis |
| `,e.jsx(n.code,{children:'kind="secondary-accent"'}),` | — | White bg + blue text + gray border |
| `,e.jsx(n.code,{children:'kind="secondary-gray"'}),` | — | White bg + dark text + gray border |
| `,e.jsx(n.code,{children:'kind="ghost-accent"'}),` | — | Transparent + blue text |
| `,e.jsx(n.code,{children:'kind="ghost-gray"'})," | — | Transparent + dark text |"]}),`
`,`
`,e.jsx(n.h2,{id:"component-api",children:"Component API"}),`
`,e.jsx(Te,{}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"<button>"}),` element is used by default, which provides native keyboard
focus, `,e.jsx(n.code,{children:"Enter"}),"/",e.jsx(n.code,{children:"Space"})," activation, and screen reader role announcement."]}),`
`,e.jsxs(n.li,{children:["When ",e.jsx(n.code,{children:"href"})," is provided, the component renders as ",e.jsx(n.code,{children:"<a>"})," — add ",e.jsx(n.code,{children:'role="button"'}),`
only if you need button semantics on a link.`]}),`
`,e.jsxs(n.li,{children:["When ",e.jsx(n.code,{children:"renderIcon"})," is used without children, provide ",e.jsx(n.code,{children:"iconDescription"}),` so
screen readers can announce the icon purpose.`]}),`
`,e.jsxs(n.li,{children:["Disabled buttons use the native HTML ",e.jsx(n.code,{children:"disabled"}),` attribute, which removes
them from the tab order. This is intentional — disabled actions should not
receive focus. `]}),`
`]}),`
`,e.jsxs(n.h2,{id:"api-change-rendericon",children:["API Change: ",e.jsx(n.code,{children:"renderIcon"})]}),`
`,e.jsx(n.p,{children:e.jsxs(n.strong,{children:["Deliberate change from PANW ",e.jsx(n.code,{children:"ButtonStandard"}),":"]})}),`
`,e.jsxs(n.p,{children:["PANW's ",e.jsx(n.code,{children:"ButtonStandard"})," accepted ",e.jsx(n.code,{children:"leftIconSlot"})," and ",e.jsx(n.code,{children:"rightIconSlot"}),` as
`,e.jsx(n.code,{children:"ReactNode"})," — you passed already-rendered elements:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`// PANW (old)
<ButtonStandard leftIcon leftIconSlot={<MyIcon />} label="Add" />
`})}),`
`,e.jsxs(n.p,{children:["The ported ",e.jsx(n.code,{children:"Button"})," uses Carbon's ",e.jsx(n.code,{children:"renderIcon: ElementType"}),` convention — you
pass the component class/function, not a rendered element:`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`// Ported (Carbon convention)
<Button renderIcon={(props) => <Plus size={16} {...props} />} iconPosition="left">
  Add
</Button>
`})}),`
`,e.jsxs(n.p,{children:["This change enables the component to control ",e.jsx(n.code,{children:"aria-hidden"}),`, size, and class
injection on the icon — which is not possible when a ReactNode is passed in.`]}),`
`,e.jsx(n.h2,{id:"feedback",children:"Feedback"}),`
`]})}function ze(s={}){const{wrapper:n}={...ve(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(_,{...s})}):_(s)}const on=Object.freeze(Object.defineProperty({__proto__:null,default:ze},Symbol.toStringTag,{value:"Module"}));export{nn as B,on as a};
