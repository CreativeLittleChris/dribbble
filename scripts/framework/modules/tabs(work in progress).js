/*--------------------------------------------------*\
	#MODAL COMPONENT
	
	This script contains modern tab functionality
	used to not only change tab content but to set
	historical states and support browser navigation.
	
	MK1 @ Version 1.0
\*--------------------------------------------------*/

(function(UIKIT, $, undefined) {
    
    /*  'use strict' enforces correct syntax.  */
    
    'use strict';
    
        
    UIKIT.tabs = (function() {
            
        function Tabs() {

            /*  Variablise 'this' to limit it to avoid scope conflicts  */

            var _this  = this,
                config = UIKIT.settings.tabs;
            
            
            /*--------------------------------------------------*\
            	#TABS CONFIG
            \*--------------------------------------------------*/

            config = {
                tabsClass: 'tabs',
                tabClass: 'tab',
                tabActiveClass: 'tab--active',
                tabContentsClass: 'tab-contents',
                tabContentClass: 'tab-content',
                tabContentActiveClass: 'tab-content--active'
            };
            
            
            /*--------------------------------------------------*\
            	#TABS
            \*--------------------------------------------------*/
            
            var tab = {};
            
            var tabClick = function(e) {
                
                /*  Prevent normal link behaviour  */
                
                e.preventDefault();
                
                tab                = {};
                tab.link           = this.getAttribute('href');
                tab.title          = this.getAttribute('title');
                tab.content        = document.querySelector(tab.link);
                tab.active         = this.parentNode.getElementsByClassName(config.tabActiveClass)[0];
                tab.contentActive  = tab.content.parentNode.getElementsByClassName(config.tabContentActiveClass)[0];
                    
                /*  Find any active tabs & reset  */
                
                tab.active.classList.remove(config.tabActiveClass);
                tab.contentActive.classList.remove(config.tabContentActiveClass);
                
                /*  Add active to clicked tab & related content  */
                
                this.classList.add(config.tabActiveClass);
                tab.content.classList.add(config.tabContentActiveClass);
               
                /*  Set hash to tab id  */
                location.hash = tab.link;
                
            };
            
            window.onpopstate = function() {
                
                /*  Push new page title and updated URL into history  */
                
                var moment = {
                    tab: tab.link,
                    title: document.title + ':' + tab.title,
                    link: location.href
                };
                
                //history.pushState( moment, moment.title, moment.url );
            
                var hash = location.hash;
                    
                document.querySelector('.' + config.tabActiveClass).classList.remove(config.tabActiveClass);
                
                document.querySelector('.' + config.tabContentActiveClass).classList.remove(config.tabContentActiveClass);
                    
                document.querySelector('[href="' + hash + '"]').classList.add(config.tabActiveClass);
                
                document.querySelector(hash).classList.add(config.tabContentActiveClass);
                
            };
            
            /*  Run tabClick on click of tabClass  */
            
            var tab = document.getElementsByClassName(config.tabClass);
            
            for (var i = 0; i < tab.length; i++ ) {
                
                tab[i].addEventListener("click", tabClick);
            
            }



            /*--------------------------------------------------*\
            	#INIT
            \*--------------------------------------------------*/

            /*  Allow "chaining" of methods together  */
            
            _this.init = function() {
                
                /*  'this' refers to UIKIT.modal  */
                
                return this; 
            };
            
            /*  This refers to UIKIT.modal.init()  */

            return _this.init(); /*  initialize the init()  */
        }
        
        
        /*  creating a new object of helper rather than a funtion  */
        
        return new Tabs();
        
    }());
    
    
/*  Lastly this checks if the namespace already exists & if not will assign it  */

}(window.UIKIT = window.UIKIT || {}));


