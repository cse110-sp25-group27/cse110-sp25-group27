
// testing assigments: 
//Prachi: getReviewsFromStorage()
//charlie: deleteReviewById(id), addReviewsToDocument(reviews)

//austin: updateReview(updatedReview), createReviewObject(form)
//skyler : initFormHandler()

//import { localStorage } from '../backend/localStorage.js';
import {
  initFormHandler, //
  getReviewsFromStorage,
  deleteReviewById,
  addReviewsToDocument, //
  saveReviewsToStorage,
  createReviewObject, //
  updateReview, //
} from "../backend/localStorage.js";
beforeAll(() => {
  globalThis.alert = () => {};
});
// testing assigments:
//Prachi: getReviewsFromStorage()
//charlie: deleteReviewById(id), addReviewsToDocument(reviews)

//austin: updateReview(updatedReview), createReviewObject(form)
//skyler : initFormHandler()


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
        // 1. Seed storage with two reviews (helper in unit-testing/testSetup.js)
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
        // Seed with one review (id 0)
        __seedReviews([{ id: 0, title: "Only one" }]);

        // Try to update a non-existing id (99)
        updateReview({ id: 99, title: "Ghost" });

        // Should be identical to original
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