import { getDocument } from 'pptr-testing-library';
import { PuppeteerConfig } from '../../config/puppeteer.config';
import ResponseError from '../../services/response/ResponseError';
import BookRepository from './BookRepository';


// let document;
let page;

jest.setTimeout(PuppeteerConfig.PAGE_TIMEOUT);

describe('Book Repository && Puppeteer', () => {

    beforeAll(async () => {
        page = await repository.getPage(BookRepository.BOOK_URL, BookRepository.GENRE_PAGE);
    });

    afterAll(async () => {
        await BookRepository.closeBrowser();
    })

    test('Book website is available', async () => {
        const document = await getDocument(page)
        const category = await document.$(BookRepository.GENRE_CATEGORY);
        expect(category).not.toBeNull();
    });

    let genreURL;
    test('Page Genres is more than 1', async () => {
        const repo = await BookRepository.getInstance();
        const genres = await repo.getGenreProps();
        genreURL = genres[0].link;
        expect(genres.length).toBeGreaterThan(1);
    })

    test('Selected genre page exists and books are available', async () => {
        const repo = await BookRepository.getInstance();
        page = await repo.getSelectedGenrePage(genreURL);
        const document = getDocument(page);
        const books = await (await document).$$(BookRepository.BOOK_CONTAINER);
        expect(books).not.toBeNull();
        expect(books.length).toBeGreaterThan(0);
    });

    test('It finds modal', async () => {
        const doc = await getDocument(page);
        const button = doc.$(BookRepository.PAGE_MODAL_CLOSE_BUTTON);
        expect(button).not.toBeNull();
    })

    test('It finds and closes modal', async () => {
        const repo = await BookRepository.getInstance();
        const hasClosed = await repo.closeSignInModal(page)
        expect(hasClosed).toBeTruthy();
    });

    let randomBookId;
    test(`It returns random Book Id with prefix
     ${BookRepository.BOOK_RANDOM_ID_PREFIX}`, async () => {
        const repo = await BookRepository.getInstance();
        randomBookId = await repo.getRandomBookId(page);
        expect(randomBookId).toMatch(BookRepository.BOOK_RANDOM_ID_PREFIX);
    });

    test(`randomBookId ${randomBookId} exists in page`, async () => {
        const doc = await getDocument(page);
        const book = await doc.$(randomBookId);
        expect(book).not.toBeNull();
    })

    test('Get selected book page and find Amazon button', async () => {
        const repo = await BookRepository.getInstance();
        await repo.getSelectedBookPage(randomBookId, page);
        const doc = await getDocument(page);
        const amazonButton = await doc.$(BookRepository.GOTO_AMAZON);
        expect(amazonButton).not.toBeNull();
    });

    test('naviage to amazon page and find Amazon add to cart', async() => {
        const repo = await BookRepository.getInstance();
        
        await repo.gotoAmazon(page);
        const doc = await getDocument(page);
        const addToCart = await doc.$(BookRepository.AMAZON_ADD_TO_CART);
        expect(addToCart).not.toBeNull();
    });

    test('Add to Amazon cart and find checkout button', async () => {
        const repo = await BookRepository.getInstance();
        await repo.addToCart(page);
        const doc = await getDocument(page);
        const checkoutButton = await doc.$(BookRepository.AMAZON_GOTO_CHECKOUT);
        expect(checkoutButton).not.toBeNull();
    })    
    
    test('get checkout url returns amazon checkout', async () => {
        const repo = await BookRepository.getInstance();
        const url = await repo.getCheckOutURL(page);
        expect(url.chkoutURL).toMatch('amazon');
    })

    test('should throw book not found execption upon adding book to cart', async () => {
        const url = 'https://www.goodreads.com/book/show/49127718-anxious-people?from_choice=true';
        const repo = await BookRepository.getInstance();
        const page = await BookRepository.browser.newPage();
        await page.goto(url, {waitUntil: "networkidle2"});
        await repo.gotoAmazon(page);

        const doc = await getDocument(page);
        const addToCart = await doc.$(BookRepository.AMAZON_ADD_TO_CART);
        await expect(repo.addToCart(page)).rejects.toThrow(BookRepository.BOOK_NOT_FOUND);
        expect(addToCart).toBeNull();
    });

    test(`should throw ${ResponseError.REQUEST_TIMEOUT}`)
})