export const createCarAPIResponses=
{
    carCreated: {
        "status": "ok",
        "data": {
          "id": 94,
          "carBrandId": 1,
          "carModelId": 1,
          "initialMileage": 122,
          "updatedMileageAt": "2021-05-17T15:26:36.000Z",
          "mileage": 122,
          "brand": "Audi",
          "model": "TT",
          "logo": "audi.png"
        }
      },


    notFoundtError:{
        "status": "error",
        "message": "Brand not found"
      },
    
    badRequestError:{
        "status": "error",
        "message": "Bad request"
          
    },

    userIsNotLoggedInError:{
        "status": "ok",
        "message": "Not authenticated"
      },
    invalidTypeError:{
        "status": "error",
        "message": /Invalid car '(brand|model)' type/
          
    }

    }
