"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var puppeteer_1 = __importDefault(require("puppeteer"));
var puppeteer_config_1 = require("../../config/puppeteer.config");
var ResponseError_1 = __importDefault(require("../../services/response/ResponseError"));
var BookRepository = /** @class */ (function () {
    function BookRepository() {
    }
    BookRepository.getInstance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (BookRepository.browser) {
                            return [2 /*return*/, this.service];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        BookRepository.service = new BookRepository();
                        _a = BookRepository;
                        return [4 /*yield*/, puppeteer_1.default.launch({
                                headless: true,
                                ignoreHTTPSErrors: true,
                            })];
                    case 2:
                        _a.browser = _b.sent();
                        return [2 /*return*/, BookRepository.service];
                    case 3:
                        error_1 = _b.sent();
                        throw BookRepository.service.processError(error_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BookRepository.prototype.test = function () {
        return BookRepository.AMAZON_ADD_TO_CART;
    };
    BookRepository.resetTimeout = function () {
        BookRepository.PAGE_REQUEST_TIMEOUT = puppeteer_config_1.PuppeteerConfig.PAGE_TIMEOUT;
    };
    BookRepository.increaseTimeoutByRetry = function (retry) {
        BookRepository.PAGE_REQUEST_TIMEOUT = puppeteer_config_1.PuppeteerConfig.PAGE_TIMEOUT * retry;
    };
    BookRepository.closeBrowser = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, BookRepository.browser.close()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BookRepository.prototype.getPage = function (url, waitForselector, lifecycle) {
        return __awaiter(this, void 0, void 0, function () {
            var page, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, BookRepository.browser.newPage()];
                    case 1:
                        page = _a.sent();
                        return [4 /*yield*/, page.setViewport({
                                width: 2000,
                                height: 700,
                                isLandscape: true,
                                deviceScaleFactor: 1,
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, page.goto(url, {
                                waitUntil: lifecycle || 'networkidle2',
                                timeout: BookRepository.PAGE_REQUEST_TIMEOUT,
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, page.waitForSelector(waitForselector)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, page];
                    case 5:
                        error_2 = _a.sent();
                        throw this.processError(error_2);
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    BookRepository.prototype.getGenreProps = function () {
        return __awaiter(this, void 0, void 0, function () {
            var page, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getPage(BookRepository.BOOK_URL, BookRepository.GENRE_PAGE)];
                    case 1:
                        page = _a.sent();
                        return [2 /*return*/, page.$$eval(BookRepository.GENRE_CATEGORY, function (categories, LINK, NAME, IMAGE) {
                                return categories.map(function (category, index) {
                                    var _a, _b, _c;
                                    return ({
                                        link: (_a = category.querySelector(LINK)) === null || _a === void 0 ? void 0 : _a.href,
                                        name: (_c = (_b = category.querySelector(NAME)) === null || _b === void 0 ? void 0 : _b.textContent) === null || _c === void 0 ? void 0 : _c.trim(),
                                        imgURL: category.querySelector(IMAGE).src,
                                        index: index,
                                    });
                                });
                            }, BookRepository.GENRE_LINK, BookRepository.GENRE_NAME, BookRepository.GENRE_IMAGE)];
                    case 2:
                        error_3 = _a.sent();
                        throw this.processError(error_3);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BookRepository.prototype.getCartURL = function (genreURL) {
        return __awaiter(this, void 0, void 0, function () {
            var page, bookId, checkoutURL, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, this.getSelectedGenrePage(genreURL)];
                    case 1:
                        page = _a.sent();
                        return [4 /*yield*/, this.closeSignInModal(page)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.getRandomBookId(page)];
                    case 3:
                        bookId = _a.sent();
                        return [4 /*yield*/, this.getSelectedBookPage(bookId, page)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.gotoAmazon(page)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.addToCart(page)];
                    case 6:
                        _a.sent();
                        checkoutURL = this.getCheckOutURL(page);
                        return [2 /*return*/, checkoutURL];
                    case 7:
                        error_4 = _a.sent();
                        throw this.processError(error_4);
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    BookRepository.prototype.getSelectedGenrePage = function (genreURL) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPage(genreURL, BookRepository.BOOKS_PAGE, 'domcontentloaded')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BookRepository.prototype.closeSignInModal = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            var button, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, page.waitForTimeout(BookRepository.MODAL_TIMEOUT)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, page.$(BookRepository.PAGE_MODAL_CLOSE_BUTTON)];
                    case 2:
                        button = _a.sent();
                        if (!button) return [3 /*break*/, 4];
                        return [4 /*yield*/, button.evaluate(function (node) { return node.click(); })];
                    case 3:
                        _a.sent();
                        // await page.screenshot({path: 'hover2.png'});
                        return [2 /*return*/, true];
                    case 4: 
                    // await page.screenshot({path: 'hover2b.png'});
                    return [2 /*return*/, false];
                    case 5:
                        error_5 = _a.sent();
                        throw this.processError(error_5);
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    BookRepository.prototype.getRandomBookId = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, page.$$eval(BookRepository.BOOK_CONTAINER, function (books, BOOK_RANDOM_ID_PREFIX) {
                            // link: book.querySelector("[data-resource-id]"),
                            var random = Math.floor(Math.random() * books.length);
                            var bookId = books[random].dataset.resourceId;
                            return "[".concat(BOOK_RANDOM_ID_PREFIX, "=\"").concat(bookId, "\"]");
                        }, BookRepository.BOOK_RANDOM_ID_PREFIX)];
                }
                catch (error) {
                    throw this.processError(error);
                }
                return [2 /*return*/];
            });
        });
    };
    BookRepository.prototype.gotoAmazonViaHover = function (randomBookId, page) {
        return __awaiter(this, void 0, void 0, function () {
            var toolTipContainer, amazonClickEvent, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, page.$(randomBookId)];
                    case 1:
                        toolTipContainer = _a.sent();
                        return [4 /*yield*/, page.waitForTimeout(1000)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (toolTipContainer === null || toolTipContainer === void 0 ? void 0 : toolTipContainer.hover())];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, (toolTipContainer === null || toolTipContainer === void 0 ? void 0 : toolTipContainer.waitForSelector('section'))];
                    case 4:
                        _a.sent();
                        amazonClickEvent = toolTipContainer === null || toolTipContainer === void 0 ? void 0 : toolTipContainer.evaluateHandle(function (el) {
                            var amazonLink = el === null || el === void 0 ? void 0 : el.querySelector('a#buyButton');
                            amazonLink.target = '';
                            amazonLink.rel = '';
                            return amazonLink.click();
                        });
                        return [4 /*yield*/, Promise.all([page.waitForNavigation(), amazonClickEvent])];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        error_6 = _a.sent();
                        throw this.processError(error_6);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    BookRepository.prototype.getSelectedBookPage = function (randomBookId, page) {
        return __awaiter(this, void 0, void 0, function () {
            var error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, Promise.all([page.waitForNavigation(), page.click(randomBookId)])];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, page.waitForSelector(BookRepository.GOTO_AMAZON)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_7 = _a.sent();
                        throw this.processError(error_7);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BookRepository.prototype.gotoAmazon = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            var amazonLinkEvent, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        amazonLinkEvent = page.evaluate(function (GOTO_AMAZON) {
                            var amazonLink = document.querySelector(GOTO_AMAZON);
                            amazonLink.target = '';
                            amazonLink.rel = '';
                            return amazonLink.click();
                        }, BookRepository.GOTO_AMAZON);
                        return [4 /*yield*/, Promise.all([page.waitForNavigation(), amazonLinkEvent])];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, page.waitForSelector(BookRepository.AMAZON_ADD_TO_CART)];
                    case 2:
                        _a.sent();
                        // page.screenshot({path: '2 amazon page.png'});
                        return [2 /*return*/, true];
                    case 3:
                        error_8 = _a.sent();
                        throw this.processError(error_8);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BookRepository.prototype.addToCart = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            var cartEvent, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        cartEvent = page.evaluate(function (AMAZON_ADD_TO_CART) {
                            var button = document.querySelector(AMAZON_ADD_TO_CART);
                            return button.click();
                        }, BookRepository.AMAZON_ADD_TO_CART);
                        return [4 /*yield*/, Promise.all([page.waitForNavigation(), cartEvent])];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, page.waitForSelector(BookRepository.AMAZON_GOTO_CHECKOUT)];
                    case 2:
                        _a.sent();
                        // page.screenshot({path: '3 added-to-cart.png'});
                        return [2 /*return*/, true];
                    case 3:
                        error_9 = _a.sent();
                        throw new ResponseError_1.default(BookRepository.BOOK_NOT_FOUND, ResponseError_1.default.NOT_FOUND);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BookRepository.prototype.getCheckOutURL = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            var checkoutEvent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        checkoutEvent = page.evaluate(function (AMAZON_GOTO_CHECKOUT) {
                            var button = document.querySelector(AMAZON_GOTO_CHECKOUT);
                            return button.click();
                        }, BookRepository.AMAZON_GOTO_CHECKOUT);
                        return [4 /*yield*/, Promise.all([page.waitForNavigation(), checkoutEvent])];
                    case 1:
                        _a.sent();
                        // page.screenshot({path: '4 checkout url.png'});
                        return [2 /*return*/, { checkoutURL: page.url() }];
                }
            });
        });
    };
    BookRepository.prototype.processError = function (error) {
        if (error instanceof puppeteer_1.default.errors.TimeoutError) {
            return new ResponseError_1.default(BookRepository.PAGE_TIMEOUT_MESSAGE, ResponseError_1.default.REQUEST_TIMEOUT);
        }
        return new ResponseError_1.default(error.message, ResponseError_1.default.UNPROCESSABLE);
    };
    BookRepository.MODAL_TIMEOUT = 3000;
    BookRepository.PAGE_REQUEST_TIMEOUT = 0;
    BookRepository.BOOK_NOT_FOUND = 'Book not found';
    BookRepository.PAGE_TIMEOUT_MESSAGE = 'Page timeout';
    BookRepository.BOOK_URL = 'https://www.goodreads.com/choiceawards/best-books-2020';
    BookRepository.GENRE_PAGE = 'div.categoryContainer';
    BookRepository.GENRE_CATEGORY = 'div.category';
    BookRepository.GENRE_NAME = '.category__copy';
    BookRepository.GENRE_IMAGE = '.category__winnerImage';
    BookRepository.GENRE_LINK = 'a';
    BookRepository.BOOKS_PAGE = 'div.pollContents';
    BookRepository.BOOK_CONTAINER = 'div.tooltipTrigger';
    BookRepository.PAGE_MODAL_CLOSE_BUTTON = '.modal__close > button.gr-iconButton';
    BookRepository.AMAZON_ADD_TO_CART = 'input#add-to-cart-button';
    BookRepository.AMAZON_GOTO_CHECKOUT = 'input[name="proceedToCheckout"]';
    BookRepository.GOTO_AMAZON = 'a#buyButton';
    BookRepository.BOOK_RANDOM_ID_PREFIX = 'data-resource-id';
    return BookRepository;
}());
exports.default = BookRepository;
