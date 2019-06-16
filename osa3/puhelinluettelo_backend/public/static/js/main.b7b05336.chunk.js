(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(14),o=t.n(c),u=t(2),l=t(4),i=function(e){var n=e.handleInputChange;return r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"filter"},"Filter shown with"),r.a.createElement("input",{type:"text",id:"filter",name:"filter",onChange:n}))},m=function(e){return r.a.createElement("form",{onSubmit:e.onSubmit},r.a.createElement("label",{htmlFor:"name"},"Name: "),r.a.createElement("input",{type:"text",id:"name",name:"name",onChange:e.handleInputChange,required:!0}),r.a.createElement("br",null),r.a.createElement("label",{htmlFor:"number"},"Number: "),r.a.createElement("input",{type:"tel",id:"number",name:"number",onChange:e.handleInputChange,required:!0}),r.a.createElement("br",null),r.a.createElement("button",{type:"submit"},"Add"))},s=function(e){var n=Object(u.a)(e.persons);e.filter&&(n=n.filter(function(n){return n.name.toLowerCase().includes(e.filter)}));var t=n.map(function(n){return r.a.createElement("li",{key:n.id},n.name," ",n.number," ",r.a.createElement("button",{"data-id":n.id,type:"button",onClick:function(n){return e.removeNumber(n.target.getAttribute("data-id"))}},"remove"))});return r.a.createElement("ul",null,t)},d=function(e){var n=e.notificationSettings,t={border:"5px solid ".concat("success"===n.style?"green":"red"),backgroundColor:" #bfc9ca",paddingLeft:"5px",color:"success"===n.style?"green":"red",fontWeight:"bold"};return n.message?r.a.createElement("div",{style:t},r.a.createElement("p",null,n.message)):r.a.createElement("div",null)},f=t(3),b=t.n(f),h="/api/persons",p=function(){return b.a.get(h)},g=function(e){return b.a.post(h,e)},E=function(e){return b.a.delete("".concat(h,"/").concat(e))},v=function(e,n){return b.a.put("".concat(h,"/").concat(e),n)},w=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],c=n[1],o=Object(a.useState)({name:null,phone:null}),f=Object(l.a)(o,2),b=f[0],h=f[1],w=Object(a.useState)(null),y=Object(l.a)(w,2),j=y[0],C=y[1],O=Object(a.useState)({message:null,style:null}),k=Object(l.a)(O,2),S=k[0],I=k[1],x=function(e,n,t){I({message:e,style:t}),setTimeout(function(){I({message:null,style:null})},1e3*n)};Object(a.useEffect)(function(){p().then(function(e){c(e.data)}).catch(function(e){x("Error retrieving data",999,"failure")})},[]);var A=function(e){switch(e.target.name){case"name":h({name:e.target.value,number:b.number});break;case"number":h({name:b.name,number:e.target.value});break;case"filter":C(e.target.value.toLowerCase());break;default:console.error("Jokin meni nyt pieleen!")}};return r.a.createElement("div",null,r.a.createElement("h1",null,"Phonebook"),r.a.createElement(d,{notificationSettings:S}),r.a.createElement("h2",null,"Add new number"),r.a.createElement(m,{onSubmit:function(e){if(e.preventDefault(),t.some(function(e){return e.name===b.name})){if(window.confirm("That person is already on the list. Do you want to replace the old number with the new one?")){var n=t.find(function(e){return e.name===b.name}).id;v(n,b).then(function(){var e=Object(u.a)(t),a=e.findIndex(function(e){return e.id===n});e[a]=b,e[a].id=n,c(e),x("Modified ".concat(b.name),3,"success")}).catch(function(e){console.warn(e),x(e.response.data||"Failed to modify ".concat(b.name),8,"failure")})}}else g(b).then(function(e){201===e.status?p().then(function(e){c(e.data),x("Added ".concat(b.name),3,"success")}):x("Something odd happened while adding ".concat(b.name,". HTTP response was ").concat(e.status," when 201 was expected"),5,"failure")}).catch(function(e){console.warn(e),x(e.response.data,8,"failure")})},handleInputChange:A}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(i,{handleInputChange:A}),r.a.createElement(s,{persons:t,filter:j,removeNumber:function(e){var n=t.findIndex(function(n){return n.id===e});window.confirm("Are you sure? ".concat(t[n].name," might get upset..."))&&E(e).then(function(){var e=Object(u.a)(t),a=e.splice(n,1);x("Removed ".concat(a[0].name),3,"success"),c(e)}).catch(function(e){console.error(e),x("Information of ".concat(t[n].name," has already been removed from the server. Please refresh the page."),5,"failure")})}}))};o.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.b7b05336.chunk.js.map