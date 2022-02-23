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
var pptr_testing_library_1 = require("pptr-testing-library");
var puppeteer_config_1 = require("../../config/puppeteer.config");
var BookRepository_1 = __importDefault(require("./BookRepository"));
// let document;
var page;
jest.setTimeout(puppeteer_config_1.PuppeteerConfig.PAGE_TIMEOUT);
describe('Book Repository && Puppeteer', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var repo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, BookRepository_1.default.getInstance()];
                case 1:
                    repo = _a.sent();
                    return [4 /*yield*/, repo.getPage(BookRepository_1.default.BOOK_URL, BookRepository_1.default.GENRE_PAGE)];
                case 2:
                    page = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, BookRepository_1.default.closeBrowser()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Book website is available', function () { return __awaiter(void 0, void 0, void 0, function () {
        var document, category;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, pptr_testing_library_1.getDocument)(page)];
                case 1:
                    document = _a.sent();
                    return [4 /*yield*/, document.$(BookRepository_1.default.GENRE_CATEGORY)];
                case 2:
                    category = _a.sent();
                    expect(category).not.toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    var genreURL;
    test('Page Genres is more than 1', function () { return __awaiter(void 0, void 0, void 0, function () {
        var repo, genres;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, BookRepository_1.default.getInstance()];
                case 1:
                    repo = _a.sent();
                    return [4 /*yield*/, repo.getGenreProps()];
                case 2:
                    genres = _a.sent();
                    genreURL = genres[Math.floor(Math.random() * genres.length - 1)].link;
                    expect(genres.length).toBeGreaterThan(1);
                    return [2 /*return*/];
            }
        });
    }); });
    test('Selected genre page exists and books are available', function () { return __awaiter(void 0, void 0, void 0, function () {
        var repo, document, books;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, BookRepository_1.default.getInstance()];
                case 1:
                    repo = _a.sent();
                    return [4 /*yield*/, repo.getSelectedGenrePage(genreURL)];
                case 2:
                    page = _a.sent();
                    document = (0, pptr_testing_library_1.getDocument)(page);
                    return [4 /*yield*/, document];
                case 3: return [4 /*yield*/, (_a.sent()).$$(BookRepository_1.default.BOOK_CONTAINER)];
                case 4:
                    books = _a.sent();
                    expect(books).not.toBeNull();
                    expect(books.length).toBeGreaterThan(0);
                    return [2 /*return*/];
            }
        });
    }); });
    test('It finds modal', function () { return __awaiter(void 0, void 0, void 0, function () {
        var doc, button;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, pptr_testing_library_1.getDocument)(page)];
                case 1:
                    doc = _a.sent();
                    button = doc.$(BookRepository_1.default.PAGE_MODAL_CLOSE_BUTTON);
                    expect(button).not.toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    test('It finds and closes modal', function () { return __awaiter(void 0, void 0, void 0, function () {
        var repo, hasClosed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, BookRepository_1.default.getInstance()];
                case 1:
                    repo = _a.sent();
                    return [4 /*yield*/, repo.closeSignInModal(page)];
                case 2:
                    hasClosed = _a.sent();
                    expect(hasClosed).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    var randomBookId;
    test("It returns random Book Id with prefix\n     ".concat(BookRepository_1.default.BOOK_RANDOM_ID_PREFIX), function () { return __awaiter(void 0, void 0, void 0, function () {
        var repo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, BookRepository_1.default.getInstance()];
                case 1:
                    repo = _a.sent();
                    return [4 /*yield*/, repo.getRandomBookId(page)];
                case 2:
                    randomBookId = _a.sent();
                    expect(randomBookId).toMatch(BookRepository_1.default.BOOK_RANDOM_ID_PREFIX);
                    return [2 /*return*/];
            }
        });
    }); });
    test("selected randomBookId exists in page", function () { return __awaiter(void 0, void 0, void 0, function () {
        var doc, book;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, pptr_testing_library_1.getDocument)(page)];
                case 1:
                    doc = _a.sent();
                    return [4 /*yield*/, doc.$(randomBookId)];
                case 2:
                    book = _a.sent();
                    expect(book).not.toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Get selected book page and find Amazon button', function () { return __awaiter(void 0, void 0, void 0, function () {
        var repo, doc, amazonButton;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, BookRepository_1.default.getInstance()];
                case 1:
                    repo = _a.sent();
                    return [4 /*yield*/, repo.getSelectedBookPage(randomBookId, page)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, pptr_testing_library_1.getDocument)(page)];
                case 3:
                    doc = _a.sent();
                    return [4 /*yield*/, doc.$(BookRepository_1.default.GOTO_AMAZON)];
                case 4:
                    amazonButton = _a.sent();
                    expect(amazonButton).not.toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    test('naviage to amazon page and find Amazon add to cart', function () { return __awaiter(void 0, void 0, void 0, function () {
        var repo, doc, addToCart;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, BookRepository_1.default.getInstance()];
                case 1:
                    repo = _a.sent();
                    return [4 /*yield*/, repo.gotoAmazon(page)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, pptr_testing_library_1.getDocument)(page)];
                case 3:
                    doc = _a.sent();
                    return [4 /*yield*/, doc.$(BookRepository_1.default.AMAZON_ADD_TO_CART)];
                case 4:
                    addToCart = _a.sent();
                    expect(addToCart).not.toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Add to Amazon cart and find checkout button', function () { return __awaiter(void 0, void 0, void 0, function () {
        var repo, doc, checkoutButton;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, BookRepository_1.default.getInstance()];
                case 1:
                    repo = _a.sent();
                    return [4 /*yield*/, repo.addToCart(page)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, pptr_testing_library_1.getDocument)(page)];
                case 3:
                    doc = _a.sent();
                    return [4 /*yield*/, doc.$(BookRepository_1.default.AMAZON_GOTO_CHECKOUT)];
                case 4:
                    checkoutButton = _a.sent();
                    expect(checkoutButton).not.toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    test('get checkout url returns amazon checkout', function () { return __awaiter(void 0, void 0, void 0, function () {
        var repo, url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, BookRepository_1.default.getInstance()];
                case 1:
                    repo = _a.sent();
                    return [4 /*yield*/, repo.getCheckOutURL(page)];
                case 2:
                    url = _a.sent();
                    expect(url.checkoutURL).toMatch('amazon');
                    return [2 /*return*/];
            }
        });
    }); });
    test('should throw book not found execption upon adding book to cart', function () { return __awaiter(void 0, void 0, void 0, function () {
        var url, repo, page, doc, addToCart;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = 'https://www.goodreads.com/book/show/49127718-anxious-people?from_choice=true';
                    return [4 /*yield*/, BookRepository_1.default.getInstance()];
                case 1:
                    repo = _a.sent();
                    return [4 /*yield*/, BookRepository_1.default.browser.newPage()];
                case 2:
                    page = _a.sent();
                    return [4 /*yield*/, page.goto(url, { waitUntil: 'networkidle2' })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, repo.gotoAmazon(page)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, (0, pptr_testing_library_1.getDocument)(page)];
                case 5:
                    doc = _a.sent();
                    return [4 /*yield*/, doc.$(BookRepository_1.default.AMAZON_ADD_TO_CART)];
                case 6:
                    addToCart = _a.sent();
                    return [4 /*yield*/, expect(repo.addToCart(page))
                            .rejects.toThrow(BookRepository_1.default.BOOK_NOT_FOUND)];
                case 7:
                    _a.sent();
                    expect(addToCart).toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
});
