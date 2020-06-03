import {RenameGeniallyController} from "../../api/controllers/useCases/renameGenially/RenameGeniallyController";

describe('RenameGeniallyController', () => {
   let renameGeniallyController: RenameGeniallyController;

    const mService: any = {
        execute: jest.fn().mockReturnThis()
    };
    const mockResponse: any = { sendStatus: jest.fn().mockReturnThis(), status: jest.fn().mockReturnThis(), json: jest.fn() };


    beforeEach(() => {
        renameGeniallyController = new RenameGeniallyController(mService);
        mService.execute.mockReset();
    });

    describe('when rename genially', () => {
        it('should return the renamed genially', async () => {
            const req: any = {
                params: {
                    id: "1",
                },
                body: {
                  name: "changed",
                }
            }
            mockResponse.json.mockReturnValueOnce(200);
            await renameGeniallyController.execute(req, mockResponse);
            expect(mService.execute).toBeCalledTimes(1);
        });

        it('should return an error if id is not sent', async () => {
            const req: any = {
                params:{},
                body: {
                    name: "changed",
                }
            }
            await renameGeniallyController.execute(req, mockResponse);
            expect(mockResponse.status).toBeCalledWith(500);
            expect(mockResponse.status().json).toBeCalledWith({ message: 'Error: Id and name are required' });
        });

        it('should return an error if name is not sent', async () => {
            const req: any = {
                params:{
                    id: "1"
                },
                body: {}
            }
            await renameGeniallyController.execute(req, mockResponse);
            expect(mockResponse.status).toBeCalledWith(500);
            expect(mockResponse.status().json).toBeCalledWith({ message: 'Error: Id and name are required' });
        });

    });
});
