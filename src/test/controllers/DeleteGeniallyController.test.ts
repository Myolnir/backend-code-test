import {DeleteGeniallyController} from "../../api/controllers/useCases/deleteGenially/DeleteGeniallyController";

describe('DeleteGeniallyController', () => {
   let deleteGeniallyController: DeleteGeniallyController;

    const mService: any = {
        execute: jest.fn().mockReturnThis()
    };
    const mockResponse: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };


    beforeEach(() => {
        deleteGeniallyController = new DeleteGeniallyController(mService);
        mService.execute.mockReset();
    });

    describe('when delete genially', () => {
        it('should return the deleted genially', async () => {
            const req: any = {
                params: {
                    id: "1",
                }
            }
            mockResponse.json.mockReturnValueOnce(200);
            await deleteGeniallyController.execute(req, mockResponse);
            expect(mService.execute).toBeCalledTimes(1);
        });

        it('should return an error if id is not sent', async () => {
            const req: any = {
                params:{},
            }
            await deleteGeniallyController.execute(req, mockResponse);
            expect(mockResponse.status).toBeCalledWith(500);
            expect(mockResponse.status().json).toBeCalledWith({ message: 'Error: Id is required' });
        });


    });
});
