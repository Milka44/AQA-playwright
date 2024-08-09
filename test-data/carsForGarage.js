export const carsForGarage = {
    
        car1: {
          brandValue: 'BMW',
          modelValue: 'X6',
          mileageValue: '60',
          get newMileageValue() {
            return (parseInt(this.mileageValue) + 6).toString();
          },
          numberLitersValue: '10',
          totalCostValue: '20'
        },
      

    car2: {
        brandValue: 'AUDI',
        modelValue: 'Q7',
        mileageValue: '60',
        get newMileageValue() {
          return (parseInt(this.mileageValue) + 6).toString();
        },
        numberLitersValue: '1',
        totalCostValue: '2'
      },
}
