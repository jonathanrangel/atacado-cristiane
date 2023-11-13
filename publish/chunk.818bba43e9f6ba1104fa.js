(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{161:function(t,e,i){"use strict";i(177)},162:function(t,e,i){"use strict";i.d(e,"b",(function(){return o})),i.d(e,"a",(function(){return n}));i(5);var s=i(15);const o=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:s.a;const i=e.getCustomer().favorites||[],o=n(t,e);if(o){const e=i.indexOf(t);i.splice(e,1)}else i.push(t);return e.requestApi("/me.json","patch",{favorites:i}),!o},n=(t,e)=>{const{favorites:i}=e.getCustomer();return i&&i.includes(t)}},163:function(t,e,i){"use strict";e.a=(t,e)=>new Promise((i=>{const s="object"==typeof window&&window.storefront;if(s){const o=()=>{let o=s.info&&s.info[t];return!!(o&&(e&&(o=o[e]),o&&Object.keys(o).length))&&(i(o),!0)};o()||s.on(`info:${t}`,o)}}))},174:function(t,e,i){"use strict";var s={name:"ALink",props:{href:String,to:[String,Object]},computed:{isRouter(){return!!this.$router&&(!this.href||Boolean(this.$router.options.routes.find((t=>{let{path:e}=t;return e===this.href}))))}}},o=i(40),n=Object(o.a)(s,(function(){var t=this,e=t.$createElement;return(t._self._c||e)(t.isRouter?"router-link":"a",{tag:"component",attrs:{href:t.isRouter?null:t.href,to:t.isRouter?t.to||t.href:null}},[t._t("default")],2)}),[],!1,null,null,null);e.a=n.exports},175:function(t,e,i){"use strict";var s=i(24),o=i(31),n=i(32),a=i(33),r=i(70),c=i(163);const l=(t,e)=>{const{type:i,value:s}=e;let o;if(s)return o="percentage"===i?t*(100-s)/100:t-s,o>0?o:0};var u={name:"APrices",props:{product:{type:Object,required:!0},isLiteral:Boolean,isBig:Boolean,isAmountTotal:Boolean,installmentsOption:Object,discountOption:Object,discountText:{type:[String,Boolean],default:""},canShowPriceOptions:{type:Boolean,default:!0}},data(){return{installmentsNumber:0,monthlyInterest:0,discount:{type:null,value:0},extraDiscount:{type:null,value:0,min_amount:0},discountLabel:this.discountText,pointsProgramName:null,pointsMinPrice:0,earnPointsFactor:0}},computed:{i19asOf:()=>Object(o.a)(s.r),i19from:()=>Object(o.a)(s.Gb),i19interestFree:()=>Object(o.a)(s.Ub),i19of:()=>Object(o.a)(s.Ec),i19to:()=>Object(o.a)(s.be),i19upTo:()=>Object(o.a)(s.me),i19youEarn:()=>Object(o.a)(s.ue),price(){const t=Object(n.a)(this.product);return this.extraDiscount.value&&(!this.extraDiscount.min_amount||t>this.extraDiscount.min_amount)?l(t,this.extraDiscount):t},comparePrice(){return Object(a.a)(this.product)?this.product.base_price:this.extraDiscount.value?Object(n.a)(this.product):void 0},hasVariedPrices(){const{variations:t}=this.product;if(t){const e=Object(n.a)(this.product);for(let i=0;i<t.length;i++){if(Object(n.a)({...this.product,...t[i]})>e)return!0}}return!1},priceWithDiscount(){return this.canShowPriceOptions&&l(this.price,this.discount)},installmentValue(){if(this.canShowPriceOptions&&this.installmentsNumber>=2){if(this.monthlyInterest){const t=this.monthlyInterest/100;return this.price*t/(1-Math.pow(1+t,-this.installmentsNumber))}return this.price/this.installmentsNumber}return 0}},methods:{formatMoney:r.a,updateInstallments(t){if(t){this.monthlyInterest=t.monthly_interest;const e=t.min_installment||5,i=parseInt(this.price/e,10);this.installmentsNumber=Math.min(i,t.max_number)}},updateDiscount(t){!t||t.min_amount&&!(t.min_amount<=this.price)||this.isAmountTotal&&"total"!==t.apply_at||(this.discount=t,!this.discountText&&!1!==this.discountText&&t.label&&(this.discountLabel=`via ${t.label}`))}},watch:{price:{handler(t){this.$emit("fix-price",t)},immediate:!0}},created(){this.canShowPriceOptions&&(this.discountOption?this.updateDiscount(this.discountOption):Object(c.a)("apply_discount").then((t=>{t.available_extra_discount&&(this.extraDiscount=t.available_extra_discount)})),this.installmentsOption?this.updateInstallments(this.installmentsOption):Object(c.a)("list_payments").then((t=>{this.updateInstallments(t.installments_option),this.updateDiscount(t.discount_option);const e=t.loyalty_points_programs;this.isLiteral&&e&&this.$nextTick((()=>{for(const t in e){const i=e[t];if(i&&i.earn_percentage>0){this.pointsMinPrice=i.min_subtotal_to_earn,this.pointsProgramName=i.name,this.earnPointsFactor=i.earn_percentage/100;break}}}))})))}},d=(i(161),i(40)),p=Object(d.a)(u,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"prices",class:{"prices--literal":t.isLiteral,"prices--big":t.isBig}},[t.comparePrice?i("span",{staticClass:"prices__compare"},[t.isLiteral?[i("small",[t._v(" "+t._s(t.i19from)+" ")]),i("s",[t._v(t._s(t.formatMoney(t.comparePrice)))]),i("small",[t._v(" "+t._s(t.i19to)+" ")])]:i("s",[t._v(t._s(t.formatMoney(t.comparePrice)))])],2):t._e(),i("strong",{staticClass:"prices__value"},[t.hasVariedPrices?i("small",[t._v(" "+t._s(t.i19asOf)+" ")]):t._e(),t._v(" "+t._s(t.formatMoney(t.price))+" ")]),i("transition-group",{attrs:{"enter-active-class":"animated slideInDown"}},[t.earnPointsFactor>0&&!(t.pointsMinPrice>t.price)?i("div",{key:"points",staticClass:"prices__points"},[i("i",{staticClass:"i-check-circle"}),t._v(" "+t._s(t.i19youEarn)+" "),i("span",[t._v(" +"+t._s((t.earnPointsFactor*t.price).toFixed(1))+" ")]),i("em",[t._v(t._s(t.pointsProgramName))])]):t._e(),t.installmentsNumber>1&&t.installmentValue?i("div",{key:"installments",staticClass:"prices__installments"},[t.isLiteral?i("small",[t._v(" "+t._s(t.i19upTo)+" ")]):t._e(),t._v(" "+t._s(t.installmentsNumber)+"x "),t.isLiteral?i("small",[t._v(" "+t._s(t.i19of)+" ")]):t._e(),i("span",[t._v(" "+t._s(t.formatMoney(t.installmentValue))+" ")]),!t.monthlyInterest&&t.isLiteral?i("small",[t._v(" "+t._s(t.i19interestFree)+" ")]):t._e()]):t._e(),"number"==typeof t.priceWithDiscount&&t.priceWithDiscount<t.price?i("div",{key:"discount",staticClass:"prices__discount"},["string"==typeof t.discountLabel&&t.discountLabel?[i("span",[t._v(" "+t._s(t.formatMoney(t.priceWithDiscount))+" ")]),i("small",{staticClass:"prices__discount-label"},[t._v(" "+t._s(t.discountLabel)+" ")])]:[i("small",[t._v(" "+t._s(t.i19asOf)+" ")]),i("span",[t._v(" "+t._s(t.formatMoney(t.priceWithDiscount))+" ")])]],2):t._e()])],1)}),[],!1,null,null,null);e.a=p.exports},176:function(t,e,i){"use strict";i(5);var s=i(25),o=i(85),n=i(39);var a={name:"APicture",props:{src:[String,Object],fallbackSrc:String,alt:String,canCalcHeight:{type:Boolean,default:!0},placeholder:{type:String,default:"/assets/img-placeholder.png"},containerBreakpoints:{type:Object,default:()=>({zoom:null,big:800,[s.$ecomConfig.get("default_img_size")||"normal"]:400})},lozadOptions:{type:Object,default:()=>({rootMargin:"350px 0px",threshold:0})}},data:()=>({sources:[],imgWidth:0,imgHeight:0,height:null,opacity:null}),computed:{defaultImgObj(){return"object"==typeof this.src&&this.src?Object(o.a)(this.src)||this.src:{}},localFallbackSrc(){const{src:t,defaultImgObj:e,fallbackSrc:i}=this;if(i)return i;const s="object"==typeof t?t.zoom?t.zoom.url:e.url:t;return s?s.replace(/\.webp$/,""):this.placeholder},localAlt(){const{alt:t,src:e,defaultImgObj:i}=this;return t||(e?i.alt||"Product":"No image")}},methods:{updateSources(){const t=[];let e;if("object"==typeof this.src){const{clientWidth:t,clientHeight:i}=this.$el,s=((t,e,i,s)=>{let o,n;for(const a in s){const r=s[a];if(void 0!==r&&t[a]){if(void 0!==n)if(null===r){if(n>=e)continue}else if(r<e||r-50<=i||null!==n&&r>n)continue;o=a,n=r}}return o})(this.src,t,i,this.containerBreakpoints),o=this.src[s],{url:n,size:a}=o||this.defaultImgObj;e=n,a&&([this.imgWidth,this.imgHeight]=a.split("x").map((t=>parseInt(t,10))),t&&this.imgHeight&&this.canCalcHeight&&(this.height=(t>=this.imgWidth?this.imgHeight:t*this.imgHeight/this.imgWidth)+"px"))}else e=this.src;e&&(e.endsWith(".webp")?t.push({srcset:e,type:"image/webp"},{srcset:/\/imgs\/[0-9]{3}px/.test(e)?e.replace(/\/imgs\/[0-9]{3}px/,""):e.replace(/\.webp$/,""),type:"image/"+(".png"===e.substr(-9,4)?"png":"jpeg")}):t.push({srcset:e})),this.sources=t}},mounted(){this.updateSources(),this.$nextTick((()=>{const t=this.$el;Object(n.a)(t,{...this.lozadOptions,loaded:t=>{const{localFallbackSrc:e}=this,i="IMG"===t.tagName?t:t.lastChild;i.style.opacity=0,this.imgHeight&&(i.height=this.imgHeight,i.width=this.imgWidth),i.onerror=function(){console.error(new Error("Image load error"),this),t.style.display="none";const i=document.createElement("IMG");i.src=e,t.parentNode.insertBefore(i,t.nextSibling)},i.onload=()=>{this.opacity=0,t.classList.add("loaded"),this.$nextTick((()=>{this.opacity=i.style.opacity=null,this.$emit("load")}))}}}).observe()}))}},r=(i(161),i(40)),c=Object(r.a)(a,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("picture",{staticClass:"picture",style:{height:t.height,opacity:t.opacity},attrs:{"data-iesrc":t.localFallbackSrc,"data-alt":t.localAlt}},[t.sources.length?t._l(t.sources,(function(t,e){var s=t.srcset,o=t.type;return i("source",{key:e,attrs:{srcset:s,type:o}})})):i("source",{attrs:{srcset:t.localFallbackSrc}})],2)}),[],!1,null,null,null);e.a=c.exports},177:function(t,e,i){var s=i(204);s.__esModule&&(s=s.default),"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);(0,i(160).default)("083be3a1",s,!0,{})},178:function(t,e,i){"use strict";var s=i(164),o=i(24),n=i(31),a=i(32),r=i(22),c=i(72),l=i(33),u=i(19),d=i(2),p=i(4),h=i(174),m=i(176),b=i(175),f=i(15),g=i(162);const y=(t,e)=>{if("object"==typeof window){t=`productCard${t}Html`;const i="function"==typeof window[t]?window[t](e):window[t];if("string"==typeof i)return i}};var _={name:"ProductCard",components:{ALink:h.a,APicture:m.a,APrices:b.a},props:{product:Object,productId:String,isSmall:Boolean,headingTag:{type:String,default:"h3"},buyText:String,transitionClass:{type:String,default:"animated fadeIn"},canAddToCart:{type:Boolean,default:!0},ecomPassport:{type:Object,default:()=>f.a},accountUrl:{type:String,default:"/app/#/account/"},isLoaded:Boolean,installmentsOption:Object,discountOption:Object},data:()=>({body:{},isLoading:!1,isWaitingBuy:!1,isHovered:!1,isFavorite:!1,error:""}),computed:{i19addToFavorites:()=>Object(n.a)(o.m),i19outOfStock:()=>Object(n.a)(o.Qc),i19unavailable:()=>Object(n.a)(o.he),i19uponRequest:()=>"Sob consulta",isWithoutPrice(){return!Object(a.a)(this.body)},ratingHtml(){return y("Rating",this.body)},buyHtml(){return y("Buy",this.body)},footerHtml(){return y("Footer",this.body)},name(){return Object(r.a)(this.body)},strBuy(){return this.buyText||"object"==typeof window&&window.productCardBuyText||Object(n.a)(o.z)},isInStock(){return Object(c.a)(this.body)},isActive(){return this.body.available&&this.body.visible&&this.isInStock},isLogged:()=>f.a.checkAuthorization(),discount(){const{body:t}=this;return Object(l.a)(t)?Math.round(100*(t.base_price-Object(a.a)(t))/t.base_price):0}},methods:{setBody(t){this.body=Object.assign({},t),delete this.body.body_html,delete this.body.body_text,delete this.body.inventory_records,delete this.body.price_change_records,this.isFavorite=Object(g.a)(this.body._id,this.ecomPassport)},fetchItem(){this.productId&&(this.isLoading=!0,Object(d.g)({url:`/products/${this.productId}.json`}).then((t=>{let{data:e}=t;this.$emit("update:product",e),this.setBody(e),this.$emit("update:is-loaded",!0)})).catch((t=>{console.error(t),this.body.name&&this.body.slug&&this.body.pictures||(this.error=Object(n.a)(o.W))})).finally((()=>{this.isLoading=!1})))},toggleFavorite(){this.isLogged&&(this.isFavorite=Object(g.b)(this.body._id,this.ecomPassport))},buy(){const t=this.body;this.$emit("buy",{product:t}),this.canAddToCart&&(this.isWaitingBuy=!0,Object(d.g)({url:`/products/${t._id}.json`}).then((e=>{let{data:s}=e;const o=["variations","customizations","kit_composition"];for(let t=0;t<o.length;t++){const e=s[o[t]];if(e&&e.length)return Promise.all([i.e(0),i.e(3),i.e(6),i.e(18),i.e(25)]).then(i.bind(null,390)).then((t=>{new u.a({render:e=>e(t.default,{props:{product:s}})}).$mount(this.$refs.quickview)}))}const{quantity:n,price:a}=s;p.a.addProduct({...t,quantity:n,price:a})})).catch((e=>{console.error(e),window.location=`/${t.slug}`})).finally((()=>{this.isWaitingBuy=!1})))}},created(){this.product&&(this.setBody(this.product),void 0===this.product.available&&(this.body.available=!0),void 0===this.product.visible&&(this.body.visible=!0)),this.isLoaded||this.fetchItem()}},v=(i(161),i(40)),w=Object(v.a)(_,s.a,s.b,!1,null,null,null);e.a=w.exports},204:function(t,e,i){(e=i(159)(!0)).push([t.i,"","",{version:3,sources:[],names:[],mappings:"",file:"empty.scss"}]),t.exports=e},212:function(t,e,i){"use strict";i.r(e);i(5);var s=i(0),o=i(21),n=i(19),a=i(39),r=i(72),c=i(48),l=i(178),u=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"product-card";t.buyText&&(window.productCardBuyText=t.buyText),t.buy&&(window.productCardBuyHtml=t.buy),t.footer&&(window.productCardFooterHtml=t.footer);const i=window.storefront&&window.storefront.getScopedSlots,s=document.querySelectorAll(`.${e}`),o=[];for(let t=0;t<s.length;t++)if(s[t]){const{productId:e,toRender:i}=s[t].dataset;i&&-1===o.indexOf(e)&&o.push(e)}let u;if(o.length>=4&&o.length<=70&&!t.skipSearchApi){const t=new c.a;u=t.setPageSize(o.length).setProductIds(o).fetch(!0,{timeout:5e3}).then((()=>{const e=t.getItems();for(let t=0;t<2;t++)d(s[t]);return e})).catch((t=>{console.error(t)}))}else u=Promise.resolve();const d=s=>{if(s){const{productId:o,sku:a,toRender:c}=s.dataset;if(c){let c;u.then((t=>{Array.isArray(t)&&(c=t.find((t=>{let{_id:e}=t;return e===o})))})).finally((()=>{let u;if(c){if(u=!0,!c.available||!c.visible||!Object(r.a)(c)){const t=s.parentNode&&s.parentNode.parentNode;t&&"LI"===t.tagName&&t.parentNode.appendChild(t)}}else{const t=s.parentNode;if(t&&(c=t.dataset.product,"string"==typeof c))try{c=JSON.parse(c)}catch(t){c=void 0}}((s,o,a,r,c)=>{new n.a({render:n=>n(l.a,{class:"product-card"!==e?e:null,attrs:{"data-product-id":o,"data-sku":a},props:{...t.props,productId:o,product:r,isLoaded:c,transitionClass:null},scopedSlots:"function"==typeof i?i(s,n):void 0})}).$mount(s)})(s,o,a,c,u)}))}}};Object(a.a)(s,{rootMargin:"350px 0px",threshold:0,load:d}).observe()};const d=window.location.pathname.startsWith("/app/"),p=[],h="localhost"===window.location.hostname?50:1,m=(t,e)=>{const i=new Promise((i=>{setTimeout((()=>{const n=window._widgets&&window._widgets[t];if(n&&n.active&&(!n.desktopOnly||!s.isMobile)&&(d?n.enableCheckout:!n.disablePages))return e().then((e=>{"function"==typeof e.default&&e.default({...n.options,$emit(t,e){o.a.emit(t,e)}}),o.a.emit(`widget:${t}`),console.log(`Widget loaded: ${t}`)})).catch(console.error).finally(i);i()}),h)}));p.push(i)},{resource:b}=document.body.dataset;d||"products"!==b||m("@ecomplus/widget-product",(()=>Promise.all([i.e(0),i.e(3),i.e(6),i.e(19)]).then(i.bind(null,373)))),Promise.all(p).then((()=>{m("@ecomplus/widget-product-card",(()=>Promise.resolve({default:u}))),("/search"===window.location.pathname||"categories"===b||"brands"===b||!b&&document.getElementById("search-engine"))&&m("@ecomplus/widget-search-engine",(()=>Promise.all([i.e(5),i.e(30)]).then(i.bind(null,374))));const t=t=>{"function"==typeof window.requestIdleCallback?setTimeout((()=>window.requestIdleCallback(t)),200):setTimeout(t,800)};t((()=>{o.a.emit("load:lcp"),d||(m("@ecomplus/widget-search",(()=>Promise.all([i.e(5),i.e(27)]).then(i.bind(null,384)))),m("@ecomplus/widget-minicart",(()=>Promise.all([i.e(0),i.e(17),i.e(31)]).then(i.bind(null,385)))),m("@ecomplus/widget-user",(()=>i.e(23).then(i.bind(null,386))))),Promise.all(p).then((()=>{t((()=>o.a.emit("load:components"))),m("@ecomplus/widget-tag-manager",(()=>i.e(29).then(i.bind(null,391)))),m("@ecomplus/widget-analytics",(()=>i.e(28).then(i.bind(null,392)))),m("@ecomplus/widget-fb-pixel",(()=>i.e(35).then(i.bind(null,388)))),m("@ecomplus/widget-tiktok-pixel",(()=>i.e(37).then(i.bind(null,387)))),m("@ecomplus/widget-gmc-ratings",(()=>i.e(36).then(i.bind(null,375)))),m("@ecomplus/widget-ebit",(()=>i.e(34).then(i.bind(null,376)))),m("@ecomplus/widget-compre-confie",(()=>i.e(33).then(i.bind(null,377))))}))}))}))}}]);