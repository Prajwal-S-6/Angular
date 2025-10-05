import {TestBed} from "@angular/core/testing";
import {CalculatorService} from "./calculator.service";
import {LoggerService} from "./logger.service";

let calculatorService: CalculatorService;
//let logger1 = jasmine.createSpyObj(LoggerService, ['log']);
let logger2: LoggerService;
describe('Calculator Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalculatorService, LoggerService
        // {
        // provide: LoggerService,
        // useValue: logger1
        // }
      ]
    })

    calculatorService = TestBed.inject(CalculatorService)
    logger2 = TestBed.inject(LoggerService);
    spyOn(logger2, 'log');
  })

  it('should add two numbers and log', () => {
    const result = calculatorService.add(2,2);
    expect(result).toEqual(4);
    expect(logger2.log).toHaveBeenCalledOnceWith("Addition operation called")
  })

  it('should subtract two numbers and log', () => {
    const result = calculatorService.subtract(2,2);
    expect(result).toEqual(0);
    expect(logger2.log).toHaveBeenCalledOnceWith("Subtraction operation called")
  })

})
