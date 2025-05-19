import { localStorage } from '../backend/localStorage';

// testing assigments: 
//Prachi: getReviewsFromStorage()
//charlie: deleteReviewById(id), addReviewsToDocument(reviews)

//austin: updateReview(updatedReview), createReviewObject(form)
//skyler : initFormHandler()


//I wrote my unit tets for my functions, but I can't get the exports to work, so npm run test will just give errors atm
describe('localStorage helpers', () => {

    //-------------------------------------------------------------------
    // TEST (creatReviewObject)
    //-------------------------------------------------------------------
    test('createReviewObject returns a fully populated object', () => {
        //custom form, not sure if the image link is the way it is needed
        const fd = new FormData();
        fd.append('id', '123456');
        fd.append('title', 'Inception');
        fd.append('watchedOn', '2025-05-18');
        fd.append('rating', '5');
        fd.append('imageData', 'https://cdn.displate.com/artwork/270x380/2024-06-26/b3c00a5001f88b1d84655efd1b4b8590_f560fcf2e65fd265ddaa78cae2510e25.jpg');
        fd.append('notes', 'A movie of all time');

        const obj = createReviewObject(fd);

        expect(obj).toEqual(
            expect.objectContaining({
                id: '123456',
                title: 'Inception',
                watchedOn: '2025-05-18',
                rating: 5,
                imageData: 'https://cdn.displate.com/artwork/270x380/2024-06-26/b3c00a5001f88b1d84655efd1b4b8590_f560fcf2e65fd265ddaa78cae2510e25.jpg',
                notes: 'A movie of all time',
            }),
        );

        expect(() => new Date(obj.createdAt)).not.toThrow();
        expect(obj.createdAt).toBe(obj.updatedAt);
    });

    //-------------------------------------------------------------------
    // TEST (updateReview)
    //-------------------------------------------------------------------

    test('updateReview correctly replaces an existing review in localStorage', () => {
        const seed = [
            {
                id: 'a',
                title: 'MovieA',
                watchedOn: '2025-01-01',
                rating: 3,
                imageData: '',
                notes: '',
                createdAt: '2025-01-01T00:00:00.000Z',
                updatedAt: '2025-01-01T00:00:00.000Z',
            },
            {
                id: 'b',
                title: 'MovieB',
                watchedOn: '2025-02-02',
                rating: 4,
                imageData: '',
                notes: '',
                createdAt: '2025-02-02T00:00:00.000Z',
                updatedAt: '2025-02-02T00:00:00.000Z',
            },
        ];
        localStorage.setItem('reviews', JSON.stringify(seed));

        const updated = {
            ...seed[1],
            rating: 1,
            notes: 'Movie B was horrible',
            updatedAt: '2025-05-18T12:00:00.000Z',
        };

        updateReview(updated);

        const stored = getReviewsFromStorage();
        // make sure only has the two items I added
        expect(stored).toHaveLength(2);

        //check to see movie B has new rating and updated notes
        const bRecord = stored.find((r) => r.id === 'b');
        expect(bRecord.rating).toBe(1);
        expect(bRecord.notes).toBe('Movie B was horrible');

        //double check and make sure movie A wasn't altered in any way
        const aRecord = stored.find((r) => r.id === 'a');
        expect(aRecord.rating).toBe(3);
    });
});