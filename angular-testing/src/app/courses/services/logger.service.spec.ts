import {LoggerService} from "./logger.service";

let loggerService: LoggerService;
// let console = {
//   log: (message: string) => {}
// };
describe('Logger Service', () => {
  beforeEach(() => {
    loggerService = new LoggerService();
  })
  it('should log to console', () => {
    spyOn(console, 'log').and.callThrough();

    loggerService.log("message");

    expect(console.log).toHaveBeenCalledWith("message");
  });
});
