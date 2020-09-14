(this.webpackJsonptextre=this.webpackJsonptextre||[]).push([[0],{150:function(e,t,n){},151:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n(41),l=n(3),c=n(23),u=n.n(c),o=n(42);function i(e){var t=e.registerSources,n=e.onComplete,a=r.useRef(null),l=r.useCallback((function(e){a.current&&(a.current.disabled=!0,a.current.style.backgroundColor="red");var n=e.target.files;if(null!=n){for(var r=[],l=function(){var e=Object(o.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text();case 2:return n=e.sent,e.abrupt("return",{name:t.name,data:n});case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),c=0;c<n.length;c++)r.push(l(n[c]));Promise.all(r).then((function(e){t(e),a.current&&(a.current.disabled=!1,a.current.style.backgroundColor="")}))}}),[t]),c=r.useCallback((function(){n()}),[n]);return r.createElement("div",null,r.createElement("h2",null,"Add a source ",r.createElement("small",null,"Select your file(s)")),r.createElement("input",{type:"file",multiple:!0,onChange:l,accept:".txt"}),r.createElement("br",null),r.createElement("button",{ref:a,onClick:c},"Close"))}var s=n(43);function m(e){var t=r.useRef(null),n=r.useRef(null),a=r.useRef(null),c=Object(s.a)("recent-regex","[]"),u=Object(l.a)(c,2),o=u[0],i=u[1],m=r.useMemo((function(){return JSON.parse(o)}),[o]),f=r.useCallback((function(t){if(t&&n.current&&a.current){var r=t.getAttribute("data-regex")||t.value,l=t.getAttribute("data-flags")||n.current.value,c=t.getAttribute("data-marker")||a.current.checked;"string"===typeof c&&(c="true"===c);try{new RegExp(r,l)}catch(o){return}var u={regex:r,flags:l,marker:c};console.log(u),e.registerSource(u),void 0===m.find((function(e){return e.regex===u.regex&&e.flags===u.flags&&e.marker===u.marker}))&&i(JSON.stringify(m.concat([u]))),e.onComplete()}}),[e,m,i]);return r.createElement("div",null,r.createElement("h2",null,"Add a regex"),r.createElement("input",{ref:t,type:"text",placeholder:"regex"}),r.createElement("input",{ref:n,type:"text",placeholder:"flags",defaultValue:"i"}),r.createElement("p",{style:{display:"inline"}},"Is Marker: "),r.createElement("input",{ref:a,type:"checkbox"}),r.createElement("br",null),r.createElement("button",{onClick:function(){return f(t.current)}},"Add"),r.createElement("button",{onClick:function(){return e.onComplete()}},"Close"),r.createElement("h3",null,"Current regexes"),e.sources.map((function(e,t){return r.createElement("p",{key:e.regex+e.marker},r.createElement("span",{style:{fontWeight:"bold"}},t)," - ",e.regex)})),r.createElement("h3",null,"Recent regexes"),m.map((function(e){return r.createElement("input",{"data-regex":e.regex,"data-flags":e.flags,"data-marker":e.marker,key:e.regex+e.flags+e.marker,type:"text",readOnly:!0,value:"/"+e.regex+"/"+e.flags+" (isMarker: "+e.marker+")",style:{width:"100%"},onClick:function(e){return f(e.currentTarget)}})})),r.createElement("h3",null,"Requirements/Tips"),r.createElement("ul",null,r.createElement("li",null,r.createElement("p",null,r.createElement("span",{style:{fontWeight:"bold"}},"time"),", and ",r.createElement("span",{style:{fontWeight:"bold"}},"plot")," are required"," ",r.createElement("a",{href:"https://javascript.info/regexp-groups#named-groups",target:"_blank",rel:"noopener noreferrer"},"named capture groups"),". They inform us how to find the time series data.")),r.createElement("li",null,r.createElement("p",null,r.createElement("span",{style:{fontWeight:"bold"}},"split")," is an optional"," ",r.createElement("a",{href:"https://javascript.info/regexp-groups#named-groups",target:"_blank",rel:"noopener noreferrer"},"named capture group"),". It allows optional splitting of series by some identifier.")),r.createElement("li",null,r.createElement("p",null,"All other matches are captured as metadata, and included in the hover tooltip for each data point.")),r.createElement("li",null,r.createElement("p",null,"The named capture group syntax is as follows: "),r.createElement("pre",null,"(?<time>)",r.createElement("br",null),"(?<plot>)",r.createElement("br",null),"(?<split>)")),r.createElement("li",null,r.createElement("pre",{style:{display:"inline"}},"\\s(?<time>.+?)\\s"),r.createElement("p",{style:{display:"inline"}},"is a named capture group to select"," ",r.createElement("span",{style:{fontWeight:"bold"}},"time")," as all characters between two instances of whitespace."))))}var f=n(44),p=n(45),d=n(22),g=n.n(d),E=(n(149),["#0f6fc6","#009dd9","#0bd0d9","#10cf9b","#7cca62","#a5c249","#9999ff","#993366","#ffffcc","#ccffff","#660066","#ff8080","#0066cc","#ccccff","#000080","#ff00ff","#ffff00","#0000ff","#800080","#800000","#008080","#0000ff","#f8c000","#f88600","#f83500","#8b723d","#818b3d","#586215"]);function h(e){r.useEffect((function(){}));var t=r.useMemo((function(){var t=e.regexes.map((function(e){var t=new RegExp(e.regex,e.flags);return t._marker=e.marker||!1,t}));return Object(p.a)(e.datasources.map((function(n,r){var a=n.data.split(e.delim).filter((function(e){return t.some((function(t){return t.test(e)}))}));return t.map((function(e,t){var l=r+t,c={},u=!1,o=a.map((function(t){return function(e,t){var n=e.exec(t);if(n&&n.groups&&n.groups.time&&(n.groups.plot||e._marker)){for(var r=n.groups,a=r.time,l=r.plot,c=r.split,u=[],o=1;o<n.length;o++)("undefined"===typeof n[o]||n[o]!==a&&n[o]!==l&&n[o]!==c)&&u.push(n[o]);return{x:g()(a).toDate(),y:l,split:c,marker:e._marker||!1,meta:u.length>0?u:void 0}}}(e,t)})).map((function(e){if(e)return e.split&&!c[e.split]&&(c[e.split]=!0),!0===e.marker&&(e.y="-1",u=!0),e})).filter((function(e){return void 0!==e}));return 0===Object.keys(c).length&&(c[""]=!0),Object.keys(c).map((function(e,r){var a=l+r;return{label:"".concat(n.name," [").concat(t,"] ").concat(e),fill:!1,showLine:!1===u,borderColor:E[a],backgroundColor:E[a],data:""===e?o:o.filter((function(t){return t&&t.split&&t.split===e}))}}))}))})))}),[e]);return r.createElement("div",{style:{position:"relative",maxHeight:"100vh"}},r.createElement(f.Line,{data:{datasets:t},options:{downsample:{onInit:!1,restoreOriginalData:!1,enabled:!0,threshold:250},animation:{duration:0},tooltips:{callbacks:{label:function(e,t){var n=t.datasets[e.datasetIndex].label||"",r=t.datasets[e.datasetIndex].data[e.index].meta;return n&&(n+=": "),r&&(n+=JSON.stringify(r)+": "),n+=Math.round(100*e.yLabel)/100,n}}},scales:{xAxes:[{type:"time",distribution:"series",offset:!0,ticks:{major:{enabled:!0,fontStyle:"bold"},source:"data",autoSkip:!0,autoSkipPadding:75,maxRotation:0,sampleSize:100}}],yAxes:[{gridLines:{drawBorder:!1},scaleLabel:{display:!1}}]}}}))}function b(e){return r.createElement("div",null,r.createElement("h1",null,"Welcome to Textre!"),r.createElement("p",null,"Textre (pronounced texture) is a tool for extracting time series data from raw text files, and visualizing it on a graph. I built it to help me debug audio video call logs - but feel free to use it for whatever."),r.createElement("h3",null,"Getting Started"),r.createElement("ul",null,r.createElement("li",null,r.createElement("p",null,"First, you'll be asked to select a"," ",r.createElement("span",{style:{fontWeight:"bold"}},"source")," - sources are just raw text files containing the content you want to select and visualize.")),r.createElement("li",null,r.createElement("p",null,"Then you'll define some"," ",r.createElement("span",{style:{fontWeight:"bold"}},"regex")," - regex tells us how to understand your content.")),r.createElement("li",null,r.createElement("p",null,"That's it! You'll be presented with"," ",r.createElement("span",{style:{fontWeight:"bold"}},"the chart")," - the chart is the main view in this app, it shows all your time series data and lets you interact with it.")),r.createElement("li",null,r.createElement("button",{onClick:function(){return e.onComplete()}},"Begin!"))))}n(150);function x(){var e=r.useState(!0),t=Object(l.a)(e,2),n=t[0],a=t[1],c=r.useState(!0),u=Object(l.a)(c,2),o=u[0],s=u[1],f=r.useState(!0),p=Object(l.a)(f,2),d=p[0],g=p[1],E=r.useState([]),x=Object(l.a)(E,2),y=x[0],k=x[1],v=r.useState([]),C=Object(l.a)(v,2),w=C[0],S=C[1],O=r.useCallback((function(e){k(y.concat(e))}),[y]),j=r.useCallback((function(e){S(w.concat([e]))}),[w]);return n?r.createElement(b,{onComplete:function(){return a(!1)}}):o?r.createElement(i,{registerSources:O,onComplete:function(){return s(!1)}}):d?r.createElement(m,{sources:w,registerSource:j,onComplete:function(){return g(!1)}}):r.createElement(r.Fragment,null,r.createElement("div",null,r.createElement("span",null,r.createElement("button",{onClick:function(){return s(!0)}},"Add Source [",y.length,"]")),r.createElement("span",null,r.createElement("button",{onClick:function(){return g(!0)}},"Add Regex [",w.length,"]")),r.createElement("span",null,r.createElement("button",{onClick:function(){return S([])}},"Clear Regex"))),r.createElement(h,{datasources:y,regexes:w,delim:"\n"}))}var y=document.getElementById("root");Object(a.render)(r.createElement(x,null),y)},46:function(e,t,n){e.exports=n(151)}},[[46,1,2]]]);
//# sourceMappingURL=main.56c7376a.chunk.js.map