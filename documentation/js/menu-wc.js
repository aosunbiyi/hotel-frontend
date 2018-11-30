'use strict';



var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

customElements.define('compodoc-menu', function (_HTMLElement) {
    _inherits(_class, _HTMLElement);

    function _class() {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

        _this.isNormalMode = _this.getAttribute('mode') === 'normal';
        return _this;
    }

    _createClass(_class, [{
        key: 'connectedCallback',
        value: function connectedCallback() {
            this.render(this.isNormalMode);
        }
    }, {
        key: 'render',
        value: function render(isNormalMode) {
            let tp = lithtml.html(
'<nav>\n    <ul class="list">\n        <li class="title">\n            \n                <a href="index.html" data-type="index-link">hotel-app documentation</a>\n            \n        </li>\n\n        <li class="divider"></li>\n        ' + (isNormalMode ? '<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>' : '') + '\n        <li class="chapter">\n            <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>\n            <ul class="links">\n                \n                    <li class="link">\n                        <a href="overview.html" data-type="chapter-link">\n                            <span class="icon ion-ios-keypad"></span>Overview\n                        </a>\n                    </li>\n                    <li class="link">\n                        <a href="index.html" data-type="chapter-link">\n                            <span class="icon ion-ios-paper"></span>README\n                        </a>\n                    </li>\n                \n                \n                \n                    <li class="link">\n                        <a href="dependencies.html"\n                            data-type="chapter-link">\n                            <span class="icon ion-ios-list"></span>Dependencies\n                        </a>\n                    </li>\n                \n            </ul>\n        </li>\n        \n        \n        <li class="chapter modules">\n            <a data-type="chapter-link" href="modules.html">\n                <div class="menu-toggler linked" data-toggle="collapse"\n                    ' + (isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"') + '>\n                    <span class="icon ion-ios-archive"></span>\n                    <span class="link-name">Modules</span>\n                    <span class="icon ion-ios-arrow-down"></span>\n                </div>\n            </a>\n            <ul class="links collapse"\n            ' + (isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"') + '>\n                \n                    <li class="link">\n                        <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>\n                        \n                            <li class="chapter inner">\n                                <div class="simple menu-toggler" data-toggle="collapse"\n                                    ' + (isNormalMode ? 'data-target="#components-links-module-AppModule-fda572f7e842e231a525d0cd77e84fc3"' : 'data-target="#xs-components-links-module-AppModule-fda572f7e842e231a525d0cd77e84fc3"') + '>\n                                    <span class="icon ion-md-cog"></span>\n                                    <span>Components</span>\n                                    <span class="icon ion-ios-arrow-down"></span>\n                                </div>\n                                <ul class="links collapse"\n                                    ' + (isNormalMode ? 'id="components-links-module-AppModule-fda572f7e842e231a525d0cd77e84fc3"' : 'id="xs-components-links-module-AppModule-fda572f7e842e231a525d0cd77e84fc3"') + '>\n                                    \n                                        <li class="link">\n                                            <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>\n                                        </li>\n                                    \n                                        <li class="link">\n                                            <a href="components/GuestProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">GuestProfileComponent</a>\n                                        </li>\n                                    \n                                        <li class="link">\n                                            <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>\n                                        </li>\n                                    \n                                        <li class="link">\n                                            <a href="components/HotelWalkinComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HotelWalkinComponent</a>\n                                        </li>\n                                    \n                                        <li class="link">\n                                            <a href="components/MainDashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainDashboardComponent</a>\n                                        </li>\n                                    \n                                        <li class="link">\n                                            <a href="components/TickerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TickerComponent</a>\n                                        </li>\n                                    \n                                </ul>\n                            </li>\n                        \n                        \n                        \n                        \n                            <li class="chapter inner">\n                                <div class="simple menu-toggler" data-toggle="collapse"\n                                    ' + (isNormalMode ? 'data-target="#injectables-links-module-AppModule-fda572f7e842e231a525d0cd77e84fc3"' : 'data-target="#xs-injectables-links-module-AppModule-fda572f7e842e231a525d0cd77e84fc3"') + '>\n                                    <span class="icon ion-md-arrow-round-down"></span>\n                                    <span>Injectables</span>\n                                    <span class="icon ion-ios-arrow-down"></span>\n                                </div>\n                                <ul class="links collapse"\n                                    ' + (isNormalMode ? 'id="injectables-links-module-AppModule-fda572f7e842e231a525d0cd77e84fc3"' : 'id="xs-injectables-links-module-AppModule-fda572f7e842e231a525d0cd77e84fc3"') + '>\n                                    \n                                        <li class="link">\n                                            <a href="injectables/AccountsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>AccountsService</a>\n                                        </li>\n                                    \n                                        <li class="link">\n                                            <a href="injectables/FloorService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>FloorService</a>\n                                        </li>\n                                    \n                                        <li class="link">\n                                            <a href="injectables/OutoforderService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>OutoforderService</a>\n                                        </li>\n                                    \n                                        <li class="link">\n                                            <a href="injectables/RoomtypeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>RoomtypeService</a>\n                                        </li>\n                                    \n                                        <li class="link">\n                                            <a href="injectables/WingService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>WingService</a>\n                                        </li>\n                                    \n                                </ul>\n                            </li>\n                        \n                        \n                    </li>\n                \n                    <li class="link">\n                        <a href="modules/BackendModule.html" data-type="entity-link">BackendModule</a>\n                        \n                        \n                        \n                        \n                            <li class="chapter inner">\n                                <div class="simple menu-toggler" data-toggle="collapse"\n                                    ' + (isNormalMode ? 'data-target="#injectables-links-module-BackendModule-89fea943a7263e783c566430d1e5abd0"' : 'data-target="#xs-injectables-links-module-BackendModule-89fea943a7263e783c566430d1e5abd0"') + '>\n                                    <span class="icon ion-md-arrow-round-down"></span>\n                                    <span>Injectables</span>\n                                    <span class="icon ion-ios-arrow-down"></span>\n                                </div>\n                                <ul class="links collapse"\n                                    ' + (isNormalMode ? 'id="injectables-links-module-BackendModule-89fea943a7263e783c566430d1e5abd0"' : 'id="xs-injectables-links-module-BackendModule-89fea943a7263e783c566430d1e5abd0"') + '>\n                                    \n                                        <li class="link">\n                                            <a href="injectables/DataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>DataService</a>\n                                        </li>\n                                    \n                                </ul>\n                            </li>\n                        \n                        \n                    </li>\n                \n                    <li class="link">\n                        <a href="modules/DashboardModule.html" data-type="entity-link">DashboardModule</a>\n                        \n                            <li class="chapter inner">\n                                <div class="simple menu-toggler" data-toggle="collapse"\n                                    ' + (isNormalMode ? 'data-target="#components-links-module-DashboardModule-2d1b887ef075b0327edeb3b989f67707"' : 'data-target="#xs-components-links-module-DashboardModule-2d1b887ef075b0327edeb3b989f67707"') + '>\n                                    <span class="icon ion-md-cog"></span>\n                                    <span>Components</span>\n                                    <span class="icon ion-ios-arrow-down"></span>\n                                </div>\n                                <ul class="links collapse"\n                                    ' + (isNormalMode ? 'id="components-links-module-DashboardModule-2d1b887ef075b0327edeb3b989f67707"' : 'id="xs-components-links-module-DashboardModule-2d1b887ef075b0327edeb3b989f67707"') + '>\n                                    \n                                        <li class="link">\n                                            <a href="components/BodyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">BodyComponent</a>\n                                        </li>\n                                    \n                                        <li class="link">\n                                            <a href="components/BookStatusComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">BookStatusComponent</a>\n                                        </li>\n                                    \n                                        <li class="link">\n                                            <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashboardComponent</a>\n                                        </li>\n                                    \n                                        <li class="link">\n                                            <a href="components/DateBarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DateBarComponent</a>\n                                        </li>\n                                    \n                                        <li class="link">\n                                            <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>\n                                        </li>\n                                    \n                                        <li class="link">\n                                            <a href="components/RoomStatusComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">RoomStatusComponent</a>\n                                        </li>\n                                    \n                                        <li class="link">\n                                            <a href="components/SchedularComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SchedularComponent</a>\n                                        </li>\n                                    \n                                        <li class="link">\n                                            <a href="components/SummaryBarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SummaryBarComponent</a>\n                                        </li>\n                                    \n                                </ul>\n                            </li>\n                        \n                        \n                        \n                            <li class="chapter inner">\n                                <div class="simple menu-toggler" data-toggle="collapse"\n                                    ' + (isNormalMode ? 'data-target="#directives-links-module-DashboardModule-2d1b887ef075b0327edeb3b989f67707"' : 'data-target="#xs-directives-links-module-DashboardModule-2d1b887ef075b0327edeb3b989f67707"') + '>\n                                    <span class="icon ion-md-code-working"></span>\n                                    <span>Directives</span>\n                                    <span class="icon ion-ios-arrow-down"></span>\n                                </div>\n                                <ul class="links collapse"\n                                    ' + (isNormalMode ? 'id="directives-links-module-DashboardModule-2d1b887ef075b0327edeb3b989f67707"' : 'id="xs-directives-links-module-DashboardModule-2d1b887ef075b0327edeb3b989f67707"') + '>\n                                    \n                                        <li class="link">\n                                            <a href="directives/CardHoverDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CardHoverDirective</a>\n                                        </li>\n                                    \n                                </ul>\n                            </li>\n                        \n                        \n                        \n                    </li>\n                \n                    <li class="link">\n                        <a href="modules/FrontOfficeModule.html" data-type="entity-link">FrontOfficeModule</a>\n                        \n                            <li class="chapter inner">\n                                <div class="simple menu-toggler" data-toggle="collapse"\n                                    ' + (isNormalMode ? 'data-target="#components-links-module-FrontOfficeModule-894a0bc4fa4833669ba9cf7ec3df42e8"' : 'data-target="#xs-components-links-module-FrontOfficeModule-894a0bc4fa4833669ba9cf7ec3df42e8"') + '>\n                                    <span class="icon ion-md-cog"></span>\n                                    <span>Components</span>\n                                    <span class="icon ion-ios-arrow-down"></span>\n                                </div>\n                                <ul class="links collapse"\n                                    ' + (isNormalMode ? 'id="components-links-module-FrontOfficeModule-894a0bc4fa4833669ba9cf7ec3df42e8"' : 'id="xs-components-links-module-FrontOfficeModule-894a0bc4fa4833669ba9cf7ec3df42e8"') + '>\n                                    \n                                        <li class="link">\n                                            <a href="components/ArrivalListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ArrivalListComponent</a>\n                                        </li>\n                                    \n                                        <li class="link">\n                                            <a href="components/BookingListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">BookingListComponent</a>\n                                        </li>\n                                    \n                                        <li class="link">\n                                            <a href="components/CheckinComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CheckinComponent</a>\n                                        </li>\n                                    \n                                        <li class="link">\n                                            <a href="components/DepartureListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DepartureListComponent</a>\n                                        </li>\n                                    \n                                        <li class="link">\n                                            <a href="components/GuestDataBaseComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">GuestDataBaseComponent</a>\n                                        </li>\n                                    \n                                        <li class="link">\n                                            <a href="components/GuestLedgerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">GuestLedgerComponent</a>\n                                        </li>\n                                    \n                                        <li class="link">\n                                            <a href="components/GuestMessageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">GuestMessageComponent</a>\n                                        </li>\n                                    \n                                        <li class="link">\n                                            <a href="components/NewBookingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">NewBookingComponent</a>\n                                        </li>\n                                    \n                                        <li class="link">\n                                            <a href="components/OutOfOrderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">OutOfOrderComponent</a>\n                                        </li>\n                                    \n                                        <li class="link">\n                                            <a href="components/ReservationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ReservationComponent</a>\n                                        </li>\n                                    \n                                        <li class="link">\n                                            <a href="components/ReservationListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ReservationListComponent</a>\n                                        </li>\n                                    \n                                        <li class="link">\n                                            <a href="components/WalkinComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">WalkinComponent</a>\n                                        </li>\n                                    \n                                </ul>\n                            </li>\n                        \n                        \n                        \n                        \n                        \n                            <li class="chapter inner">\n                                <div class="simple menu-toggler" data-toggle="collapse"\n                                    ' + (isNormalMode ? 'data-target="#pipes-links-module-FrontOfficeModule-894a0bc4fa4833669ba9cf7ec3df42e8"' : 'data-target="#xs-pipes-links-module-FrontOfficeModule-894a0bc4fa4833669ba9cf7ec3df42e8"') + '>\n                                    <span class="icon ion-md-add"></span>\n                                    <span>Pipes</span>\n                                    <span class="icon ion-ios-arrow-down"></span>\n                                </div>\n                                <ul class="links collapse"\n                                    ' + (isNormalMode ? 'id="pipes-links-module-FrontOfficeModule-894a0bc4fa4833669ba9cf7ec3df42e8"' : 'id="xs-pipes-links-module-FrontOfficeModule-894a0bc4fa4833669ba9cf7ec3df42e8"') + '>\n                                    \n                                        <li class="link">\n                                            <a href="pipes/Filter200Pipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">Filter200Pipe</a>\n                                        </li>\n                                    \n                                </ul>\n                            </li>\n                        \n                    </li>\n                \n                    <li class="link">\n                        <a href="modules/FrontOfficeRoutingModule.html" data-type="entity-link">FrontOfficeRoutingModule</a>\n                        \n                        \n                        \n                        \n                        \n                    </li>\n                \n                    <li class="link">\n                        <a href="modules/RoomManagerModule.html" data-type="entity-link">RoomManagerModule</a>\n                        \n                            <li class="chapter inner">\n                                <div class="simple menu-toggler" data-toggle="collapse"\n                                    ' + (isNormalMode ? 'data-target="#components-links-module-RoomManagerModule-342e050825bf40af5f135c381846f137"' : 'data-target="#xs-components-links-module-RoomManagerModule-342e050825bf40af5f135c381846f137"') + '>\n                                    <span class="icon ion-md-cog"></span>\n                                    <span>Components</span>\n                                    <span class="icon ion-ios-arrow-down"></span>\n                                </div>\n                                <ul class="links collapse"\n                                    ' + (isNormalMode ? 'id="components-links-module-RoomManagerModule-342e050825bf40af5f135c381846f137"' : 'id="xs-components-links-module-RoomManagerModule-342e050825bf40af5f135c381846f137"') + '>\n                                    \n                                        <li class="link">\n                                            <a href="components/RoomLookUpComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">RoomLookUpComponent</a>\n                                        </li>\n                                    \n                                </ul>\n                            </li>\n                        \n                        \n                        \n                        \n                        \n                    </li>\n                \n            </ul>\n        </li>\n        \n        \n            \n        \n        \n        \n            \n        \n        \n        <li class="chapter">\n            <div class="simple menu-toggler" data-toggle="collapse"\n            ' + (isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"') + '>\n                <span class="icon ion-ios-paper"></span>\n                <span>Classes</span>\n                <span class="icon ion-ios-arrow-down"></span>\n            </div>\n            <ul class="links collapse"\n            ' + (isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"') + '>\n                \n                    <li class="link">\n                        <a href="classes/FieldTypeFilter.html" data-type="entity-link">FieldTypeFilter</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="classes/GuestFilter.html" data-type="entity-link">GuestFilter</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="classes/SearchParameter.html" data-type="entity-link">SearchParameter</a>\n                    </li>\n                \n            </ul>\n        </li>\n        \n        \n            \n                <li class="chapter">\n                    <div class="simple menu-toggler" data-toggle="collapse"\n                        ' + (isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"') + '>\n                        <span class="icon ion-md-arrow-round-down"></span>\n                        <span>Injectables</span>\n                        <span class="icon ion-ios-arrow-down"></span>\n                    </div>\n                    <ul class="links collapse"\n                    ' + (isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"') + '>\n                        \n                            <li class="link">\n                                <a href="injectables/AccountsService.html" data-type="entity-link">AccountsService</a>\n                            </li>\n                        \n                            <li class="link">\n                                <a href="injectables/AccountTypeService.html" data-type="entity-link">AccountTypeService</a>\n                            </li>\n                        \n                            <li class="link">\n                                <a href="injectables/BusinessSourceService.html" data-type="entity-link">BusinessSourceService</a>\n                            </li>\n                        \n                            <li class="link">\n                                <a href="injectables/BusinessSourceTypesService.html" data-type="entity-link">BusinessSourceTypesService</a>\n                            </li>\n                        \n                            <li class="link">\n                                <a href="injectables/DataService.html" data-type="entity-link">DataService</a>\n                            </li>\n                        \n                            <li class="link">\n                                <a href="injectables/DiscountService.html" data-type="entity-link">DiscountService</a>\n                            </li>\n                        \n                            <li class="link">\n                                <a href="injectables/FloorService.html" data-type="entity-link">FloorService</a>\n                            </li>\n                        \n                            <li class="link">\n                                <a href="injectables/HotelRepresentativeService.html" data-type="entity-link">HotelRepresentativeService</a>\n                            </li>\n                        \n                            <li class="link">\n                                <a href="injectables/OutoforderService.html" data-type="entity-link">OutoforderService</a>\n                            </li>\n                        \n                            <li class="link">\n                                <a href="injectables/PaymentMethodService.html" data-type="entity-link">PaymentMethodService</a>\n                            </li>\n                        \n                            <li class="link">\n                                <a href="injectables/ReservationsService.html" data-type="entity-link">ReservationsService</a>\n                            </li>\n                        \n                            <li class="link">\n                                <a href="injectables/RoomsService.html" data-type="entity-link">RoomsService</a>\n                            </li>\n                        \n                            <li class="link">\n                                <a href="injectables/RoomtypeService.html" data-type="entity-link">RoomtypeService</a>\n                            </li>\n                        \n                            <li class="link">\n                                <a href="injectables/WingService.html" data-type="entity-link">WingService</a>\n                            </li>\n                        \n                            <li class="link">\n                                <a href="injectables/WingsService.html" data-type="entity-link">WingsService</a>\n                            </li>\n                        \n                    </ul>\n                </li>\n            \n        \n        \n        <li class="chapter">\n            <div class="simple menu-toggler" data-toggle="collapse"\n            ' + (isNormalMode ? 'data-target="#interceptors-links"' : 'data-target="#xs-interceptors-links"') + '>\n                <span class="icon ion-ios-swap"></span>\n                <span>Interceptors</span>\n                <span class="icon ion-ios-arrow-down"></span>\n            </div>\n            <ul class="links collapse"\n            ' + (isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"') + '>\n                \n                    <li class="link">\n                        <a href="interceptors/AuthInterceptor.html" data-type="entity-link">AuthInterceptor</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="interceptors/HeaderInterceptor.html" data-type="entity-link">HeaderInterceptor</a>\n                    </li>\n                \n            </ul>\n        </li>\n        \n        \n        \n        <li class="chapter">\n            <div class="simple menu-toggler" data-toggle="collapse"\n                ' + (isNormalMode ? 'data-target="#interfaces-links"' : 'data-target="#xs-interfaces-links"') + '>\n                <span class="icon ion-md-information-circle-outline"></span>\n                <span>Interfaces</span>\n                <span class="icon ion-ios-arrow-down"></span>\n            </div>\n            <ul class="links collapse"\n            ' + (isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"') + '>\n                \n                    <li class="link">\n                        <a href="interfaces/Guest.html" data-type="entity-link">Guest</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="interfaces/ReservationData.html" data-type="entity-link">ReservationData</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="interfaces/Ticker.html" data-type="entity-link">Ticker</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="interfaces/Walkin.html" data-type="entity-link">Walkin</a>\n                    </li>\n                \n                    <li class="link">\n                        <a href="interfaces/Walkin-1.html" data-type="entity-link">Walkin</a>\n                    </li>\n                \n            </ul>\n        </li>\n        \n        \n            \n        \n        \n        <li class="chapter">\n            <div class="simple menu-toggler" data-toggle="collapse"\n            ' + (isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"') + '>\n                <span class="icon ion-ios-cube"></span>\n                <span>Miscellaneous</span>\n                <span class="icon ion-ios-arrow-down"></span>\n            </div>\n            <ul class="links collapse"\n            ' + (isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"') + '>\n                \n                \n                \n                \n                    <li class="link">\n                      <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>\n                    </li>\n                \n            </ul>\n        </li>\n        \n        \n            \n        \n        \n        <li class="chapter">\n            <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>\n        </li>\n        \n        \n        \n        <li class="divider"></li>\n        <li class="copyright">\n                Documentation generated using <a href="https://compodoc.app/" target="_blank">\n                    \n                        \n                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">\n                        \n                    \n                </a>\n        </li>\n        \n    </ul>\n</nav>'
);
        this.innerHTML = tp.strings;
        }
    }]);

    return _class;
}(HTMLElement));