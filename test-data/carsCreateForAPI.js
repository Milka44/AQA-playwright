export const CREATEAPICARS = {
    validCarData: {
        "carBrandId": 1,
        "carModelId": 1,
         "mileage": 100
    },

    invalidCarDataWrongBrand: {
        "carBrandId": 100,
        "carModelId": 1,
        "mileage": 100
    },

    badCarData: {
        "carBrandId": "A",
        "carModelId": 1,
        "mileage": 100
},

    invalidCarDataWrongMileage: {
        "carBrandId": 1,
        "carModelId": 1,
        "mileage": -1

}
}