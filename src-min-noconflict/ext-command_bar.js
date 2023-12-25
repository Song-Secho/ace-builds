ace.define("ace/ext/command_bar",["require","exports","module","ace/tooltip","ace/lib/event_emitter","ace/lib/lang","ace/lib/dom","ace/lib/oop","ace/lib/useragent"],function(e,t,n){var r=this&&this.__values||function(e){var t=typeof Symbol=="function"&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&typeof e.length=="number")return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")},i=e("../tooltip").Tooltip,s=e("../lib/event_emitter").EventEmitter,o=e("../lib/lang"),u=e("../lib/dom"),a=e("../lib/oop"),f=e("../lib/useragent"),l="command_bar_tooltip_button",c="command_bar_button_value",h="command_bar_button_caption",p="command_bar_keybinding",d="command_bar_tooltip",v="MoreOptionsButton",m=100,g=4,y=function(e,t){return t.row>e.row?e:t.row===e.row&&t.column>e.column?e:t},b={Ctrl:{mac:"^"},Option:{mac:"\u2325"},Command:{mac:"\u2318"},Cmd:{mac:"\u2318"},Shift:"\u21e7",Left:"\u2190",Right:"\u2192",Up:"\u2191",Down:"\u2193"},w=function(){function e(e,t){var n,s;t=t||{},this.parentNode=e,this.tooltip=new i(this.parentNode),this.moreOptions=new i(this.parentNode),this.maxElementsOnTooltip=t.maxElementsOnTooltip||g,this.$alwaysShow=t.alwaysShow||!1,this.eventListeners={},this.elements={},this.commands={},this.tooltipEl=u.buildDom(["div",{"class":d}],this.tooltip.getElement()),this.moreOptionsEl=u.buildDom(["div",{"class":d+" tooltip_more_options"}],this.moreOptions.getElement()),this.$showTooltipTimer=o.delayedCall(this.$showTooltip.bind(this),t.showDelay||m),this.$hideTooltipTimer=o.delayedCall(this.$hideTooltip.bind(this),t.hideDelay||m),this.$tooltipEnter=this.$tooltipEnter.bind(this),this.$onMouseMove=this.$onMouseMove.bind(this),this.$onChangeScroll=this.$onChangeScroll.bind(this),this.$onEditorChangeSession=this.$onEditorChangeSession.bind(this),this.$scheduleTooltipForHide=this.$scheduleTooltipForHide.bind(this),this.$preventMouseEvent=this.$preventMouseEvent.bind(this);try{for(var a=r(["mousedown","mouseup","click"]),f=a.next();!f.done;f=a.next()){var l=f.value;this.tooltip.getElement().addEventListener(l,this.$preventMouseEvent),this.moreOptions.getElement().addEventListener(l,this.$preventMouseEvent)}}catch(c){n={error:c}}finally{try{f&&!f.done&&(s=a.return)&&s.call(a)}finally{if(n)throw n.error}}}return e.prototype.registerCommand=function(e,t){var n=Object.keys(this.commands).length<this.maxElementsOnTooltip;!n&&!this.elements[v]&&this.$createCommand(v,{name:"\u00b7\u00b7\u00b7",exec:function(){this.$shouldHideMoreOptions=!1,this.$setMoreOptionsVisibility(!this.isMoreOptionsShown())}.bind(this),type:"checkbox",getValue:function(){return this.isMoreOptionsShown()}.bind(this),enabled:!0},!0),this.$createCommand(e,t,n),this.isShown()&&this.updatePosition()},e.prototype.isShown=function(){return!!this.tooltip&&this.tooltip.isOpen},e.prototype.isMoreOptionsShown=function(){return!!this.moreOptions&&this.moreOptions.isOpen},e.prototype.getAlwaysShow=function(){return this.$alwaysShow},e.prototype.setAlwaysShow=function(e){this.$alwaysShow=e,this.$updateOnHoverHandlers(!this.$alwaysShow),this._signal("alwaysShow",this.$alwaysShow)},e.prototype.attach=function(e){if(!e||this.isShown()&&this.editor===e)return;this.detach(),this.editor=e,this.editor.on("changeSession",this.$onEditorChangeSession),this.editor.session&&(this.editor.session.on("changeScrollLeft",this.$onChangeScroll),this.editor.session.on("changeScrollTop",this.$onChangeScroll)),this.getAlwaysShow()?this.$showTooltip():this.$updateOnHoverHandlers(!0)},e.prototype.updatePosition=function(){if(!this.editor)return;var e=this.editor.renderer,t;this.editor.selection.getAllRanges?t=this.editor.selection.getAllRanges():t=[this.editor.getSelectionRange()];if(!t.length)return;var n=y(t[0].start,t[0].end);for(var r=0,i;i=t[r];r++)n=y(n,y(i.start,i.end));var s=e.$cursorLayer.getPixelPosition(n,!0),o=this.tooltip.getElement(),u=window.innerWidth,a=window.innerHeight,f=this.editor.container.getBoundingClientRect();s.top+=f.top-e.layerConfig.offset,s.left+=f.left+e.gutterWidth-e.scrollLeft;var l=s.top>=f.top&&s.top<=f.bottom&&s.left>=f.left+e.gutterWidth&&s.left<=f.right;if(!l&&this.isShown()){this.$hideTooltip();return}if(l&&!this.isShown()&&this.getAlwaysShow()){this.$showTooltip();return}var c=s.top-o.offsetHeight,h=Math.min(u-o.offsetWidth,s.left),p=c>=0&&c+o.offsetHeight<=a&&h>=0&&h+o.offsetWidth<=u;if(!p){this.$hideTooltip();return}this.tooltip.setPosition(h,c);if(this.isMoreOptionsShown()){c+=o.offsetHeight,h=this.elements[v].getBoundingClientRect().left;var d=this.moreOptions.getElement(),a=window.innerHeight;c+d.offsetHeight>a&&(c-=o.offsetHeight+d.offsetHeight),h+d.offsetWidth>u&&(h=u-d.offsetWidth),this.moreOptions.setPosition(h,c)}},e.prototype.update=function(){Object.keys(this.elements).forEach(this.$updateElement.bind(this))},e.prototype.detach=function(){this.tooltip.hide(),this.moreOptions.hide(),this.$updateOnHoverHandlers(!1),this.editor&&(this.editor.off("changeSession",this.$onEditorChangeSession),this.editor.session&&(this.editor.session.off("changeScrollLeft",this.$onChangeScroll),this.editor.session.off("changeScrollTop",this.$onChangeScroll))),this.$mouseInTooltip=!1,this.editor=null},e.prototype.destroy=function(){this.tooltip&&this.moreOptions&&(this.detach(),this.tooltip.destroy(),this.moreOptions.destroy()),this.eventListeners={},this.commands={},this.elements={},this.tooltip=this.moreOptions=this.parentNode=null},e.prototype.$createCommand=function(e,t,n){var r=n?this.tooltipEl:this.moreOptionsEl,i=[],s=t.bindKey;s&&(typeof s=="object"&&(s=f.isMac?s.mac:s.win),s=s.split("|")[0],i=s.split("-"),i=i.map(function(e){if(b[e]){if(typeof b[e]=="string")return b[e];if(f.isMac&&b[e].mac)return b[e].mac}return e}));var o;n&&t.iconCssClass?o=["div",{"class":["ace_icon_svg",t.iconCssClass].join(" "),"aria-label":t.name+" ("+t.bindKey+")"}]:(o=[["div",{"class":c}],["div",{"class":h},t.name]],i.length&&o.push(["div",{"class":p},i.map(function(e){return["div",e]})])),u.buildDom(["div",{"class":[l,t.cssClass||""].join(" "),ref:e},o],r,this.elements),this.commands[e]=t;var a=function(n){this.editor&&this.editor.focus(),this.$shouldHideMoreOptions=this.isMoreOptionsShown(),!this.elements[e].disabled&&t.exec&&t.exec(this.editor),this.$shouldHideMoreOptions&&this.$setMoreOptionsVisibility(!1),this.update(),n.preventDefault()}.bind(this);this.eventListeners[e]=a,this.elements[e].addEventListener("click",a.bind(this)),this.$updateElement(e)},e.prototype.$setMoreOptionsVisibility=function(e){e?(this.moreOptions.setTheme(this.editor.renderer.theme),this.moreOptions.setClassName(d+"_wrapper"),this.moreOptions.show(),this.update(),this.updatePosition()):this.moreOptions.hide()},e.prototype.$onEditorChangeSession=function(e){e.oldSession&&(e.oldSession.off("changeScrollTop",this.$onChangeScroll),e.oldSession.off("changeScrollLeft",this.$onChangeScroll)),this.detach()},e.prototype.$onChangeScroll=function(){this.editor.renderer&&(this.isShown()||this.getAlwaysShow())&&this.editor.renderer.once("afterRender",this.updatePosition.bind(this))},e.prototype.$onMouseMove=function(e){if(this.$mouseInTooltip)return;var t=this.editor.getCursorPosition(),n=this.editor.renderer.textToScreenCoordinates(t.row,t.column),r=this.editor.renderer.lineHeight,i=e.clientY>=n.pageY&&e.clientY<n.pageY+r;i?(!this.isShown()&&!this.$showTooltipTimer.isPending()&&this.$showTooltipTimer.delay(),this.$hideTooltipTimer.isPending()&&this.$hideTooltipTimer.cancel()):(this.isShown()&&!this.$hideTooltipTimer.isPending()&&this.$hideTooltipTimer.delay(),this.$showTooltipTimer.isPending()&&this.$showTooltipTimer.cancel())},e.prototype.$preventMouseEvent=function(e){this.editor&&this.editor.focus(),e.preventDefault()},e.prototype.$scheduleTooltipForHide=function(){this.$mouseInTooltip=!1,this.$showTooltipTimer.cancel(),this.$hideTooltipTimer.delay()},e.prototype.$tooltipEnter=function(){this.$mouseInTooltip=!0,this.$showTooltipTimer.isPending()&&this.$showTooltipTimer.cancel(),this.$hideTooltipTimer.isPending()&&this.$hideTooltipTimer.cancel()},e.prototype.$updateOnHoverHandlers=function(e){var t=this.tooltip.getElement(),n=this.moreOptions.getElement();e?(this.editor&&(this.editor.on("mousemove",this.$onMouseMove),this.editor.renderer.getMouseEventTarget().addEventListener("mouseout",this.$scheduleTooltipForHide,!0)),t.addEventListener("mouseenter",this.$tooltipEnter),t.addEventListener("mouseleave",this.$scheduleTooltipForHide),n.addEventListener("mouseenter",this.$tooltipEnter),n.addEventListener("mouseleave",this.$scheduleTooltipForHide)):(this.editor&&(this.editor.off("mousemove",this.$onMouseMove),this.editor.renderer.getMouseEventTarget().removeEventListener("mouseout",this.$scheduleTooltipForHide,!0)),t.removeEventListener("mouseenter",this.$tooltipEnter),t.removeEventListener("mouseleave",this.$scheduleTooltipForHide),n.removeEventListener("mouseenter",this.$tooltipEnter),n.removeEventListener("mouseleave",this.$scheduleTooltipForHide))},e.prototype.$showTooltip=function(){if(this.isShown())return;this.tooltip.setTheme(this.editor.renderer.theme),this.tooltip.setClassName(d+"_wrapper"),this.tooltip.show(),this.update(),this.updatePosition(),this._signal("show")},e.prototype.$hideTooltip=function(){this.$mouseInTooltip=!1;if(!this.isShown())return;this.moreOptions.hide(),this.tooltip.hide(),this._signal("hide")},e.prototype.$updateElement=function(e){var t=this.commands[e];if(!t)return;var n=this.elements[e],r=t.enabled;typeof r=="function"&&(r=r(this.editor));if(typeof t.getValue=="function"){var i=t.getValue(this.editor);if(t.type==="text")n.textContent=i;else if(t.type==="checkbox"){var s=i?u.addCssClass:u.removeCssClass,o=n.parentElement===this.tooltipEl;n.ariaChecked=i,o?s(n,"ace_selected"):(n=n.querySelector("."+c),s(n,"ace_checkmark"))}}r&&n.disabled?(u.removeCssClass(n,"ace_disabled"),n.ariaDisabled=n.disabled=!1,n.removeAttribute("disabled")):!r&&!n.disabled&&(u.addCssClass(n,"ace_disabled"),n.ariaDisabled=n.disabled=!0,n.setAttribute("disabled",""))},e}();a.implement(w.prototype,s),u.importCssString("\n.ace_tooltip.".concat(d,"_wrapper {\n    padding: 0;\n}\n\n.ace_tooltip .").concat(d," {\n    padding: 1px 5px;\n    display: flex;\n    pointer-events: auto;\n}\n\n.ace_tooltip .").concat(d,".tooltip_more_options {\n    padding: 1px;\n    flex-direction: column;\n}\n\ndiv.").concat(l," {\n    display: inline-flex;\n    cursor: pointer;\n    margin: 1px;\n    border-radius: 2px;\n    padding: 2px 5px;\n    align-items: center;\n}\n\ndiv.").concat(l,".ace_selected,\ndiv.").concat(l,":hover:not(.ace_disabled) {\n    background-color: rgba(0, 0, 0, 0.1);\n}\n\ndiv.").concat(l,".ace_disabled {\n    color: #777;\n    pointer-events: none;\n}\n\ndiv.").concat(l," .ace_icon_svg {\n    height: 12px;\n    background-color: #000;\n}\n\ndiv.").concat(l,".ace_disabled .ace_icon_svg {\n    background-color: #777;\n}\n\n.").concat(d,".tooltip_more_options .").concat(l," {\n    display: flex;\n}\n\n.").concat(d,".").concat(c," {\n    display: none;\n}\n\n.").concat(d,".tooltip_more_options .").concat(c," {\n    display: inline-block;\n    width: 12px;\n}\n\n.").concat(h," {\n    display: inline-block;\n}\n\n.").concat(p," {\n    margin: 0 2px;\n    display: inline-block;\n    font-size: 8px;\n}\n\n.").concat(d,".tooltip_more_options .").concat(p," {\n    margin-left: auto;\n}\n\n.").concat(p," div {\n    display: inline-block;\n    min-width: 8px;\n    padding: 2px;\n    margin: 0 1px;\n    border-radius: 2px;\n    background-color: #ccc;\n    text-align: center;\n}\n\n.ace_dark.ace_tooltip .").concat(d," {\n    background-color: #373737;\n    color: #eee;\n}\n\n.ace_dark div.").concat(l,".ace_disabled {\n    color: #979797;\n}\n\n.ace_dark div.").concat(l,".ace_selected,\n.ace_dark div.").concat(l,":hover:not(.ace_disabled) {\n    background-color: rgba(255, 255, 255, 0.1);\n}\n\n.ace_dark div.").concat(l," .ace_icon_svg {\n    background-color: #eee;\n}\n\n.ace_dark div.").concat(l,".ace_disabled .ace_icon_svg {\n    background-color: #979797;\n}\n\n.ace_dark .").concat(l,".ace_disabled {\n    color: #979797;\n}\n\n.ace_dark .").concat(p," div {\n    background-color: #575757;\n}\n\n.ace_checkmark::before {\n    content: '\u2713';\n}\n"),"commandbar.css",!1),t.CommandBarTooltip=w,t.TOOLTIP_CLASS_NAME=d,t.BUTTON_CLASS_NAME=l});                (function() {
                    ace.require(["ace/ext/command_bar"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            