import DeleteGeniallyService from "../../contexts/core/genially/application/DeleteGeniallyService";

describe('DeleteGeniallyService', () => {
    let deleteGeniallyService: DeleteGeniallyService;

    const mRepository = {
        save: jest.fn().mockReturnThis(),
        find: jest.fn(),
        delete: jest.fn().mockReturnThis(),
    };

    beforeEach(() => {
        deleteGeniallyService = new DeleteGeniallyService(mRepository);
        mRepository.find.mockReset();
        mRepository.save.mockReset();
        mRepository.delete.mockReset();
    });

    describe('when delete genially', () => {
        it('should return a deleted genially', async () => {
            const databaseGenially = {
                "_id": "26ba352e-9eb3-480c-9411-ce7061e8ae08",
                "_name": "angel",
                "_description": "description",
                "_createdAt": "2020-06-03T14:21:06.482Z"
            }
            const deletedGenially = {
                "_id": "26ba352e-9eb3-480c-9411-ce7061e8ae08",
                "_name": "angel",
                "_description": "description",
                "_createdAt": "2020-06-03T14:21:06.482Z",
                "_deletedAt": "2020-06-03T14:21:06.482Z"
            }
            mRepository.find.mockReturnValueOnce(databaseGenially).mockReturnValueOnce(deletedGenially);
            const genially = await deleteGeniallyService.execute("26ba352e-9eb3-480c-9411-ce7061e8ae08");
            expect(mRepository.find).toBeCalledTimes(2);
            expect(mRepository.find).toBeCalledWith("26ba352e-9eb3-480c-9411-ce7061e8ae08")
            expect(mRepository.find).toBeCalledWith("26ba352e-9eb3-480c-9411-ce7061e8ae08")

            expect(mRepository.delete).toBeCalledTimes(1);
            expect(mRepository.delete).toBeCalledWith("26ba352e-9eb3-480c-9411-ce7061e8ae08")

            expect(mRepository.save).toBeCalledTimes(1);
        });

        it('should return an error cause genially does not exists', async () => {
            mRepository.find.mockReturnValueOnce(null);
            const id = "26ba352e-9eb3-480c-9411-ce7061e8ae08"
            try {
                await deleteGeniallyService.execute(id);
            } catch (err) {
                expect(err).toEqual(new Error(`Genially <26ba352e-9eb3-480c-9411-ce7061e8ae08> does no exist`));
                expect(mRepository.find).toBeCalledTimes(1);
                expect(mRepository.find).toBeCalledWith("26ba352e-9eb3-480c-9411-ce7061e8ae08")
            }

        });
    });

});
