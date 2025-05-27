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

//I wrote my unit test for my functions, but I can't get the exports to work, so npm run test will just give errors atm
describe("localStorage helpers", () => {
  //-------------------------------------------------------------------
  // TEST (createReviewObject)
  //-------------------------------------------------------------------
  test("createReviewObject returns a fully populated object", () => {
    // Mock idCounter in localStorage
    localStorage.setItem("idCounter", "0");

    const fd = new FormData();
    fd.append("title", "Inception");
    fd.append("watchedOn", "2025-05-18");
    fd.append("rating", "5");
    fd.append(
      "imageData",
      "https://cdn.displate.com/artwork/270x380/2024-06-26/b3c00a5001f88b1d84655efd1b4b8590_f560fcf2e65fd265ddaa78cae2510e25.jpg"
    );
    fd.append("notes", "A movie of all time");

    const obj = createReviewObject(fd);

    expect(obj).toEqual(
      expect.objectContaining({
        id: 0,
        title: "Inception",
        watchedOn: "2025-05-18",
        rating: 5,
        imageData:
          "https://cdn.displate.com/artwork/270x380/2024-06-26/b3c00a5001f88b1d84655efd1b4b8590_f560fcf2e65fd265ddaa78cae2510e25.jpg",
        notes: "A movie of all time",
      })
    );

    expect(() => new Date(obj.createdAt)).not.toThrow();
    expect(() => new Date(obj.updatedAt)).not.toThrow();

    const created = new Date(obj.createdAt).getTime();
    const updated = new Date(obj.updatedAt).getTime();
    expect(Math.abs(updated - created)).toBeLessThan(100);
  });

  //-------------------------------------------------------------------
  // TEST (updateReview)
  //-------------------------------------------------------------------

  test("updateReview correctly replaces an existing review in localStorage", () => {
    const seed = [
      {
        id: "a",
        title: "MovieA",
        watchedOn: "2025-01-01",
        rating: 3,
        imageData: "",
        notes: "",
        createdAt: "2025-01-01T00:00:00.000Z",
        updatedAt: "2025-01-01T00:00:00.000Z",
      },
      {
        id: "b",
        title: "MovieB",
        watchedOn: "2025-02-02",
        rating: 4,
        imageData: "",
        notes: "",
        createdAt: "2025-02-02T00:00:00.000Z",
        updatedAt: "2025-02-02T00:00:00.000Z",
      },
    ];
    localStorage.setItem("reviews", JSON.stringify(seed));

    const updated = {
      ...seed[1],
      rating: 1,
      notes: "Movie B was horrible",
      updatedAt: "2025-05-18T12:00:00.000Z",
    };

    updateReview(updated);

    const stored = getReviewsFromStorage();
    // make sure only has the two items I added
    expect(stored).toHaveLength(2);

    //check to see movie B has new rating and updated notes
    const bRecord = stored.find((r) => r.id === "b");
    expect(bRecord.rating).toBe(1);
    expect(bRecord.notes).toBe("Movie B was horrible");

    //double check and make sure movie A wasn't altered in any way
    const aRecord = stored.find((r) => r.id === "a");
    expect(aRecord.rating).toBe(3);
  });
});

describe("initFormHandler", () => {
  //-------------------------------------------------------------------
  // TEST (initFormHandler)
  //-------------------------------------------------------------------

  beforeEach(() => {
    // Set up HTML structure
    document.body.innerHTML = `
        <form>
            <input name="title" value="Test Movie" />
            <input name="watchedOn" value="2024-01-01" />
            <input name="rating" value="5" />
            <input name="imageData" value="test.jpg" />
            <textarea name="notes">Great!</textarea>
            <button type="submit">Add</button>
        </form>
        <main></main>
        <button class="danger">Clear</button>

        <input id="delete-title-input" />
        <button id="delete-button">Delete</button>

        <input id="edit-title-input" />
        <button id="edit-button">Edit</button>

        <form id="update-form" style="display: block;">
            <input name="title" />
            <input name="watchedOn" />
            <input name="rating" />
            <input name="imageData" />
            <textarea name="notes"></textarea>
            <button type="submit">Update</button>
        </form>
        `;
    localStorage.clear();
    initFormHandler();
  });

  test("adds a review to localStorage and DOM on form submit", () => {
    const form = document.querySelector("form");
    form.dispatchEvent(new Event("submit"));

    const reviews = getReviewsFromStorage();
    expect(reviews.length).toBe(1);
    expect(document.querySelectorAll("review-card").length).toBe(1);
    expect(reviews[0].title).toBe("Test Movie");
  });

  test("clears reviews from localStorage and DOM on clear button click", () => {
    // Add a review first
    document.querySelector("form").dispatchEvent(new Event("submit"));
    document.querySelector("button.danger").click();

    expect(getReviewsFromStorage().length).toBe(0);
    expect(document.querySelector("main").innerHTML).toBe("");
  });

  test("deletes a review by title", () => {
    // Add a review
    document.querySelector("form").dispatchEvent(new Event("submit"));
    document.getElementById("delete-title-input").value = "Test Movie";
    document.getElementById("delete-button").click();

    expect(getReviewsFromStorage().length).toBe(0);
    expect(document.querySelectorAll("review-card").length).toBe(0);
  });

  test("prefills edit form with existing review data", () => {
    // Add a review
    document.querySelector("form").dispatchEvent(new Event("submit"));

    document.getElementById("edit-title-input").value = "Test Movie";
    document.getElementById("edit-button").click();

    const updateForm = document.getElementById("update-form");
    expect(updateForm.elements["title"].value).toBe("Test Movie");
    expect(updateForm.elements["notes"].value).toBe("Great!");
  });

  test("updates an existing review correctly", () => {
    // Add a review
    document.querySelector("form").dispatchEvent(new Event("submit"));

    const review = getReviewsFromStorage()[0];
    const updateForm = document.getElementById("update-form");
    updateForm.dataset.reviewId = review.id;
    updateForm.dataset.createdAt = review.createdAt;

    updateForm.elements["title"].value = "Updated Movie";
    updateForm.dispatchEvent(new Event("submit"));

    const updated = getReviewsFromStorage()[0];
    expect(updated.title).toBe("Updated Movie");
  });
});

//Minnie: addReviewsToDocument test
test("addReviewsToDocument correctly creates review-card elements in DOM", () =>{
  const dummyReview = [
    {
      title: "Mock Movie",
      watchedOn: "2024-01-01",
      rating: 1,
      imageData: "https://www.mooreseal.com/wp-content/uploads/2013/11/dummy-image-square.jpg",
      notes: "Nice movie",
    },
  ];

  document.body.innerHTML = `<main></main>`;
  addReviewsToDocument(dummyReview);

  const cards = document.querySelectorAll("review-card");
  
  expect(cards.length).toBe(1);
  expect(cards[0].data).toEqual(dummyReview[0]);
});

//Srujam: deleteReviewById test
test("deleteReviewById correctly deletes review from localStorage", () => {
  const testReviews = [
    {
      id: "delByIdTest1",
      title: "delByIdTest1",
      watchedOn: "05/27/2025",
      rating: 5,
      imageData: "",
      notes: "",
      createdAt: "2025-01-01T00:00:00.000Z",
      updatedAt: "2025-01-01T00:00:00.000Z",
    },
    {
      id: "delByIdTest2",
      title: "delByIdTest2",
      watchedOn: "05/22/2025",
      rating: 4,
      imageData: "",
      notes: "",
      createdAt: "2025-01-01T00:00:00.000Z",
      updatedAt: "2025-01-01T00:00:00.000Z",
    }
  ];
  localStorage.setItem("reviews", JSON.stringify(testReviews));
  deleteReviewById("delByIdTest1");

  const reviewsAfterDel = JSON.parse(localStorage.getItem("reviews"));
  expect(reviewsAfterDel.length).toBe(1);
  expect(reviewsAfterDel[0].id).toBe("delByIdTest2");
});