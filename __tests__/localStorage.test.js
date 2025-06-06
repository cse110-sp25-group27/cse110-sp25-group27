/**
 * @jest-environment jsdom
 */
import {jest} from '@jest/globals'
import {
  initFormHandler,
  getReviewsFromStorage, //PASS
  deleteReviewById, //PASS
  addReviewsToDocument, //PASS
  saveReviewsToStorage, //PASS
  createReviewObject, //PASS
  updateReview, //PASS
  processImageForStorage,
} from "../backend/localStorage.js";
beforeAll(() => {
  globalThis.alert = () => {};
});

//-------------------------------------------------------------------
// TEST (initFormHandler)
//-------------------------------------------------------------------
describe("initFormHandler()", () => {
    beforeEach(() => {
        localStorage.clear();
        document.body.innerHTML = '';
    });
    it("initializes idCounter if not already set", () => {
        document.body.innerHTML = '<form id="new-review"></form>';
        
        expect(localStorage.getItem('idCounter')).toBeNull();

        initFormHandler();

        expect(localStorage.getItem('idCounter')).toBe('0');
    });

    it("does not attach submit listener if form is missing", () => {
        console.warn = jest.fn();

        initFormHandler();

        expect(console.warn).toHaveBeenCalledWith(
            expect.stringContaining("#new-review form not found")
        );
    });

    it("prevents duplicate movie reviews", async () => {
        document.body.innerHTML = `
        <form id="new-review">
            <input name="movie-title" value="Minions" />
        </form>
    `   ;

        __seedReviews([
            { id: 0, title: "Minions" }
        ]);

        window.alert = jest.fn();

        initFormHandler();

        const form = document.querySelector("#new-review");
        form.dispatchEvent(new Event("submit", { bubbles: true }));
        
        expect(window.alert).toHaveBeenCalledWith(
            expect.stringContaining("already exists")
        );
    });
});

//-------------------------------------------------------------------
// TEST (createReviewObject)
//-------------------------------------------------------------------
describe("createReviewObject()", () => {
    beforeEach(() => localStorage.clear());

    it("builds the correct review object when no image file is supplied", async () => {
        const fd = new FormData();
        fd.append("movie-title",  "Minions");
        fd.append("watch-date",   "2025-05-30");
        fd.append("watch-count",  "2");
        fd.append("rating",       "5");
        fd.append("release-date", "2025-05-29");
        fd.append("review",       "banana");

        const review = await createReviewObject(fd);

        // Basic shape / values
        expect(review).toMatchObject({
            id:          0,
            title:       "Minions",
            watchedOn:   "2025-05-30",
            watchCount:  2,
            rating:      5,
            imageData:   "",
            notes:       "banana",
            releaseDate: "2025-05-29",
        });

        // createdAt / updatedAt should be ISO strings
        expect(new Date(review.createdAt).toISOString()).toBe(review.createdAt);
        expect(new Date(review.updatedAt).toISOString()).toBe(review.updatedAt);

        // idCounter should have incremented in our stubbed storage
        expect(localStorage.getItem("idCounter")).toBe("1");
    });
});

//-------------------------------------------------------------------
// TEST (updateReview)
//-------------------------------------------------------------------
describe("updateReview()", () => {
    beforeEach(() => localStorage.clear());

    it("should return true and replace the review that has the same id", () => {
        __seedReviews([
            { id: 0, title: "Old", rating: 1 },
            { id: 1, title: "Keep me", rating: 4 }
        ]);

        // Prep an updated object for id = 0
        const updated = { id: 0, title: "New", rating: 5 };

        updateReview(updated);

        const testReviews = JSON.parse(localStorage.getItem("reviews"));

        expect(testReviews).toEqual([
            { id: 0, title: "New", rating: 5 }, // replaced
            { id: 1, title: "Keep me", rating: 4 } // untouched
        ]);
    });

    it("leaves the array unchanged if id is not found", () => {
        __seedReviews([{ id: 0, title: "Only one" }]);
        updateReview({ id: 99, title: "Fake" });

        const testReviews = JSON.parse(localStorage.getItem("reviews"));

        expect(testReviews).toEqual([
            { id: 0, title: "Only one" }
        ]);
    });
});

//-------------------------------------------------------------------
// TEST (getReviewsFromStorage)
//-------------------------------------------------------------------
describe("getReviewsFromStorage()", () => {
    beforeEach(() => localStorage.clear());

    it("returns the stored array when 'reviews' exists", () => {
        __seedReviews([
            { id: 0, title: "Star Wars" },
            { id: 1, title: "Interstellar" }
        ]);

        const result = getReviewsFromStorage();

        expect(result).toEqual([
            { id: 0, title: "Star Wars" },
            { id: 1, title: "Interstellar" }
        ]);
    });

    it("returns an empty array when 'reviews' key is absent", () => {

        const result = getReviewsFromStorage();

        expect(result).toEqual([]); 
        expect(Array.isArray(result)).toBe(true);
    });
});

//-------------------------------------------------------------------
// TEST (saveReviewsToStorage())
//-------------------------------------------------------------------
describe("saveReviewsToStorage()", () => {
    beforeEach(() => localStorage.clear());

    it("writes the exact JSON string to localStorage", () => {
        const input = [
            { id: 10, title: "Minions", rating: 5 },
            { id: 11, title: "Minecraft Movie", rating: 4 }
        ];

        const expectedJSON = JSON.stringify(input);

        saveReviewsToStorage(input);

        expect(localStorage.getItem("reviews")).toBe(expectedJSON);
    });

    it("round-trips correctly via getReviewsFromStorage()", () => {
        const original = [{ id: 12, title: "Power Rangers" }];

        saveReviewsToStorage(original);
        const testReviews = JSON.parse(localStorage.getItem("reviews"));
        expect(testReviews).toEqual(original);
    });

    it("should return false if saving to localStorage fails", () => {
        // Mock localStorage.setItem to throw an error
        jest.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation(() => {
            throw new Error("Storage quota exceeded");
        });

        const result = saveReviewsToStorage([{ id: 1, title: "Test" }]);
        
        // Assert that the function returned false
        expect(result).toBe(false);

        // Restore the original function
        jest.restoreAllMocks();
    });
});


//-------------------------------------------------------------------
// TEST (deleteReviewById())
//-------------------------------------------------------------------
describe("deleteReviewById()", () => {
    beforeEach(() => localStorage.clear());

    it("removes the matching review and updates localStorage", () => {
        __seedReviews([
          { id: 0, title: "First" },
          { id: 1, title: "Delete" },
          { id: 2, title: "Last" }
        ]);
        
        deleteReviewById(1);
        const testReviews = JSON.parse(localStorage.getItem("reviews"));

        expect(testReviews).toEqual([
          { id: 0, title: "First" },
          { id: 2, title: "Last" }
        ]);
        
      });

    it("leaves the array unchanged when id does not exist", () => {

        __seedReviews([{ id: 0, title: "Powell The Movie" }]);
        deleteReviewById(99);
        const testReviews = JSON.parse(localStorage.getItem("reviews"));

        expect(testReviews).toEqual([
            { id: 0, title: "Powell The Movie" }
        ]);
    });

    it("handles an empty 'reviews' list gracefully", () => {
        deleteReviewById(0);
        const testReviews = JSON.parse(localStorage.getItem("reviews"));
        expect(testReviews).toEqual([]);
    });

    it("removes first element in list correctly", () => {
        __seedReviews([
            { id: 0, title: "First" },
            { id: 1, title: "Delete" },
            { id: 2, title: "Last" }
        ]);
        deleteReviewById(0);
        const testReviews = JSON.parse(localStorage.getItem("reviews"));
        expect(testReviews).toEqual([
            { id: 1, title: "Delete" },
            { id: 2, title: "Last" }
        ])
    });
});


//-------------------------------------------------------------------
// TEST (addReviewsToDocument())
//-------------------------------------------------------------------
describe('addReviewsToDocument', () => {
    // Before each test, set up the <main> element in the DOM
    beforeEach(() => {
        document.body.innerHTML = `<main></main>`;
    });

    it("should not add any review cards if the reviews array is empty", () => {
        addReviewsToDocument([]);
        const cards = document.querySelectorAll("review-card");
        expect(cards).toHaveLength(0);
    });

    it("should add a single review card to the document", () => {
        const testReview = [{
            id: "1",
            title: "Test",
            imageData: "",
            releaseDate: "2020-01-01",
            watchedOn: "2021-01-01",
            watchCount: "2",
            notes: "",
            rating: 5
        }];

        addReviewsToDocument(testReview);

        const cards = document.querySelectorAll("review-card");
        expect(cards).toHaveLength(1);
        expect(cards[0].data).toEqual(testReview[0]);
    });

    it("should add multiple review cards to the document", () => {
        const testReviews = [{
            id: "1",
            title: "Test1",
            imageData: "",
            releaseDate: "2020-01-01",
            watchedOn: "2021-01-01",
            watchCount: "2",
            notes: "",
            rating: 5
        }, {
            id: "2",
            title: "Test2",
            imageData: "",
            releaseDate: "2020-02-01",
            watchedOn: "2021-02-01",
            watchCount: "3",
            notes: "",
            rating: 4
        }];
        
        addReviewsToDocument(testReviews);

        const cards = document.querySelectorAll("review-card");
        expect(cards).toHaveLength(2);
        expect(cards[0].data).toEqual(testReviews[0]);
        expect(cards[1].data).toEqual(testReviews[1]);
    });

    it("should throw an error if the 'main' element is not found in the DOM", () => {
        // Overwrite the setup to ensure <main> is missing
        document.body.innerHTML = '';
        
        const testReviews = [{ id: "1", title: "Test" }];

        // Expect the function to throw an error because it can't find <main>
        expect(() => {
            addReviewsToDocument(testReviews);
        }).toThrow();
    });
});

//-------------------------------------------------------------------
// TEST (processImageForStorage)
//-------------------------------------------------------------------
describe("processImageForStorage", () => {
    // Mock the necessary browser APIs before each test
    beforeEach(() => {
        // Mock FileReader
        global.FileReader = jest.fn(() => ({
            readAsDataURL: jest.fn(function() { this.onload({ target: { result: "data:image/png;base64,mock" } }); }),
            onload: jest.fn(),
            onerror: jest.fn(),
        }));

        // Mock Image and canvas
        global.Image = jest.fn(() => ({
            onload: jest.fn(),
            onerror: jest.fn(),
            src: "", // Will be set by the function
        }));

        global.document.createElement = (element) => {
            if (element === 'canvas') {
                return {
                    getContext: () => ({
                        drawImage: jest.fn(),
                    }),
                    toDataURL: () => "data:image/jpeg;base64,processed_mock",
                };
            }
            return {};
        };
    });
    
    it("should process a valid image file and resolve with a base64 string", async () => {
        const mockFile = new File([""], "test.png", { type: "image/png" });
        
        // Trigger the image's onload event manually for the test
        jest.spyOn(global, 'Image').mockImplementation(function() {
            const img = { src: '' };
            // Use setTimeout to simulate async image loading
            setTimeout(() => this.onload(), 0); 
            return img;
        });

        await expect(processImageForStorage(mockFile)).resolves.toBe("data:image/jpeg;base64,processed_mock");
    });

    it("should reject the promise if the FileReader fails", async () => {
        const mockFile = new File([""], "test.png", { type: "image/png" });
        
        // Mock FileReader to simulate an error
        global.FileReader = jest.fn(() => ({
            readAsDataURL: jest.fn(function() { this.onerror(new Error("File read failed")); }),
            onload: jest.fn(),
            onerror: jest.fn(),
        }));

        await expect(processImageForStorage(mockFile)).rejects.toThrow("Failed to read file for processing.");
    });

    it("should reject the promise if the image fails to load", async () => {
        const mockFile = new File([""], "test.png", { type: "image/png" });
        
        // Mock the Image object to simulate an error on load
        jest.spyOn(global, 'Image').mockImplementation(function() {
            const img = { src: '' };
            setTimeout(() => this.onerror(new Error("Image load failed")), 0);
            return img;
        });

        await expect(processImageForStorage(mockFile)).rejects.toThrow("Failed to load image for processing.");
    });
});
