(this["webpackJsonpdanceplatform.ui"]=this["webpackJsonpdanceplatform.ui"]||[]).push([[0],{177:function(e,t,n){"use strict";n.r(t);var r=n(5),a=n(0),c=n.n(a),i=n(15),o=n.n(i),s=n(31),l=n(18),d=n(221),u=n(223),j=n(225),h=n(95),b=n(226),g={isAuthenticated:function(){var e=!1;return localStorage.getItem("token")&&(e=!0),e},isAdmin:function(){var e=JSON.parse(localStorage.getItem("user")),t=!1;return e&&"Admin"===e.roles[0]&&(t=!0),t},getCurrentUserId:function(){var e=JSON.parse(localStorage.getItem("user"));if(e)return e.id},getToken:function(){return localStorage.getItem("token")}},O=Object(d.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1}}}));function m(e){var t=O();return console.log(e.isAdmin),Object(r.jsx)("div",{className:t.root,children:Object(r.jsx)(u.a,{position:"static",children:Object(r.jsxs)(j.a,{children:[Object(r.jsxs)(h.a,{variant:"h6",className:t.title,children:[Object(r.jsx)(s.b,{to:"/",style:{textDecoration:"none",color:"white"},children:Object(r.jsx)(b.a,{color:"inherit",children:"\u0412\u0441\u0435 \u043c\u0430\u0441\u0442\u0435\u0440-\u043a\u043b\u0430\u0441\u0441\u044b"})}),e.isAdmin?Object(r.jsx)(s.b,{className:t.title,to:"/users-accounting",style:{textDecoration:"none",color:"white"},children:Object(r.jsx)(b.a,{color:"inherit",children:"\u0423\u0447\u0451\u0442 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435\u0439"})}):Object(r.jsx)(s.b,{className:t.title,to:"/workshops",style:{textDecoration:"none",color:"white"},children:Object(r.jsx)(b.a,{color:"inherit",children:"\u041c\u043e\u0438 \u043c\u0430\u0441\u0442\u0435\u0440-\u043a\u043b\u0430\u0441\u0441\u044b"})})]}),e.isAuthenticated?Object(r.jsx)(r.Fragment,{children:Object(r.jsx)(s.b,{to:"/login",style:{textDecoration:"none",color:"white"},children:Object(r.jsx)(b.a,{onClick:function(){localStorage.clear()},color:"inherit",children:"\u0412\u044b\u0439\u0442\u0438"})})}):Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(s.b,{to:"/login",style:{textDecoration:"none",color:"white"},children:Object(r.jsx)(b.a,{color:"inherit",children:"\u0412\u043e\u0439\u0442\u0438"})}),Object(r.jsx)(s.b,{to:"/register",style:{textDecoration:"none",color:"white"},children:Object(r.jsx)(b.a,{color:"inherit",children:"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f"})})]})]})})})}var p=n(17),x=n(253),f=n(234),k=n(248),v=n(232),y=n(247),S=n(114),w=n.n(S),C=n(233),A=n(69),N=n.n(A),W=N.a.create({baseURL:"http://localhost:5000",headers:{"Access-Control-Allow-Origin":"*","Content-type":"application/json charset=utf-8",Authorization:"Bearer ".concat(g.getToken())}}),I=function(e){return W(e).then((function(e){return console.log("Request Successful!",e),e.data})).catch((function(e){return console.error("Request Failed:",e.config),e.response?(console.error("Status:",e.response.status),console.error("Data:",e.response.data),console.error("Headers:",e.response.headers)):console.error("Error Message:",e.message),Promise.reject(e.response||e.message)}))},F={login:function(e){return I({method:"POST",url:"/auth/login",data:e})},register:function(e){return I({method:"POST",url:"/auth/register",data:e})}},P=n(252),T=n(231),D=n(229),R=n(230),B=n(228);function E(e){var t=c.a.useState(e.isError),n=Object(p.a)(t,2),a=n[0],i=n[1],o=function(){i(!1)};return Object(r.jsx)("div",{children:Object(r.jsxs)(P.a,{open:a,onClose:o,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[Object(r.jsx)(B.a,{id:"alert-dialog-title",children:"\u041e\u0448\u0438\u0431\u043a\u0430!"}),Object(r.jsx)(D.a,{children:Object(r.jsx)(R.a,{id:"alert-dialog-description",children:e.message})}),Object(r.jsx)(T.a,{children:Object(r.jsx)(b.a,{onClick:o,color:"primary",autoFocus:!0,children:"\u0417\u0430\u043a\u0440\u044b\u0442\u044c"})})]})})}function U(){return Object(r.jsxs)(h.a,{variant:"body2",color:"textSecondary",align:"center",children:["Copyright \xa9 ",Object(r.jsx)(v.a,{color:"inherit",href:"https://vk.com/dianapitalenko",children:"Diana Pitalenko"})," ",(new Date).getFullYear(),"."]})}var H=Object(d.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)}}}));function q(e){var t=H(),n=Object(l.g)(),c=Object(a.useState)(""),i=Object(p.a)(c,2),o=i[0],s=i[1],d=Object(a.useState)(""),u=Object(p.a)(d,2),j=u[0],g=u[1],O=Object(a.useState)(""),m=Object(p.a)(O,2),v=m[0],S=m[1],A=Object(a.useState)(!1),N=Object(p.a)(A,2),W=N[0],I=N[1],P=Object(a.useState)(""),T=Object(p.a)(P,2),D=T[0],R=T[1];return Object(r.jsxs)(C.a,{component:"main",maxWidth:"xs",children:[Object(r.jsx)(f.a,{}),Object(r.jsxs)("div",{className:t.paper,children:[Object(r.jsx)(x.a,{className:t.avatar,children:Object(r.jsx)(w.a,{})}),Object(r.jsx)(h.a,{component:"h1",variant:"h5",children:e.actionName}),Object(r.jsxs)("form",{className:t.form,noValidate:!0,children:["\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f"===e.actionName?Object(r.jsx)(k.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,id:"username",label:"\u0418\u043c\u044f \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f",name:"username",onChange:function(e){return S(e.target.value)}}):Object(r.jsx)(r.Fragment,{}),Object(r.jsx)(k.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,id:"email",label:"\u0410\u0434\u0440\u0435\u0441 \u043f\u043e\u0447\u0442\u044b",name:"email",onChange:function(e){return s(e.target.value)}}),Object(r.jsx)(k.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,name:"password",label:"\u041f\u0430\u0440\u043e\u043b\u044c",type:"password",id:"password",onChange:function(e){return g(e.target.value)}}),Object(r.jsx)(b.a,{type:"button",fullWidth:!0,variant:"contained",color:"primary",className:t.submit,onClick:function(){"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f"===e.actionName?(I(!1),F.register({email:o,password:j,username:v}).then((function(e){n.push("/login")})).catch((function(e){400==e.status&&(R("\u0412\u044b \u0432\u0432\u0435\u043b\u0438 \u043d\u0435\u0432\u0435\u0440\u043d\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435 \u0434\u043b\u044f \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438"),I(!0)),403==e.status?(R("\u0412\u0430\u043c \u0437\u0430\u043f\u0440\u0435\u0449\u0435\u043d\u043e \u0434\u0435\u043b\u0430\u0442\u044c \u044d\u0442\u043e\u0442 \u0437\u0430\u043f\u0440\u043e\u0441"),I(!0)):500==e.status&&(R("\u041d\u0435\u043f\u0440\u0435\u0434\u0432\u0438\u0434\u0435\u043d\u043d\u0430\u044f \u043e\u0448\u0438\u0431\u043a\u0430. \u041e\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044c \u043a \u0410\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440\u0443"),I(!0))}))):(I(!1),F.login({email:o,password:j}).then((function(e){localStorage.setItem("token",e.token),localStorage.setItem("user",JSON.stringify(e.user)),n.push("/")})).catch((function(e){401==e.status&&(R("\u0412\u044b \u0432\u0432\u0435\u043b\u0438 \u043d\u0435\u0432\u0435\u0440\u043d\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435 \u0434\u043b\u044f \u0430\u0443\u0442\u0435\u043d\u0442\u0438\u0444\u0438\u043a\u0430\u0446\u0438\u0438"),I(!0)),403==e.status?(R("\u0412\u0430\u043c \u0437\u0430\u043f\u0440\u0435\u0449\u0435\u043d\u043e \u0434\u0435\u043b\u0430\u0442\u044c \u044d\u0442\u043e\u0442 \u0437\u0430\u043f\u0440\u043e\u0441"),I(!0)):500==e.status&&(R("\u041d\u0435\u043f\u0440\u0435\u0434\u0432\u0438\u0434\u0435\u043d\u043d\u0430\u044f \u043e\u0448\u0438\u0431\u043a\u0430. \u041e\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044c \u043a \u0410\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440\u0443"),I(!0))})))},children:e.actionName})]}),W?Object(r.jsx)(E,{isError:W,message:D}):Object(r.jsx)(r.Fragment,{})]}),Object(r.jsx)(y.a,{mt:8,children:Object(r.jsx)(U,{})})]})}var z=n(60),G=n(26),J=n(4),M=n(11),L=n(244),Y=n(245),V=n(241),K=n(243),Q=n(239),X=n(251),Z=n(240),$=n(255),_=n(122),ee=n(249),te=n(254),ne=n(70),re=n.n(ne),ae={registerOnWorkshop:function(e){return I({method:"POST",url:"/registration/add",data:e})},getAllRegistrations:function(){return I({method:"GET",url:"/registration/getAll"})},getUserWorkshops:function(e){return I({method:"GET",url:"/registration/".concat(e)})},deleteRegistrations:function(e){return I({method:"POST",url:"/registration/delete/".concat(e)})}},ce={getAllWorkshops:function(){return I({method:"GET",url:"/workshop/getAll"})},getAvailableWorkshopsForUser:function(e){return I({method:"GET",url:"/workshop/available/".concat(e)})},createWorkshop:function(e){return N.a.post("http://localhost:5000/workshop/add",e,{headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*",Authorization:"Bearer ".concat(g.getToken())}})},editWorkshop:function(e){return N.a.post("http://localhost:5000/workshop/update",e,{headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*",Authorization:"Bearer ".concat(g.getToken())}})},deleteWorkshop:function(e){return I({method:"POST",url:"/workshop/delete/".concat(e)})},getRegisteredUsersOnWorkshop:function(e){return I({method:"GET",url:"/workshop/registered-users/".concat(e)})}};function ie(e){var t=new Date(Date.parse(e));return"".concat(t.getFullYear(),"-").concat(t.getMonth()+1,"-").concat(t.getDay()," ").concat(t.getHours(),":").concat(t.getMinutes())}var oe={0:"\u0421\u0442\u0438\u043b\u044c \u043d\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u0435\u043d",1:"HipHop",2:"HighHeels",3:"DanceHall",4:"JazzFunk",5:"Vogue",6:"Contemporary",7:"Choreo"},se={0:"\u0423\u0440\u043e\u0432\u0435\u043d\u044c \u043d\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u0435\u043d",1:"Open",2:"Beg",3:"Pro"},le=[{id:"id",numeric:!0,label:"ID"},{id:"username",numeric:!1,label:"\u0418\u043c\u044f"},{id:"email",numeric:!1,label:"\u041f\u043e\u0447\u0442\u0430"}],de=Object(d.a)((function(e){return{root:{width:"100%"},paper:{width:"100%",marginBottom:e.spacing(2)},table:{minWidth:750},visuallyHidden:{border:0,clip:"rect(0 0 0 0)",height:1,margin:-1,overflow:"hidden",padding:0,position:"absolute",top:20,width:1}}})),ue=Object(d.a)((function(e){return{root:{paddingLeft:e.spacing(2),paddingRight:e.spacing(1)},highlight:"light"===e.palette.type?{color:e.palette.secondary.main,backgroundColor:Object(M.e)(e.palette.secondary.light,.85)}:{color:e.palette.text.primary,backgroundColor:e.palette.secondary.dark},title:{flex:"1 1 100%"}}}));function je(e){e.classes;var t=e.onSelectAllClick,n=e.numSelected,a=e.rowCount;e.toolBarStyles;return Object(r.jsx)(Q.a,{children:Object(r.jsxs)(Z.a,{children:[Object(r.jsx)(V.a,{padding:"checkbox",children:Object(r.jsx)(ee.a,{indeterminate:n>0&&n<a,checked:a>0&&n===a,onChange:t,inputProps:{"aria-label":"select all desserts"}})}),le.map((function(e){return Object(r.jsx)(V.a,{align:"id"===e.id?"left":"right",padding:e.disablePadding?"none":"default",children:e.label},re.a.generate())}))]})})}function he(e){var t=de(),n=Object(a.useState)([]),c=Object(p.a)(n,2),i=c[0],o=c[1],s=Object(a.useState)(0),l=Object(p.a)(s,2),d=l[0],u=(l[1],Object(a.useState)(5)),g=Object(p.a)(u,2),O=g[0],m=(g[1],Object(a.useState)([])),x=Object(p.a)(m,2),f=x[0],k=x[1];Object(a.useEffect)((function(){ce.getRegisteredUsersOnWorkshop(e.data).then((function(e){k(e)}))}),[]);var v=O-Math.min(O,f.length-d*O),y=i.length,S=ue();return Object(r.jsx)(r.Fragment,{children:Object(r.jsx)("div",{className:t.root,children:Object(r.jsxs)(_.a,{className:t.paper,children:[Object(r.jsxs)(j.a,{className:Object(J.a)(S.root,Object(z.a)({},S.highlight,y>0)),children:[y>0?Object(r.jsxs)(h.a,{className:S.title,color:"inherit",variant:"subtitle1",component:"div",children:[y," \u0432\u044b\u0431\u0440\u0430\u043d\u043e"]}):Object(r.jsx)(r.Fragment,{}),Object(r.jsx)(te.a,{title:"\u041e\u0442\u043c\u0435\u0442\u0438\u0442\u044c",children:Object(r.jsx)(b.a,{type:"button",variant:"contained",color:"primary",className:S.submit,onClick:function(){},children:"\u041e\u0442\u043c\u0435\u0442\u0438\u0442\u044c \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f"})})]}),Object(r.jsx)(K.a,{children:Object(r.jsxs)(L.a,{className:t.table,"aria-labelledby":"tableTitle",size:"medium","aria-label":"enhanced table",children:[Object(r.jsx)(je,{classes:t,numSelected:i.length,onSelectAllClick:function(e){if(e.target.checked){var t=f.map((function(e){return e.id}));o(t)}else o([])},rowCount:f.length,toolBarStyles:S}),Object(r.jsxs)(Y.a,{children:[f.map((function(e,t){var n,a=(n=e.id,-1!==i.indexOf(n)),c="enhanced-table-checkbox-".concat(t);return Object(r.jsxs)(Z.a,{hover:!0,onClick:function(t){return function(e,t){var n=i.indexOf(t),r=[];-1===n?r=r.concat(i,t):0===n?r=r.concat(i.slice(1)):n===i.length-1?r=r.concat(i.slice(0,-1)):n>0&&(r=r.concat(i.slice(0,n),i.slice(n+1))),o(r)}(0,e.id)},role:"checkbox","aria-checked":a,tabIndex:-1,selected:a,children:[Object(r.jsx)(V.a,{padding:"checkbox",children:Object(r.jsx)(ee.a,{checked:a,inputProps:{"aria-labelledby":c}})}),Object(r.jsx)(V.a,{component:"th",id:c,scope:"row",padding:"none",children:e.name}),Object(r.jsx)(V.a,{align:"right",children:e.id}),Object(r.jsx)(V.a,{align:"right",children:e.username}),Object(r.jsx)(V.a,{align:"right",children:e.email})]},re.a.generate())})),v>0&&Object(r.jsx)(Z.a,{style:{height:53*v},children:Object(r.jsx)(V.a,{colSpan:6})})]})]})})]})})})}var be=[{id:"name",numeric:!1,label:"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435"},{id:"date",numeric:!0,label:"\u0412\u0440\u0435\u043c\u044f"},{id:"choreographer",numeric:!1,label:"\u0425\u043e\u0440\u0435\u043e\u0433\u0440\u0430\u0444"},{id:"style",numeric:!1,label:"\u0421\u0442\u0438\u043b\u044c"},{id:"category",numeric:!1,label:"\u0423\u0440\u043e\u0432\u0435\u043d\u044c"},{id:"price",numeric:!0,label:"\u0426\u0435\u043d\u0430, BYN"}];function ge(e,t,n){return t[n]<e[n]?-1:t[n]>e[n]?1:0}function Oe(e,t){return"desc"===e?function(e,n){return ge(e,n,t)}:function(e,n){return-ge(e,n,t)}}function me(e,t){var n=e.map((function(e,t){return[e,t]}));return n.sort((function(e,n){var r=t(e[0],n[0]);return 0!==r?r:e[1]-n[1]})),n.map((function(e){return e[0]}))}function pe(e){var t=e.classes,n=e.onSelectAllClick,a=e.order,c=e.orderBy,i=e.numSelected,o=e.rowCount,s=e.onRequestSort;return Object(r.jsx)(Q.a,{children:Object(r.jsxs)(Z.a,{children:[Object(r.jsx)(V.a,{padding:"checkbox",children:Object(r.jsx)(ee.a,{indeterminate:i>0&&i<o,checked:o>0&&i===o,onChange:n,inputProps:{"aria-label":"select all desserts"}})}),be.map((function(e){return Object(r.jsx)(V.a,{align:"name"===e.id?"left":"right",padding:e.disablePadding?"none":"default",sortDirection:c===e.id&&a,children:Object(r.jsxs)($.a,{active:c===e.id,direction:c===e.id?a:"asc",onClick:(n=e.id,function(e){s(e,n)}),children:[e.label,c===e.id?Object(r.jsx)("span",{className:t.visuallyHidden,children:"desc"===a?"sorted descending":"sorted ascending"}):null]})},e.id);var n}))]})})}var xe=Object(d.a)((function(e){return{root:{paddingLeft:e.spacing(2),paddingRight:e.spacing(1)},highlight:"light"===e.palette.type?{color:e.palette.secondary.main,backgroundColor:Object(M.e)(e.palette.secondary.light,.85)}:{color:e.palette.text.primary,backgroundColor:e.palette.secondary.dark},title:{flex:"1 1 100%"}}})),fe=Object(d.a)((function(e){return{root:{width:"100%"},paper:{width:"100%",marginBottom:e.spacing(2)},table:{minWidth:750},visuallyHidden:{border:0,clip:"rect(0 0 0 0)",height:1,margin:-1,overflow:"hidden",padding:0,position:"absolute",top:20,width:1}}}));function ke(e){var t=fe(),n=Object(a.useState)("asc"),c=Object(p.a)(n,2),i=c[0],o=c[1],s=Object(a.useState)("name"),l=Object(p.a)(s,2),d=l[0],u=l[1],O=Object(a.useState)([]),m=Object(p.a)(O,2),x=m[0],f=m[1],k=Object(a.useState)(0),v=Object(p.a)(k,2),y=v[0],S=v[1],w=Object(a.useState)(5),C=Object(p.a)(w,2),A=C[0],N=C[1],W=Object(a.useState)([]),I=Object(p.a)(W,2),F=I[0],P=I[1],T=Object(a.useState)(!1),D=Object(p.a)(T,2),R=D[0],B=D[1],E=Object(a.useState)(-1),U=Object(p.a)(E,2),H=U[0],q=U[1];Object(a.useEffect)((function(){0!==F.length||e.fromWorkshops?0===F.length&&e.fromWorkshops&&ae.getUserWorkshops(g.getCurrentUserId()).then((function(e){P(Object(G.a)(e))})):ce.getAllWorkshops().then((function(e){ae.getAllRegistrations().then((function(t){0===t.length?P(Object(G.a)(e)):P(Object(G.a)(e.filter((function(e){return!t.some((function(t){return e.id===t.workshopId&&t.userId===g.getCurrentUserId()}))}))))}))}))}),[]);var M=A-Math.min(A,F.length-y*A),Q=x.length,$=xe();return Object(r.jsxs)("div",{className:t.root,children:[Object(r.jsxs)(_.a,{className:t.paper,children:[Object(r.jsxs)(j.a,{className:Object(J.a)($.root,Object(z.a)({},$.highlight,Q>0)),children:[Q>0?Object(r.jsxs)(h.a,{className:$.title,color:"inherit",variant:"subtitle1",component:"div",children:[Q," \u0432\u044b\u0431\u0440\u0430\u043d\u043e"]}):Object(r.jsx)(h.a,{className:$.title,variant:"h6",id:"tableTitle",component:"div",children:"\u041c\u0430\u0441\u0442\u0435\u0440-\u043a\u043b\u0430\u0441\u0441\u044b"}),e.isAdmin?Object(r.jsx)(te.a,{title:"\u0414\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u043e",children:Object(r.jsx)(b.a,{type:"button",variant:"contained",color:"primary",className:$.submit,onClick:function(){1===x.length&&(q(x[0]),B(!R))},children:"\u041f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0434\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u043e"})}):e.fromWorkshops?Object(r.jsx)(te.a,{title:"\u041e\u0442\u043c\u0435\u043d\u0438\u0442\u044c \u0431\u0440\u043e\u043d\u044c",children:Object(r.jsx)(b.a,{type:"button",variant:"contained",color:"primary",className:$.submit,onClick:function(){for(var e=F.filter((function(e){return x.includes(e.id)})).map((function(e){return e.registrations.find((function(e){return e.userId===g.getCurrentUserId()})).id})),t=function(t){ae.deleteRegistrations(e[t]).then((function(n){f(Object(G.a)(x.filter((function(n){return n===e[t]})))),P(Object(G.a)(F.filter((function(n){return n.id===e[t]}))))})).then((function(){ae.getUserWorkshops(g.getCurrentUserId()).then((function(e){P(Object(G.a)(e))}))}))},n=0;n<e.length;n++)t(n)},children:"\u041e\u0442\u043c\u0435\u043d\u0438\u0442\u044c \u0431\u0440\u043e\u043d\u044c"})}):Object(r.jsx)(te.a,{title:"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f",children:Object(r.jsx)(b.a,{type:"button",variant:"contained",color:"primary",className:$.submit,onClick:function(){ae.registerOnWorkshop({userId:g.getCurrentUserId(),workshopIds:x}).then((function(e){ce.getAllWorkshops().then((function(e){ae.getAllRegistrations().then((function(t){0===t.length?P(Object(G.a)(e)):P(Object(G.a)(e.filter((function(e){return!t.some((function(t){return e.id===t.workshopId&&t.userId===g.getCurrentUserId()}))})))),f([])}))}))}))},children:"\u0417\u0430\u043f\u0438\u0441\u0430\u0442\u044c\u0441\u044f"})})]}),Object(r.jsx)(K.a,{children:Object(r.jsxs)(L.a,{className:t.table,"aria-labelledby":"tableTitle",size:"medium","aria-label":"enhanced table",children:[Object(r.jsx)(pe,{classes:t,numSelected:x.length,order:i,orderBy:d,onSelectAllClick:function(e){if(e.target.checked){var t=F.map((function(e){return e.id}));f(t)}else f([])},onRequestSort:function(e,t){o(d===t&&"asc"===i?"desc":"asc"),u(t)},rowCount:F.length}),Object(r.jsxs)(Y.a,{children:[me(F,Oe(i,d)).slice(y*A,y*A+A).map((function(e,t){var n,a=(n=e.id,-1!==x.indexOf(n)),c="enhanced-table-checkbox-".concat(t);return Object(r.jsxs)(Z.a,{hover:!0,onClick:function(t){return function(e,t){var n=x.indexOf(t),r=[];-1===n?r=r.concat(x,t):0===n?r=r.concat(x.slice(1)):n===x.length-1?r=r.concat(x.slice(0,-1)):n>0&&(r=r.concat(x.slice(0,n),x.slice(n+1))),f(r)}(0,e.id)},role:"checkbox","aria-checked":a,tabIndex:-1,selected:a,children:[Object(r.jsx)(V.a,{padding:"checkbox",children:Object(r.jsx)(ee.a,{checked:a,inputProps:{"aria-labelledby":c}})}),Object(r.jsx)(V.a,{component:"th",id:c,scope:"row",padding:"none",children:e.name}),Object(r.jsx)(V.a,{align:"right",children:ie(e.date)}),Object(r.jsx)(V.a,{align:"right",children:e.choreographer}),Object(r.jsx)(V.a,{align:"right",children:oe[e.style]}),Object(r.jsx)(V.a,{align:"right",children:se[e.category]}),Object(r.jsx)(V.a,{align:"right",children:e.price})]},re.a.generate())})),M>0&&Object(r.jsx)(Z.a,{style:{height:53*M},children:Object(r.jsx)(V.a,{colSpan:6})})]})]})}),Object(r.jsx)(X.a,{rowsPerPageOptions:[5,10,25],component:"div",count:F.length,rowsPerPage:A,page:y,onChangePage:function(e,t){S(t)},onChangeRowsPerPage:function(e){N(parseInt(e.target.value,10)),S(0)}})]}),R?Object(r.jsx)(he,{data:H}):Object(r.jsx)(r.Fragment,{})]})}var ve=n(82),ye=n(10),Se=n(63),we=function(e){return e.id};function Ce(){var e=Object(a.useState)([{name:"id",title:"\u041d\u043e\u043c\u0435\u0440"},{name:"name",title:"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435"},{name:"date",title:"\u0412\u0440\u0435\u043c\u044f"},{name:"choreographer",title:"\u0425\u043e\u0440\u0435\u043e\u0433\u0440\u0430\u0444"},{name:"style",title:"\u0421\u0442\u0438\u043b\u044c"},{name:"category",title:"\u0423\u0440\u043e\u0432\u0435\u043d\u044c"},{name:"price",title:"\u0426\u0435\u043d\u0430, BYN"}]),t=Object(p.a)(e,1)[0],n=Object(a.useState)([]),c=Object(p.a)(n,2),i=c[0],o=c[1],s=Object(a.useState)([{columnName:"id",editingEnabled:!1}]),l=Object(p.a)(s,1)[0];Object(a.useEffect)((function(){0===i.length&&ce.getAllWorkshops().then((function(e){o(Object(G.a)(e.map((function(e){return e.style=oe[e.style],e.category=se[e.category],e.date=ie(e.date),e}))))}))}),[]);return Object(r.jsx)(_.a,{children:Object(r.jsxs)(Se.a,{rows:i,columns:t,getRowId:we,children:[Object(r.jsx)(ye.c,{onCommitChanges:function(e){var t,n=e.added,r=e.changed,a=e.deleted;if(n){var c=i.length>0?i[i.length-1].id+1:0;t=[].concat(Object(G.a)(i),Object(G.a)(n.map((function(e,t){return Object(ve.a)({id:c+t},e)})))),ce.createWorkshop(n[0]).then((function(e){return e}))}if(r){t=i.map((function(e){return r[e.id]?Object(ve.a)(Object(ve.a)({},e),r[e.id]):e}));var s=Object.keys(r)[0];ce.editWorkshop(t.filter((function(e){return e.id==s}))[0]).then((function(e){return e}))}if(a){var l=new Set(a);t=i.filter((function(e){return!l.has(e.id)})),ce.deleteWorkshop(a[0]).then((function(e){return e}))}o(t)},columnExtensions:l}),Object(r.jsx)(Se.b,{}),Object(r.jsx)(Se.e,{}),Object(r.jsx)(Se.d,{}),Object(r.jsx)(Se.c,{showAddCommand:!0,showEditCommand:!0,showDeleteCommand:!0})]})})}function Ae(){var e=g.isAdmin();return Object(r.jsx)(r.Fragment,{children:g.isAuthenticated()?e?Object(r.jsx)(Ce,{}):Object(r.jsx)(ke,{fromWorkshops:!1,isAdmin:e}):Object(r.jsx)(l.a,{to:"/login"})})}function Ne(){var e=g.isAdmin();return Object(r.jsx)(r.Fragment,{children:Object(r.jsx)(ke,{fromWorkshops:!1,isAdmin:e})})}function We(){return Object(r.jsx)(r.Fragment,{children:g.isAuthenticated()?Object(r.jsx)(ke,{fromWorkshops:!0,isAdmin:g.isAdmin(),data:[]}):Object(r.jsx)(l.a,{to:"/login"})})}var Ie=function(){return Object(r.jsx)("div",{className:"App",children:Object(r.jsx)(s.a,{basename:"/",children:Object(r.jsxs)(l.d,{children:[Object(r.jsx)(l.b,{exact:!0,path:"/",render:function(){return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(m,{isAdmin:g.isAdmin(),isAuthenticated:g.isAuthenticated()}),Object(r.jsx)(Ae,{})]})}}),Object(r.jsx)(l.b,{exact:!0,path:"/login",render:function(){return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(m,{isAuthenticated:g.isAuthenticated()}),Object(r.jsx)(q,{actionName:"\u0412\u043e\u0439\u0442\u0438"})]})}}),Object(r.jsx)(l.b,{exact:!0,path:"/register",render:function(){return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(m,{isAuthenticated:g.isAuthenticated()}),Object(r.jsx)(q,{actionName:"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f"})]})}}),Object(r.jsx)(l.b,{exact:!0,path:"/workshops",render:function(){return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(m,{isAuthenticated:g.isAuthenticated()}),Object(r.jsx)(We,{})]})}}),Object(r.jsx)(l.b,{exact:!0,path:"/users-accounting",render:function(){return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(m,{isAdmin:g.isAdmin(),isAuthenticated:g.isAuthenticated()}),Object(r.jsx)(Ne,{})]})}})]})})})},Fe=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,258)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),r(e),a(e),c(e),i(e)}))};o.a.render(Object(r.jsx)(c.a.StrictMode,{children:Object(r.jsx)(Ie,{})}),document.getElementById("root")),Fe()}},[[177,1,2]]]);
//# sourceMappingURL=main.c97c1968.chunk.js.map