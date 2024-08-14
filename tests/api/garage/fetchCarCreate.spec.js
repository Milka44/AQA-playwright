import {expect, test} from "../../../src/pageObjects/fixtures/userGaragePageFixture.js";
import { CREATEAPICARS } from "../../../test-data/carsCreateForAPI.js";
import { createCarAPIResponses } from "../../../test-data/createCarsAPIResponses.js";

test.describe("Cars", ()=>{

    test.afterEach(async ({request})=>{
        const carsList = await request.get('/api/cars')
        const {data: cars} = await carsList.json()//іменована деструктуризація
              
        await Promise.all(// в таком случае будет удалять сразу все машины
            cars.map((car)=>(async ()=>{
                    const response = await request.delete(`/api/cars/${car.id}`)
                    await expect(response).toBeOK()//assert, кот. проверяет АПИ ответ на положит статус
            })())
        )
        })

    test("Create a car.Positive test.", async({request})=>{
              const response = await request.post('/api/cars', {
            data: CREATEAPICARS.validCarData
        })
        const body = await response.json()

        expect(body.data, "Car should be created").toMatchObject(CREATEAPICARS.validCarData)
    })

    test("Create a car. Negative test: Not found ", async({request})=>{
        const response = await request.post('/api/cars', {
            data: CREATEAPICARS.invalidCarDataWrongBrand
        })
        const body = await response.json()

        expect(body, "Should return 'Brand not found'").toEqual(createCarAPIResponses.notFoundtError)
    })

    test("Create a car. Negative test:Invalid type ", async({request})=>{
        const response = await request.post('/api/cars', {
            data: CREATEAPICARS.badCarData
        })
        const body = await response.json()

        expect(body, "Should return Invalid type").toMatchObject(createCarAPIResponses.invalidTypeError)
    })

   
    // test("Create car. Negative test: Not authenticated", async ({ context, request }) => {
    //     // Clear  cache (цей тест тут не працює, т.к. не має авторизації)
    //     await context.clearCookies();
    //     await context.clearPermissions();
    //     await context.storageState({ clear: true });
    
    //     const response = await request.post('https://qauto.forstudy.space/api/cars', {
    //         data: CREATEAPICARS.validCarData
    //     });
    //     const body = await response.json();
    //     expect(body, "Should return user not logged in").toEqual(createCarAPIResponses.userIsNotLoggedIn);
    // });    
})
