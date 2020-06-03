import CreateGeniallyService from "../../contexts/core/genially/application/CreateGeniallyService";
import Genially from "../../contexts/core/genially/domain/Genially";

describe('CreateGeniallyService', () => {
    let createGeniallyService: CreateGeniallyService;

    const mRepository = {
        save: jest.fn().mockReturnThis(),
        find: jest.fn().mockReturnThis(),
        delete: jest.fn().mockReturnThis(),
    };
    const mCounter = {
        count: jest.fn(),
    }
    beforeEach(() => {
        createGeniallyService = new CreateGeniallyService(mRepository, mCounter);
        mRepository.find.mockReset();
        mRepository.save.mockReset();
        mRepository.delete.mockReset();
        mCounter.count.mockReset();
    });

    describe('when create genially', () => {
        it('should return a created genially', async () => {
            const geniallyToCreate: Genially = new Genially("1", "name", "desc");
            const genially = await createGeniallyService.execute(geniallyToCreate);
            expect(mRepository.save).toBeCalledTimes(1);
            expect(mCounter.count).toBeCalledTimes(1);
            expect(mCounter.count).toBeCalledWith();
            expect(genially).toBeInstanceOf(Genially);
        });
    });

});
