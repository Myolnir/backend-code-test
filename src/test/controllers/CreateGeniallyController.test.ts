import {CreateGeniallyController} from "../../api/controllers/useCases/createGenially/CreateGeniallyController";

describe('CreateGeniallyController', () => {
   let createGeniallyController: CreateGeniallyController;

    const mService: any = {
        execute: jest.fn().mockReturnThis()
    };
    const mockResponse: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };


    beforeEach(() => {
        createGeniallyController = new CreateGeniallyController(mService);
        mService.execute.mockReset();

    });

    describe('when create genially', () => {
        it('should return a created genially', async () => {
            const req: any = {
                body: {
                    name: "name",
                    description: "description",
                }
            }
            mockResponse.json.mockReturnValueOnce(200);
            await createGeniallyController.execute(req, mockResponse);
            expect(mService.execute).toBeCalledTimes(1);
        });
        it('should return an error cause name is too short', async () => {
            const req: any = {
                body: {
                    name: "na",
                    description: "description",
                }
            }
            await createGeniallyController.execute(req, mockResponse);
            expect(mockResponse.status).toBeCalledWith(500);
            expect(mockResponse.status().json).toBeCalledWith({ message: 'Name is not valid. Length should be between 3 and 20' });
        });

        it('should return an error cause name is to long', async () => {
            const req: any = {
                body: {
                    name: "1234567890123456789012345",
                    description: "description",
                }
            }
            await createGeniallyController.execute(req, mockResponse);
            expect(mockResponse.status).toBeCalledWith(500);
            expect(mockResponse.status().json).toBeCalledWith({ message: 'Name is not valid. Length should be between 3 and 20' });
        });

        it('should return an error cause description is to long', async () => {
            const req: any = {
                body: {
                    name: "name",
                    description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                }
            }
            await createGeniallyController.execute(req, mockResponse);
            expect(mockResponse.status).toBeCalledWith(500);
            expect(mockResponse.status().json).toBeCalledWith({ message: 'Description length is not valid. Length should be lower or equal than 125' });
        });

    });
});
