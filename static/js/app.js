webpackJsonp([1],[,function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(2);a.n(n),a(4)},function(t,e){},,function(t,e,a){"use strict";var n=a(5),r=a.n(n),i=a(0),s=a.n(i),c=a(6),l=(a.n(c),a(7)),o=a.n(l),d=a(9),u=(a.n(d),a(10)),p=(a.n(u),window.app={});window.$=s.a,function(){function t(t,e){var a=/^[А-Яа-яA-Za-z\s]{1,20}$/,n=/^[А-Яа-яA-Za-z0-9,.!?\s]{1,5000}$/,r=/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,i=/^\d+$/,c=/^(\d{1,2}).(\d{1,2}).(\d{2}|\d{4})$/,l=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,o=s()(t).attr("type");return"number"===o?!!i.test(s()(t).val()):"text"===o?!!n.test(s()(t).val()):"password"===o?!!n.test(s()(t).val()):"date"===o?(console.log("date"),!!c.test(s()(t).val())):"email"===o?!!l.test(s()(t).val()):"tel"===o?!!r.test(s()(t).val()):"name"!==o||!!a.test(s()(t).val())}var e=function t(e,a,n){var i=this;r()(this,t),this.initCalculate=function(){this.initSelect(),this.initDatapicer()},this.loaderCpen=function(){s()(".profit__flex").addClass("blur"),s()(".profit__loader").addClass("profit__loader_active")},this.loaderClose=function(){s()(".profit__flex").removeClass("blur"),s()(".profit__loader").removeClass("profit__loader_active")},this.calculate=function(){var t=s()(".datepicker").val(),e=t.substr(0,2),a=t.substr(3,2),n=t.substr(6,4),r=new Date(n+", "+a+", "+e),c=new Date("1, 1, 2015"),l=r,o=new Date,d=(o-l)/864e5,u=i.cstSel.value;alert("\n        ELLO ---\n\n        startDate - "+r+"\n        startDateTEST - "+c+"\n\n        \n        "),s()(".trader-r__day-ago").html(d),s()(".trader-r__full-date").html(e+"/"+a+"/"+n),s()(".profit__btn .profit__btn-name").html("@"+u+" "),i.requestCalculate(u,r,1)},this.requestCalculate=function(t,e,a){s.a.get("https://beta.membrana.io/api/v2/calculator?trader="+t+"&start="+e+"&investment="+a,function(t){i.results=t;var e=t.result;document.querySelector(".income__usd").innerHTML=(e*s()(".history-container__usd").val()).toFixed(1),document.querySelector(".income__procent").innerHTML=e>=1?"+"+(100*(e-1)).toFixed(1)+"%":"-"+(100*(1-e)).toFixed(1)+"%",i.loaderClose()})},this.tableRows=function(t){for(var e=document.createDocumentFragment(),a=i.tableView;a<i.ratingTraders.length;a++)if(i.ratingTraders[a].verified){if(a>=t)break;var n=i.ratingTraders[a],r=document.createElement("div");r.className="table-rating__row table-rating__tr",r.setAttribute("data-trader",""+n.name);var s=document.createElement("div");s.className="table-rating__td table-rating__name",s.innerHTML='<span class="nicname">@'+n.name+"</span>";var c=document.createElement("div");c.className="table-rating__td table-rating__pic table-rating__hide",c.innerHTML='<img src="https://beta.membrana.io/api/static/'+n.name+'_stat_usdt.png">';var l=document.createElement("div");l.className="table-rating__td table-rating__pic table-rating__hide",l.innerHTML='<img src="https://beta.membrana.io/api/static/'+n.name+'_stat_btc.png">';var o=document.createElement("div");o.className="table-rating__td balance-stat table-rating__balance-stat table-rating__hide-mobile-two",o.innerHTML='\n            <div>\n              Current USDT: \n              <span class="usdt">'+n.ltusdt.current+'</span>\n            </div>\n            <div>\n              Change USDT (7d): \n              <span class="usdt">'+n.ltusdt.change.toFixed(2)+'%</span>\n            </div>\n            <br>\n            <div>\n              Change BTC: \n              <span class="btc">'+n.ltbtc.current+'</span>\n            </div>\n            <div>\n              Change BTC (7d): \n              <span class="btc">'+n.ltbtc.current.toFixed(2)+"%</span>\n            </div>\n          ";var d=document.createElement("div");d.className="table-rating__td contract-stat table-rating__hide-mobile",d.innerHTML="\n          <div>\n            Positive: \n            <span>"+n.contractStat.positive+"</span>\n          </div>\n          <div>\n            Negative: \n            <span>"+n.contractStat.negative+"</span>\n          </div>\n          <br>\n          <br>\n          <br>\n        ";var u=document.createElement("div");u.className="table-rating__td avg table-rating__avg",u.innerHTML="\n          <div>"+n.contractStat.avg6.toFixed(2)+"%</div>\n        ";var p=document.createElement("div");p.className="table-rating__td contract-settings",p.innerHTML="\n          <div>\n            <span>Target: </span>\n            <span>"+n.contractSettings.roi+"%</span>\n          </div>\n          <div>\n            <span>Max loss: </span>\n            <span>"+n.contractSettings.maxLoss+"</span>\n          </div>\n          <div>\n            <span>Duration: </span>\n            <span>"+n.contractSettings.duration+"</span>\n          </div>\n          <div>\n            <span>Fee: </span>\n            <span>"+n.contractSettings.fee+"%</span>\n          </div>\n          <div>\n            <span>Currency: </span>\n            <span>"+n.contractSettings.currency+"</span>\n          </div>\n          <div>\n            <span>Min amount: </span>\n            <span>"+n.contractSettings.minAmount+"</span>\n          </div>\n        ";var m=document.createElement("div");m.className="table-rating__td table-rating__btn-invest",m.innerHTML='\n          <a class="table-rating__btn" href="https://beta.membrana.io/'+n.name+'" target="_blank">INVEST NOW</a>\n        ',r.append(s,c,l,o,d,u,p,m),e.appendChild(r)}document.querySelector(".table-rating__wrap").appendChild(e),i.tableView+=t,document.querySelector(".rating__btn").addEventListener("click",function(t){t.preventDefault(),t.target.classList.add("rating__btn_show"),i.tableRows(i.ratingTraders.length)})},this.createTable=function(){document.querySelector(".table-rating__wrap").innerHTML="";var t=document.createElement("div");t.className="table-rating__head",t.innerHTML='\n          <div class="table-rating__th">Name</div>\n          <div class="table-rating__th table-rating__hide">Balance Chart 7d, USDT</div>\n          <div class="table-rating__th table-rating__hide">Balance Chart 7d, BTC</div>\n          <div class="table-rating__th table-rating__hide-mobile-two">Balance Under Management</div>\n          <div class="table-rating__th table-rating__hide-mobile">Contract Stats</div>\n          <div class="table-rating__th">Average Monthly ROI</div>\n          <div class="table-rating__th">Contract Settings</div>\n          <div class="table-rating__th"></div>\n        ',document.querySelector(".table-rating__wrap").appendChild(t),i.tableRows(10),s()(document).on("click",".table-rating__row",function(t){for(var e=t.currentTarget.getAttribute("data-trader"),a=s()("#mySelect")[0].options,n=0,r=0;r<a.length;r++)a[r].value===e&&(n=r);s()("#mySelect")[0].options[n].selected=!0,i.cstSel.destroy(),o()(document.getElementById("mySelect")),i.cstSel=document.querySelector(".customSelect").customSelect,document.querySelector(".trader-r__name").innerHTML=i.cstSel.value,i.loaderCpen(),i.calculate()})},this.calculateUsd=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;document.querySelector(".income__usd").innerHTML=(i.results.result*t).toFixed(1)},this.initSelect=function(){var t=this,e=document.createDocumentFragment();this.traderJson.forEach(function(t,a){var n=document.createElement("option");n.value=""+t.name,n.text="@"+t.name,e.appendChild(n)}),document.querySelector("#mySelect").appendChild(e),o()(document.getElementById("mySelect")),this.cstSel=document.querySelector(".customSelect").customSelect,document.querySelector(".trader-r__name").innerHTML=this.cstSel.value,this.cstSel.select.addEventListener("change",function(e){t.loaderCpen();var a=t.cstSel.value;document.querySelector(".trader-r__name").innerHTML=a,t.calculate()})},this.initDatapicer=function(){var t=this;s()(".datepicker").datepicker.language.en={days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],today:"Today",clear:"Clean",dateFormat:"dd.mm.yyyy",timeFormat:"hh:ii",firstDay:1},s()(".datepicker").datepicker({startDate:new Date(2019,0,1),language:"en",maxDate:new Date,onSelect:function(a,n,r){t.loaderCpen(),t.calculate(),e.hide()}});var e=s()(".datepicker").data("datepicker");e&&e.selectDate(new Date(2019,0,1))},this.traders=e,this.usd=a,this.data=n,this.traderJson=null,this.cstSel=null,this.results=null,this.tableView=0,this.ratingTraders=null,s.a.get("https://beta.membrana.io/api/v2/challenge/result?round=0",function(t){i.traderJson=t.results,i.initCalculate()}),s.a.get("https://beta.membrana.io/api/v2/rating",function(t){i.ratingTraders=t.rating,i.createTable()})},a=null;s()(".index").length&&(a=new e(s()("#mySelect"),s()(".history-container__usd"),s()(".datepicker"))),s()(".profit__btn").on("click",function(t){t.preventDefault();var e=s()("#mySelect")[0].selectedIndex;sessionStorage.setItem("contact_with",s()("#mySelect")[0][e].value),window.location.href="/sign-in/"}),s()(".cart-token").on("click",function(t){t.preventDefault(),s()(".cart-token").removeClass("cart-token_active"),s()(t.currentTarget).addClass("cart-token_active"),s()(".token__btn").attr("href",t.currentTarget.href)}),s()(".scroll-btn").on("click",function(){s()("html, body").animate({scrollTop:s()(".investors").offset().top},2e3)}),s()(".input").keypress(function(){s()(this).removeClass("input_danger")}),s()(".opportunities__btn, .footer__btn, .sign-in__create").click(function(){var e=!0;if(s()(this).closest("form").find(".input").each(function(a){t(this,e)||(s()(this).closest(".input").addClass("input_danger"),e=!1)}),!e)return!1}),s()(".history-container__usd").on("change keyup input click",function(t){this.value.match(/[^0-9]/g)&&(this.value=this.value.replace(/[^0-9]/g,""))}),s()(".history-container__usd").keyup(function(t){""===t.target.value?a.calculateUsd():a.calculateUsd(t.target.value)}),s()(".sign-in__create").length&&function(){var t=sessionStorage.getItem("contact_with");t&&s.a.get("https://beta.membrana.io/api/v2/profile/"+t,function(t){console.log(t),s()(".sign-in__user-login").html(t.profile.name),s()(".sign-in__money").html(t.profile.totalInUSDT),t.profile.currentProfit[0]&&s()(".sign-in__profit").html(t.profile.currentProfit[0].toFixed(2)+"%")})}()}(),p.svgToInline=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s()("body"),e=t.find('img[src$=".svg"]:not(.js-prevent-inline)'),a=e.length;e.each(function(){var t=s()(this),e=t.attr("src"),n=(t.attr("class")||"")+" js-inlined-svg";s.a.get(e,function(r){if(404!==r.status){var i=s()(r).find("svg");i.find("title","desc").remove(),i.attr("width")&&i.css("width",parseInt(i.attr("width").replace("px",""))/10+"rem"),i.attr("height")&&i.css("height",parseInt(i.attr("height").replace("px",""))/10+"rem"),!i.attr("viewBox")&&i.attr("height")&&i.attr("width")&&i.attr("viewBox","0 0 "+i.attr("width")+" "+i.attr("height"))&&i.attr("preserveAspectRatio","xMinYMin meet"),i.find("*").each(function(){var t=s()(this),e=/^url\((.*)\)/g,a=/^#(.*)/g;s.a.each(t.get(0).attributes,function(n,r){var s=r.name,c=r.value,l=e.exec(c),o=a.exec(c),d=("id"+Math.random()).replace(".","");if(l){var u=l[1];t.attr(s,"url(#"+d+")"),i.find(u).attr("id",d)}if("xlink:href"===s&&o){var p=o[0];t.attr(s,"#"+d),i.find(p).attr("id",d)}})}),i.addClass(n).attr("ref",e),t.replaceWith(i)}0===--a&&s()(window).trigger("imagesReady")}).fail(function(t){0===--a&&s()(window).trigger("imagesReady")})})},p.svgToInline(),function(){var t=s()(".header-wrapper");if(s()(".js-hamburger").on("click",function(){s()("body").toggleClass("no-overflow"),s()(this).toggleClass("opened"),t.find(".nav").toggleClass("opened")}),!s()(".app").is(".index"));}(),function(){var t=s()(".scroll-btn-next"),e=s()(".competition__profits");if(!t.length)return!1;t.on("click",function(){s()("html, body").animate({scrollTop:e.offset().top})})}(),s()(window).on("imagesReady",function(){var t=new Image;t.src="/static/img/headPic.png";var e=setTimeout(function(){s()(".app-preloader, .app-preloader__circle").fadeOut(500,function(){s()(window).trigger("preloaded")})},500);t.onload=e,t.onerror=e})},,function(t,e){},,,function(t,e){}],[1]);
//# sourceMappingURL=app.js.map?012ad76293f7356b4fe2