
import {
  initFormHandler,
  getReviewsFromStorage, //PASS
  deleteReviewById, //PASS
  addReviewsToDocument,
  saveReviewsToStorage, //PASS
  createReviewObject, //PASS
  updateReview, //PASS
} from "../backend/localStorage.js";
beforeAll(() => {
  globalThis.alert = () => {};
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

    it("replaces the review that has the same id", () => {
        //Seed storage with two reviews (helper in unit-testing/testSetup.js)
        __seedReviews([
            { id: 0, title: "Old", rating: 1 },
            { id: 1, title: "Keep me", rating: 4 }
        ]);

        // Prep an updated object for id = 0
        const updated = { id: 0, title: "New", rating: 5 };

        updateReview(updated);

        const stored = getReviewsFromStorage();

        expect(stored).toEqual([
            { id: 0, title: "New", rating: 5 }, // replaced
            { id: 1, title: "Keep me", rating: 4 } // untouched
        ]);
    });

    it("leaves the array unchanged if id is not found", () => {
        __seedReviews([{ id: 0, title: "Only one" }]);
        updateReview({ id: 99, title: "Fake" });
        expect(getReviewsFromStorage()).toEqual([
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
        const roundTrip = getReviewsFromStorage();
        expect(roundTrip).toEqual(original);
    });
});


//-------------------------------------------------------------------
// TEST (deleteReviewById())
//-------------------------------------------------------------------
describe("deleteReviewById()", () => {
    beforeEach(() => localStorage.clear());

    it("removes the matching review and keeps the rest", () => {
        __seedReviews([
            { id: 0, title: "First" },
            { id: 1, title: "Delete" },
            { id: 2, title: "Last" }
        ]);

        deleteReviewById(1);

        expect(getReviewsFromStorage()).toEqual([
            { id: 0, title: "First" },
            { id: 2, title: "Last" }
        ]);
    });

    it("leaves the array unchanged when id does not exist", () => {

        __seedReviews([{ id: 0, title: "Powell The Movie" }]);
        deleteReviewById(99);

        expect(getReviewsFromStorage()).toEqual([
            { id: 0, title: "Powell The Movie" }
        ]);
    });

    it("handles an empty 'reviews' list gracefully", () => {
        deleteReviewById(0);
        expect(getReviewsFromStorage()).toEqual([]);
    });
});
